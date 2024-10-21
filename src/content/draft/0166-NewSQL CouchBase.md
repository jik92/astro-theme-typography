title: NewSQL CouchBase
date: 2016/11/25 07:31:53
categories:
 - tryghost

tags:
 - devops 



---

Couchbase
### feature

 * 分社区版和专业版，功能没有阉割
 * 前身memcache，完全兼容相关协议。
 * server支持like sql查询（N1Query）
 * server对等分布式（类似elasticsearch），可以快速组建集群，动态伸缩
 * server有丰富的监控模块，webgui


### 安装使用
```language-bash
rpm -ivh couchbase-server-enterprise-4.6.0-DP-
centos7.x86_64.rpm
```
托管于 systemd

启动 
```language-bash
/opt/couchbase/bin/couchbase-server start
```
停止
```language-bash
/opt/couchbase/bin/couchbase-server stop
```
访问
0.0.0.0:8091

端口使用 
8091
11210

客户端使用
```language-java
public class Example {

    public static void main(String... args) throws Exception {
        // Initialize the Connection
        Cluster cluster = CouchbaseCluster.create("localhost");
        Bucket bucket = cluster.openBucket("default");

        // Create a JSON Document
        JsonObject arthur = JsonObject.create()
            .put("name", "Arthur")
            .put("email", "kingarthur@couchbase.com")
            .put("interests", JsonArray.from("Holy Grail", "African Swallows"));

        // Store the Document
        bucket.upsert(JsonDocument.create("u:king_arthur", arthur));

        // Load the Document and print it
        // Prints Content and Metadata of the stored Document
        System.out.println(bucket.get("u:king_arthur"));

        // Create a N1QL Primary Index (but ignore if it exists)
        bucket.bucketManager().createN1qlPrimaryIndex(true, false);

        // Perform a N1QL Query
        N1qlQueryResult result = bucket.query(
            N1qlQuery.parameterized("SELECT name FROM default WHERE $1 IN interests",
            JsonArray.from("African Swallows"))
        );

        // Print each found Row
        for (N1qlQueryRow row : result) {
            // Prints {"name":"Arthur"}
            System.out.println(row);
        }
    }
}

```

### 参考
* http://www.couchbase.com/
* http://developer.couchbase.com/documentation/server/current/sdk/java/start-using-sdk.html







