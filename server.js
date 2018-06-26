const express = require('express');
const app = express();
const path = require('path');
const proxyMiddleware = require('http-proxy-middleware');

const html = (fileName) => `
    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <div id="root"/>
        <script src="apps/${fileName}.web.js"></script>
    </body>
    </html>
`;

const proxyMap = {
    'sandbox1': {
        web: proxyMiddleware({target: 'http://localhost:4000'}),
        // socket: proxyMiddleware({
        //     target: 'ws://localhost:4000',
        //     ws: true,
        //     logLevel: 'debug'
        // }),
    },
    'sandbox2': {
        web: proxyMiddleware({target: 'http://localhost:4001'}),
        // socket: proxyMiddleware({
        //     target: 'ws://localhost:4001',
        //     ws: true,
        //     logLevel: 'debug'
        // }),
    }
}

app.use('/apps', (req, res) => {
    const appName = path.parse(req.originalUrl).base.split('.')[0];

    return proxyMap[appName].web(req, res, {});
});

app.get('/sandbox1', (req, res) => {
    res.status(200).send(html('sandbox1'));
});

app.get('/sandbox2', (req, res) => {
    res.status(200).send(html('sandbox2'));
});


app.listen(8080, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('server listening at 8080')
    }
});
