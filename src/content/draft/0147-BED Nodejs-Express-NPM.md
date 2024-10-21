title: BED Nodejs/Express/NPM
date: 2016/06/22 06:23:18
categories:
 - tryghost

tags:
 - nodejs 



---

# NPM 
>Nodejs 构建工具
## 简介
https://npm.taobao.org/
https://www.npmjs.com/
## 使用
```language-bash
# 初始化模块
npm init
# 发布模块到中央仓库
npm publish
# 引入模块, 并添加至 package.json
npm install --save express
# 引入至全局
npm install --g express
# 引入到当前项目
npm install express
```
# Nodejs
## Nodejs
 * 版本控制 nvm https://github.com/creationix/nvm
 * 文件系统 fs 、Buffer、Steam
```languag-bash
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
   }
   console.log(data.toString());
});
console.log("程序执行完毕");

```
 * 事件循环、异步 events
```language-bash
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");

```
 * 模块系统
```language-bash
//hello.js 
function Hello() { 
	var name; 
	this.setName = function(thyName) { 
		name = thyName; 
	}; 
	this.sayHello = function() { 
		console.log('Hello ' + name); 
	}; 
}; 
exports.method = Hello;


var Hello = require('./hello'); 
hello = new Hello(); 
hello.setName('BYVoid'); 
hello.sayHello(); 

```
 * Async/ES6 Yeild 同步事件
```language-javascript
async.series({
	one: function(callback){
		callback(null, 1);
	},
	two: function(callback){
		callback(null, 2);
	}
},function(err, results) {
	console.log(results);
});


        async.waterfall([
            function (callback) {
                var result={};
                callback(null, result);
            }
            },
            function (result, callback) {
                "use strict";
            }
        ]);


```
 * 全局对象 __filename/__dirname/process
 * 并发 cluster
 * 守护进程 pm2

## Express 使用
### 关键组件
 * body-parser
 * cookie-parser
 * multer

```language-javascript
var express = require('express')
var app = express()
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(cookieParser())


//get 请求
app.get('/', function (req, res) {
  res.send('Hello World');
  //json 格式
  res.end(JSON.stringify({}));
})
//静态目录隐射
app.use('/public',express.static(path.join(__dirname, 'public')));
//File 转发
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});
//拦截器
app.use('/',function(req,res){

});

app.listen(3000);

```

## module 化
```language-javascipt

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

```
## 私有仓库
verdaccio
https://github.com/verdaccio/verdaccio

## 强制包更新
方法一手动跟新：
修改package.json中依赖包版本，执行npm install --force
方法二使用第三方插件：
npm install -g npm-check-updates
ncu // 查看可更新包
ncu -u // 更新package.json
npm install // 升级到最新版本
方法三使用yarn代替npm,yarn upgrade 
题外话，stackoverflow的大神很谦虚，而sf的大神都很低调





