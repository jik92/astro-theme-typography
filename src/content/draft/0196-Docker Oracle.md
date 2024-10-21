title: Docker Oracle
date: 2017/02/22 13:31:14
categories:
 - tryghost

tags:
 - devops 



---


https://hub.docker.com/r/alexeiled/docker-oracle-xe-11g/

```language-bash
docker run -d -p 1022:22 -p 1521:1521 -p 8080:8080 alexeiled/docker-oracle-xe-11g
```

### 登录
 * hostname: localhost
 * port: 1521
 * sid: xe
 * username: system
 * password: oracle
 * Password for SYS user




