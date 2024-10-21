title: Java-XDiamond
date: 2016/11/25 06:58:06
categories:
 - tryghost

tags:
 - java 



---

## 背景
本地编译配置，有严重的安全问题，

 1. 本地的profile开发人员都有访问和修改权限，泄漏核心key和serect
 2. 上线或者要做重新编译，会很麻烦，容易出错

## 原理
  从配置中心使用长链接拉取配置， 挂载到Spring的PropertiesPropertySource的方法。 由于本地会有configure的cache，所以配置中心是单点的，部署简单好用。

## 使用方法
详见simple-springboot-dubbo的 xdiamond 部分
```language-xml
    <!--配置中心-->
    <bean id="xDiamondConfig" class="io.github.xdiamond.client.spring.XDiamondConfigFactoryBean">
        <property name="serverHost" value="${xdiamond.server.host:127.0.0.1}"/>
        <property name="serverPort" value="5678"/>
        <property name="groupId" value="com.matan"/>
        <property name="artifactId" value="bui_web"/>
        <property name="version" value="1.0.0.1.SNAPSHOT"/>
        <property name="profile" value="${xdiamond.project.profile:dev}"/>
        <property name="secretKey" value="${xdiamond.project.secretkey:}"></property>
        <property name="bSyncToSystemProperties" value="true"></property>
    </bean>

    <bean class="io.github.xdiamond.client.spring.PropertySourcesAdderBean">
        <property name="properties">
            <bean class="java.util.Properties" factory-bean="xDiamondConfig"
                  factory-method="getProperties">
            </bean>
        </property>
    </bean>
```

## 总结
部署简单，架构并没有过度开发，安全性和扩展性符合要求，好用。

 * https://github.com/hengyunabc/xdiamond
 * https://github.com/hengyunabc/xdiamond/wiki





