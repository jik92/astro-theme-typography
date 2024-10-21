title: TaskManager celery
date: 2016/01/09 05:37:19
categories:
 - tryghost

tags:
 - python 



---

分布式任务调度

https://github.com/mher/flower
https://github.com/celery/celery
http://docs.jinkan.org/docs/celery/
http://my.oschina.net/siddontang/blog/284107

```language-bash
sudo pip install Celery
```

```language-python
#  tasks.py
import time
from celery import Celery

celery = Celery('tasks', broker='redis://localhost:6379/0')

@celery.task
def sendmail(mail):
    print('sending mail to %s...' % mail['to'])
    time.sleep(2.0)
    print('mail sent.')

```

```language-bash
celery -A tasks worker --loglevel=info
```

```language-python
from tasks import sendmail
sendmail.delay(dict(to='celery@python.org'))
```

定时任务调度

https://github.com/dbader/schedule

```language-python
import schedule
import time
import logging
# 输出日志到文件
logging.basicConfig(level=logging.INFO,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename='/data/logs/myapp.log',
                filemode='w')


def job():
    logging.info('This is info message')



schedule.every(1).seconds.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)


```



