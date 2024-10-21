title: FED Build Tools Webpack4
date: 2018/06/24 15:03:56
categories:
 - dev
 - front-end

tags:
 - webpack 

---
# installation
```shell
cd demo
npm init -y
npm install webpack webpack-cli webpack-dev-server --save-dev
```

# Usage
需要手动创建的核心文件

* index.html 入口模板文件
* main.js 入口 js 文件
* webpack.dev.config.js

![20180625152985796284604.png](http://img.sandseasoft.com/20180625152985796284604.png)

## package.json

```language-javascript
{
  "name": "webpack_demo",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "dev": "webpack-dev-server  --mode development --config=build/webpack.dev.config.js",
    "test": "webpack  --mode production --config=build/webpack.dev.config.js",
    "prod": "webpack  --mode production --config=build/webpack.dev.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "style-loader": "^0.21.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.12.1",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  },
  "dependencies": {
    "lodash": "^4.17.10"
  }
}

```

## webpack.dev.config.js
webpack4的配置文件由几个部分组成

* mode 编译模式，选择 prod 会有优化压缩能力
* entry 核心 js 入口
* output 输出 js 出口
* module 编译过程应用的加载模块
* plugins 构建输出过程的家在模块
* devServer 开发热重载过程中的模块

```language-javascript
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//安装webpack webpack-cli webpack-dev-server 模块
module.exports = {
    //启动模式 development production
    mode: 'development',
    //入口文件
    entry: {
        main: './src/main.js',
        main2: './src/main2.js',
    },
    //输出文件位置
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "bundle.[name].js"
    },
    //调用编译模块
    module: {
        rules: [
            //css 加载  style-loader css-loader
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]

            },
            //图片处理
            {
                test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use: [{
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        limit: 500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            //less less-loader
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }]
            },
            //es6 配置 babel-core babel-loader babel-preset-es2015 babel-preset-react
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    },
    //调用打包插件
    plugins: [
        //压缩插件 默认集成
        new uglify(),
        //编译生产打包插件
        new HtmlWebpackPlugin({
            //是对html文件进行压缩
            minify: {
                //removeAttrubuteQuotes是却掉属性的双引号。
                removeAttributeQuotes: true
            },
            //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            hash: true,
            //是要打包的html模版路径和文件名称
            template: './src/index.html'

        })
    ],
    //调用开发模式
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: "0.0.0.0",
        compress: true,
        port: 8999
    }

};

```
## .babelrc
```language-javascript
{
  "presets":["react","es2015"]
}
```

# Reference
https://webpack.js.org/guides/getting-started/
https://webpack.docschina.org/concepts/

