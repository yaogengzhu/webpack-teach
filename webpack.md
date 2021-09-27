



# webpack

## 前言

开发环境以及版本：

- macOs
- node v12.19.0
- npm 6.14.8
- webpack 5.53.0

##  第一章  工程初始化

### 初始化项目

```bash
- 新建一个文件夹（webpackDemo）
mkdir webpackDemo # 新建一个文件夹
cd webpackDemo		# 进入该文件
npm init -y  			# 快捷初始化一个项目 -- 如果不需要参数y, 按要求输入信息即可

```

### 安装webpack

```bash
npm i webpack
```

###  新建文件

```bash
mkdir src      # webpack 默认打包文件夹 src/index.js
cd src
touch index.js # 在src目录下新建一个inddex.js文件
webpack				 # 如果全局安装过webapck, 执行该命令，会进行打包
```

按以上步骤，基本完成了一个webpack项目初始化工作。如果遇到执行webpack命令不执行的话，全局安装webpack

### 配置打包命令

在package.json文件中，新建一个命令。此时需要先安装

```bash
npm i webpack-cli -D
```

```js
"scripts": {
    "build": "webpack"
 },
```

这个时候在终端中执行以下命令，便可以看到打包的文件了。

```bash
npm run build
```

✅完成以上工作，便实现了一个基本的打包功能，webpack默认的一套打包方式。下一节，将配置自己的webpack配置文件



## 第二章 webpack基本概念

### 新建webpack的配置文件

```bash
cd ..											# 切换到项目根目录
touch webpack.config.js		# 新建webpack.config.js配置文件夹
```

```	js
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
        filename: 'my-first-webpack.bundle.js', // 打包后的文件名
    },
};
```

接下来开始进入webapck配置：

### 入口(entry)

webpack的默认打包入口为： './src/index.js'

```js
module.exports = {
   entry: './src/index.js',
};

```

### 出口(output)

如果不进行配置，则默认值是 `./dist/main.js`

```js
module.exports = {
  entry: './src/index.js',
  output: {
        path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
        filename: 'my-first-webpack.bundle.js', // 打包后的文件名
    },
};
```



### loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们**转换**为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。以txt文件为例：

```bash
npm install raw-loader --save-dev
```

```js
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
        filename: '[hash:8].js', // 打包后的文件名可用hash进行变换
        clean: true, // 清空打包后的旧文件
    },
    module: {
        rules: [
            {
                test: /\.txt$/, // 解析后缀名为txt的文件
                use: 'raw-loader',
            },
        ],
    }
};
```

### 插件plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

```bash
npm install html-webpack-plugin --save-dev
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
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
```

*注：html-webpack-plugin 插件会将打包后的js文件自动注入到html文件中*

### 模式

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

- **development**  会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。
- **production**  会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。

- **none** 不使用任何默认优化选项

```js
module.exports = {
  mode: 'production',
};
```

### 小结

文档目录

```md
.
├── README.md						# 说明文档
├── dist								# 打包后的文件夹
│   ├── 13b52be6.js			# 产物
│   └── index.html
├── package-lock.json
├── package.json
├── src									# src文件夹
│   ├── index.js
│   └── index.txt
├── template.html				# html模版文件
└── webpack.config.js		# webpack.config.js 基本配置文件
```

[第一部分仓库地址,点我前往](https://github.com/yaogengzhu/webpack-teach/blob/%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86/README.md)

## 第三章 核心概念学习

### 入口起点（entry）

单个入口写法

```js
module.exports = {
    entry: './src/index.js'
}
module.exports = {
    entry: {
       main: './src/index.js'
    },
}
```

多个入口写法

```js
entry: {
  	index: './src/index.js',
    main: './src/main.js'
},
output: {
  	path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
    filename: '[name].bundle.js', // 打包后的文件名
    clean: true, // 清空打包后的旧文件
},
```

### 出口（output）

在 webpack 配置中，`output` 属性的最低要求是，将它的值设置为一个对象，然后为将输出文件的文件名配置为一个 [`output.filename`](https://webpack.docschina.org/configuration/output/#outputfilename)：

```js
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```

多个入口起点需要, 则应该使用 [占位符(substitutions)](https://webpack.docschina.org/configuration/output#output-filename) 来确保每个文件具有唯一的名称。 [name]

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'), // 设置打包后的文件路金
    filename: '[name].bundle.js', // 打包后的文件名, 多个入口起点，需要使用[name]进行占位符处理
    clean: true, // 清空打包后的旧文件
  },
}
```

### loader

loader 用于对模块的源代码进行转换。

如 css处理, 先安装相关loader.

```bash
npm install --save-dev css-loader style-loader
```

Webpack，具体配置

```js
 module: {
   rules: [
     { test: /\.txt$/, use: 'raw-loader' }, // 处理 txt 文件
     { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理css 文件
   ],
 },
```

处理ts 文件，先安装相关依赖

```bash
npm install --save-dev ts-loader typescript
```

ts项目需要先默认新建一个文件

```bash
touch tsconfig.json
```

webpack 配置

```js
 module: {
   rules: [
     { test: /\.txt$/, use: 'raw-loader' }, // 处理 txt 文件
     { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理css 文件
     { test: /\.ts$/, use: 'ts-loader' }, // 新增ts处理loader
   ],
 },
```

**其他loader 同理**

*在webpack配置中，有两种方式使用loader*

- 配置方式： 在 **webpack.config.js** 文件中指定 loader
- 内联方式： 在每个 `import` 语句中显式指定 loader

**配置方式**

[`module.rules`](https://webpack.docschina.org/configuration/module/#modulerules) 允许你在 webpack 配置中指定多个 loader。 loader 从右到左（或从下到上）。

可以以less为例子

```bash
 npm install less less-loader --save-dev
```

```js
 module: {
   rules: [
     { test: /\.txt$/, use: 'raw-loader' },
     // 在css原有的基础上，新增正则匹配. loader 解析顺序从右到左
     { test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']},
     { test: /\.ts$/, use: 'ts-loader' },
   ],
 },
```

**内联方式** (不推荐)

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

### plugin

插件目的在于解决 [loader](https://webpack.docschina.org/concepts/loaders) 无法实现的**其他事**

内置插件

```javascript
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
```

HtmlWebpackPlugin 自动注入js插件

```bash
npm i html-webpack-plugin --save-dev
```

使用方式，前一章已经说明，插件就是一个开箱即用的过程，十分简单

```js
plugins: [
  new webpack.ProgressPlugin(), // 进度条插件
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './template.html'), // 模版地址
  }),
],
```

具体查看更多插件的用法，可以[点击查看](https://webpack.docschina.org/plugins/)

项目结构

```md
├── README.md
├── dist
│   ├── index.bundle.js
│   ├── index.html
│   └── main.bundle.js
├── package-lock.json
├── package.json
├── src
│   ├── index.css
│   ├── index.js
│   ├── index.less
│   ├── index.txt
│   ├── main.js
│   └── other.ts
├── template.html
├── tsconfig.json
├── webpack.config.js
└── webpack.md
```

[第二部分仓库地址,点我前往](https://github.com/yaogengzhu/webpack-teach/blob/%E7%AC%AC%E4%BA%8C%E9%83%A8%E5%88%86/README.md)

