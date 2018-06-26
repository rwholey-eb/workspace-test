const path = require('path');
const fs = require('fs');

const WEBPACK_STATS = {
    all: false,
    warnings:true,
    errors:true,
    chunks:true,
    timings:true,
};

const _getWorkspaceName = () => {
    const {name} = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')));

    return name;
};
const workspaceName = _getWorkspaceName();

const WEBPACK_DEV_SERVER = {
    devServer: {
        disableHostCheck: true,
        publicPath: '/apps/',
        // publicPath: `/static-dj/js/${workspaceName}`,
        before: (app) =>  {
            app.use((req, res, next) => {
                console.log(req.originalUrl);
                next();
            });
        },
        https: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // public: 'localhost:4000',
        // public: `www.evbdev.com/sockjs-node/${workspaceName}`,
        host: '0.0.0.0',
        port: 7000,
        stats: WEBPACK_STATS,
    },
};

module.exports = (env) => ({
    devtool: 'cheap-source-map',
    entry: {
        [workspaceName]:[
            // `webpack-dev-server/client?http://www.evbdev.com/sockjs-node/${workspaceName}`,
            path.resolve(__dirname, 'src/index.js'),
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `[name].web.${env === 'dev' ? '' : 'ipj.'}js`,
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    ...(env === 'dev' ? WEBPACK_DEV_SERVER : {stats:WEBPACK_STATS}),
});
