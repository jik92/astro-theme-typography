title: Server Conflunce
date: 2016/04/01 05:51:53
categories:
 - tryghost

tags:
 - manage 



---

## 官网
https://www.atlassian.com/software/confluence/download

## 配置
https://confluence.atlassian.com/doc/confluence-home-and-other-important-directories-590259707.html

atlassian-confluence-5.9.7/confluence/WEB-INF/classes/confluence-init.properties 

```language-bash
confluence.home=/var/atlassian/application-data/confluence
```
## 汉化
安装引导页直接设置

## 破解
https://pan.baidu.com/s/1bAvzt0

1. 下载 atlassian-extras-decoder-v2-3.3.0.jar 文件到本地用 confluence_keygen.jar 去 patch 然后重新上传
2. confluence_keygen.jar 填写 ServerID 直接 gen 去 paste 完成

## 初始化配置
 * 启动 start-conflunce.sh
 * mail 邮箱
 * 内存配置 setenv.sh
 * 上传字体显示PDF中文

## 字体安装
1. 先安装想要的字体, 如微软雅黑, 宋体等, 从windows/font下拷到linux的/usr/share/fonts下, 新建个目录比如msttcore放进去, 请自行搜索linux下新字体的安装方法
2. 在confluence的安装目录, 如/opt/atlassian/confluence/bin下找到setenv.sh, 找到CATALINA_OPTS, 加入一行
CATALINA_OPTS="-Dconfluence.document.conversion.fontpath=/usr/share/fonts/msttcore/ ${CATALINA_OPTS}"
3. 清空confluence的home下viewfile目录和shared-home/dcl-document目录里的所有缓存文档文件, 不清空的话, confluence预览旧文件时还是会显示方框,只有新文件才会正常.
4. 重启confluence就OK了




