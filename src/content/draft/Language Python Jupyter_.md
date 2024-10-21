title: Language Python Jupyter
date: 2015/12/24 04:40:52
categories:
- build_env
- dev
tags:
- python
- jupyter
---

# Anaconda
https://www.continuum.io/downloads
https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/
Anaconda是关于Python数据分析和科学计算的分发包。

 * 自带 完整的 python 语言环境
 * 自带 pip 和 conda
 * 自带 notebook
 * 绕 root

# Jupyter
https://github.com/jupyter/notebook
http://ipython.org/notebook

# 使用
```language-bash
# 安装
pip install notebook
# 启动
jupyter notebook --ip='*'
```

# 魔术命令使用
```
# 所有魔术命令文档
%magic
# 检测时间
%timeit
# 自动载入 numpy pylab 库
%pylab 
# 下载代码
%load
# 性能分析
%%prun

```
# 自带工具

```language-python
# 图
%pylab inline
plot(random.randn(100));

# 表
import pandas as pd
 
df = pd.DataFrame({ 'A' : 1.,
                    'B' : pd.Timestamp('20130102'),
                    'C' : pd.Series(1, index=list(range(4)), dtype='float32'),
                    'D' : pd.Series([1, 2, 1, 2], dtype='int32'),
                    'E' : pd.Categorical(["test", "train", "test", "train"]),
                    'F' : 'foo' })

df

# 显示数学公式
from IPython.external.mathjax import install_mathjax
install_mathjax()

from IPython.display import Latex
Latex(r"$\sqrt{x^2+y^2}$")

# 显示图片
from IPython.display import Image
Image("http://localhost:8888/files/Pictures/17375069.jpg")

# javascript 脚本
from IPython.display import HTML
from IPython.display import Javascript
from IPython.display import IFrame
Javascript("alert('ok')")
HTML("osm.html")
IFrame("osm.html",width=700,height=350)

# 下载代码
%load http://matplotlib.org/mpl_examples/pylab_examples/histogram_demo.py

# 性能分析
%%prun
for i in xrange(100):
    linalg.det(random.rand(10,10))


```
# Pandas/Numpy
http://pandas.pydata.org/pandas-docs/stable/10min.html
```language-python
# 读取 csv 文件
df = pd.read_csv(loggerfile, header=None, sep=',')
# 读取 mysql 数据
import pandas as pd
import pymysql
mysql= pymysql.connect(
    host='xxxx, 
    port=3306,user='xxx', 
    passwd='xxx', 
    db='xxx',
    charset="utf8")

df = pd.read_sql('select * from xxx limit 0,10000', con=mysql)    
mysql.close()
```

# Seaborn/Matplotlib
```language-python
%matplotlib inline 

import seaborn as sns
#  Load one of the data sets that come with seaborn
tips = sns.load_dataset("tips")
sns.jointplot("total_bill", "tip", tips, kind='reg');

```
http://www.justinablog.com/archives/1357

http://web.stanford.edu/~mwaskom/software/seaborn/tutorial/regression.html

http://nbviewer.ipython.org/gist/jackparmer/5485807511a58be48bf2

http://www.labri.fr/perso/nrougier/teaching/matplotlib/# line-properties


# TODO
graphlab
https://dato.com/products/create/open_source.html
https://dato.com/learn/userguide/install.html
https://dato.com/download/



