const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const now = new Date()

module.exports = {
    entry: ['./src/index.js', './src/qr/qr.js', './src/snake/snake.js'], // Точка входа для сборки проекта

    output: {
        filename: `bundle.js?v${now}`, // Имя выходного файла сборки
        path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img/')
                },
                {
                    from: path.resolve(__dirname, 'src/icon'),
                    to: path.resolve(__dirname, 'dist/icon/')
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `style.css?v${now}`, // Название конечного CSS файла
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Каталог для статики
        },
        open: true, // Автоматически открывать браузер
    },
    mode: 'development', // Режим сборки
};