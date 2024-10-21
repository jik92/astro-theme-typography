title: Using Mariadb For Docker
date: 2018/03/01 03:31:00
categories:
 - ops

tags:
 - mariadb



---

1. daocloud 安装 docker/docker-compose
2. docker-compose.yml
```language-bash
#  Use root/example as user/password credentials
version: '3.1'

services:

  db:
    image: mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: xxxx 
    ports:
      - 3306:3306

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080

```
3.docker-compose up -d
4. docker exec -it xxxxx bash
5. nano /etc/my.cnf
add
```language-bash
#  在[mysqld]标签下添加下面内容
character-set-server = utf8
#  在[client]标签下添加下面内容
default-character-set=utf8
#  在[mysql]标签下添加下面内容
default-character-set=utf8
```
6.sql commond
```
SHOW VARIABLES LIKE 'character%'
```
全部都是 utf8  finish



