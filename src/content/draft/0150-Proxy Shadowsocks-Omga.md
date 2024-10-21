title: Proxy Shadowsocks/Omga
date: 2016/07/01 01:58:13
categories:
 - tryghost

tags:
 - tools 



---

Server
https://github.com/shadowsocks/shadowsocks
```language-bash
apt-get install python-pip
pip install shadowsocks
sudo ssserver -p 443 -k password -m aes-256-cfb --user nobody -d start
```
Clinet
https://shadowsocks.org/en/download/clients.html
```language-bash
sslocal -c -v ss.json

{
"server":"server-ip",
"server_port":8000,
"local_address": "127.0.0.1",
"local_port":1080,
"password":"your-password",
"timeout":600,
"method":"aes-256-cfb"
}

```


[SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?utm_campaign=en&utm_source=en-et-na-us-oc-webstrhm&utm_medium=et)

Chrome plugins for proxy

```language-bash
docker pull oddrationale/docker-shadowsocks
 docker run -d -p 1234:1234 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 1234 -k 11223344 -m aes-256-cfb

```



