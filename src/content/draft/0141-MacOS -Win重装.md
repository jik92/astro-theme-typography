title: MacOS /Win重装
date: 2016/06/14 09:01:06
categories:
 - tryghost

tags:
 - tools 



---

# MacOS
## U盘制作
 1. 下载 DMG 镜像
>http://pan.baidu.com/s/1jHR7x0U

 2. 格式化 U盘，用 Disk Utility 格式化成默认 OS 磁盘卷（默认 GUID）
 3. 安装 DMG 镜像，然后进入 Application 点开一次 Install OS（挂载 kernelcache 引导）
 4. 刻入 U盘
```language-bash
sudo /Applications/Install OS X El Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/XXXX --applicationpath "/Applications/Install OS X El Capitan.app"
```
## 安装系统

 1. 开机按住 alt 键 
 2. 更新当前机器时间
```language-bash
date 122014102015.30
```

## BootCamp 引导重装系统
 1. 制作启动盘
 2. alt 键引导 EFI 驱动
 3. 新建一个主分区，安装系统
 
## 安装 Enjoy it!

# Win 系统安装
## 优盘制作
http://www.wepe.com.cn/
## 镜像下载
http://www.imsdn.cn/
## 安装
1. 请使用 MBR 格式分区
2. 主磁盘分区100G+ 其他自便
3. 开启 UEFI，关闭 Win8快速引导
4. 驱动精灵离线版，更新驱动




