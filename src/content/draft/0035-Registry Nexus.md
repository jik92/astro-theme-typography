title: Registry Nexus
date: 2015/06/13 10:36:55
categories:
 - tryghost

tags:
 - manage 



---

# Nexus 3.0.x

PS:注意，3.x产品没有2.x好用，阉割了upload respository功能，目前生产线回滚到2.x版本

## 下载
http://www.sonatype.com/nexus-repository-oss
http://www.sonatype.com/download-oss-sonatype
http://www.sonatype.org/downloads/nexus-latest-bundle.zip
http://books.sonatype.com/nexus-book/3.0/pdf/nxbook-pdf.pdf
http://books.sonatype.com/nexus-book/3.0/reference/index.html
## 安装 
 * 解压
 * 配置 dnspod
 * 配置 nginx 转发
 * 本地 localhost:8081/nexus 密码 admin:admin123
 * add proxy resposibliy 
 * set True with update index

## 使用原理
 * 仓库
  * proxy 代理 镜像 仓库
  * host  本地 发布 仓库
  * group 聚合拉取地址


## 常用的maven代理库
```language-bash
http://maven.aliyun.com/nexus/content/groups/public/
http://repo.spring.io/release/
http://repo.maven.apache.org/maven2/
http://repo1.maven.org/maven2/
http://repo.spring.io/release/
```




