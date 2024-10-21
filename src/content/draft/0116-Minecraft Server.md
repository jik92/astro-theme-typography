title: Minecraft Server
date: 2016/03/03 09:29:45
categories:
 - tryghost

tags:
 - tools 



---


## 官网
https://minecraft.net

## 服务端版本
 * CraftBukkit
 * Spigot

## 客户端下载
http://www.minecraftxz.com/

## 服务端下载
http://www.mcbbs.net/
http://getspigot.org/

## 安装

 1. 安装 java8
 2. 启动
```language-bash
# !bin/bash
nohup java -jar -Xmx500M -Xms500M -XX:MaxPermSize=128M -Dfile.encoding=utf-8 -Duser.timezone=Asia/Hong_Kong spigot_server.jar >/dev/null 2>&1 &
```
## 服务器外网转发
```language-bash
ssh -N  -R 25555:0.0.0.0:25565 112.124.116.244 'vmstat 20'
```



