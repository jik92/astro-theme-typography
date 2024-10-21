title: Virtualization  Guide EXSI6
date: 2016/02/22 16:55:06
categories:
 - tryghost

tags:
 - devops 



---

## 官网

 https://www.vmware.com/cn/products/vsphere-hypervisor/

## 文档

 http://pubs.vmware.com/vsphere-60/index.jsp# com.vmware.ICbase/Welcome/welcome.html

## 硬件要求

 1. Intel 的网卡
 2. 支持 VT-D虚拟化的CPU
 3. 只支持 BS 模式，所以要有网络
 4. 对硬件要求蛮苛刻的，不要用非主流硬件
 5. 要玩一机多开至少2张显卡以上

## 推荐硬件 
 * HP MC GEN8
 * DELL R720

## 序列号分配
>0U0QJ-FR1EP-KZQN9-J1C74-23P5R

## 用法

![](http://img.sandseasoft.com/image/4/da/89fc6d95c743398233a70b89e46d1.png)
  
 * 基本上和小时候玩的 VMware 使用方法是一样的， 注意这个软体可以和硬件直通，意味着不是虚拟而是独占一个硬件或者一颗核心。

## 心得

 * key 输入位置在 虚拟机->配置->已获许可功能->编辑
 * iso 上传位置在 虚拟机->配置->存储器->浏览数据存储
 * 设备直通的位置在 虚拟机->配置->高级设置 
 * 直通显卡不要选择当前使用的，系统启动会失败。
 * 克隆机器  .vmx / .vmdk

## 其他尝试
 
 虽然没有装得起来， 不过还是留在这里mark 一记，以后有机会看看。

 * [ProxmoxVE](http://pve.proxmox.com/wiki/Main_Page) 基于 kvm 的平台化虚拟系统。
 * [unraid](http://lime-technology.com/) 基于 coreos 的超小型 u 盘虚拟化系统。



