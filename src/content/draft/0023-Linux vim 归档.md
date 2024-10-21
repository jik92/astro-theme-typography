title: Linux vim 归档
date: 2015/04/11 06:43:10
categories:
 - tryghost

tags:
 - devops 



---

这个不会用真的蛋疼, 常用的命令归结如下:

```linux
# 退出相关
wq		保存退出
:q!		不保存退出

# 编辑相关
dd		删除一行
x		删除后一个字符
X		删除前一个字符
[n]yy	复制 n 行  
pp              粘贴

# 移动相关
^		移动行头
$		移动行尾
w		移动当下一个word头
f		向下翻页
b		向上翻页
gg/GG           全文头，全文尾
dG              删除所有

# 查询相关
//xxx	查询任意关键字
n		匹配下一个
N		匹配上一个
```

![](http://img.sandseasoft.com/image/1/07/a6944cd955f2b14e11c80714db9a4.png)



