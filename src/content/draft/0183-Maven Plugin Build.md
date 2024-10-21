title: Maven Plugin Build
date: 2017/01/04 03:30:18
categories:
 - tryghost

tags:
 - java 



---

## 背景
  有时候要自己设计一个maven插件

## 使用
  注意：

* 老版本的maven支持注释里面@goal，并不支持@Mojo注解，导致编译错误，在编译maven plugin的时候使用最新的maven版本（3.3.x>）
* 插件命名方法  xxxx-maven-plugin 

一个合理的pom.xml
```language-xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.tech84</groupId>
    <artifactId>scaffold-maven-plugin</artifactId>
    <version>2.1-SNAPSHOT</version>
    <packaging>maven-plugin</packaging>


    <description>
        脚手架，项目生成器
    </description>

    <name>tech84-scaffold</name>
    <url>http://maven.apache.org</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.maven</groupId>
            <artifactId>maven-plugin-api</artifactId>
            <version>3.0</version>
        </dependency>

        <!-- dependencies to annotations -->
        <dependency>
            <groupId>org.apache.maven.plugin-tools</groupId>
            <artifactId>maven-plugin-annotations</artifactId>
            <version>3.4</version>
            <scope>provided</scope>
        </dependency>

    </dependencies>

    <distributionManagement>
        <snapshotRepository>
            <id>snapshots</id>
            <url>http://172.16.1.14:8081/nexus/content/repositories/snapshots</url>
        </snapshotRepository>
    </distributionManagement>

</project>
```
继承AbstractMojo的一个类
```language-java
@Mojo(name = "drive")
public class Car extends AbstractMojo {

  @Parameter(defaultValue = "8080")
  private Integer port;


  public void execute() throws MojoExecutionException, MojoFailureException {
    getLog().info("hello");
  }
}
```

最后 clean package deploy 可以正常使用
![](http://img.sandseasoft.com/201701041283450C8B04F-2D37-4938-8DCE-043E9F77A2A1.png)

## 参考

* http://maven.apache.org/guides/plugin/guide-java-plugin-development.html  



