title: Spring-cheatsheet
date: 2015/12/04 06:31:15
categories:
 - tryghost

tags:
 - java 



---

## 静态方法装载 spring
```language-java
static ApplicationContext ctx;

static {
    //装载log4j.xml
    try {
      Log4jConfigurer.initLogging("classpath:_log4j.xml");
    } catch (FileNotFoundException e) {
      logger.error("日志异常");
    }
    //Spring装载扫描
    ctx = new ClassPathXmlApplicationContext("classpath:spring/dubbo-produce.xml");
    dubboService = ctx.getBean("dubboServiceImpl", DubboServiceImpl.class);
    System.out.println(dubboService.hello());
  }
```

## 常规注解

 *  @compent
 *  @resouce
 *  @controll
 *  @postconstruct

## 常规接口 
 * InitializingBean
  



