title: Regular + Expression =Regex
date: 2015/01/13 01:39:49
categories:
 - tryghost

tags:
 - tools 



---

#### 0

***匹配*** &nbsp;&nbsp;&nbsp;\w \d \s

***边界*** &nbsp;&nbsp;&nbsp;  ^ $ \b 

***量词*** &nbsp;&nbsp;&nbsp;  {1,2} {3} \d+ \d* \d?  .* (懒惰exp= \d??)(possive exp=.*+0)(贪心exp=.\*0)

***字符组*** &nbsp;&nbsp;&nbsp;  [0-9] [.-]

***文本标签*** &nbsp;&nbsp;&nbsp; ()  \1  $1

***全局配置*** &nbsp;&nbsp;&nbsp;  \g 忽略大小写   \i 匹配大写

***逻辑运算符*** &nbsp;&nbsp;&nbsp; | ^ 匹配字母大小写

***断言*** 
![](http://p0.qhimg.com/t011c3f5504955269d3.png)
![](http://img.sandseasoft.com/image/e/22/3512a79894ea2a719d09284785d8e.jpg)
 * 零宽lookahead ancyent (?=ma) or ancyent(?\!ma)
 * 零宽lookbehind (?<=ancyent) marinert or ?<\!ancyent) marinert
 >lookbehind 必须固定长度,不支持* + ? 且使用|逻辑时必须等长(无法判断回溯)
 







