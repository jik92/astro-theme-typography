title: Crawler about
date: 2017/01/06 09:23:51
categories:
 - tryghost

tags:
 - python 



---

## 背景
爬虫设计，主要是分【控制器】，【爬行节点】，【代理池】

* 列表爬取-》详情爬取-》翻页
* 任务派发-》领取任务-》详情爬取
* 请求失败-》重试-》判断ip被ban-》更换代理

#### 反爬虫机制
 * 频度判断
 * IP判断
 * 会员积分制

#### 爬虫IP池策略
 * ADSL
 * squid3.x 透明代理
 * 爬虫代理池

#### 爬虫工具
 * 基本httpclient请求
 * webdriver
 * phantomjs webkit内核

## 工具
* IPProxyPool-稳定代理池工具
https://github.com/qiyeboy/IPProxyPool
* HttpRequest-Http 请求工具
https://github.com/kevinsawicki/http-request
```language-xml
        <dependency>
            <groupId>com.github.kevinsawicki</groupId>
            <artifactId>http-request</artifactId>
            <version>6.0</version>
        </dependency>

```
```language-java
    HttpRequest request = HttpRequest
        .post(
            "http://api.jgjapp.com/weixin/findworkerdetail")
//        .useProxy("0.0.0.0", 9888)
        .header("cookie", "PHPSESSID=e3l5heh3o756k1aq8nq8sg0j34; Authorization=I+2d517093405fc6e01b4a355df9520fd3")
        .header("proxy-connection", "keep-alive")
        .header("accept", "*/*")
        .header("user-agent", "mix/2.0.3 (iPhone; iOS 10.2; Scale/2.00)")
        .header("accept-language", "zh-Hans-CN;q=1")
        .header("authorization", "I 2d517093405fc6e01b4a355df9520fd3")
        .header("content-length", "43")
        .send("uid=" + uid + "&pg=1&role_type=2&platform=w&os=I&token=2d517093405fc6e01b4a355df9520fd3");
```
* Joup-类似JQuery节点查询工具
https://github.com/jhy/jsoup
http://www.open-open.com/jsoup/
```language-xml
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.10.2</version>
</dependency>

```
* Webmagic-爬虫框架
http://webmagic.io/
https://github.com/code4craft/webmagic




