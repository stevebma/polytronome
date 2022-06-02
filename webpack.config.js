const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devServer: {
        port: 3000
    },
    devtool: isProduction ? undefined : 'eval-source-map',
    entry: {
        index: './src/index.tsx',
    },
    mode: isProduction ? 'production' : 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.(js|jsx|ts|tsx)$/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        filename: 'index.bundle.js',
        path: path.join(__dirname, '/dist'),
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
};
