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
        // const result = await pool.query('SELECT * FROM public.users WHERE username = $1 AND password = $2', [username, password]);
        const result = await pool.query('SELECT * FROM public.users');
        console.log(result.rows);
        if (result.rows.length > 0) {
            res.redirect('/main');
        } else {
            res.send('用戶名或密碼錯誤');
        }
    } catch (err) {
        console.error(err);
        res.send('伺服器錯誤');
    }
});

// 主頁路由
app.get('/main', (req, res) => {
    res.render('main');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
