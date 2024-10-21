title: Java Cache
date: 2015/11/25 18:24:53
categories:
 - tryghost

tags:
 - store 



---

# heap内存相关
## concurrenthashmap
```language-java
public Map<String, String> dict = new ConcurrentHashMap<String, String>();
```

## guava-cache

https://github.com/google/guava/wiki
```language-java
    LoadingCache<String, String> cahceBuilder = CacheBuilder
        .newBuilder()
        .build(new CacheLoader<String, String>() {
          @Override
          public String load(String key) throws Exception {
            System.out.println("加载 key :" + key);
            return key;
          }
        });

    cahceBuilder.put("zuoyun", "123456");
```

#  分布式内存网格
## hazelcast
https://hazelcast.com/products/
```language-java

public class HazelcastDemo {

  @Test
  public void demo() {
    Config config = new Config();
    HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance(config);

    Map<String, String> mapCustomers = hazelcast.getMap("demo");
    mapCustomers.put("1", "Smith");
    mapCustomers.put("2", "Zuo");
    mapCustomers.put("3", "Evin John");

    System.out.println(mapCustomers.get("2"));
  }

```
pom.xml
```language-xml
        <dependency>
            <groupId>com.hazelcast</groupId>
            <artifactId>hazelcast</artifactId>
            <version>3.5.2</version>
        </dependency>
```

# off-heap 内存相关
# mapdb
 * 支持事务，隔离

http://www.infoq.com/cn/news/2014/07/mapdb-java
https://github.com/jankotek/mapdb
```language-java
DB db = DBMaker
        .newMemoryDB()
        .transactionDisable()
        .make();
```
# redis

 * 单线程
 * 缓存会话集群
```language-xml
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.7.3</version>
        </dependency>
```

# memcached
 * 多线程



