title: blog system moving
date: 2018/08/5 15:24:36 
categories:
- ops
- dev
tags:
- nodejs
- blog
- travis
---

这里把原来tryghost的blog全部迁移到hexo上面来了，新的方案使用github+travisCI+hexo。 说一下整体过程

# 原因

1. tryghost版本太老，nodejs基于0.10.x的版本，dependence里面有很多包都有漏洞但是无法升级。
2. 新版本和老版本数据库不兼容。

# 过程

## 迁移过程

1. export tryghost backup.json
2. 把json通过java解析，用fastjson，velocity 库转换成md模版
3. import hexo，然后hexo clean ，hexo g集成

## 部署过程

1. github新建仓库zuoyun.me，设置blog-resouce 和master双分支
2. 对master分支设置GitHub page 和 CNAME，域名重定向
3. 对blog-resouce分支导入hexo和.travis.yml文件
4. 生成github token在travis-ci里面配置对应的库，完成ci配置

# 后记

## 注意事项

* CNAME 文件放到 theme/next/source 下

## .travis.yml文件

```
language: node_js
node_js: v10.21.0

# S: Build Lifecycle
install:
  - yarn install

cache:
    yarn: true
    apt: true
    directories:
        - node_modules # 缓存不经常更改的内容

script:
  - hexo clean  #清除
  - hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "chinajik"
  - git config user.email "chinajik@gmail.com"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${token}@${GH_REF}" master:master
# E: Build LifeCycle

branches:
  only:
    - blog-resource
env:
 global:
   - GH_REF: github.com/jik1992/zuoyun.me.git
```

## 引用

* https://www.jianshu.com/p/5691815b81b6