const express = require('express');
const app = express();
const path = require('path');
const {SERVER_PORT} = require('./constants');

const html = (fileName) => `
    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <div id="root"/>
        <script src="http://localhost:8081/apps/${fileName}.web.js"></script>
    </body>
    </html>
`;

app.use('*', (req, res, next) => {
    console.log(`[GET] ${req.originalUrl}`);
    next();
});

app.get('/sandbox1', (req, res) => {
    res.status(200).send(html('sandbox1'));
});

app.get('/sandbox2', (req, res) => {
    res.status(200).send(html('sandbox2'));
});


app.listen(SERVER_PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server listening at ${SERVER_PORT}`);
    }
});
