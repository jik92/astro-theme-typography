title: Fiddler4 Tools
date: 2014/12/21 12:47:03
categories:
 - tryghost

tags:
 - tools 



---

>&nbsp;&nbsp;&nbsp;&nbsp;有开源协议,这个可以免费用的,基本原理是监听系统的8888端口, 然后把所有的http请求代理到本地的8888,就可以使用了,这里代替方案有  postclient plugin for chrome and development tools 也挺好用 
还有一个比较底层的 wireshark

### fiddler笔记

 1. 代理监听 127.0.0.1 8888  
 2. 两种代理模式```streaming``` ``` buffering ```

#### 使用场景
1. host配置
2. 接口调试
3. bugfix
4. 性能分析

### 功能
 1. 增加备注 comment
 2. replay 重新回放
 3. filter 
 4. debug
 5. stream/buffer
 6. decode
 7. process filter
 8. console
 9. rules->automatice breakpoint

### 状态栏
 1. statistic -> rtt(往返时间)->showchart
 2. inspectors解包-> request(header/cookice)/response(textview/json)
 3. autoresponder文件代理->拖拽,替换响应,save->fixbug
 4. composer前后端接口联调->拖拽, execute,重发
 5. timeline网站性能分析->

### 使用场景:
 1. host配置(不配置hosts文件)  tools->host remapping ->replay a request/ responder
 2. composer->重发请求
 3. add-ons->fiddler script-> change speed
 4. add-ons->format javasctipt beatuy/ traffic differ
 
### 移动端监控
* 服务端暴露端口到外网
![](http://img.sandseasoft.com/image/b/aa/ba207cba465683ed61c471e72dd18.png)

* 移动端配置proxy 转发
* 本地资源目录动态映射
```language-bash
use AutoReponder
regex:^https://sjbg.ghzq.com.cn/MIMP(?<args>.*)$

*redir:http://10.211.55.26:8888${args}
```
 
慕课网的视频
http://www.imooc.com/learn/37



