title: Mirror Clone
date: 2016/03/07 02:05:16
categories:
 - tryghost

tags:
 - devops 
 - tools 



---

很多时候，镜像源基本上都在 GFW 外，在网络差的情况下如何制作代理源

## 方案
 * nginx 做反代
 * rsync
 * wget、整站下载

如果是 wget 直接拖参考这篇文章 http://my.oschina.net/luckykiddie/blog/99190?fromerr=6aJJxGqL
```language-bash
wget -c -m -k -np -p -w 10 --random-wait --waitretry=5 http://www.oschina.net/
```

rsync基本上要服务端给你开权限端对端同步，方法另一篇文章有写

nginx 做反代配置如下
```language-bash
log_format  jjhr.net  '$remote_addr - $remote_user [$time_local] "$request" '
             '$status $body_bytes_sent "$http_referer" '
             '"$http_user_agent" $http_x_forwarded_for';
#  反向代理参数，具体自行搜索按需配置吧
proxy_connect_timeout    5;
proxy_read_timeout       60;
proxy_send_timeout       5;
proxy_buffer_size        16k;
proxy_buffers            4 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;

#  配置临时目录、缓存路径（注意要先建立这2个目录，要在同一个硬盘分区，注意权限）
proxy_temp_path   /var/cache/nginx_proxy_temp 1 2;
proxy_cache_path  /var/cache/nginx_proxy_cache levels=1:2 keys_zone=jjhr:48m inactive=12d max_size=2g;
#  keys_zone=jjhr:48m 表示这个 zone 名称为 jjhr，分配的内存大小为 48MB
#  levels=1:2 表示缓存目录的第一级目录是 1 个字符，第二级目录是 2 个字符
#  inactive=12d 表示这个zone中的缓存文件如果在 12 天内都没有被访问，那么文件会被cache manager 进程删除
#  max_size=2G 表示这个zone的硬盘容量为 2G
server{
    listen 80;
    server_name jjhr.net *.jjhr.net;    
    index index.html index.php;            
    location / {

        # -------------------------------------
        proxy_cache jjhr;
        proxy_cache_key "$scheme://$host$request_uri";
        proxy_cache_valid 200 304 7d;
        proxy_cache_valid 301 3d;
        proxy_cache_valid any 10s;
        expires 1d;
        # --------------------------------------

        proxy_pass         http://205.185.115.53;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP  $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;

    }
    #  wordpress 后台目录不缓存
    location /wp-admin {
        if ( !-e $request_filename) {
            proxy_pass         http://205.185.115.53;
        }
    }

    access_log  /var/log/nginx/jjhr.net.log main;
}
```



