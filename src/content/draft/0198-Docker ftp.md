title: Docker ftp
date: 2017/03/09 06:05:57
categories:
 - tryghost

tags:
 - 未归档 



---

## 快速构建ftp服务

```language-bash
# 安装
docker pull stilliard/pure-ftpd:hardened
docker run -d --name ftpd_server -p 21:21 -p 30000-30009:30000-30009 -e "PUBLICHOST=localhost" stilliard/pure-ftpd:hardened

# 添加用户bob
docker exec -it ftpd_server /bin/bash
pure-pw useradd bob -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -u ftpuser -d /home/ftpusers/bob

# 测试
ftp -p localhost 21
```


* http://mina.apache.org/ftpserver-project/index.html
* https://github.com/stilliard/docker-pure-ftpd# docker-pure-ftpd-server

## 使用JAVA client
```language-xml
<dependency>
  <groupId>commons-net</groupId>
  <artifactId>commons-net</artifactId>
  <version>3.6</version>
</dependency>
```

## 基础安装FTP




