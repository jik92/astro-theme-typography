title: HTTPS letencrypt' certbot
date: 2016/12/14 16:53:22
categories:
 - tryghost

tags:
 - devops 



---


letencrypt的证书续签服务

## 背景
根据url路由访问脚本生成的校验文件，通过自动签名证书


## 使用
1 . 配置nginx，设置访问路径
```language-javascipt
server{
    listen 80;
    server_name git.tech84.com;



location ^~ /.well-known/acme-challenge/ {
   default_type "text/plain";
   root     /usr/local/openresty/nginx/html;
}

location = /.well-known/acme-challenge/ {
   return 404;
}

    rewrite ^(.*)$  https://$host$1 permanent;

}

server{
    server_name git.tech84.com;
     listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/git.tech84.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/git.tech84.com/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/git.tech84.com/chain.pem;


    location / {
        proxy_pass http://localhost:10080;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
   }
}
```
2 . 验证url路径，自动签名
```language-bash
# 首次签名
certbot certonly --webroot -w /usr/local/openresty/nginx/html -d git.tech84.com  -d tech84.com -d app.tech84.com -d wiki.tech84.com  -d repo.tech84.com 
# 手动续签
certbot renew --dry-run 
```
3 . 证书保存路径
`/root/cert`
`/etc/letsencrypt/live`

4 . 自动续签脚本
```language-bash
crontabe -e

30 2 * * 1 /usr/bin/certbot renew  >> /var/log/le-renew.log
```

## 引用
https://github.com/certbot/certbot
https://certbot.eff.org/
https://segmentfault.com/a/1190000005797776



