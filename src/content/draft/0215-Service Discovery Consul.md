title: Service Discovery Consul
date: 2017/10/30 08:47:01
categories:
 - tryghost

tags:
 - 未归档 



---

## 官网
https://www.consul.io/
基于raft实现的服务子发现系统，Consul是强一致性的数据存储，使用gossip形成动态集群。Consul 支持健康检查,并允许 HTTP 和 DNS 协议调用 API 存储键值对，以及ACL授权访问控制

## 功能
* Service Discovery
* Health Checking
* KV Store
* Multi Datacenter

## 官网工具
These Consul tools are created and managed by the dedicated engineers at HashiCorp:

* Envconsul - Read and set environmental variables for processes from Consul.
* Consul Replicate - Consul cross-DC KV replication daemon.
* Consul Template - Generic template rendering and notifications with Consul
* Consul Migrate - Data migration tool to handle Consul upgrades to 0.5.1+

fabio

## 使用
```language-bash
Usage: consul [--version] [--help] <command> [<args>]

Available commands are:
    agent          Runs a Consul agent
    catalog        Interact with the catalog
    event          Fire a new event
    exec           Executes a command on Consul nodes
    force-leave    Forces a member of the cluster to enter the "left" state
    info           Provides debugging information for operators.
    join           Tell Consul agent to join cluster
    keygen         Generates a new encryption key
    keyring        Manages gossip layer encryption keys
    kv             Interact with the key-value store
    leave          Gracefully leaves the Consul cluster and shuts down
    lock           Execute a command holding a lock
    maint          Controls node or service maintenance mode
    members        Lists the members of a Consul cluster
    monitor        Stream logs from a Consul agent
    operator       Provides cluster-level tools for Consul operators
    reload         Triggers the agent to reload configuration files
    rtt            Estimates network round trip time between nodes
    snapshot       Saves, restores and inspects snapshots of Consul server state
    validate       Validate config files/directories
    version        Prints the Consul version
    watch          Watch for changes in Consul
```

```language-bash
# 单节点
consul agent -server -bootstrap-expect 1 -data-dir /tmp/consul -node demo -ui
# 查看成员
consul members
# 查看节点
curl 127.0.0.1:8500/v1/catalog/nodes
dig @127.0.0.1 -p 8600 demo
# 注册服务
curl -X PUT \
  http://127.0.0.1:8500/v1/catalog/register \
  -H 'content-type: application/json' \
  -d '{
	"Datacenter": "dc1", 
	"Node": "demo",
	"Address": "127.0.0.1",
	"Service": 
	{
		"Service": "python", 
		"tags": ["master","v1"], 
		"Port": 8000
	}
}'
# 查看节点
# 标准服务查询，不但支持A record，还支持SRV record, SRV reconds提供服务注册的端口.
dig @127.0.0.1 -p 8600 [tag.]<service>.service[.datacenter].<domain> [ANY|SRV]
 
# kv使用
curl -X PUT -d 'bar' http://localhost:8500/v1/kv/foo
# 集群
consul agent -data-dir /tmp/consul2 -node=demo2  -join 192.168.31.172



```

## java client
```language-xml
        <dependency>
            <groupId>com.orbitz.consul</groupId>
            <artifactId>consul-client</artifactId>
            <version>0.16.5</version>
        </dependency>

```
```language-java
public class ConsulDemo {


  static Consul consul = Consul.builder().withUrl("http://127.0.0.1:8500").build();

  /**
   * 服务注册
   */
  public static void serviceRegister() {
    AgentClient agent = consul.agentClient();

    //健康检测
    ImmutableRegCheck
        check =
        ImmutableRegCheck.builder().http("http://127.0.0.1:8000").interval("5s").build();

    ImmutableRegistration.Builder builder = ImmutableRegistration.builder();
    builder.id("1").name("http").addTags("v1").address("127.0.0.1").port(8000).addChecks(check);

    agent.register(builder.build());
  }

  /**
   * 服务获取
   */
  public static void serviceGet() {
    HealthClient client = consul.healthClient();
    String name = "http";
    //获取所有服务
    System.out.println(client.getAllServiceInstances(name).getResponse().size());

    //获取所有正常的服务（健康检测通过的）
    for (ServiceHealth serviceHealth : client.getHealthyServiceInstances(name).getResponse()) {
      System.out.println(JSON.toJSONString(serviceHealth));
    }
  }

  public static void main(String[] args) {
    serviceRegister();
    serviceGet();
  }

}

```
## nginx基于dns使用
```language-bash
server{
   name www.baidu.com
   resolver 127.0.0.1:8600;
   set $backend "nginx.service.consul";
   location / {
          proxy_pass  http://$backend;
   }
}
```
## 引用
* http://www.jianshu.com/p/28c6bd590ca0
* http://www.liangxiansen.cn/2017/04/06/consul/




