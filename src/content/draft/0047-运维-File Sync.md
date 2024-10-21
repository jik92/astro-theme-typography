title: 运维-File Sync
date: 2015/11/18 08:04:08
categories:
 - tryghost

tags:
 - devops 



---

# 远程复制
```language-bash
# 文件、目录复制上传
scp [-r] /source root@172.0.0.1:/target
# 增量同步
rsync -zvr /var/opt/installation/inventory/ /root/temp
rsync -avz /root/temp/ root@192.168.200.10:/home/root/temp/
rsync -avz root@192.168.200.10:/var/lib/rpm /root/temp
```

# 远程挂载-sshfs
```language-bash
apt-get install sshfs
sshfs -C -o reconnect root@127.0.0.1:/root/workspace /home/ghost
```
# 单向同步-lsyncd
### 安装
```language-bash
apt-get install lsyncd
```

### 使用
conf
```language
## 设置日志文件，文件必须存在
settings {
        logfile = "/var/log/lsyncd/lsyncd.log",
        statusFile = "/var/log/lsyncd/lsyncd.status"
}
## 远程同步
sync {
        default.rsyncssh,
        source = "/tmp/src",
        host = "104.131.152.150",
        targetdir = "/remote"
}
## 本地同步
sync {
        default.rsync,
        source = "/tmp/src",
        target = "/tmp/dest"
}

```
remote 配置 ssh-copy-id
```language-bash
sudo su
ssh-keygen -t rsa
ssh-copy-id root@192.168.2.5
ssh 192.168.2.5
mkdir /remote
```

```language-bash
### 查看帮助
lsyncd -help
### debug 模式，测试通过直接可用
lsyncd -nodaemon ~/lsyncd/lsyncd.conf.lua
```





