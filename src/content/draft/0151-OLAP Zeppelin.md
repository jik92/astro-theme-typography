title: OLAP Zeppelin
date: 2016/07/06 08:33:56
categories:
 - tryghost

tags:
 - python 



---

## 背景
OLAP 工具，类似方案如 tableau 或者 Python + Matplotlib 都是可以的

## 启动
```language-bash
 ./bin/zeppelin-daemon.sh status
```

## 使用
1. zeppelin-0.6.2-bin-all/interpreter/jdbc 放mysql jdbc插件
2. 编辑 Interpreters 的jdbc句柄，更换 driver/url/user/passwd
3. 设置notebook
```language-mysql
%jdbc
select * from demo_copy
```

![](http://img.sandseasoft.com/image/8/75/08c16e4557008ee22b1e314b34011.png)

## 引用
* http://zeppelin.apache.org/
* http://zeppelin.apache.org/docs/0.6.0/






