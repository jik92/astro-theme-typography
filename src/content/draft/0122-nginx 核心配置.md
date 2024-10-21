title: nginx 核心配置
date: 2016/03/16 07:56:24
categories:
 - tryghost

tags:
 - python 



---

在nginx.conf中加入 如下代码  
```
include       /usr/local/nginx/conf/sub_conf/*.conf;
```
意思是nginx会加载/usr/local/nginx/conf/sub_conf/中所有的配置文件
为每一个项目添加一个配置文件，比如现在我们要添加一个项目叫chengyun。
在sub_conf目录下创建chengyun.conf
将如下内容添加到chengyun.conf;
```
server {
    listen 19002;
    server_name cheng.raycloud.com;
 
    # nginx会自上而下进行扫描，如果一旦拦截到请求，就不会往下执行，比如一个jpg请求进来，会被下面的第一个请求拦截，拦截后就直接返回了，不再进行下面的拦截
 
    # 如果要进行复杂的拦截，比如当发现index.html时，要代理本地index2.html。还需要进一步了解 proxy_pass 和 rewrite相关内容，具体请先google。
     
    location ~* ^.+\.(woff|woff2|ttf|json|log|jpg|jpeg|gif|png|ico|html|cfm|cfc|afp|asp|lasso|pl|py|txt|fla|swf|zip)$ {

set $flag 0;
            if ($http_user_agent ~* (MicroMessenger)){
              set $flag 1;
            }

            if ($http_user_agent ~* (DingTalk)){
              set $flag 1;
            }
            if ($flag = 0) {
         return 401;
}


        # 本地静态资源根路径
        root /Users/flylampard/wangyi/project/java3/chengyun-parent/chengyun-web/src/main/webapp/static/;
        expires 1d;
    }
    
    location ~* ^.+\.(js|css|less)$ {
        # 本地静态资源根路径
        root /Users/flylampard/wangyi/project/java3/chengyun-parent/chengyun-web/src/main/webapp/static/;
        expires 2h;
    }
 
    location ~ / {
        proxy_pass http://127.0.0.1:8888; # 后台所在地址与端口，如果是服务器上的，可以修改为远程ip端口
        proxy_redirect              off;
        proxy_set_header            Host $host;
        proxy_set_header            X-Real-IP $remote_addr;
        proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 10m;
        client_body_buffer_size 128k;
        proxy_connect_timeout 90;
        proxy_send_timeout 120;
        proxy_read_timeout 120;
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
        add_header Pragma "no-cache";
        add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
    }                    
}
```
添加配置后，重新nginx即可
 

nginx.conf样例
```
# user  nobody;
worker_processes  1;
 
# error_log  logs/error.log;
# error_log  logs/error.log  notice;
# error_log  logs/error.log  info;
# pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
 
http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
 
    log_format proxy '$scheme://$host$request_uri';
 
    # access_log  logs/access.log  main;
    sendfile        on;
    # tcp_nopush     on;
    # keepalive_timeout  0;
    keepalive_timeout  65;
    # gzip  on;
    log_format  main2  '$remote_addr^A-^A$remote_user^A[$time_local^A$host^A$request^A$request_body^A'
                      '$status^A$body_bytes_sent^A$http_referer^A'
                      '$http_user_agent^A$http_x_forwarded_for^A$http_cookie^A$upstream_response_time^A$request_time';
    # access_log  logs/cookie_access.log  main;
    include       /usr/local/nginx/conf/sub_conf/*.conf;
}
```



