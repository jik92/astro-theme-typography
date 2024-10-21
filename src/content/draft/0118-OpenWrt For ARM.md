title: OpenWrt For ARM
date: 2016/03/06 09:41:08
categories:
 - tryghost

tags:
 - tools 



---

## 安装在我的 Pi2上面了

关于 openwrt

https://wiki.openwrt.org/toh/raspberrypifoundation/raspberry_pi

## 网络配置

修改 /etc/config/network 下面的网关和 proto 为 DHCP

```luangea-bash
config interface 'wan'

        option ifname 'eth0'

#####    option proto 'dhcp'

#####    option proto 'static'

        option proto 'pppoe'

        option 'username'  'user'

        option 'password' 'password'



```

## 安装 USB 支持

```language-bash
opkg install kmod-usb-&
```

## 安装无线网络支持

 1. 安装 hostapd和wireless-tools

 2. 安装对应无线网卡驱动 kmod-usb-net和kmod-usb-net-asix kmod-rtlxxxxs

## 扩展容量
```language-bash
# 分区
fdisk /dev/mmcblk0
# 格式化
mkfs.ext3 /dev/对应的分区
# 挂载
mount /dev/分区  /download
```

## 启动下载
```language-bash
aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all  http://0.0.0.0:6800/jsonrpc  

```


## 常用指令
```language-bash
## 重启 
reboot
## 关机
poweroff
## ssh-server
/etc/init.d/dropbear start

```









