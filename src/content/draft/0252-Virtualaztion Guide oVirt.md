title: Virtualaztion Guide oVirt
date: 2018/07/03 13:15:04
categories:
 - tryghost

tags:
 - 未归档 



---

https://www.ovirt.org/

### 系统要求
Minimum Hardware
4 GB memory
20 GB disk space
Optional Hardware
Network storage
Supported OSes (Engine)
CentOS Linux 7.5
Red Hat Enterprise Linux 7.5
Scientific Linux 7.5

### 使用
```language-bash
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld
setenforce 0
vi /etc/selinux/config
SELINUX=disabled

# 安装
sudo yum install http://resources.ovirt.org/pub/yum-repo/ovirt-release42.rpm
sudo yum install -y ovirt-engine
sudo engine-setup

# 安装node
yum install http://resources.ovirt.org/pub/yum-repo/ovirt-release42.rpm
yum -y install vdsm

```
## 使用
![20180703153062772853195.png](http://img.sandseasoft.com/20180703153062772853195.png)

### 参考

* https://www.jianshu.com/p/9d699c05c17b
* https://www.ovirt.org/documentation/




