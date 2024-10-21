title: 运维-php web环境搭建
date: 2015/11/18 05:50:02
categories:
 - tryghost

tags:
 - 未归档 



---

快速搭建一个 phpweb 环境
```language-bash
###  安装 nginx
apt-get install nginx
apt-get install php5 php5-fpm php-mysql
```

### 启动 php-fpm
```language-bash
###  默认端口9001
/etc/init.d/php-fpm restart
ps aux | grep -c php-fpm
/usr/bin/php  -i|grep mem
```

### 连接

找到nginx 的 php-fpm 修改重启
```language-nginx
location ~ \.php$ {
 include snippets/fastcgi-php.conf
 fastcgi_pass unix:/var/run/php5-fpm.sock;
}

nginx -s reload
```

###  测试

```language-php
<?php
echo phpinfo();
?>
```


xdebug webgrind



