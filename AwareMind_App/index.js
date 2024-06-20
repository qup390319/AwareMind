// 引入 express 模組
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 設置靜態資源目錄
app.use(express.static(path.join(__dirname, 'resources')));

// 設置視圖引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 主路由
app.get('/', (req, res) => {
    res.render('main');
});

// 其他路由
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/journal', (req, res) => {
    res.render('journal');
});

app.get('/guide', (req, res) => {
    res.render('guide');
});

app.get('/more', (req, res) => {
    res.render('more');
});

app.get('/record', (req, res) => {
    res.render('record');
});

// 啟動服務器
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
