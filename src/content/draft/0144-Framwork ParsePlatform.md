title: Framwork ParsePlatform
date: 2016/06/21 09:00:32
categories:
 - tryghost

tags:
 - nodejs 



---

NoServer-Stcak Tech

https://www.parse.com/docs
https://github.com/ParsePlatform/parse-server-example

 * 底层存储 mongodb+rockracks
 * 中间层 express+parse-server 
 * 前端 parse sdk

# SDK 

 * Cloud* 这个是 parse-server 定义方法，client 调用。也可以做一些方法拦截。
 * User 用户模块相关
 * Query/LiveQuery 查询语法
 * Sessions/Roles 控制安全
 * Other

# 使用
 * Server 声明一个 parse 服务
```langauge-javascript
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/mongorocks', // Connection string for your MongoDB database
  cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'xxx',
  masterKey: 'xxx', // Keep this key secret!
  fileKey: 'xxx',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

app.use('/parse', api);
```
 * Clinet 声明一个 parse 服务
```langauge-javascript
    Parse.initialize("myAppId");
    Parse.serverURL = 'http://45.32.52.216:1337/parse'


```



