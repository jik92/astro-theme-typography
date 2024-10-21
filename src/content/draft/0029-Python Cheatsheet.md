title: Python Cheatsheet
date: 2015/05/09 02:30:01
categories:
 - tryghost

tags:
 - 未归档 



---

# demo 
```language-python
#  -*- coding:utf-8 -*-
```
https://github.com/jik1992/pythonDemo

# 最佳实践
 * 快速搭建一个 http 服务器
```language-bash 
python -m SimpleHTTPServer 30001
python3 -m http.server 30001
```
 * python3 没有 mysqldb 库了，取而代之的是 pymysql3

 * 线上部署pyenv(这个可以绕过 root 的问题)
https://github.com/yyuu/pyenv

```language-bash
git clone git://github.com/yyuu/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
exec $SHELL -l

pyenv install -list
pyenv install 2.7
pyenv install 3.4
pyenv versions
pyenv gloabl 2.7
pyenv shell 3.4  =>重启失效
```
 * 手动编译 python
```language-bash
https://www.python.org/ftp/python/
./configure --prefix=/usr/local/python27
make
make install
ln -s /usr/local/python27/bin/python /usr/sbin/python
```
 * 打包
```language-bash
virtualenv new_project -relocatable
cd new_project
source ./bin/activite
pip frezze > requirment.txt
```

# 常用包

 * jupyter  http://jupyter.readthedocs.org/
 * matplotlib  http://www.labri.fr/perso/nrougier/teaching/matplotlib/
 * numpy、panda



