title: Hybird Framwork ionic
date: 2015/03/09 15:45:27
categories:
 - tryghost

tags:
 - nodejs 



---

>mac 搭建 ioinc 很方便... 比 win 系舒服多了.
一定要翻墙,不然一下操作充满荆棘,可以说不可能完成


#### 基础环境安装
##### java/xcode自行安装
略
##### homebrew
```linux
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
##### ant
```linux
brew install ant
```
##### nodejs/gulp
```linux
brew install nodejs
brew install gulp 
npm install gulp-connect
```
##### ionic/cordova 安装
```linux
npm install -g cordova ionic
```
##### android-sdk 编译环境
```linux
brew install android-sdk
```
```linux
android      # 调取 gui, 安装 tools, api 自选(api21/pt/bt)
android sdk
android avd  # 增加一个虚拟机帮助 emulate
adb version  # 检查安装是否成功
```
#### ios 编译环境
```linux
npm install -g ios-sim
```

##### ionic 使用
```linux
ionic start myApp blank      # 空白模板
ionic start myApp tabs		 # tab
ionic start myApp sidemenu	 # sidemenu 侧滑版
ionic login 				 # 登陆
ionic upload				 # 上传
```
#####  ionic打包
```linux
ionic platform add ios/android/brower
ionic build ios/android/browser
ionic emulate ios/android/browser
ionic run andoird # 真机测试
ionic serve # 也可以先在浏览器里看效果，如果chrome安装了livereload插件，可以实现实时变化
```
ps: 编译 android 选择版本
myApp 下有project.properties  配置 target=android-xx 选择对应版本



参考文章:

http://www.tuicool.com/articles/veYBNzr
[http://haomou.net/2014/10/06/2014_ionic_learn/](http://haomou.net/2014/10/06/2014_ionic_learn/)


######   补充
change mirror
```
http://npm.taobao.org/
http://cnpmjs.org/
```

cvs
```
npm install -g n
n use 0.12
n use 0.10.38
n
```



