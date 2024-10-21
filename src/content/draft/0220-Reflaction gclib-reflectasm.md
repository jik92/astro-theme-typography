title: Reflaction gclib/reflectasm
date: 2017/11/01 06:15:52
categories:
 - tryghost

tags:
 - 未归档 



---

```language-java
//最常见的反射使用
    DemoImpl demo=new DemoImpl();
    demo.setPassword("xxx");
    demo.setUsername("xxx");
    DemoImpl empty=new DemoImpl();
    BeanUtils.copyProperties(empty,demo);
    System.out.println(JSON.toJSONString(empty));
```


### reflectasm
基于asm的封装，反射增加缓存，增强性能

```language-xml
        <dependency>
            <groupId>com.esotericsoftware</groupId>
            <artifactId>reflectasm</artifactId>
            <version>1.11.3</version>
        </dependency>
```
```language-java
    User user=new User();
    MethodAccess access = MethodAccess.get(User.class);
    access.invoke(user,"setUsername","demo");
    System.out.println(user.getUsername());

```




