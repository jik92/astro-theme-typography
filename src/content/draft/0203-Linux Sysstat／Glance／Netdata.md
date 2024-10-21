title: Linux Sysstat／Glance／Netdata
date: 2017/06/14 08:49:27
categories:
 - tryghost

tags:
 - devops 



---

### 官网
http://sebastien.godard.pagesperso-orange.fr/
### 仓库
https://github.com/sysstat/sysstat
这个项目离线下使用比较好，功能较弱
### 性能检查命令集

* iostat reports CPU statistics and input/output statistics 
* for devices, partitions and network filesystems.
* mpstat reports individual or combined processor related statistics.
* pidstat reports statistics for Linux tasks (processes) : I/O, CPU, memory, etc.
* tapestat reports statistics for tape drives connected to the system.
* cifsiostat reports CIFS statistics.

### 性能监控工具

* sar collects, reports and saves system activity information (see below a list of metrics collected by sar).
* sadc is the system activity data collector, used as a backend for sar.
* sa1 collects and stores binary data in the system activity daily data file. It is a front end to sadc designed to be run from cron or systemd.
* sa2 writes a summarized daily activity report. It is a front end to sar designed to be run from cron or systemd.
* sadf displays data collected by sar in multiple formats (CSV, XML, JSON, etc.) and can be used for data exchange with other programs. This command can also be used to draw graphs for the various activities collected by sar using SVG (Scalable Vector Graphics) format.

安装完成后会生成这些文件

mkdir -p /usr/local/lib64/sa
mkdir -p /var/log/sa
mkdir -p /usr/local/bin 
mkdir -p /usr/local/share/doc/sysstat-11.5.6
mkdir -p /etc/sysconfig
install -m 755 sa1 /usr/local/lib64/sa
install -m 755 sa2 /usr/local/lib64/sa
install -m 755 sadc /usr/local/lib64/sa
install -m 755 sar /usr/local/bin
install -m 755 sadf /usr/local/bin
install -m 755 iostat /usr/local/bin
install -m 755 tapestat /usr/local/bin
install -m 755 mpstat /usr/local/bin
install -m 755 pidstat /usr/local/bin
install -m 755 cifsiostat /usr/local/bin
install -m 644 sysstat.ioconf /etc/sysconfig

### 监控原理
sadc命令会生成 /usr/local/lib64/saDD的二进制日志文件，
sa1命令会生成 当日性能汇总数据
sa2命令会生成 当月性能汇总数据
sadf 可以读取转义ssDD的日志出报表活着svg图表审计

### 实践
```language-bash
安装编译带参数
./configure --enable-install-cron
自动增加systemd脚本
service sysstat start

nohup /usr/local/lib64/sa/sadc 10 ->/dev/null 2>&1 &
sar -P ALL
sadf -P
sadf -g -T 8 /var/log/sa/sa`date +%d` >/root/project/tomcat8/webapps/dcs.web/output_`date +%d`.svg
```
![20170615149749348774804.png](http://img.sandseasoft.com/20170615149749348774804.png)




