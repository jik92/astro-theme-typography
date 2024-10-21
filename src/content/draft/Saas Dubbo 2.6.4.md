title:  Saas Dubbo 2.6.0
date: 2019/01/20 16:55:48
categories:

- dev

tags:

- saas
- dubbo

---

dubbo 目前已经迁移至 apache 的仓库组里面



# 参考版本

```
  	    <dependency>
            <groupId>com.alibaba.spring.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.10</version>
        </dependency>
```



# 主要使用

```
#dubbo
spring.dubbo.server=true
spring.dubbo.registry=zookeeper://47.98.52.80:8181?backup=10.20.153.11:2181
#关闭启动检查，绕过相互依赖请求问题
spring.dubbo.consumer.check:false
spring.dubbo.protocol.port:${random.int(8000,9000)}
```

开启注解

```
@EnableDubboConfiguration
```

对 providers 使用注解进行声明

```
@Component
@Service(interfaceClass = OrderService.class)
public class OrderServiceImp implements OrderService {}
```

对 consumer使用注解进行声明

```
  @Reference
  private OrderService           orderService;
```



1. 目前 zkclient的0.10 版本只对 zookeeper 3.4.x 起支持，springcloud zookeeper discovery 使用 curator 只支持最新的3.5.x，依赖 zkclient ，自动对 springcloud zookeeper discovery 做降级操作。

2. 关于 dubbo-admin 2.6.0 最后一个老版本的控制台，新版本的控制台功能缺陷很大，用这个版本的成熟度高

https://github.com/apache/incubator-dubbo/tree/dubbo-2.6.0





## 参考文档

apache dubbo

https://github.com/apache/incubator-dubbo

https://github.com/apache/incubator-dubbo-spring-boot-project

https://github.com/apache/incubator-dubbo-ops

alibaba dubbo

https://github.com/alibaba/dubbo-spring-boot-starter

https://github.com/alibaba/dubbo-spring-boot-starter/blob/master/README_zh.md