title: Distributed Guide ELKBStack
date: 2014/12/25 19:58:39
categories:
 - tryghost

tags:
 - store 
 - devops 



---

http://kibana.logstash.es/content/elasticsearch/performance/curator.html
## Dapper

http://static.googleusercontent.com/media/research.google.com/zh-CN//pubs/archive/36356.pdf

![](http://img.sandseasoft.com/image/d/1d/eec4d7a8cf301951b06803cf58ef1.png)
![](http://img.sandseasoft.com/image/a/09/f763260c13f1182a43a3fe65385ad.png)
![](http://img.sandseasoft.com/image/a/86/37a4b036c32bc86686835497497ff.png)
![](http://img.sandseasoft.com/image/1/5f/312493b3df09c4b9631879f1d15d0.png)

## kibana/grafana
概念
所有的图的 x 轴都是 timestamp 坐标，Y 轴是任意维度切分。可以按照需求自由设计，分组， 保存面板。

当然我们也可以引入 grafana 更加智能，可以自动发现字段，不需要手动查询配置，精简了一些不会太常用的功能。

### 核心思考，关键词

服务：重试，超时，心跳，熔断，监控，重启

运维：load/network/database/io

日志：审计日志、线上日志、后台日志、*nix操作日志

### 相关资料
<table border>
<tr>
		<td></td>
		<td>官网</td>
		<td>功能</td>
		<td>时间</td>
		<td>相关资料</td>
	</tr>
	<tr>
		<td>elasticsearch</td>
   <td>https://www.elastic.co/products/elasticsearch</td>
		
		
		<td>数据存储</td>
<td>2010</td>
		<td></td>
	</tr>
	<tr>
		<td>logstash</td>
		<td>https://www.elastic.co/products/logstash</td>
		<td>日志收集</td>
		<td>2009</td>
		<td></td>
	</tr>
	<tr>
		<td>redis</td>
		<td>http://redis.io/</td>
		<td>队列</td>
		<td>2009</td>
		<td></td>
	</tr>
	<tr>
		<td>kibana、grafana</td>
		<td>https://www.elastic.co/products/kibana	</td>
		<td>查询面板</td>
		<td>2009</td>
		<td></td>
	</tr>
	<tr>
		<td>collectd</td>
		<td>https://collectd.org/</td>
		<td>系统信息收集</td>
		<td>2006</td>
		<td></td>
	</tr>
	<tr>
		<td>supervisord</td>
		<td>http://supervisord.org/</td>
		<td>守护进程</td>
		<td>2011</td>
		<td></td>
	</tr>
	<tr>
		<td>metrics</td>
		<td>https://github.com/dropwizard/metrics		</td>
		<td>服务度量工具</td>
		<td>2010</td>
		<td></td>
	</tr>
	<tr>
		<td>Hystrix</td>
		<td>https://github.com/Netflix/Hystrix</td>
		<td>服务治理平台</td>
		<td>2010</td>
		<td></td>
	</tr>		



</table>

### 架构
![](http://img.sandseasoft.com/image/a/c8/83a7f99820a9df249b54229cbe8cd.png)
![](http://img.sandseasoft.com/image/5/b4/4cd6202022b3b6e14abd2720ab743.png)

### Dapper 原理项目实现
https://github.com/naver/pinpoint
https://github.com/openzipkin/zipkin


 



