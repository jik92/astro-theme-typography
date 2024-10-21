title: Golang 学习
date: 2017/01/11 17:13:39
categories:
 - tryghost

tags:
 - python 



---

# 背景
* 内存控制良好
* 性能高
* 天生并发优势
* 支持编译机器码，无依赖

# 基础
```language-go
// 程序运行的入口是包 main 
package main
// 导入
import "fmt"
// 函数声明
func main() {
	fmt.Println("Hello")
}
```
GOPATH 指向 go get下载包目录

```language-bash
# 格式化
go fmt
# 构建编译
go build -o fileName main.go
# 获取库
go get -u xxxx
```

# 使用
* IDE idea+golang plugin



# 引用
https://golang.org/
https://tour.go-zh.org/welcome/1
https://github.com/go-lang-plugin-org/go-lang-idea-plugin
http://wiki.jikexueyuan.com/project/go-command-tutorial




