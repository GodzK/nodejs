const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;



// apply middleware { extended: false } จะบอกให้ Express ใช้โหมดที่ไม่รองรับการแปลงข้อมูลในรูปแบบของ array หรือ object ซ้อนกันขณะที่แปลงข้อมูลจาก URL-encoded เป็น JavaScript object.
app.use(express.urlencoded({ extended:false}));

//build middleware จากjson Middleware นี้ใช้สำหรับแปลงข้อมูลที่ถูกส่งมาในรูปแบบของ JSON ให้อยู่ในรูปแบบของ JavaScript object ซึ่งจะทำให้ง่ายต่อการใช้งานข้อมูล JSON ในแอปพลิเคชัน Express.js
app.use(express.json());

//serve static file
app.use(express.static(path.join(__dirname, '/public')));

app.get('/index(.html)?', (req, res) => {
    // ข้างบนคือการทำให้urlของเว็บไม่มีชื่อสกุลfile
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});     

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
// route handler 
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
