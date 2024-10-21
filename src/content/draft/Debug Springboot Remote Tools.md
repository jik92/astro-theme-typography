title: Debug Springboot Remote Tool
date: 2019/01/28 14:48:03
categories:

 - java

tags:
 - tools 



---

### 引言

介绍一下在Intellij IDEA下对Springboot类型的项目的远程调试功能。所谓的远程调试就是服务端程序运行在一台远程服务器上，我们可以在本地服务端的代码（前提是本地的代码必须和远程服务器运行的代码一致）中设置断点，每当有请求到远程服务器时时能够在本地知道远程服务端的此时的内部状态。

### 使用

服务端 使用

```bash
java -jar -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 test-tool.jar
```

idea 增加 remote 配置,修改对应画红圈位置的信息，启动

![20190128154865824254851.png](http://img.sandseasoft.com/20190128154865824254851.png)

完事

![20190128154865831862908.png](http://img.sandseasoft.com/20190128154865831862908.png)

### 参考

https://www.cnblogs.com/tadage/p/7314595.html



