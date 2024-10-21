title: RaspberryPi2
date: 2016/02/24 06:52:54
categories:
 - tryghost

tags:
 - tools 



---

## 常见core

 * STM32
 * ARM7、9 
 * MTK

## 无线通信

 * CC2530 套件 zigbee
 * WIFI

## 硬件设备

 * Pi2、EDUP EP-N8508GS
 * NanoPI2

## 常用参考网址

 * https://www.raspberrypi.org/
 * http://wiki.friendlyarm.com/wiki/index.php/NanoPi_2/zh

## 系统
 
 * noobs/raspberry
 * openelec
 * kali arm
 * android
 * openwrt arm

## 烧写软件 

 * Win32DiskImager

## 关于 openwrt 

 https://wiki.openwrt.org/toh/raspberry_pi_foundation/raspberry_pi
 
 修改 /etc/config/network 下面的网管和 proto 为 DHCP

 安装 hostapd和wireless-tools
 
 安装对应无线网卡驱动 kmod-usb-net和kmod-usb-net-asix kmod-rtlxxxxs

 重启 reboot
 
 启动ssh  /etc/init.d/dropbear start

 opkg update
 opkg install 
 opkg install fdisk e2fsprogs 
 fdisk -l # 查看分区 
 mkfs.ext3 /dev/sda1




