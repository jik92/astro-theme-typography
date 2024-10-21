title: Virtualization Guide OpenStack
date: 2017/10/26 16:23:35
categories:
 - tryghost

tags:
 - 未归档 



---

# OneInAll
* 测试安装版本 https://docs.openstack.org/devstack/lates
* 完整版安装 https://docs.openstack.org/newton/install-guide-ubuntu/# 

## 理解概念
![](http://img.sandseasoft.com/image/7/57/11ac48a6bdac83020ae2677064023.jpg)

## 核心组件
* keystone授权
* glance  镜像管理
* nova    计算（基于libvirt控制kvm/qmenu）
* cinder  存储
* neutron 网络
* horizon 总控制UI
![](http://img.sandseasoft.com/image/1/6c/f2e65ba5dca50ebf9f64f1acd0bae.png)

# 安装devstack
安装文档增加stack账户执行.stack.sh之前要对镜像做一些处理。注意虚拟机需要双网卡绑定，内存设置8G以上

1. 基于ubuntu17 更换mirror
/etc/apt/sources.list
```
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse

```
2.local.conf脚本可以换成如下镜像
```langauge-bash
[[local|localrc]]
GIT_BASE=http://git.trystack.cn
NOVNC_REPO=http://git.trystack.cn/kanaka/noVNC.git
SPICE_REPO=http://git.trystack.cn/git/spice/spice-html5.git
ADMIN_PASSWORD=secret
DATABASE_PASSWORD=$ADMIN_PASSWORD
RABBIT_PASSWORD=$ADMIN_PASSWORD
SERVICE_PASSWORD=$ADMIN_PASSWORD

# OFFLINE=True
RECLONE=True
```
启动 

最后
从安装的脚本来看，是一个非常复杂的大型合作开源项目了，基础编码语言python，有用到memcache、rabbit、mysql这些基础中间件。实际上这个Paas平台应付生产环境远远不够的，毕竟各种扩展可以想象得到的性能不足。



