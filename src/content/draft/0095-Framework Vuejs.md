title: Framework Vuejs
date: 2016/01/26 05:01:46
categories:
 - tryghost

tags:
 - nodejs 



---

官网，挺好用的， 官网已经讲清楚了使用方法。

http://cn.vuejs.org/api/

## 双向绑定原理
基于Objects.defineProperty(object,value,descriptor)
>* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
* https://github.com/DMQ/mvvm

```
{
  //设置 属性的值
  value:123,
  //是否可重写
  writable:false,
  //是否可被枚举 Object.keys(x),
  enumerable:false,
  //是否可再重新被defineProperty,
  configurable:false,
  //当前值被重新设置时调用
  set:function(newValue){},
  //当前值被获取时调用
  get:function(){}
}
```

Observer／Compiler／Watcher


## 过滤器
```language-javascript
Vue.filter('time', function (value) {
    return moment(value).endOf('day').fromNow();
});
```

## 初始化
```language-html
<div id="app">
  {{ message }}
</div>

```
```language-javascript
new Vue({
  el: '# app',
  data: {
    message: 'Hello Vue.js!'
  }
})
```

## 常用标签

 * v-on:click  v-on:change  v-on:ofucos
 * v-bind:value=""  v-bind:disabled=""
 * v-for="(key,value) in options"
 * v-show v-if v-else 
 * v-model
 * @keyup.13="search"

## 常用api
* https://vuejs-tips.github.io/cheatsheet/
* https://vuejs-tips.github.io/vuex-cheatsheet/
## 常用框架
* iviewui.com
* element.eleme.io/# /







