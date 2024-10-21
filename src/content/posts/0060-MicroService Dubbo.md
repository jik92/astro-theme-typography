---
title: MicroService Dubbo
pubDate: 2015-11-25
categories: [ 'java' ]
description: ''
---

# 官方网站

http://dubbo.io/

此文对文档和生产线上的使用总结

## 分支扩展集成

https://github.com/alibaba/dubbo
https://github.com/dangdangdotcom/dubbox
https://github.com/Percy0601/boot-dubbo

## 核心

![](http://img.sandseasoft.com/image/0/5d/a45bcf1d641b55c4ab805c6e634b9.png)

### 模块解释

> 单个服务坐标， app-name+group+version+name

### 注解

```language-xml
     # 应用名称
    <dubbo:application name="hello-world-app" owner="zuoyun" />
     # 注册中心
    <dubbo:registry address="multicast://224.5.6.7:1234" register="true" subscribe="true" />
     # 暴露协议,name="injvm" 本地调用
    <dubbo:protocol name="dubbo" port="20880" dispatcher="all" threadpool="fixed" threads="100"  token="true"  />  
     # 生产者全局配置  
    <dubbo:provider/> 
     # 消费者全局配置
    <dubbo:consumer/> 
     # 监控中心全局配置
     <dubbo:monitor/> 
     # 暴露服务名称
    <dubbo:service interface="com.alibaba.dubbo.demo.DemoService" ref="demoServiceLocal" version="1.0.0" validation="true" async="true"sent="true"  executes="10" accepts="10"  />
     # 消费服务名称
    <dubbo:reference id="demoServiceRemote"
interface="com.alibaba.dubbo.demo.DemoService" version="1.0.0" validation="true" actives="10"  connections="10"/>

```

### 功能详解

集群容错
负载均衡

## 相关配置

### 生产者配置

```language-xml
    <!--主配置-->
    <dubbo:application name="demo-dubbo" />
    <dubbo:registry address="zookeeper://127.0.0.1:2181" client="curator"/>

    <!--生产-->
    <dubbo:protocol name="dubbo" port="20880"/>

    <bean id="dubboServiceImpl" class="zuoyun.me.dubbo.DubboServiceImpl"/>

    <dubbo:service interface="zuoyun.me.dubbo.DubboService" ref="dubboServiceImpl" />

```

### 消费者配置

```language-xml
    <!--主配置-->
    <dubbo:application name="demo-dubbo"/>
    <dubbo:registry address="zookeeper://127.0.0.1:2181"/>

    <!--消费-->
    <dubbo:reference id="dubboService" interface="zuoyun.me.dubbo.DubboService" check="false"
                     timeout="5000"/>

```

### 依赖， 服务发现用 zoo ，client 用curator

```language-xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.5.3</version>
            <exclusions>
                <exclusion>
                    <artifactId>commons-logging</artifactId>
                    <groupId>commons-logging</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>com.netflix.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>1.3.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.3.3</version>
        </dependency>
```

## 其他功能

### RPC上下文

```language-java
xxxService.xxx(); // 远程调用
boolean isConsumerSide = RpcContext.getContext().isConsumerSide(); // 本端是否为消费端，这里会返回true
RpcContext.getContext().setAttachment("index", "1"); // 隐式传参，后面的远程调用都会隐式将这些参数发送到服务器端，类似cookie，用于框架集成，不建议常规业务使用

String serverIP = RpcContext.getContext().getRemoteHost(); // 获取最后一次调用的提供方IP地址
String application = RpcContext.getContext().getUrl().getParameter("application"); // 获取当前服务配置信息，所有配置信息都将转换为URL的参数
// ...
yyyService.yyy(); // 注意：每发起RPC调用，上下文状态会变化
// ...

fooService.findFoo(fooId); // 此调用会立即返回null
Future<Foo> fooFuture = RpcContext.getContext().getFuture(); // 拿到调用的Future引用，当结果返回后，会被通知和设置到此Future。
 

```

### 回声测试

所有服务自动实现EchoService接口

```language-java
MemberService memberService = ctx.getBean("memberService"); // 远程服务引用
 
EchoService echoService = (EchoService) memberService; // 强制转型为EchoService
 
String status = echoService.$echo("OK"); // 回声测试可用性
 
assert(status.equals("OK"))
```

### 参数回调

```
public class CallbackServiceImpl implements CallbackService 
```

### 本地存根

本地调用前，先调用一个伪装的实现方法，在执行真正的方法

```language-xml
<dubbo:service interface="com.foo.BarService" stub="com.foo.BarServiceStub" />
```

```
com.foo.BarService
com.foo.BarServiceStub // 在API旁边放一个Stub实现，它实现BarService接口，并有一个传入远程BarService实例的构造函数
```

```language-java

package com.foo
public class BarServiceStub implements BarService {
 
    private final BarService barService;
 
    // 构造函数传入真正的远程代理对象
    public (BarService barService) {
        this.barService = barService;
    }
 
    public String sayHello(String name) {
        // 此代码在客户端执行
        // 你可以在客户端做ThreadLocal本地缓存，或预先验证参数是否合法，等等
        try {
            return barService.sayHello(name);
        } catch (Exception e) {
            // 你可以容错，可以做任何AOP拦截事项
            return "容错数据";
        }
    }
}


```

### 本地伪装

当抛出异常的时候调用伪装的service

```language-xml
<dubbo:service interface="com.foo.BarService" mock="com.foo.BarServiceMock" />
```

```
com.foo.BarService
com.foo.BarServiceMock // 在API旁边放一个Mock实现，它实现BarService接口，并有一个无参构造函数
```

```language-java
package com.foo
public class BarServiceMock implements BarService {
 
    public String sayHello(String name) {
        // 你可以伪造容错数据，此方法只在出现RpcException时被执行
        return "容错数据";
    }
}
```

## 最佳实践

* 在Provider上尽量多配置Consumer端属性
* Provider上配置合理的Provider端属性
* 配置上管理信息
* 配置上Dubbo缓存文件

## 运维相关

### dubbo-admin

```
  dubbo-admin-2.5.4.war
```

### dubbo-telnet

```language-bash
telnet 127.0.0.1 8080
ps
pwd
status
invoke
```




