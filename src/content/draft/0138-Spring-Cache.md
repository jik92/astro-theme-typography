title: Spring-Cache
date: 2016/06/01 06:06:38
categories:
 - tryghost

tags:
 - java 



---

# 简介
http://docs.spring.io/spring/docs/current/spring-framework-reference/html/cache.html

# 使用
 * @Cacheable triggers cache population
 * @CacheEvict triggers cache eviction
 * @CachePut updates the cache without interfering with the   method execution
 * @Caching regroups multiple cache operations to be applied on a method
 * @CacheConfig shares some common cache-related settings at class-level
 * 可以使用 Spel 表达式来解析数据

# 配置
1.spring-cache.xml
```language-xml
    <!--cache 注解-->
    <cache:annotation-driven cache-manager="cacheManager" proxy-target-class="true"/>

    <bean id="cacheManager" class="org.springframework.cache.support.SimpleCacheManager"/>
```
2.pom.xml
```language-xml
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>
```




