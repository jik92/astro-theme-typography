title: Install init Ubuntu14、CentOS7
date: 2015/05/28 23:48:08
categories:
 - tryghost

tags:
 - devops 



---

# Ubuntu14 
>基本上每台机器刚装完必须做的事情...

## 修改 DHCP 网络为static
```langauge-bash
vim /etc/network/interface

#  The primary network interface
auto eth0
iface eth0 inet static
address 172.16.1.16
netmask 255.255.255.0
gateway 172.16.1.1
```
## java
```language-bash
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
sudo apt-get install oracle-java8-set-default
```
## maridb-server
```language-bash
sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
sudo add-apt-repository 'deb http://sfo1.mirrors.digitalocean.com/mariadb/repo/10.0/ubuntu trusty main'
sudo apt-get update
sudo apt-get install mariadb-server

or 

sudo apt-get install mysql-server
```
## ubuntu  
### source.list
```language-bash
sudo etc/apt/source.list
:%s# us\.# cn\.# g
sudo apt-get update 
```
### 如果源有问题初始化方法
```language-bash
sudo rm -r /etc/apt/sources.list.d/
sudo apt-get update
```

### 安装 gnome3
```language-bash
sudo add-apt-repository ppa:gnome3-team/gnome3-staging
sudo apt-get update
sudo apt-get dist-upgrade

sudo apt-get install gnome-shell
sudo apt-get install gnome-tweak-tool
sudo apt-get install gnome-weather gnome-maps gnome-photos gnome-music
```

### 安装 chrome
```langauge-bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

# CentOS 
> warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8): No such file or directory  
```language-bash
vi /etc/profile
export LC_ALL=en_US.UTF-8
source /etc/profile
```
* 关闭默认防火墙
```langauge-bash
systemctl stop firewalld.service # 停止firewall
systemctl disable firewalld.service # 禁止firewall开机启动
firewall-cmd --state # 查看默认防火墙状态（关闭后显示notrunning，开启后显示running）
```
* java
```langauge-bash
rpm -ivh jdk-8u25-linux-x64.rpm
```

* 更新源
http://mirrors.163.com/.help/centos.html
* 安装mysql数据库
```langauge-bash
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install mysql-community-server

service mysqld restart
```

* 启动网络
```language-bash
service  networkmanager start
chkconfig networkmanager on
```
* 修改网卡配置
 1. 删除/etc/udev/rules.d/70-persistent-net.rules 
 2. 配置/etc/sysconfig/network-scripts/ifcfg-eth0 
```language-bash
DEVICE="eth0" 
BOOTPROTO="static" 
HWADDR="00:0C:29:91:42:2C" 
MTU="1500" 
NM_CONTROLLED="yes" 
ONBOOT="yes" 
IPADDR=192.168.152.101 
NETMASK=255.255.255.0 
GATEWAY=192.168.152.2 
```




