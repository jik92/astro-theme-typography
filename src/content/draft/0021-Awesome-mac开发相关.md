title: Awesome-mac开发相关
date: 2015/02/26 20:24:15
categories:
 - tryghost

tags:
 - about 



---

# 常用软件推荐
## 办公
 * SogouInput(输入法)
 * MacDown( markdown 编辑器)
 * Mail(邮件管理)
 * NewsFlow(RSS 订阅)
 * Chrome(浏览器)
 * Office16(office办公全套49/年)
 
## 开发
 * SublimeText/Atom
 * iTerm/Tmux/oh-my-zsh/SecureCRT
 * Navicat Premium
 * Intellij Idea14/Xcode
 * SourceTree(Git GUI)
 * ParallelsDesktop(虚拟机)
 * RemoteDesktopConnection(远程桌面连接)
 
## 生活
 * NeteaseMusic
 * YoudaoNote/EverNote
 * Kindle
 * Thunder
 * Shadowsocks(翻墙)
 * WunderList/Fantastical2(TODOTools/Calender)
 * QQ
 * CleanMyMac3(mac 垃圾清理)

## 黑科技
 * Caffeine(防休眠)
 * Bartender(菜单栏管理)
 * PopClip(难以描述...)
 * Alfred2(超级搜索)
 * Moom(窗口布局管理)

### 其他问题
 * 由于无法使用80端口进行联调， 找到一个方案： 搞一个虚拟机装一个findler，修改host转发联调，不错。

 * gem 用不了, gem install rails 报错   openssl:ssl:sslerror   read would 

openssl 没有证书,   贴一下
```
cat /Library/Keychains/System.keychain > 11
cat /System/Library/Keychains/SystemRootCertificates.keychain > 11
cat 11>>/usr/local/etc/openssl/cert.pem
```
可以了

 * 网络
![](http://img.sandseasoft.com/image/3/8c/0baf1f2e9d77b9213d634fc7cdb5b.png)
![](http://img.sandseasoft.com/image/5/27/ca38e9e701636fed5f36bdb6691cc.png)


### 80转发
```
sudo -i 

/etc/pf.anchors/vbox

rdr pass on lo0 inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
rdr pass on lo0 inet proto tcp from any to any port 22 -> 127.0.0.1 port 8022
```

```
/etc/pf.conf 
scrub-anchor "com.apple/*"
nat-anchor "com.apple/*"
rdr-anchor "com.apple/*"
rdr-anchor "vbox"  # 添加
dummynet-anchor "com.apple/*"
anchor "com.apple/*"
load anchor "com.apple" from "/etc/pf.anchors/com.apple"
load anchor "vbox" from "/etc/pf.anchors/vbox"  # 添加
```
```
# 验证
pfctl -ef /etc/pf.conf

/System/Library/LaunchDaemons/com.apple.pfctl.plist
```
添加
```
<string>pfctl</string>
<string>-e</string>  # 这一句
<string>-f</string> 
<string>/etc/pf.conf</string>
```

## 整合 iterm2和 lrzsz
https://github.com/mmastrac/iterm2-zmodem













