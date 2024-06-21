const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const pool = require('./db');

// 設置靜態資源目錄
app.use(express.static(path.join(__dirname, 'resources')));

// 設置視圖引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用 body-parser 中介軟體來解析請求體
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 主頁路由
app.get('/', (req, res) => {
    res.redirect('/login');
});

// 登錄頁面路由
app.get('/login', (req, res) => {
    res.render('login');
});

// 新增 POST 路由來處理登錄請求
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM public.users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// 主頁路由
app.get('/main', (req, res) => {
    res.render('main');
});

// 新增情緒日記頁面路由
app.get('/journal', (req, res) => {
    res.render('journal');
});

app.post('/submit-journal', async (req, res) => {
    const { emoji, time, content } = req.body;

    try {
        const result = await pool.query('INSERT INTO public.journals (user_id, mood, entry_text, entry_date, created_at) VALUES ($1, $2, $3, $4, NOW())', [1, emoji, content, time]); // 假设 user_id 为 1
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// 新增指南和建議頁面路由
app.get('/guide', (req, res) => {
    res.render('guide');
});

// 新增更多資源推薦頁面路由
app.get('/more', (req, res) => {
    res.render('more');
});

// 新增進度記錄頁面路由
app.get('/record', (req, res) => {
    res.render('record');
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
