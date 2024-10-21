title: linux-systemd 命令族
date: 2016/04/26 11:45:51
categories:
 - tryghost

tags:
 - devops 



---

新兴的 linux 的强大的进程管理工具，类似 win 系里面的任务管理器
# 功能方面
 * cgroups
 * logs
 * uptime 
 * resources
 * security


# 基础命令
```langauge-bash
# 任务
pstree

# 启动分析
systemd-analyze time
systemd-analyze blame

# 模块管理
systemctl list-units
systemctl --failed

# 运行时任务
systemd-cgls
systemd-cgtop 

# 引导任务
systemctl is-enabled dnsmasq.service
systemctl enable dnsmasq.service
systemctl disable dnsmasq.service
systemctl daemon-reload


# 电源管理
systemctl poweroff
systemctl reboot
systemctl suspend
systemctl hibernate

# 系统信息
hostnamectl
```

# 构建一个服务
```language-bash
cd /etc/systemd/system
cat aliyun.service 

[Unit]
Description=auto run aliyunservice or agent
[Service]
Type=simple
ExecStart=/usr/sbin/aliyun-service
Restart=always 
RestartSec=1
[Install]
WantedBy=multi-user.target
```
```language-bash
[Unit]
Description=Nginx
After=syslog.target network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit

[Install]
WantedBy=multi-user.target

```

http://www.jinbuguo.com/systemd/systemd.service.html
http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html




