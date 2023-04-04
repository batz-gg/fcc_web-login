const express = require('express');
const app = express();
const bGround = require('fcc-express-bground');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use((req, res, next) => {
    let log = `${req.method} ${req.path} - ${req.ip}`;
    console.log(log);
    next();
});

bGround.log("Hello bGround");
console.log("Hello World");

app.get('/', (req, res) => {
    // res.send('Hello Express');
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
})

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        res.json({'message': 'HELLO JSON'});
    } else {
        res.json({'message': 'Hello json'});
    }
});

app.get('/now', (req, res, next) => {
    req.time = {"time": new Date().toString()};
    next();
}, (req, res) => {
    res.send(req.time);
});

app.get('/:word/echo', (req, res) => {
    res.json({echo: `${req.params.word}`});
});

app.get('/name', (req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}`});
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/name', (req, res) => {
    const data = req.body;
    console.log(data);
    // do something with data
    res.json({ name: `${data.first} ${data.last}`});
});
















 module.exports = app;
