title: Linux Operations Awesome
date: 2015/06/24 03:56:01
categories:
 - tryghost

tags:
 - 未归档 



---

这是我自己总结的运维最佳实践

## ssh-copy-id
两个工具  ssh-keygen/ssh-copy-id
```language-bash
# 生成公钥密钥
ssh-keygen -t rsa

# 做免密登陆
# https://www.ssh.com/ssh/copy-id
install ssh-copy-id
ssh-copy-id -i ~/.ssh/xx.pub root@domain.com
```

## 手动关闭 密码登陆
```language-bash
vim /etc/ssh/sshd_config
PasswordAuthentication no

service ssh restart
```
PS: 也可以用 SecureCRT 生成 openSSH 格式的 RSA 密钥绑定
```language-bash
ssh-keygen
cat gxb_server.pub >> ~/.ssh/authorized_keys 
```

## 会话转发
```language-javascript
ssh -fN -L 10022:server1_host:server1_port -p gateway_port gateway_usr@gateway_host
ssh -p 10022 root@localhost
```

如果报错
>Could not open a connection to your authentication agent.
```language-bash
eval `ssh-agent`
```
## enjoy it



