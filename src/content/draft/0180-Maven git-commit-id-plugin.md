title: Maven git-commit-id-plugin
date: 2016/12/20 17:35:43
categories:
 - tryghost

tags:
 - java 



---

## 地址
https://github.com/ktoso/maven-git-commit-id-plugin 
## 使用


```language-xml
            <plugin>
                <groupId>pl.project13.maven</groupId>
                <artifactId>git-commit-id-plugin</artifactId>
                <version>2.1.5</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>revision</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <!--日期格式;默认值:dd.MM.yyyy '@' HH:mm:ss z;-->
                    <dateFormat>yyyyMMddHHmmss</dateFormat>
                    <!--,构建过程中,是否打印详细信息;默认值:false;-->
                    <verbose>true</verbose>
                    <!-- ".git"文件路径;默认值:${project.basedir}/.git; -->
                    <dotGitDirectory>${project.basedir}/.git</dotGitDirectory>
                    <!--若项目打包类型为pom,是否取消构建;默认值:true;-->
                    <skipPoms>false</skipPoms>
                    <!--是否生成"git.properties"文件;默认值:false;-->
                    <generateGitPropertiesFile>true</generateGitPropertiesFile>
                    <!--指定"git.properties"文件的存放路径(相对于${project.basedir}的一个路径);-->
                    <generateGitPropertiesFilename>src/main/resources/git/git.properties</generateGitPropertiesFilename>
                    <!--".git"文件夹未找到时,构建是否失败;若设置true,则构建失败;若设置false,则跳过执行该目标;默认值:true;-->
                    <failOnNoGitDirectory>true</failOnNoGitDirectory>

                    <gitDescribe>
                        <!--是否生成描述属性-->
                        <skip>false</skip>
                        <!--提交操作未发现tag时,仅打印提交操作ID,-->
                        <always>false</always>
                        <!--提交操作ID显式字符长度,最大值为:40;默认值:7;
                            0代表特殊意义;后面有解释;
                        -->
                        <abbrev>7</abbrev>
                        <!--构建触发时,代码有修改时(即"dirty state"),添加指定后缀;默认值:"";-->
                        <dirty>-dirty</dirty>
                        <!--always print using the "tag-commits_from_tag-g_commit_id-maybe_dirty" format, even if "on" a tag.
                            The distance will always be 0 if you're "on" the tag.
                        -->
                        <forceLongFormat>false</forceLongFormat>
                    </gitDescribe>
                </configuration>
            </plugin>
```

## 引用
http://www.tuicool.com/articles/JJry2a



