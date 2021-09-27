const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件

module.exports = {
    mode: 'development',
    // entry: {
    //     main: './src/index.js'
    // },
    // entry: ['./src/index.js', './src/main.js'],
    entry: {
        index: './src/index.js',
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
        filename: '[name].bundle.js', // 打包后的文件名
        clean: true, // 清空打包后的旧文件
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(), // 进度条插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'), // 模版地址
        }),
    ],
};
