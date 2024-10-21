title: Xcode Dev
date: 2018/08/10 15:24:36
categories:
- dev
tags:
- swift
- ios
- macos 
- guide

---



# Swift

基础语法



#APPFramework 框架

整个 xcode 的集成开发包，其中有几个常见的库介绍，在 help 里面找 document 可以看具体对象的说明

* AppKit
  * [Core App](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870785) 核心库
  * [Data Management](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2871784) 数据管理
  * [Resource Management](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870786) 资源管理
  * [Views and Controls](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870789) 视图UI 控件
  * [View Management](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870790) 视图管理
  * [Menus, Cursors, and the Dock](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870791) 菜单光标和 dock
  * [Windows, Panels, and Screens](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870788) 窗口面板屏幕
  * [Accessibility](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870795) 授权
  * [Animation](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870793) 动画
  * [Drag and Drop](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870794) 拖拽支持库
  * [Sound, Speech, and Haptics](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870796) 声音，语音，和触觉
  * [Mouse, Keyboard, and Trackpad ](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870797) 声音，语音，和触觉
  * [Gestures](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870798)  手势
  * [Images and PDF](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870821)  声音，语音，和触觉
  * [Drawing](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870822)  绘图
  * [Color](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2880984)  颜色
  * [Printing](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870823)  打印
  * [TextKit](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870801)
  * [Fonts](https://link.jianshu.com?t=apple-reference-documentation%3A%2F%2Ftc2870802) 字体
* UIKit
* Foundation
  * NSArray
  * NSDict



# Xcode 开发

## 新建项目

![image-20180810152631378](http://img.sandseasoft.com/20180810153388798150971.png)

1. 打开 xcode
2. 结构体如上，xxxTests和xxxUITests 是测试文件夹，Products 是成品包，app文件直接放入DropDMG 直接可以打包，第一个文件夹就是代码文件了，其中*.storyboard 是 UI 设计的文件
3.  点击*.storyboard 拖拽 component

## 使用cocoaPods

* 本质就是一个 maven 一样的包管理器。
* CocoaPods的原理是将所有的依赖库都放到另一个名为Pods的项目中，然后让主项目依赖Pods项目，这样，源码管理工作都从主项目移到了Pods项目中。Pods项目最终会编译成一个名为libPods.a的文件，主项目只需要依赖这个.a文件即可。
* 第一次执行pod setup时,CocoaPods会将这些podspec索引文件更新到本地的~/.cocoapods目录下,这个索引文件比较大,所以第一次更新时非常慢.

```bash
#安装 cocoaPods
sudo gem install cocoapods
pod setup
#查找对应库
pod search AFNetworking
#进入工程所在的目录（工程根目录）
pod init
vim Podfile

platform :ios, '8.0'
use_frameworks!

target 'MyApp' do
  pod 'AFNetworking', '~> 2.6'
  pod 'SQLite.swift', '~> 0.11.4'
  pod 'SwiftyJSON', '~> 2.3'
end
#安装对应库
pod install
#使用xcworkspace 打开项目
open App.xcworkspace
#依赖使用
import SQLite
//如果不存在的话，创建一个名为db.sqlite3的数据库，并且连接数据库 
let path = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first! 
let db = try Connection("\(path)/db.sqlite3")



```



# UI 控件设计

## xib 的使用

* xib 和 NSViewController 两个成对使用，绑定一个 UI 对应的交互行为，做 macOS 开发的时候常用

  ```
  //注意这里声明的时候作为成员变量，防止引用对象被释放
  var demoWindow: NSWidowController
  
  demoWindow=DemoWindow();
  demoWindow.showWindows(nil);
  ```



## storyboards使用

storyboard官方希望替代 xib 的策略，ios 常用

1. 新建 storyboards，并设置为 main

2. 点击圆球右键拖拽至下一个 Scene，设置 Segue 的 Kind

3. 页面跳转两种方案，设置 button 直接右键连接下一个 Scene；或者设置Segue的Identifier，然后设置一个 button 的 event，调用

4. ```
   self.performSegue( withIdentifier: NSStoryboardSegue.Identifier(rawValue: "123123"), sender: "11")
   ```

##### 直接显式调用

```swift
import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate {
    private var windowController: NSWindowController!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        createMenu()
        windowController = WindowController()
        windowController.showWindow(self)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    private func createMenu() {
        let mainMenu = NSMenu(title: "MainMenu")
        let applicationMenuItem = mainMenu.addItem(withTitle: "Application", action: nil, keyEquivalent: "")
        let applicationSubmenu = NSMenu(title: "Application")
        let quitMenuItem = applicationSubmenu.addItem(withTitle: "Quit", action:#selector(NSApplication.terminate(_:)), keyEquivalent:"q")
        quitMenuItem.target = NSApp
        mainMenu.setSubmenu(applicationSubmenu, for: applicationMenuItem)
        NSApp.mainMenu = mainMenu
    }
}

```



# UIWebView 和 JSBright

# 调用第三方库

## Swift4.0 调用 OC 库

## Swift4.0 调用 SQLite

## Swift4.0 调用 Alamofire

# 参考

* https://www.jianshu.com/p/30e31282c4b9
* https://cocoapods.org/
* http://footle.org/WeatherBar/
* https://blog.csdn.net/fl2011sx/article/details/73252859