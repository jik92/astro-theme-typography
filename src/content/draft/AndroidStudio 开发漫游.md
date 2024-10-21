title: AndroidStudio 开发漫游
date: 2018/08/10 15:24:36
categories:

- AndroidStudio 开发

tags:

-  android 
-  入门

---

# Android 语法



# 框架



# AndroidStudio 开发

## 新建项目

* UI 控件 Acitvity、res->layout->activity_main.xml

* 授权文件 manifests->xml 文件

  

## 使用Gradle



# 控件-WebView和 JSBright



# 关于网络翻墙

google 的[镜像库](https://dl.google.com/dl/android/maven2/index.html)很扯，各种 timeout，几个地方设置代理，SSR 的通道。发现一个规律，这个谷歌的服务器在美国的白天极其的快，估计他们那边晚上会减小带宽。所以要 cache 就只能通宵搞了。

* Proxifier 代理，设置 HTTPS 代理 0.0.0.0 1087 HTTPS

* Settings HTTPS Proxy

* gradle.properties 增加参数代理 maven google()

  ```
  systemProp.https.proxyHost=0.0.0.0
  systemProp.https.proxyPort=1087
  systemProp.https.nonProxyHosts=*.nonproxyrepos.com|localhost
  ```

* http://pro.sr1.me/post/android-sdk-download-links 把platforms和 buildtool手动下载放入 studio 内部的Platform 和 build-tools文件夹刷新 sdk manager

# 参考

* https://gradle.org/