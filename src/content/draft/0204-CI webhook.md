title: CI webhook
date: 2017/06/22 07:42:23
categories:
 - tryghost

tags:
 - devops 



---

一个简单的webhook工具，做自动部署可以考虑。基于go语言编写

https://github.com/adnanh/webhook

hooks.json
```
[
    {
        "id": "init",
        "execute-command": "/root/ops/webhook/init.sh",
        "include-command-output-in-response": true,
        "pass-arguments-to-command": [
            {
                "source": "url",
                "name": "key"
            }
        ]
    }
]
```
```language-bash
# !/bin/bash
ps -ef | grep webhook | grep -v grep | awk '{print $2}' | xargs kill -9
nohup ./webhook -hooks hooks.json -port 8086 -verbose > hook.log 2>&1 &
```

http://hs.hook.tech84.com/hooks/init?key=qwetty

## 备注
* hooks.json语法
https://github.com/adnanh/webhook/wiki/Hook-Definition
* chmod 644 xxx.sh 脚本执行权限
* "include-command-output-in-response":true 返回执行结果




