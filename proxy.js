const express = require('express');
const app = express();
const path = require('path');
const proxyMiddleware = require('http-proxy-middleware');
const {
    SANDBOX1_PORT,
    SANDBOX2_PORT,
    PROXY_PORT,
} = require('./constants');


const proxyMap = {
    'sandbox1': {
        web: proxyMiddleware({target: `http://localhost:${SANDBOX1_PORT}`}),
        // socket: proxyMiddleware({
        //     target: 'ws://localhost:4000',
        //     ws: true,
        //     logLevel: 'debug'
        // }),
    },
    'sandbox2': {
        web: proxyMiddleware({target: `http://localhost:${SANDBOX2_PORT}`}),
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



app.listen(PROXY_PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server listening at ${PROXY_PORT}`);
    }
});
