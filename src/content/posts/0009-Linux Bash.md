---
title: Linux Bash
pubDate: 2014-12-23
categories: [ 'devops','bash' ]
description: ''
---

图解系统 https://xiaolincoding.com/os/

```markdown
* 带宽，表示链路的最大传输速率，单位是 b/s （比特 / 秒），带宽越大，其传输能力就越强。
* 延时，表示请求数据包发送后，收到对端响应，所需要的时间延迟。不同的场景有着不同的含义，比如可以表示建立 TCP
  连接所需的时间延迟，或一个数据包往返所需的时间延迟。
* 吞吐率，表示单位时间内成功传输的数据量，单位是 b/s（比特 / 秒）或者 B/s（字节 / 秒），吞吐受带宽限制，带宽越大，吞吐率的上限才可能越高。
* PPS，全称是 Packet Per Second（包 / 秒），表示以网络包为单位的传输速率，一般用来评估系统对于网络的转发能力。

当然，除了以上这四种基本的指标，还有一些其他常用的性能指标，比如：

* 网络的可用性，表示网络能否正常通信；
* 并发连接数，表示 TCP 连接数量；
* 丢包率，表示所丢失数据包数量占所发送数据组的比率；
* 重传率，表示重传网络包的比例；
```

常用

* history  !
* cd ~
* install yum/apt-get
* ctrl+alt+1/2/3/4
* forward >(覆写) >>(追加) 2>&1
* pipe |
* set|less
* & jobs fg bg
* tab

权限

* chmod -R 775 / drwxrwxrwx(类型/用户/用户组/其他用户)
* chown jik test/ 更改所有权

搜索

* locate/updatedb
* find / -name "xxx" -print

文本

* cat/tail/more    (tail -fn200 error.log)
* wc -l/sort/diff

监控

* df -h/du -h
* ps -ef
* top -d 5
* free -m
* iostat 3
* netstat -tanp | less
* kill -9 xxx

网络

* wget -N/curl/scp/nfs/sshfs

software

* irssi/mail/mutt
* unzip
* lrzsz->rz-be sz
* pptpd
* mysql -h -P -u -p

修改系统参数

```language-bash
# 临时生效
ulimit -a
ulimit -n 406960
# 永久生效
vim /etc/security/limits.conf
```

用户

* useradd/userdel/passwd/groups
* last -a/who -u 最后登录/当前登录

防火墙

* iptables

c compile

```
./configure
make
make install
```

公网ip

```
curl members.3322.org/dyndns/getip
```

![](http://img.sandseasoft.com/image/4/27/bb3ab0389244b6d9328eb0431ada8.png)
![](http://img.sandseasoft.com/image/9/f6/d31c17347d1cb3bb2fa2b57586b69.png)
![](http://img.sandseasoft.com/image/4/5f/9932d95e31aeec8ce751141f57cb7.png)

awk 使用

使用方法

```
awk '{pattern + action}' {filenames}
```

尽管操作可能会很复杂，但语法总是这样，其中 pattern 表示 AWK 在数据中查找的内容，而 action
是在找到匹配内容时所执行的一系列命令。花括号（{}）不需要在程序中始终出现，但它们用于根据特定的模式对一系列指令进行分组。
pattern就是要表示的正则表达式，用斜杠括起来。

awk语言的最基本功能是在文件或者字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作。完整的awk脚本通常用来格式化文本文件中的信息。

通常，awk是以文件的一行为处理单位的。awk每接收文件的一行，然后执行相应的命令，来处理文本。

语法:

* -F ':' =制定分隔符
* $0/$1/$n=当行匹配/一列匹配/第 n 列匹配

```
# cat /etc/passwd |awk  -F ':'  '{print $1}'  
# cat /etc/passwd |awk  -F ':'  'BEGIN {print "name,shell"}  {print $1","$7} END {print "blue,/bin/nosh"}'
 
```

> http://www.cnblogs.com/ggjucheng/archive/2013/01/13/2858470.html


curl 使用

* -O -o file 保存至本地
* -L 强制重定向
* -C 断点续传
* --limit-rate 1000B 限速
* -z 21-Dec-11 指定更新时间
* -u username:password URL 授权页面
* -T upload file
* -x proxy
* -D/-b 保存/使用 cookice
* --data-urlencode  "param1=value1&param2=value"   post 请求
* -X DELETE 制定其他协议
* --form "fileupload=@filename.txt"  上传文件

时钟同步

```language-bash
sudo service ntp stop 
ntpdate cn.pool.ntp.org
sudo service ntp start 

wathc -n 1 ntpq -p

# 修改时间
date –s 10:10:10
date -s 07/01/2016
clock –w
```

# 常用脚本

杀死进程

```language-bash
ps -ef | grep procedure_name | grep -v grep | awk '{print $2}' | xargs kill -9
```

查看文件夹大小

```language-bash
du -h --max-depth=1 /data/logs/
```

后台跑进程

```language-bash
!# bin/bash
nohup sh xxx.sh >dev/null 2>1 &
```

登陆失败

```language-bash
sudo cat /var/log/auth.log |grep failure |wc -l
```

增加账号

```language-bash
# add group
addgroup demo
# add user
adduser demo -g demo
# config sudoer
sudo vim /etc/sudoers
demo ALL=(ALL)  NOPASSWD: ALL
:wq!
```

简单时间同步 NTP

```language-bash
sudo apt-get install ntpdate  
ntpdate cn.pool.ntp.org  
hwclock -w  
```

实现每天凌晨2点自动执行命令

```language-bash
sudo su - crontab -e 
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create 
```

开机自启动

```language-bash
vim /etc/rc.d/rc.local
```

统计 nginx 页面访问PV

```language-bash
sed -n '/20\/Jun\/2016/,$p' access.log |grep download.html |wc -l
```

gcc编译

```bash
rpm -ivh ppl-0.10.2-11.el6.x86_64.rpm # ppl(libppl.so.7、libppl_c.so.2)
rpm -ivh cloog-ppl-0.15.7-1.2.el6.x86_64.rpm # cloog-ppl
rpm -ivh mpfr-2.4.1-6.el6.x86_64.rpm # libmpcfr.so.1
rpm -ivh cpp-4.4.7-17.el6.x86_64.rpm # cpp
rpm -ivh kernel-headers-2.6.32-642.el6.x86_64.rpm # kernel-headers
rpm -ivh glibc-headers-2.12-1.192.el6.x86_64.rpm # glibc-headers
rpm -ivh glibc-devel-2.12-1.192.el6.x86_64.rpm # glibc-devel
rpm -ivh libgomp-4.4.7-17.el6.x86_64.rpm # libgomp(libgomp、libgomp.so.1)
rpm -ivh gcc-4.4.7-17.el6.x86_64.rpm # gcc
```

增加一个sudo用户

```
#root 
useradd -m jik1992
passwd jik1992
chmod u+w /etc/sudoers
jik1992 ALL(ALL) ALL
chmod u-w /etc/sudoers

su jik1992	
```

增加文件可执行权限

```
chmod 774 xxx.sh
chown root:root xxx.sh
```

```
#/bin/bash
while true;
do
  count=`ps -ef | grep test.jar | grep -v grep|wc -l`
  if [ ${count} -lt 1 ]; then
    nohup java -jar test.jar &
  else
    echo "process is running"
  fi
  sleep 3
done
```






