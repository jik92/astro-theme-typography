title: Server Gitlab
date: 2020/04/03 06:09:46
categories:
 - ops

tags:
 - git
 - gitlab


---

## official

https://about.gitlab.com/gitlab-com/

https://about.gitlab.com/downloads 
https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/



## install
```language-bash
vim /etc/gitlab/gitlab.rb
nginx['enable'] = false
gitlab_workhorse['listen_network'] = "tcp"
gitlab_workhorse['listen_addr'] = "127.0.0.1:8021"  

gitlab-ctl reconfigure
gitlab-ctl restart
gitlab-ctl status

server {
    listen       80; 
    server_name  git.xxx.com;

    location / {
        root  html;
        index index.html index.htm;
        proxy_pass http://127.0.0.1:8021; 
    }
}
```

## email settings
```language-bash
 gitlab_rails['gitlab_email_enabled'] = true
 gitlab_rails['gitlab_email_from'] = 'zuo.zhong@163.com'
 gitlab_rails['gitlab_email_display_name'] = 'Gitlab Server '
# aliyun
 gitlab_rails['smtp_enable'] = true
 gitlab_rails['smtp_address'] = "smtp.mxhichina.com"
 gitlab_rails['smtp_port'] = 25
 gitlab_rails['smtp_user_name'] = "xxxxx@58gxb.com"
 gitlab_rails['smtp_password'] = "passwd"
 gitlab_rails['smtp_domain'] = "smtp.mxhichina.com"
 gitlab_rails['smtp_authentication'] = "plain"
 gitlab_rails['smtp_enable_starttls_auto'] = false
#163
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.163.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "zuo.zhong@163.com"
gitlab_rails['smtp_password'] = "XXXXX"
gitlab_rails['smtp_domain'] = "163.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true

#test
gitlab-rails console -e production
Notify.test_email('zuo.zhong@163.com', 'Message Subject', 'Message Body').deliver_now
```

## Gitlab-CI
* 安装参考：https://docs.gitlab.com/runner/install/
```bash
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
sudo yum install gitlab-ci-multi-runner
sudo gitlab-ci-multi-runner register
sudo gitlab-runner start|stop

https://gitlab.com/gitlab-org/gitlab-runner/-/blob/master/docs/configuration/advanced-configuration.md

https://docs.gitlab.com/runner/configuration/advanced-configuration.html#how-clone_url-works
[[runners]]
  name = "ruby-2.6-docker"
  url = "https://CI/"
  token = "TOKEN"
  limit = 0
  executor = "docker"
  builds_dir = ""
  shell = ""
  environment = ["ENV=value", "LC_ALL=en_US.UTF-8"]
  clone_url = "http://gitlab.example.local"

```
* .gitlab-ci.yml
```language-bash
variables:
  MVN: "/home/gitlab-runner/maven/maven/bin/"

stages:
  - build
  - test
  - deploy

maven_build:
  stage: build
  only:
    - master
  script:
    - echo "Building project with maven"
    - whoami
    - $MVN/mvn clean install -Dmaven.test.skip=true

maven_test:
  stage: test
  only:
    - master
  script:
    - echo "Testing project with maven"
```



## Backup

https://www.cnblogs.com/Justin0717/p/12662549.html








