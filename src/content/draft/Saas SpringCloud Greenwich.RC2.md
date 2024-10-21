title:  Saas SpringCloud Greenwich.RC2
date: 2019/01/20 16:55:48
categories:
- dev
tags:
- java
- distribution

---

# 参考版本

```xml
  	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.1.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
    <properties>
        <java.version>1.8</java.version>
        <spring-cloud.version>Greenwich.RC2</spring-cloud.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

# 遇到一些坑

1. 目前发现和 fastjson 版本有冲突，锁定版本为 1.2.47

2. springboot 和 springcloud版本和包名要锁死，具体配置依赖版本和名称可以去https://start.spring.io/ 参考

3. Eureka 缺少一些关系依赖，原因不明，加上即可

   ```
   <!--spring eureka 补丁依赖-->
           <dependency>
               <groupId>commons-configuration</groupId>
               <artifactId>commons-configuration</artifactId>
               <version>1.9</version>
           </dependency>
           <dependency>
               <groupId>commons-lang</groupId>
               <artifactId>commons-lang</artifactId>
               <version>2.6</version>
           </dependency>
   ```

# 主要组件

## springcloud-conf

分布式配置中心，不支持主动通知，配合 git 仓库使用，比较方便的集中式配置管理。 对标方案  zookeeper 和 apollo

### 主服务搭建

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

#### 注解

```
@EnableConfigServer
```

#### 配置

bootstrap.properties

```
spring.application.name:slff-cloud-conf
spring.cloud.config.server.git.uri:https://gitee.com/hangzhouyiru/slff-prop
spring.cloud.config.server.git.username:jik1992
spring.cloud.config.server.git.password:xxx
```

### 客户端挂载

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

#### 注解

#### 配置

bootstrap.properties

```
spring.cloud.config.name=yiru-bill
spring.cloud.config.profile=test
spring.cloud.config.uri=http://47.98.52.80:8888/
spring.cloud.config.label=master
```

## springcloud-eureka

注册中心，CAP 中强调 CP 两个点，强调数据的高可用，没有选举，每个分布式节点对等。

也有不少要注意的地方

### 主服务搭建

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

#### 注解 

```
@EnableEurekaServer
```

#### 配置

```
spring:
  application:
    name: slff-cloud-eureka
  security:
    user:
      name: admin
      password: xxx

logging:
  level:
    org:
      springframework:
        security: INFO
server:
  port: 8001

eureka:
  instance:
    preferIpAddress: true
    hostname: 47.96.153.146
  server:
    enable-self-preservation: false
  client:
    serviceUrl:
      defaultZone: http://admin:xxx@47.98.52.80:8761/eureka/
    registerWithEureka: false
    fetchRegistry: false


```

#### 其他

监听类

```
@Component
public class EurekaStateChangeListener {


  private static       Logger logger = LoggerFactory.getLogger(EurekaStateChangeListener.class);
  private static final String COLON  = ":";

  @EventListener
  public void listen(EurekaInstanceCanceledEvent eurekaInstanceCanceledEvent) {
    // 服务断线事件
    String appName = eurekaInstanceCanceledEvent.getAppName();
    String serverId = eurekaInstanceCanceledEvent.getServerId();
    logger.info("服务失效 {} {}", appName, serverId);
  }

  @EventListener
  public void listen(EurekaInstanceRegisteredEvent event) {
    // 服务注册
    InstanceInfo instanceInfo = event.getInstanceInfo();
    String appName = instanceInfo.getAppName();
    logger.info("服务注册 {} {}:{} ", appName, instanceInfo.getIPAddr(), instanceInfo.getPort());
  }

  @EventListener
  public void listen(EurekaInstanceRenewedEvent event) {
    // 服务续约
    logger.info("服务续约 {}", event.getServerId());
  }

  @EventListener
  public void listen(EurekaRegistryAvailableEvent event) {
    // 注册中心启动
    logger.info("Server注册中心:" + event);
  }

  @EventListener
  public void listen(EurekaServerStartedEvent event) {
    // Server启动
    logger.info("Server启动:" + event);
  }
}
```

安全类

```
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().ignoringAntMatchers("/eureka/**");
    super.configure(http);
  }
}
```

### 客户端挂载

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

#### 注解 

```
@EnableDiscoveryClient
```

#### 配置

bootstrap.properties

```
#eureka自动注册微服务配置
spring.application.name=yiru-bill
eureka.client.serviceUrl.defaultZone=http://admin:jik920717@47.98.52.80:8761/eureka/
eureka.instance.prefer-ip-address=true
eureka.instance.ip-address=192.168.211.82
eureka.instance.lease-renewal-interval-in-seconds:60
eureka.instance.lease-expiration-duration-in-seconds:120
```

## springcloud-zookeeper

注册中心，CAP 中强调 CA 两个点，强调数据的一致性，有选举，分布式中有 leader 。 

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
</dependency>
```

#### 注解

```
@EnableDiscoveryClient
```

#### 配置

```
#zookeeper
spring.cloud.zookeeper.connect-string:47.98.52.80:8181
spring.cloud.zookeeper.discovery.enabled:true
spring.cloud.zookeeper.discovery.register:true
spring.cloud.zookeeper.discovery.preferIpAddress=true
spring.cloud.zookeeper.discovery.instanceHost=192.168.211.82
spring.cloud.zookeeper.discovery.instanceIpAddress=192.168.211.82
```

## springcloud-openfeign

组间调用框架，内部是 rabbin 的实现，默认是 apache httpclient 的包，跟踪代码直接进去了 

使用比较复杂，个人认为难已维护

#### 依赖 

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### 注解

```
@EnableFeignClients
```

#### 配置

```
#feign
feign.compression.request.enabled=true
feign.compression.response.enabled=true
feign.compression.request.mime-types=text/xml;application/xml;application/json
feign.compression.request.min-request-size=2048
logging.level.com.zhuyun.yiru.remote:DEBUG
```

#### 使用

client配置（注意 @RequestParam 这个注解必须存在，可以使用一个 @RequestBody）

```
@FeignClient(name = "yiru-member")
public interface MemberV2Client {

  @RequestMapping(value = "/api/v2/member/userequitys/allProductPricing", method = RequestMethod.POST)
  Double allProductPricing(
      @RequestParam String giftId,
      @RequestParam String mchId,
      @RequestParam Double price,
      @RequestParam String userId);
}

```

这个坑比较多，主要介于 关于 client 的管理

1. @FeignClient(name=xxx)  这个 name 不能有重名不然报错，相当于每个微服务只有一个 client

2. 反序列化不支持泛型，只能重写，配置如下

   ```
   public class SlffDecoder implements Decoder {
   
     private Decoder decoder;
   
     public SlffDecoder(Decoder decoder) {
       this.decoder = decoder;
     }
   
     @Override
     public Object decode(Response response, Type type) throws IOException, DecodeException, FeignException {
       Object returnObject = null;
       if (isParameterizeHttpEntity(type)) {
         type = ((ParameterizedType) type).getActualTypeArguments()[0];
         Object decodedObject = decoder.decode(response, type);
         returnObject = createResponse(decodedObject, response);
       } else if (isHttpEntity(type)) {
         returnObject = createResponse(null, response);
       } else if (type.getTypeName().contains("com.zhuyun.slff.api.dto.Response")) {
         System.out.println("手动解析响应头");
         System.out.println(type.getTypeName());
         String json = IoUtil.read(response.body().asInputStream(), "UTF-8");
         System.out.println(json);
         returnObject = JSON.parseObject(json, com.zhuyun.slff.api.dto.Response.class);
       } else {
         returnObject = decoder.decode(response, type);
       }
       return returnObject;
     }
   
   
     private boolean isParameterizeHttpEntity(Type type) {
       if (type instanceof ParameterizedType) {
         return isHttpEntity(((ParameterizedType) type).getRawType());
       }
       return false;
     }
   
     private boolean isHttpEntity(Type type) {
       if (type instanceof Class) {
         Class c = (Class) type;
         return HttpEntity.class.isAssignableFrom(c);
       }
       return false;
     }
   
     @SuppressWarnings("unchecked")
     private <T> ResponseEntity<T> createResponse(Object instance, Response response) {
   
       MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
       for (String key : response.headers().keySet()) {
         headers.put(key, new LinkedList<>(response.headers().get(key)));
       }
   
       return new ResponseEntity<>((T) instance, headers, HttpStatus.valueOf(response
                                                                                 .status()));
     }
   
   }
   ```

   

```
@Configuration
public class SlffFeignConf  {

  @Bean
  Logger.Level feignLoggerLevel() {
    return Logger.Level.NONE;
  }

  @Bean
  public Decoder feignDecoder() {
    return new SlffDecoder(new SpringDecoder(feignHttpMessageConverter()));
  }

  public ObjectFactory<HttpMessageConverters> feignHttpMessageConverter() {
    final HttpMessageConverters
        httpMessageConverters =
        new HttpMessageConverters(new PhpMappingJackson2HttpMessageConverter());
    return new ObjectFactory<HttpMessageConverters>() {
      @Override
      public HttpMessageConverters getObject() throws BeansException {
        return httpMessageConverters;
      }
    };
  }



  public class PhpMappingJackson2HttpMessageConverter extends FastJsonHttpMessageConverter {

    PhpMappingJackson2HttpMessageConverter() {
//      List<MediaType> mediaTypes = new ArrayList<>();
//      mediaTypes.add(MediaType.valueOf(MediaType.TEXT_HTML_VALUE + ";charset=UTF-8")); //关键
//      setSupportedMediaTypes(mediaTypes);
    }
  }


}
```



## springcloud-zuul

负载均衡和服务自发现，内部也是 rabbin 的实现，这个非常好用。支持很多 fillter，可以代替 nginx 做转发使用，相对效率没有 nginx 高，但是本质上 java 的编写路由层改造比 nginx+lua 的开发成本更低。

#### 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
</dependency>
```

#### 注解

```
@EnableZuulProxy
```

#### 配置

```
spring.application.name:slff-cloud-zuul
server.port=8111
#路由隔离，只对 /api关键字下的path 做路由
zuul.servlet-path=/api
#微服务自动发现 不配置的话直接使用服务名作为路由
#zuul.routes.hello-service=/hello-service/**
#zuul.routes.slff-mine=/mine/**
#zuul.routes.slff-order=/order/**
#zuul.routes.hello-service=/hello-service/**
#zuul.routes.hello-service.url=http://localhost:10064/
#zuul.routes.hello-service.service-id=hello-service
#zuul.routes.first.path=/zuul
#zuul.routes.first.url=http://www.163.com/
#设置超时时间，对长时间响应的请求保留返回
zuul.host.connect-timeout-millis=10000
zuul.host.socket-timeout-millis=10000
#配置 ribbon 
#ribbon.restclient.enabled=true
#ribbon.okhttp.enabled=true
ribbon.ReadTimeout:10000
ribbon.SocketTimeout:10000
#使用 eureka
eureka.client.serviceUrl.defaultZone=http://admin:jik920717@47.98.52.80:8761/eureka/
#使用 zookeeper
spring.cloud.zookeeper.connect-string:47.98.52.80:8181
spring.cloud.zookeeper.discovery.enabled:true
spring.cloud.zookeeper.discovery.register:true

```

#### 使用

ZuulFilter

```
@Configuration
public class AccessFilter extends ZuulFilter {

  private final Logger logger = LoggerFactory.getLogger(AccessFilter.class);

  /**
   * 过滤器类型选择： pre 为路由前 route 为路由过程中 post 为路由过程后 error 为出现错误的时候 同时也支持static ，返回静态的响应，详情见StaticResponseFilter的实现
   * 以上类型在会创建或添加或运行在FilterProcessor.runFilters(type)
   */
  @Override
  public String filterType() {
    return "route"; //ZuulFilter源码中注释"pre"为在路由前过滤
  }

  /**
   * 用来过滤器排序执行的
   *
   * @return 排序的序号
   */
  @Override
  public int filterOrder() {
    return 0;
  }

  /**
   * 是否通过这个过滤器，默认为true，改成false则不启用
   */
  @Override
  public boolean shouldFilter() {
    return true; //返回true表示执行这个过滤器
  }

  /**
   * 过滤器的逻辑
   */
  @Override
  public Object run() {
    //获取当前请求上下文
    RequestContext ctx = RequestContext.getCurrentContext();
    //取出当前请求
    HttpServletRequest request = ctx.getRequest();
    logger.info("进入访问过滤器，访问的url:{}，访问的方法：{}", request.getRequestURL(), request.getMethod());
    //从headers中取出key为accessToken值
//    String accessToken = request.getHeader("accessToken");//这里我把token写进headers中了

    //这里简单校验下如果headers中没有这个accessToken或者该值为空的情况
    //那么就拦截不入放行，返回401状态码
//    if (StringUtils.isEmpty(accessToken)) {
//      logger.info("当前请求没有accessToken");
//      //使用Zuul来过滤这次请求
//      ctx.setSendZuulResponse(false);
//      ctx.setResponseStatusCode(401);
//    ctx.setResponseBody("token cannot be empty");
//      return null;
//    }
    logger.info("请求通过过滤器");
    return null;
  }
}
```

ZuulServletFilter

```
//@Configuration
public class ThrowExceptionFilter extends ZuulServletFilter {


  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {
    super.doFilter(servletRequest, servletResponse, filterChain);
  }
}
```

## springcloud-actuator

#### 依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### 注解

#### 配置

```
management.endpoints.web.exposure.include=*
```

#### 使用



## 参考文档

spring-cloud

<https://start.spring.io/>

<https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/>

<https://cloud.spring.io/spring-cloud-static/Greenwich.RC2/single/spring-cloud.html>

spring-jpa

<https://www.cnblogs.com/crawl/p/7703679.html>

<http://www.cnblogs.com/crawl/p/7704914.html>

<http://www.cnblogs.com/crawl/p/7718741.html>

eureka

<https://www.cnblogs.com/CLAYJJ/p/9641908.html>

zuul

<https://www.cnblogs.com/CLAYJJ/p/9641908.html>

<https://www.cnblogs.com/duanxz/p/7543040.html>

<https://www.cnblogs.com/okong/p/springcloud-ten.html>