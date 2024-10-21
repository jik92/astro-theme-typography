title: Crawler pyspider
date: 2017/01/03 03:20:34
categories:
 - tryghost

tags:
 - python 



---

## 背景
快速爬虫

## 使用
pip install pyspider
pyspider -c conf.json

1. create script
2. set running 
3. run

```lanuage-javasciprt
{
  "taskdb": "mysql+taskdb://root:123456@172.16.1.13:3306/crawler",
  "projectdb": "mysql+projectdb://root:123456@172.16.1.13:3306/crawler",
  "resultdb": "mysql+resultdb://root:123456@172.16.1.13:3306/crawler"
  "webui": {
    "username": "admin",
    "password": "admin",
    "need-auth": true
  }
}

## 如果有数据表缺陷问题
ALTER TABLE xxxx ADD result varchar(2024) default '{}'
```

## 函数
```language-python
##  爬取回调
self.crawl('http://scrapy.org/', callback=self.index_page)
##  解析jquery
response.doc('a[href^="http"]').items()
```

重写result方法，存储至mysql
```language-python
    def on_result(self, result):
        # print result
        if not result or not result['title']:
            return
        sql = SQL()
        sql.replace('info',**result)

```
PS 高并发写会锁表，这个有点麻烦，注意log

## 引用
https://github.com/binux/pyspider
http://docs.pyspider.org/en/latest/




