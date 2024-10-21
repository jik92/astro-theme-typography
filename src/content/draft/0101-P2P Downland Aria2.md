title: P2P Downland Aria2
date: 2016/01/27 05:46:41
categories:
 - tryghost

tags:
 - tools 



---

## aria2
linux 支持多协议的下载器，由于可以暴露 json-rpc 接口，支持 http 协议操作。

## 配置
http://aria2c.com/usage.html
```language-bash
brew install aria2
aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all  http://0.0.0.0:6800/jsonrpc
```


## WebUI
https://github.com/binux/yaaw
https://github.com/ziahamza/webui-aria2

## 下载插件
 * 百度离线下载
https://github.com/binux/ThunderLixianExporter
 * 迅雷离线下载
https://chrome.google.com/webstore/detail/thunderlixianassistant/eehlmkfpnagoieibahhcghphdbjcdmen



