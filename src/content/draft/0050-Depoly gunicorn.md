title: Depoly gunicorn
date: 2020/2/01 17:19:43
categories:

 - gunicorn
 - python
 - systemd

tags:
 - python



---

# Introduction

* http://gunicorn.org

# Usage

```language-bash
# test
gunicorn -b 0.0.0.0:8011 --timeout 3600 \
				 --worker-class aiohttp.worker.GunicornWebWorker --capture-output \
				 --log-file - task_online.mark_service.main:app

# lannch with deamon
# added gunicorn.service in /etc/systemd/system/

###
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
Type=notify
User=jik1992
Group=jik1992
RuntimeDirectory=gunicorn
WorkingDirectory=/home/jik1992/project/
ExecStart=/usr/bin/gunicorn -b 0.0.0.0:8011 --timeout 3600 --worker-class aiohttp.worker.GunicornWebWorker --capture-output --log-file - task_online.mark_service.main:app
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
###

sudo systemctl daemon-reload
sudo systemctl stop gunicorn.service
sudo systemctl start gunicorn.service
sudo systemctl status gunicorn.service
```

然后 nginx 再反代一下就好了



