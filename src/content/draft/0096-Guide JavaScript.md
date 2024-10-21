title: Guide JavaScript
date: 2016/01/26 05:06:06
categories:
 - tryghost

tags:
 - nodejs 



---

>动态的，弱类型的，原型链语言

#  API
 * ECMAScript
  * 函数、对象、名空间
  * null/undefined/==/===
  * setTimeout/setInterval
  * hasOwnProperty/typeof
 * DOM
  * innerHtml/DOM
  * EventListener(onclick/onload/onfoucs)
  * getElementById/getElementsByTagName/getElementsByClassName      
* createElement/appendChild/removeChild
  * style
 * BOM
  * Window.screen
  * Window.location(pushState)
  * Window.history
  * Window.navigotar
  * Window.cookies
 * NetWork
   * ajax、pjax
   * json、jsonp
![](http://p0.qhimg.com/t01f0f792cd49f8c934.png)
https://devhints.io/es6
## 结构相关
1.学会包装作用域
```language-javascript

var module1={

}

```
2.学会约定数据接口
```language-javascript
{
  "data":{
     ....todo
     },
  "success":{
     ....todo
     },
  "except":{
     ....todo
     }
}
```
3.学会查找资料
MDN: https://developer.mozilla.org/zh-CN/docs/Web/
DevTools: http://devdocs.io/
## Cheatsheet
小心使用数字的动态转换，超界请使用字符串存储
![](http://img.sandseasoft.com/image/7/07/2ce3348a619cdd7d96ede99a82acc.jpg)

sleep 代码
```language-javascript
      for(var start = Date.now(); Date.now() - start <= 3000; ) { }
```

页面关闭钩子
```language-javascript
window.onbeforeunload = function (event) {
    if (vue.saveWeightCache.length == 0) {
        return;
    } else {
        return "你有未保存的编辑? 是否保存再退出";
    }
};
```

元素动作
```language-javascript
$("# search>input[name='cid']").focus();
$("# search>input[name='cid']").blur();
# ("# id").show();
# ("# id").hide();
# ("# id").toggle();
```

定时器
```language-javascript
# 3秒后开始执行一次
setTimeout(function(){},3000);
# 每3秒执行一次
setInterVal(function(){},3000);
```


## Jquery 相关
元素查找语法
```language-javascript
$("# id").css()
$(".class").css()
$("input[name='name']").css()
```


ajax 的使用
```language-javascript
$.ajax({
    url: '/path/to/file',
    type: 'default GET (Other values: POST)',
    dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    async: true,
    beforeSend: function() {
        //todo
    },
    data: $("# search").serialize(),
}).done(function() {
    console.log("success");
}).fail(function() {
    console.log("error");
}).always(function() {
    console.log("complete");
});

$("").stringify();
$.paramsJSON();
```

## lodash 相关
```language-javascript
    _.mapKeys([1,2,3,4],function(value,key){
    //todo
});
```

## 独立组件
* loading  http://tobiasahlin.com/spinkit/
* keymaster https://github.com/madrobby/keymaster
* select2 https://github.com/select2/select2
* echart https://github.com/ecomfe/echarts
* toastr https://github.com/CodeSeven/toastr
* LABjs https://github.com/getify/LABjs
* moment https://github.com/moment/moment





