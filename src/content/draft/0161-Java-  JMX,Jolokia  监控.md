title: Java-  JMX,Jolokia  监控
date: 2016/09/28 07:20:29
categories:
 - tryghost

tags:
 - 未归档 



---

JMX相关类
```language-java
public class App {  
      
    public static void main(String[] args) throws Exception {  
        // 创建MBeanServer  
        MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();  
          
        // 新建MBean ObjectName, 在MBeanServer里标识注册的MBean  
        ObjectName name = new ObjectName("com.haitao.jmx:type=Echo");  
          
        // 创建MBean  
        Echo mbean = new Echo();  
          
        // 在MBeanServer里注册MBean, 标识为ObjectName(com.tenpay.jmx:type=Echo)  
        mbs.registerMBean(mbean, name);  
  
          
        // 在MBeanServer里调用已注册的EchoMBean的print方法  
        mbs.invoke(name, "print", new Object[] { "haitao.tu"}, new String[] {"java.lang.String"});  
          
        Thread.sleep(Long.MAX_VALUE);  
    }  
  
}  

```

Jolokia 是基于 jmx 的 http 协议实现
暴露方法
pom.xml
```language-xml
        <dependency>
            <groupId>org.jolokia</groupId>
            <artifactId>jolokia-core</artifactId>
            <version>1.3.4</version>
        </dependency>
```

web.xml
```language-xml
    <servlet>
        <servlet-name>jolokia-agent</servlet-name>
        <servlet-class>org.jolokia.http.AgentServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>jolokia-agent</servlet-name>
        <url-pattern>/jolokia/*</url-pattern>
    </servlet-mapping>

```
当然还可以作为挂载监控使用
```language-bash
java -jar jolokia-jvm-1.3.7-agent.jar 获取pid
java -jar jolokia-jvm-1.3.7-agent.jar start 700
```

查询
```language
http://127.0.0.1:8888/jolokia/read/java.lang:type=Memory/HeapMemoryUsage
```




