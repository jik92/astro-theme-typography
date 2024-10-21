title: Spring-RMI
date: 2016/05/24 09:00:18
categories:
 - tryghost

tags:
 - java 



---


# RMI
remote method invocation

```language-java
/** 
 * 自定一个SCOKECT连接，可配置超时时间 
 * @author Henry 
 */  
public class RMICustomClientSocketFactory implements RMIClientSocketFactory {  
      
      
    private int timeout;  
      
    /** 
     * 设置超时时间 
     * @param timeout 
     */  
    public void setTimeout(int timeout) {  
        this.timeout = timeout;  
    }  
  
    public Socket createSocket(String host, int port) throws IOException {  
        Socket socket = new Socket(host, port);  
        socket.setSoTimeout(timeout);  
        return socket;  
    }  
  
}  

```


```language-xml
<bean id="rmiClientSocketFactory" class="com.rmi.RMICustomClientSocketFactory">  
        <property name="timeout" value="5000"></property>  
    </bean>  


    <!--调用-->
    <bean id="gxbActionServiceRmi" class="org.springframework.remoting.rmi.RmiProxyFactoryBean">
        <property name="serviceUrl" value="rmi://127.0.0.1:9999/addPoint"/>
        <property name="serviceInterface" value="com.gxb.http.task.service.GxbActionService"/>

        <!-- setting refresh connect -->  
        <property name="refreshStubOnConnectFailure" value="true"></property>  
        <property name="lookupStubOnStartup" value="false"></property>  
        <property name="registryClientSocketFactory" ref="rmiClientSocketFactory"></property>  

    </bean>


  <!--声明-->
    <bean id="rmiClientSocketFactory" class="com.gxb.tool.RMICustomClientSocketFactory">
        <property name="timeout" value="5000"></property>
    </bean>


    <bean id="registryTask" class="org.springframework.remoting.rmi.RmiRegistryFactoryBean">
        <property name="port" value="10001"/>
    </bean>

    <!--声明-->
    <bean id="task" class="org.springframework.remoting.rmi.RmiServiceExporter">
        <property name="serviceName" value="task"/>
        <property name="service" ref="taskListServiceImpl"/>
        <property name="serviceInterface" value="com.gxb.service.TaskUserServiceIF"/>
        <property name="registryPort" value="10001"/>
        <property name="registry" ref="registryTask"/>
        <!--<property name="registryHost"  value="192.168.39.11" />-->
        <property name="registryClientSocketFactory" ref="rmiClientSocketFactory"/>
    </bean>
```


 * lookupStubOnStartup : 这个属性是表示，不在容器启动的时候创建与Server端的连接;
 * refreshStubOnConnectFailure : 这个属性是表示是否连接出错时自动重连；
 * registryClientSocketFactory : 这个是客户端与服务端创建SOCKECT的一个工厂。


PS: 注意序列化的问题, serializable接口和serialVersionUID字段




