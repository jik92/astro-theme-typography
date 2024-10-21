title: Python Ansible
date: 2015/12/31 03:39:24
categories:
 - tryghost

tags:
 - devops 
 - python 



---

# 简介
类似工具如 fabic，ppssh，客户端需要 python>2.4
配置Inventory路径在 etc/ansible/hosts
# 安装
* http://docs.ans ible.com/ansible/latest/intro_installation.html# installation
* http://www.ansible.com.cn/docs/tower.html
# 指南
http://www.ansible.com.cn/
# 概念
* inventory 机器清单
* playbook 部署脚本
# 常用命令
```language-bash
pip install ansible
# 命令集
ansible --version
ansible-playbook 
ansible-doc
# 配置
# 默认是没有/etc/ansible/ansible.cfg文件需要自建
/etc/ansible/ansible.cfg
/etc/ansible/hosts
/usr/share/ansible_plugins/
# 常用命令
ansible -vvv -i /etc/ansible/hosts all -m ping 
ansible all -m raw  -a "echo 1"
ansible all -m copy -a "src=xx dest=/"
ansible all -a "uptime"
```

# Playbook使用
对于稳定的配置，就要使用playbook了。

一个playbook由多个play组成，一个play由多个task组成，参考Intro to Playbooks。

一个playbook的文件内容通常是如下形式：
```language-python
- hosts: groupname
  remote_user: yourname
  sudo: yes
  tasks:
  - name: delete /tmp/server-test
    shell: rm -rf /tmp/server-test

```
使用
```language-bash
ansible-playbook  -i hosts all xx.yml
ansible-playbook  xx.yml --check

```
# 参考
http://docs.ansible.com/ansible/
http://www.tuicool.com/articles/AZVJ3qQ
https://linuxtoy.org/archives/hands-on-with-ansible.html



