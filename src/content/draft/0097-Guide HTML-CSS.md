title: Guide HTML/CSS
date: 2016/01/26 05:25:26
categories:
 - tryghost

tags:
 - nodejs 



---

>两种语言都不属于冯诺依曼体系， 所以没有逻辑相对简单，暂时不扯 Scss这种带逻辑的增强 css 脚本

# MDN
https://developer.mozilla.org/zh-CN/docs/Web
https://caniuse.com/
# HTML基础
## Elements
```
   文档描述： html head meta body 
   排版：<a> <p> <h1-6> <div> <ul><li> <ol>
   表单：form input button submit text select>option  radio checkbox 
   表格：<table> <tbody> <thead> <tr><td>
```
## template
```language-html
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="bootstrap-multiselect.js"></script>
    <link href="/assets/base/css/bootstrap-select.min.css" rel="stylesheet">
</head>
<body>
    
    

    <script src="bootstrap-multiselect.js"></script>
    <link href="/assets/base/css/bootstrap-select.min.css" rel="stylesheet">
</body>
```

# Html5相关
 * Canvas/SVG
 * WebSockets
 * Location
 * Video/Audio
 * WebStrong
 * WEBGL



# CSS 基础
## 布局
![](http://img.sandseasoft.com/image/d/27/f5aa50324e397583670d494304520.png)
## 元素分类

 * 块级元素
 * 行内元素
 * 行内级元素
## 位置
 * postion
  * relative
  * absolute
  * fix
 * float
  * left/right
 * z-index

## 定位语法
```language-css
# class 查找
.{
}
# id 查找
# {

}
# elements 查找
div{

}
# 级联查找
div > .id{
}
```

# Cheatsheet
联系我代码
![](http://img.sandseasoft.com/image/0/99/2bd4ac14d316300e5b2517ba0eb26.png)

```language-html
<h6 style="text-align:center;">有问题请联系:
    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=470516189&site=qq&menu=yes">
     <img border="0" src="http://wpa.qq.com/pa?p=2:470516189:51" alt="点击这里联系我" title="点击这里联系我"/>
                        </a>
                        <a target="_blank"
                           href="http://amos.im.alisoft.com/msg.aw?v=2&uid=chinajik&site=cntaobao&s=1&charset=utf-8">
                            <img src="http://amos.im.alisoft.com/online.aw?v=2&amp;uid=chinajik&amp;site=cntaobao&amp;s=0"
                                 title="联系{{info.nick}}"/>
                        </a>
                    </h6>
```




