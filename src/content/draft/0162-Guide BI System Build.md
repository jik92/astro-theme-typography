title: Guide BI System Build
date: 2016/11/11 02:52:06
categories:
 - tryghost

tags:
 - 未归档 



---

## 技术评估
### 前端
* google analytics
* growingio
* mta.qq.com
* talkingdata
### 移动端
* flurry.com
* 友盟

## 后端埋点
* Nginx／callback
* ELK／SLS
* Redis
* Tableau／QuickBI

## 背景
  随着工信保／星星点财项目数据分析需求日益增长， 对快速简单构建BI系统架构更加强烈
## 技术原理
  前端生成指纹信息，通过获取ip，页面信息，停留时间做N*N纬度分析，生成留存率，地图，转化
## 技术方向
### 前端选型： GrowingIO
* 优势：无埋点／全端支持／实时报告／热点图／Quick运营报告／产品迭代
![](http://img.sandseasoft.com/image/6/34/a3688bd82ba1c1823464d64cf4e2c.png)
### 后端选型： QuickBI／Redis／CallBack
* 优势
 * QuickBI： 将t_cfp_txnjnl, log* 同步到QuickBI，然后做N*N纬度分析出运营实时报表数据
 * Redis： 通过带TTL的ADD函数统计在线人数
 * CallBack：图片，超链类似 www.xx.com?callback=58gxb.com/xxx&param1=key1&param2=key2 打通html5入口跟踪链
![](http://img.sandseasoft.com/image/8/5c/14aba83a009af09b8064140ee550a.png)

![](http://img.sandseasoft.com/image/2/99/26efb7f8b24feb1cc8921e8db59d1.png)

![](http://img.sandseasoft.com/image/3/d8/aae26455910361b7d7b4542e34edb.png)

### 运营数据存储：MySQL／AccessLog／HDFS／ElasticSearch／SLS
## 总结
  尽可能降低业务侵入性，降低性能影响的同时，对实时数据／近实时数据／离线数据 进行统计，同时打通各个平台数据链路保证数据透明。








