const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'view/scripts'),
        filename: 'start.bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 1000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devtool: 'eval-source-map',
    mode: 'development'
};