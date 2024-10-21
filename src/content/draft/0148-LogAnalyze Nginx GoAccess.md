title: LogAnalyze Nginx GoAccess
date: 2016/06/27 06:25:24
categories:
 - tryghost

tags:
 - python 



---

Nginx 日志分析工具
https://goaccess.io/

安装
```language-bash
wget http://tar.goaccess.io/goaccess-1.0.1.tar.gz 
tar -xzvf goaccess-1.0.1.tar.gz 
cd goaccess-1.0.1/ 
./configure --enable-geoip --enable-utf8 
make && make install 
```
使用
https://goaccess.io/man# examples


```language-bash
# 直接启动
goaccess -f access.log
# HTML 页面
goaccess -f access.log -o report.html --real-time-html --ws-url=x.x.x.x --port=9870  --addr=0.0.0.0
python -s SimpleHTTPServer
# open report.html
```





