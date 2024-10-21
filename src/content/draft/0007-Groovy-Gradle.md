title: Groovy/Gradle
date: 2014/12/22 15:35:34
categories:
 - tryghost

tags:
 - java 



---

>敏捷语言

这门语言资料感觉并不多,[官方](http://groovy.codehaus.org/)有不错的文档,同时建议下载***Groovy 2 Cookbook***和***Making Java Groovy*** 这两本电子书学习.语言本身我真的很喜欢,作为脚本语言灵巧可爱,做些总结,未来还会继续探索,希望能用于生产.

groovy_simple github:  
[https://github.com/jik1992/groovy\_sample](https://github.com/jik1992/groovy_sample)

groovy 官方资料站点:
http://docs.codehaus.org/display/GROOVY/Home

已知的应用范围

 * unit test->   groovy mock/groovy test/spock
 * build tools ->gradle
 * swing ui -> griffon
 * mvcframework ->grails
 * more?  actor model/httpbuilder/for Android?
 
 
#### 包结构
![](http://img.sandseasoft.com/image/7/5b/11fd893574d211fb27e67231032d7.jpg)

![](http://img.sandseasoft.com/image/0/8d/941d564e82d6bc1ea46a4fc65b9c6.jpg)
 
 过几天准备探索spring和maven的整合

#### 注解
```
@TypeChecked //静态检查
@Singleton   //单列
@CompileStatic //静态编译
@ToString
@Mixin
@Immutable
@Grab  //独立script都可以使用这个注解加载包, 模块请使用gradle
```

#### groovy compile
三种
groovy
groovyc -d classes/-j # 编译成class/java(main方法)文件
groovyshell
groovyconsole

#### java/groovy 相互调用
* java JSR233/GroovyShell/Engine
```java
GroovyShell shell=new GroovyShell;
shell.execute("demo.groovy");
```
* groovy 直接使用
```groovy
import com.demo.java
object obj=new object();
# 或者使用注解
@Grab
```

#### groovy use build tools
使用maven 编译groovy ->mvn clean test
```xml
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.10</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.codehaus.gmaven.runtime</groupId>
    <artifactId>gmaven-runtime-2.0</artifactId>
    <version>1.4</version>
  </dependency>
</dependencies>
<build>
  <plugins>
    <plugin>
      <groupId>org.codehaus.gmaven</groupId>
      <artifactId>gmaven-plugin</artifactId>
      <version>1.4</version>
      <executions>
        <execution>
          <goals>
            <goal>compile</goal>
            <goal>testCompile</goal>
          </goals>
        </execution>
      </executions>
      <dependencies>
        <dependency>
          <groupId>org.codehaus.gmaven.runtime</groupId>
                    <artifactId>gmaven-runtime-2.0</artifactId>
          <version>1.4</version>
        </dependency>
      </dependencies>
    </plugin>
  </plugins>
</build>
```
gradle
```
apply plugin: 'groovy'
repositories {
  mavenCentral()
}
dependencies {
  compile localGroovy()
  compile 'ch.qos.logback:logback-classic:1.+'
  compile 'org.slf4j:slf4j-api:1.7.4'
  compile 'commons-io:commons-io:1.4'
  compile 'com.jcraft:jsch:0.1.49'
  testCompile 'junit:junit:4.+'
}
```

#### api/feature
```groovy
//集合
1）省略了JavaBean的getter和setter方法；
2）默认情况，所有的类属性都是public的；
3）构造函数很有特色，Map方式。
intlist=[1,2,3,4,5];
map=[a:4,b:2];
intlist.add("Python")
intlist << "Smalltalk"
intlist[5] = "Perl"

//二元运算符
def a=?:b

//安全占位符
def b=a?.property

//字符串模板
def s1='hello wolrd'   //默认string
def s2="hello ${s1}"   //GString
def multiLineQuote = """
Hello, ${name}
This is a multiline string with double quotes
"""                     //多行字符串

//as关键字
def a="45";
def b=a as int; //b cout<< 45 

//判断
if (a==b)   等价于  if (a.equal(b))

// 
["Java", "Groovy"]*.toUpperCase()
```

#### groovy script
```
# !/usr/bin/groovy
println "Hello ${args[0]}, may Groovy be with you."

groovy -e "println 'Hello World!'"
```


#### GroovyTestCase/Spock
```
assert 1==2 : "One isn't Two"
```

#### 其他的项目
##### Grails
##### GPars
##### GVM
##### Griffon
##### GroovyServ
##### CodeNarc
##### Gaiden




