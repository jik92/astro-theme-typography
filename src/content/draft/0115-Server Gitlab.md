title: Server Gitlab
date: 2020/12/20 06:09:46
categories:

 - ops

tags:
 - gitlab
 - gitlab-runner

---

## Comcept

* root
* control version system
 * Files
 * Comments
 * MergeRequests
* CI/CD
 * Builds
 * Graph
* project manage
 * Milestones
 * Issues
* document
 * Wiki
 * Snippts
 * Labels

# Instalation

## All in One Step

https://about.gitlab.com/downloads/# ubuntu1404
https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/

```language-bash
# 安装
rpm -i gitlab-7.7.2omnibus.5.4.2.ci-1.el6.x8664.rpm 
# 重置配置
gitlab-ctl reconfigure
# 备份文件目录/var/opt/gitlab/backups
gitlab-rake gitlab:backup:create 
# 修改备份文件目录
vim /etc/gitlab/gitlab.rb
   gitlabrails['backuppath'] = '/mnt/backups' 
# 恢复备份
gitlab-ctl stop
gitlab-rake gitlab:backup:restore BACKUP=1393513186
gitlab-ctl start
# 升级
gitlab-ctl upgrade
# 升级2
查看：https://about.gitlab.com/upgrade-to-package-repository/
```

## Updated Configuaration

```language-bash
 gitlab_rails['gitlab_email_enabled'] = true
 gitlab_rails['gitlab_email_from'] = 'xxxxx@58gxb.com'
 gitlab_rails['gitlab_email_display_name'] = 'Gitlab Server '

 gitlab_rails['smtp_enable'] = true
 gitlab_rails['smtp_address'] = "smtp.mxhichina.com"
 gitlab_rails['smtp_port'] = 25
 gitlab_rails['smtp_user_name'] = "xxxxx@58gxb.com"
 gitlab_rails['smtp_password'] = "passwd"
 gitlab_rails['smtp_domain'] = "smtp.mxhichina.com"
 gitlab_rails['smtp_authentication'] = "plain"
 gitlab_rails['smtp_enable_starttls_auto'] = false
```

## Gitlab-runner

* Installation https://docs.gitlab.com/runner/
```language-bash
# https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html
rpm -i xxx.rpm
dpkg -i xxx.deb
# 
gitlab-runner register
# select shell mode
```
* .gitlab-ci.yml
```language-bash
stages
	- complie
	- build
	- deploy

job_name:
  stage: test
  script:
    - echo hello
  only:
    - master
  except:
    - develop
  tags:
    - demo
  allow_failure: true
  when: manual
```

# Quete

* https://about.gitlab.com/gitlab-com/


