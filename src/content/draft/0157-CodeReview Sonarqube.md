title: CodeReview Sonarqube
date: 2016/07/23 02:33:08
categories:
 - tryghost

tags:
 - manage 



---

# SonarQube
## 安装
```
brew install sonarqube
```
## 使用
localhost:9000

snoarqube
## 使用
admin:admin
```
localhost:9000
```

扫描端配置

https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner+for+Maven

配置settings.xml
```language-xml
<settings>
    <pluginGroups>
        <pluginGroup>org.sonarsource.scanner.maven</pluginGroup>
    </pluginGroups>
    <profiles>
        <profile>
            <id>sonar</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <!-- Optional URL to server. Default value is http://localhost:9000 -->
                <sonar.host.url>
                  http://myserver:9000
                </sonar.host.url>
            </properties>
        </profile>
     </profiles>
</settings>
```
```language-bash
mvn clean verify sonar:sonar
mvn clean install
mvn sonar:sonar 
```
PS 注意环境要求，只支持jdk1.8+ maven 3+



