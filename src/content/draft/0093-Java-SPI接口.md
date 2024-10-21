title: Java-SPI接口
date: 2016/01/08 06:28:17
categories:
 - tryghost

tags:
 - java 



---

# SPI接口
一种官方的插件机制， 在Dubbo 里面看到的, 在 common 文件夹下基于@SPI 注解

配置文件
META-INF/services/zuoyun.me.SPI.Command
```language
zuoyun.me.SPI.ShutdownCommand
zuoyun.me.SPI.StartupCommand
```
自动装载类调用
```language-java
   ServiceLoader<Command> loader = ServiceLoader.load(Command.class);
    for (Command command : loader) {
      command.execute();
    }
```

# 关闭原则
设计一个 Wapper 装饰器，通过调用链 .doNext()方法。




