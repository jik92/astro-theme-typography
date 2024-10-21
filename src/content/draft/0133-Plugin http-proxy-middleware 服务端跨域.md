title: Plugin http-proxy-middleware 服务端跨域
date: 2016/04/29 08:57:37
categories:
 - tryghost

tags:
 - nodejs 



---

## 项目再此
https://github.com/chimurai/http-proxy-middleware
由于只有 GET 对跨域有很好的支持，在做项目拆分的时候有时候接口难免会有跨域问题。
这个nodejs 的服务端插件通过接口映射很少的代码可以做端口转发，挺实用的，目前已经上生产线。

app.js
```language-javascript
/**
 * Created by nailuoGG on 16/4/28.
 */
var express = require('express');
var proxy = require('http-proxy-middleware');

// configure proxy middleware context
var context = '/gxb-api';                     // requests with this path will be proxied

// configure proxy middleware options
var options = {
    target: 'http://demo.58gxb.com', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true                         // proxy websockets
};
var apiProxy = proxy(context, options);

// use the configured `apiProxy` in web server
var app = express();
app.use('/', express.static('./html'));
app.use(apiProxy);
app.listen(3333, function () {
    console.log("listen on 3333")
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
```
启动以后所有 gxb-api/接口都会走服务端隐射



