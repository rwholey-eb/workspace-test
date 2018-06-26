const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/App.js'),
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'build'),
        filename: 'sandbox2.node.js',
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
};
