title: Guide Gradle
date: 2016/07/28 12:22:33
categories:
 - tryghost

tags:
 - 未归档 



---

# 官网
https://gradle.org/

编译打包工具
settings.gradle
```language-bash
include 'usrbo'
project(':usrbo').projectDir = new File(settingsDir, '../usrbo/') 
```

build.gradle
```language-bash
apply plugin: 'war'
apply from: 'http://115.29.139.173:4480/ver/jyq.gradle'

version = '1.0.1.RELEASE'
webAppDirName = 'src/main/webapp'

dependencies {
    compile 'com.alibaba:fastjson:1.2.5'
    compile project(':usrbo');
    providedCompile 'javax.servlet:servlet-api:2.5'
    providedRuntime 'javax.servlet:jstl:1.2'
}

gradle.taskGraph.beforeTask { Task task ->"merge"
    println task.toString()
    if (task.toString().contains("war")) {
        try {
            println "写入 git 信息!"
            new File("src/main/config/git.properties").write(new File(".git/sourcetreeconfig").getText("UTF-8"))
            def log="git log --pretty=format:\"%h|%cn|%cd|%s\"  --date=short -n 1".execute().getText();
            println log;

            def properties=new Properties()

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
```





