const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

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
