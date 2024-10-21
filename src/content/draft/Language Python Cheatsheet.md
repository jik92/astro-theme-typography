title: Language Python Cheatsheet
date: 2019/12/24 02:30:01
categories:
 - dev
tags:
 - python 



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
pyenv global 2.7
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
pip install -r requirment.txt
pip install --upgrade pip

isort -rc xxxxx & black xxxxx #formatter
flake8 xxxxx #lint
mypy xxxxx #type checking
```



```bash
sudo pip install virtualenv
virtualenv .
source bin/activate
pip install gunicorn
gunicorn -w 4 myapp:app
pkill gunicorn
```



# 常用包

 * jupyter  http://jupyter.readthedocs.org/
 * matplotlib  http://www.labri.fr/perso/nrougier/teaching/matplotlib/
 * numpy、panda

常用第三方库

 * virtualenv
 * pillow
 * flask/requests/aiohttp/asyncio
 * chardet
 * psutil







导索引

找k大

