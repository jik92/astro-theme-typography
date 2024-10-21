title: Framwork Bootstrap
date: 2016/01/29 05:30:10
categories:
 - tryghost

tags:
 - nodejs 



---

## Bootstarp 

http://v3.bootcss.com/

### 排版 class
```language-css
.container-fluid
.rows
.pull-right

.form-inline .form-group .form-control

table table-striped table-condensed

btn btn-default btn-info btn-warning btn-default btn-block             
```

###  popover
```language-javascript
//tooltips 初始化
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
```
```language-html
                    <a type="button" class="fa fa-sm  fa-question-circle" data-toggle="popover" data-html=true
                       data-content="
<ol>
	<li>双击单元格可以输入框修改内容</li>
	<li>关联组可以为空，也可以多个，组和组之间以“，”号分隔</li>
	<li>关联组不可以是属性词当前所在属性下的组</li>
</ol>
                "></a>
```



