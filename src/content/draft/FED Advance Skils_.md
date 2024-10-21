title: FED Advance Skils 
date: 2020/04/20 01:51:04 
categories:
- dev
- front-end
tags:
- react
- javascript
---
# service work
让js实现多线程
<img src="https://tva1.sinaimg.cn/large/0082zybpgy1gc9a29p33gj312e0k83zm.jpg" style="zoom:50%;" />
# <Canvas> and SVG

| Canvas                                                       | SVG                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 通过 JavaScript 来绘制 2D 图形                               | 是一种使用 XML 描述 2D 图形的语言                            |
| 是HTML5提供的新元素``                                        | 历史久远，并不是HTML5转悠的标签                              |
| 位图（标量图），放大或改变尺寸会失真；逐像素进行渲染，依赖分辨率 | 矢量图，放大或改变尺寸不会失真；不依赖分辨率                 |
| 弱的文本渲染能力（因为放大会失真）                           | 最适合带有大型渲染区域的应用程序，比如谷歌地图（因为放大不会失真） |
| 能够以 .png 或 .jpg 格式保存结果图像；能够引入 .png 或 .jpg格式的图片 | 不能以 .png 或 .jpg 格式保存结果图像；不能引入 .png 或 .jpg格式的图片 |
| 不支持事件处理器（一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。） | 支持事件处理器（SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。） |
| 不能被引擎抓取                                               | 可以被引擎抓取                                               |
| ---                                                          | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）      |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘           | 不适合游戏应用                                               |

canvas

offsetX

offsetY

svg

g

rect fill

text/span

* https://docs.microsoft.com/zh-cn/previous-versions/msdn10/Hh377884(v=MSDN.10)

# Promise/ASync、Await

标准的promise函数

```javascript
let p = function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('sleep for ' + ms + ' ms');
        }, ms);
    });
}
let result = p.then();
```

Async\await 使用

```javascript
async function asyncFunction() {
    console.time('asyncFunction total executing:');
    const sleep1 = await sleep(2000);
    console.log('sleep1: ' + sleep1);
    const [sleep2, sleep3, sleep4] = await Promise.all([sleep(2000), sleep(1000), sleep(1500)]);
    console.log('sleep2: ' + sleep2);
    console.log('sleep3: ' + sleep3);
    console.log('sleep4: ' + sleep4);
    const sleepRace = await Promise.race([sleep(3000), sleep(1000), sleep(1000)]);
    console.log('sleep race: ' + sleepRace);
    console.timeEnd('asyncFunction total executing:');

    return 'asyncFunction done.'  // 这个可以不返回，这里只是做个标记，为了显示流程
}
```

```javascript
asyncFunction().then(data => {
    console.log(data);       // asyncFunction return 的内容在这里获取
}).catch(error => {
    console.log(error);      // asyncFunction 的错误统一在这里抓取
});

console.log('after asyncFunction code executing....'); // 这个代表asyncFunction函数后的代码，
                                                       // 显示asyncFunction本身会立即返回，不会阻塞主线程
```

# Flex

* https://css-tricks.com/snippets/css/a-guide-to-flexbox/

```css
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
}

```

# Typescript

基础类型

* number
* string
* class

关键字

* let
* const

范形

* <T>

# Web Assembly .Wasm

# unit: px rem vh

* px 分辨率
* rem 相对主font-size 大小
* vh 相对显示器高度

### Quote

* http://www.typescriptlang.org/docs/home.html
* https://www.runoob.com/typescript/ts-tutorial.html
* https://www.w3cschool.cn/typescript/
* https://ts.xcatliu.com/basics/type-of-function
* https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers
* https://x5.tencent.com/tbs/guide/serviceworker.html

# React PDF方案

* https://juejin.im/post/5d036a78f265da1bce3dcd40

* https://github.com/diegomura/react-pdf

