title: API-Nginx-Lua
date: 2016/02/26 05:51:02
categories:
 - tryghost

tags:
 - devops 



---

# 发行版
 * Tengine https://github.com/alibaba/tengine
 * OpenResty http://openresty.org/cn/installation.html

# API-GATEWAY
 * https://github.com/sumory/orange
 * https://github.com/Mashape/kong

# 编译安装
```language-bash
./configure
make
make install
ln -s {绝对路径} /usr/bin/nginx
nginx
nginx -s stop/reload/start
```
# 使用
```language-bash
ps  -ef | grep nginx
nginx -s start
nginx -s reload
# 查看配置信息
nginx -t 
# 查看版本
nginx -v
```


# 正则
```language-bash
location  = / {
  #  精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ] 
}

location  / {
  #  因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  #  但是正则和最长字符串会优先匹配
  [ configuration B ] 
}

location /documents/ {
  #  匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  #  只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ] 
}

location ~ /documents/Abc {
  #  匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  #  只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ] 
}

location ^~ /images/ {
  #  匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ] 
}

location ~* \.(gif|jpg|jpeg)$ {
  #  匹配所有以 gif,jpg或jpeg 结尾的请求
  #  然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ] 
}

location /images/ {
  #  字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ] 
}

location /images/abc {
  #  最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  #  F与G的放置顺序是没有关系的
  [ configuration G ] 
}

location ~ /images/abc/ {
  #  只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ] 
}

location ~* /js/.*/\.js
```

# 配置Nginx.conf
## 自用配置
```language-bash
server {
    listen 80;
    server_name zuoyun.me;
    rewrite ^(.*)$  https://$host$1 permanent;
    # return 301 https://$host$request_uri;
}


server{
    listen              443 ssl spdy;
    server_name zuoyun.me;
    ssl on;
    ssl_certificate     /root/cert/1_zuoyun.me_bundle.crt;
    ssl_certificate_key /root/cert/2_zuoyun.me.key;

    ssl_session_cache    shared:SSL:10m;
    ssl_session_timeout  10m;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_stapling on;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

    location / {
        proxy_pass http://localhost:2368;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        #  客户端上传文件大小
        client_max_body_size    10m;
        #  限流
        limit_rate 300k;
        #  限制每个 ip 最大连接数
        limit_conn ctohome_zone 2;


    }
}
```

```language-javascipt
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Credentials' 'true';
add_header 'Access-Control-Allow-Methods' '*';

add_header Access-Control-Allow-Origin *;
location / {
    if ($request_method = 'OPTIONS') { 
        add_header Access-Control-Allow-Origin *; 
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        return 204; 
    }
    index index.php;
    try_files $uri @rewriteapp;
}
```

# 详解Nginx.conf
```language-javascript
# 运行用户
user www-data;    
# 启动进程,通常设置成和cpu的数量相等
worker_processes  1;

# 全局错误日志及PID文件
error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

# 工作模式及连接数上限
events {
    use   epoll;             # epoll是多路复用IO(I/O Multiplexing)中的一种方式,但是仅用于linux2.6以上内核,可以大大提高nginx的性能
    worker_connections  1024;# 单个后台worker process进程的最大并发链接数
    #  multi_accept on; 
}

# 设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
     # 设定mime类型,类型由mime.type文件定义
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    # 设定日志格式
    access_log    /var/log/nginx/access.log;

    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    # 必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    # tcp_nopush     on;

    # 连接超时时间
    # keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay        on;
    
    # 开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    # 设定请求缓冲
    client_header_buffer_size    1k;
    large_client_header_buffers  4 4k;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

    # 设定负载均衡的服务器列表
     upstream mysvr {
    # weigth参数表示权值，权值越高被分配到的几率越大
    # 本机上的Squid开启3128端口
    server 192.168.8.1:3128 weight=5;
    server 192.168.8.2:80  weight=1;
    server 192.168.8.3:80  weight=6;
    }


   server {
    # 侦听80端口
        listen       80;
        # 定义使用www.xx.com访问
        server_name  www.xx.com;

        # 设定本虚拟主机的访问日志
        access_log  logs/www.xx.com.access.log  main;

    # 默认请求
    location / {
          root   /root;      # 定义服务器的默认网站根目录位置
          index index.php index.html index.htm;   # 定义首页索引文件的名称

          fastcgi_pass  www.xx.com;
         fastcgi_param  SCRIPT_FILENAME  $document_root/$fastcgi_script_name; 
          include /etc/nginx/fastcgi_params;
        }

    #  定义错误提示页面
    error_page   500 502 503 504 /50x.html;  
        location = /50x.html {
        root   /root;
    }

    # 静态文件，nginx自己处理
    location ~ ^/(images|javascript|js|css|flash|media|static)/ {
        root /var/www/virtual/htdocs;
        # 过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
        expires 30d;
    }
    # PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
    location ~ \.php$ {
        root /root;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME /home/www/www$fastcgi_script_name;
        include fastcgi_params;
    }
    # 设定查看Nginx状态的地址
    location /NginxStatus {
        stub_status            on;
        access_log              on;
        auth_basic              "NginxStatus";
        auth_basic_user_file  conf/htpasswd;
    }

    location ~* \.(gif|jpg|png)$ {
       valid_referers none blocked server_names;
       if ($invalid_referer) {
          return 403;
       }
     }
     
    # 禁止访问 .htxxx 文件
    location ~ /\.ht {
        deny all;
    }
     
     }
}


```
# 负载均衡配置
```langauge-javascript
# 设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    # 省略上文有的一些配置节点
    # ....
    # 设定负载均衡的服务器列表
     upstream mysvr {
    # weigth参数表示权值，权值越高被分配到的几率越大
    server 192.168.8.1x:3128 weight=5;# 本机上的Squid开启3128端口
    server 192.168.8.2x:80  weight=1;
    server 192.168.8.3x:80  weight=6;
    }

   # 第一个虚拟服务器
   server {
    # 侦听192.168.8.x的80端口
        listen       80;
        server_name  192.168.8.x;

      # 对aspx后缀的进行负载均衡请求
    location ~ .*\.aspx$ {

         root   /root;      # 定义服务器的默认网站根目录位置
          index index.php index.html index.htm;   # 定义首页索引文件的名称

          proxy_pass  http://mysvr ;# 请求转向mysvr 定义的服务器列表

          # 以下是一些反向代理的配置可删除.

          proxy_redirect off;

          # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          client_max_body_size 10m;    # 允许客户端请求的最大单文件字节数
          client_body_buffer_size 128k;  # 缓冲区代理缓冲用户端请求的最大字节数，
          proxy_connect_timeout 90;  # nginx跟后端服务器连接超时时间(代理连接超时)
          proxy_send_timeout 90;        # 后端服务器数据回传时间(代理发送超时)
          proxy_read_timeout 90;         # 连接成功后，后端服务器响应时间(代理接收超时)
          proxy_buffer_size 4k;             # 设置代理服务器（nginx）保存用户头信息的缓冲区大小
          proxy_buffers 4 32k;               # proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
          proxy_busy_buffers_size 64k;    # 高负荷下缓冲大小（proxy_buffers*2）
          proxy_temp_file_write_size 64k;  # 设定缓存文件夹大小，大于这个值，将从upstream服务器传

       }

     }
}


```
# OpenResty 相关
```language-bash
location / {
    content_by_lua_block{
      ngx.say("hello world")
    }

}
```

```language-bash
server {
  listen       80;
  server_name www.baidu.com;
  location / {
     auth_basic "secret";
     auth_basic_user_file /data/nginx/db/passwd.db;
     proxy_pass http://localhost:5601;
     proxy_set_header Host $host:5601;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header Via "nginx";
  }
  access_log off;
}

```
# 参考
1.http://www.cnblogs.com/xiaogangqq123/archive/2011/03/02/1969006.html
2.https://segmentfault.com/a/1190000000447180 
3.https://segmentfault.com/a/1190000002797606
4.https://segmentfault.com/a/1190000004688125
5.https://www.gitbook.com/book/moonbingbing/openresty-best-practices 
6.https://wenjs.me/p/note-of-nginx-configure

# 扩展
## API-GateWay
1.https://github.com/sumory/orange
2.https://github.com/Mashape/kong



