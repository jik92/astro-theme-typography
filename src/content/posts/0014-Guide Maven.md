---
title: Guide Maven
pubDate: 2014-12-27
categories: [ 'java' ]
description: ''
---

# maven

## 相关库

 * http://maven.oschina.net/home.html
 * http://maven.apache.org/
 * http://maven.apache.org/plugins/index.html

## 常用插件

 * maven-assembly-plugin
 * maven-resources-plugin
 * maven-jar-plugin
 * maven-deploy-plugin
 * maven-enforcer-plugin
 * tomcat 
 * maven-compiler-plugin

${log_dir}

## 常用命令
```
#  debug -X   重新拉 jar -U
mvn -X -U clean install 
#  查看依赖树
mvn dependency:tree 

```

# 模块划分

 * 查找依赖的顺序是 本地->镜像->remote repo 
 * 坐标        
```language-xml
        <groupId>com.raycloud.express</groupId>
        <artifactId>quicloud-express-knowledge-base-parent</artifactId>
        <version>1.0-SNAPSHOT</version>
```
 * 根配置
```language-xml
    <modules>
        <module>schedule-task</module>
        <module>schedule-trigger</module>
        <module>tools</module>
    </modules>

    <!--全局属性-->
   <properties>
        <project.build.sourceEncoding>utf-8</project.build.sourceEncoding>
       <version.spring.orm>3.2.4.RELEASE</version.spring.orm>
    </properties>

    <!--项目介绍-->
    <description>58gxb 数据仓库</description>

    <developers>
        <developer>
            <name>左韵</name>
            <email>zuoyun@58gxb.com</email>
        </developer>
    </developers>
    <organization>
        <name>伟基网络开发团队</name>
        <url>58gxb.com</url>
    </organization>

    <!--全局仓库-->
    <distributionManagement></distributionManagement>
    <issueManagement></issueManagement>
    <repositories></repositories>
    <pluginRepositories></pluginRepositories>

    <!--项目依赖-->
    <dependencyManagement></dependencyManagement>
    <build>
        <pluginManagement></pluginManagement>
    </build>


```
 * 全局环境配置
```language-xml
    <dependencyManagement>
    <distributionManagement>
    <pluginManagement>
    <properties>
    <profiles>
```


## 远程发布
```language-xml
            <!--tomcat7插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <!--redeploy-->
                    <url>http://localhost:8080/manager/text</url>
                    <server>tomcat</server>
                    <username>tomcat</username>
                    <password>s3cret</password>
                    <!--本地run-->
                    <port>8888</port>
                    <path>/</path>
                    <uriEncoding>utf-8</uriEncoding>
                </configuration>
            </plugin>
```

## 执行 shell 脚本
```language-xml
            <plugin>
                <artifactId>exec-maven-plugin</artifactId>
                <groupId>org.codehaus.mojo</groupId>
                <version>1.3.2</version>
                <executions>
                    <execution><!-- Run our version calculation script -->
                        <id>Version Calculation</id>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>
                        <configuration>
                            <!--<executable>echo "hello world"</executable>-->
                            <executable>${basedir}/scripts/calculate-version.sh</executable>
                        </configuration>
                    </execution>
                </executions>
                <configuration>
                    <executable>echo</executable>
                    <!-- optional -->
                    <workingDirectory>/tmp</workingDirectory>
                    <arguments>
                        <argument>"hello world"</argument>
                    </arguments>
                </configuration>
            </plugin>

```
## deploy-file
```language-bash
mvn deploy:deploy-file  
-DrepositoryId=raycloud  
-Durl=http://maven.superboss.cc:8081/nexus/content/repositories/releases/ -DgroupId=com.raycloud.express 
-DartifactId=taobao-sdk 
-Dversion=20160127   
-Dfile=taobao-sdk-java-auto_1453878322044-20160127.jar 
-Dsource=taobao-sdk-java-auto_1453878322044-20160127-source.jar


mvn install:install-file -Dfile=/root/build/guohai-report-server/guohai-report-server/lib/ojdbc7-12.1.0.2.0.jar -DgroupId=com.oracle -DartifactId=ojdbc7 -Dversion=12.1.0.2.0 -Dpackaging=jar
```



## deploy
```language-xml
    <!--构建仓库-->
    <distributionManagement>
        <repository>
            <id>releases</id>
            <name>Local Nexus Repository</name>
            <url>http://172.16.1.14:8081/repository/maven-releases/</url>
        </repository>
        <snapshotRepository>
            <id>snapshots</id>
            <name>Local Nexus Repository</name>
            <url>http://172.16.1.14:8081/repository/maven-snapshots/</url>
        </snapshotRepository>
    </distributionManagement>


//setting.xml 加上对应的权限登录
  <server>
      <id>releases</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
  <server>
      <id>snapshots</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
```

常见问题

 * 自依赖/循环依赖

```language-bash
例二：
-pl 构建制定模块
当执行mvn clean install -pl accouont-email,account-persist后会得到如下几个模块：~email和~persist。

例三：
-am 选项可以同时构建所列模块的依赖模块。
当执行mvn clean install -pl account-email -am 后会得到如下几个模块：~parent和~email。

例四：
-amd 选项可以同时构建依赖于所列模块的模块。
mvn clean install -pl account-parent -amd 后会得到如下模块：~parent、~email和~persist。

```
 1. http://www.infoq.com/cn/maven-practice 
 2. http://juvenshun.iteye.com/blog/305865



