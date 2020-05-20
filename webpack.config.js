
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
                { // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            exclude: /node_modules/, // исключает папку node_modules
            use: { loader: "babel-loader" } // весь JS обрабатывается пакетом babel-loader
                },
                 {
                    test: /\.css$/,
                    use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                }
            ]
        },
        plugins: [ 
            new MiniCssExtractPlugin({filename: 'style.[contenthash].css',}),
            new HtmlWebpackPlugin({
                // Означает, что:
                inject: false, // стили НЕ нужно прописывать внутри тегов
                template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
                filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
              }),
              new WebpackMd5Hash()
            ]

};