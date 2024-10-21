title: Enviroment java diff versions env switch
date: 2015/05/09 08:06:23
categories:
 - tryghost

tags:
 - devops 



---


### config
```language-bash
sudo vim ~/.bashrc
```

```language-bash
export JAVA_6_HOME=/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_75.jdk/Contents/Home
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_45.jdk/Contents/Home
export JAVA_HOME=$JAVA_7_HOME

alias jdk8='export JAVA_HOME=$JAVA_8_HOME'
alias jdk7='export JAVA_HOME=$JAVA_7_HOME'
alias jdk6='export JAVA_HOME=$JAVA_6_HOME'
```

```language-bash
source ~/.bashrc
```

#### how to use




