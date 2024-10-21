title: Spring-Mybatis3
date: 2016/05/17 04:00:36
categories:
 - tryghost

tags:
 - java 



---

## Mybatis 构建器
http://generator.sturgeon.mopaas.com/index.html

### 使用
配置 generatorConfig.xml
```language-xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>

    <classPathEntry
            location="/Users/zuoyun1/.m2/repository/mysql/mysql-connector-java/5.1.37/mysql-connector-java-5.1.37.jar"/>

    <context id="MysqlTables" targetRuntime="MyBatis3">

        <commentGenerator>
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://111.mysql.rds.aliyuncs.com:3306/gxb_dev"
                        userId="111" password="111">
        </jdbcConnection>
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>


        <!--领域模型构建-->
        <javaModelGenerator targetPackage="com.gxb.domain" targetProject="./src/main/java">
            <property name="enableSubPackages" value="true"/>
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>
        <!-- mapping package and location -->
        <sqlMapGenerator targetPackage="mapper" targetProject="./src/main/resources/">
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>
        <!-- dao package and location -->
        <javaClientGenerator type="MIXEDMAPPER" targetPackage="com.gxb.dao" targetProject="./src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>


        <table tableName="app_user" domainObjectName="AppUser" enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false" enableSelectByExample="false" selectByExampleQueryId="false"/>


    </context>


</generatorConfiguration>

```
pom.xml
```language-xml
            <!--mybatis 插件-->
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.2</version>
                <configuration>
                    <verbose>true</verbose>
                    <overwrite>true</overwrite>
                </configuration>
            </plugin>
```


Mybatis3
https://github.com/mybatis/mybatis-3
http://www.mybatis.org/mybatis-3/zh/index.html

插件相关
http://www.mybatis.tk/
http://git.oschina.net/juapk/mybatis-plus




