const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
        filename: '[hash:8].js', // 打包后的文件名
        clean: true, // 清空打包后的旧文件
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'), // 模版地址
        }),
    ],
};
