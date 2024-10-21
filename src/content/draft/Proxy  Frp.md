title: Proxy  Frp
date: 2020/12/20 11:52:07
categories:

 - ops

tags:
 - frp
 - proxy 



---

# Concept

​		透明代理，基于ssh建立隧道连接内网

# Installation

## Added  Systemd

```shell
cp ./frps /usr/bin/
cp ./frps.ini /etc/frp/
cp ./systemd/frps.service /etc/systemd/system/
systemctl deamon-reload
systemctl enable frps.service
systemctl start frps.service
systemctl status frps.service
```

# Usage

## frps.ini

```language-bash
[common]
bind_port = 7000
token = 12345676

dashboard_port = 10080
dashboard_user = xxx
dashboard_pwd = xxx
allow_ports = 7000,10000-20000
```

## frpc.ini

```shell
[common]
server_addr = 81.68.107.111
server_port = 7000
token = 12345676
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 12207
```

## Queto
https://github.com/fatedier/frp




