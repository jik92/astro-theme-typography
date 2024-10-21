---
title: Java Library Guava
pubDate: 2014-12-24
categories: [ 'java' ]
description: ''
---

#### Guava

> https://github.com/google/guava
> https://github.com/jik1992/guavaDemo

## 详细的中文文档

https://www.gitbook.com/book/willnewii/google-guava/details

```language-java
//缓存使用
  private final static LoadingCache<String, String> cache = CacheBuilder.newBuilder()
      .maximumSize(8000)
      .expireAfterWrite(60, TimeUnit.SECONDS)
      .refreshAfterWrite(60, TimeUnit.SECONDS)
      .removalListener(new RemovalListener<String, String>() {
        @Override
        public void onRemoval(RemovalNotification<String, String> removalNotification) {
          logger.warn("缓存超时被移除 {} {}", removalNotification.getFileKey(), removalNotification.val());
        }
      })
      .build(
          new CacheLoader<String, String>() {
            @Override
            public String load(String key) throws Exception {
              return "";
            }
          }
      );

//基于令牌桶的限流算法
  public static void testWithRateLimiter() {  
        Long start = System.currentTimeMillis();  
        RateLimiter limiter = RateLimiter.create(2.0); // 每秒不超过10个任务被提交  
        for (int i = 0; i < 10; i++) {  
            limiter.acquire(); // 请求RateLimiter, 超过permits会被阻塞  
            System.out.println("call execute.." + i);  
              
        }  
        Long end = System.currentTimeMillis();            
        System.out.println(end - start);         
    }  

## 反射
    Demo demo= Reflection.newProxy(Demo.class, new InvocationHandler() {
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("xx");
        return null;
      }
    });

## 类路径扫描
 ClassPath classpath = ClassPath.from(Demo.class.getClassLoader());
    for (ClassPath.ClassInfo classInfo : classpath.getTopLevelClasses("zuoyun.me")) {
      System.out.println(JSON.toJSONString(classInfo));
    }


```

* 集合 [collections]
* 缓存 [caching]
* 原生类型支持 [primitives support]
* 并发库 [concurrency libraries]
* 通用注解 [common annotations]
* 字符串处理 [string processing]
* I/O

Goolge在BigTable中就使用了BloomFilter，以避免在硬盘中寻找不存在的条目。
另外，用爬虫抓取网页时对网页url去重也需要用到BloomFilter。








