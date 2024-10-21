title: ETL  kettle
date: 2015/12/02 07:56:07
categories:
 - tryghost

tags:
 - store 



---

ETL 工具
Extract -> Transform -> Load

抽取，标记，清洗，计算，回归

公式 currentValue*系数/currentMax

* Chef——工作(job)设计工具 (GUI方式)
* Kitchen——工作(job)执行器 (命令行方式)
* Spoon——转换(transform)设计工具 (GUI方式)
* Span——转换(trasform)执行器 (命令行方式)

Chef中的作业项包括：
 
 1. 转换：指定更细的转换任务，通过Spoon生成。通过Field来输入参数；
 2. SQL：sql语句执行；
 3. FTP：下载ftp文件；
 4. Job包：作为嵌套作业使用。
 5. JavaScript执行：这个比较有意思，我看了一下源码，如果你有自已的Script引擎，     可以很方便的替换成自定义Script，来扩充其功能；
 7. SFTP：安全的Ftp协议传输；
 8. Start单元：任务必须由此开始。设计作业时，以此为起点。
 9. OK单元：可以编制做为中间任务单元，且进行脚本编制，用来控制流程。
 10. ERROR单元：用途同上。
 11. DUMMY单元：什么都不做，主要是用来支持多分支的情况，文档中有例子。

Input-Steps：输入步骤
 
1. Text file input：文本文件输入
可以支持多文件合并，有不少参数，基本一看参数名就能明白其意图。
2. Table input：数据表输入
实际上是视图方式输入，因为输入的是sql语句。当然，需要指定数据源(数据源的定制方式在后面讲一下)
Get system info：取系统信息
就是取一些固定的系统环境值，如本月最后一天的时间，本机的IP地址之类。
3.         Generate Rows：生成多行。
这个需要匹配使用，主要用于生成多行的数据输入，比如配合Add sequence可以生成一个指定序号的数据列。

Output-Steps： 输出步聚
 
 1. Text file output：文本文件输出。这个用来作测试蛮好，呵呵。很方便的看到转换的输出。
 2. Table output：输出到目的表。
 3. Insert/Update：目的表和输入数据行进行比较，然后有选择的执行增加，更新操作。
 4. Update：同上，只是不支持增加操作。


Transform 转换
 
 1. Select values
对输入的行记录数据的字段进行更改 (更改数据类型，更改字段名或删除) 数据类型变更时，数据的转换有固定规则，可简单定制参数。可用来进行数据表的改装。
 2. Filter rows
 对输入的行记录进行指定复杂条件的过滤。用途可扩充sql语句现有的过滤功能。但现有提供逻辑功能超出标准sql的不多。
 3. Sort rows
对指定的列以升序或降序排序，当排序的行数超过5000时需要临时表。
 4. Add sequence
为数据流增加一个序列，这个配合其它Step(Generate rows, rows join)，可以生成序列表，如日期维度表(年、月、日)。
 5. Dummy
不做任何处理，主要用来作为分支节点。
 6. Join Rows
对所有输入流做笛卡儿乘积。
 7. Aggregate
聚合，分组处理
 8. Group by
分组，用途可扩充sql语句现有的分组，聚合函数。但我想可能会有其它方式的sql语句能实现。
 9. Java Script value
使用mozilla的rhino作为脚本语言，并提供了很多函数，用户可以在脚本中使用这些函数。
 10. Row Normaliser
该步骤可以从透视表中还原数据到事实表，通过指定维度字段及其分类值，度量字段，最终还原出事实表数据。
 11. Unique rows
去掉输入流中的重复行，在使用该节点前要先排序，否则只能删除连续的重复行。 
 12. Calculator
提供了一组函数对列值进行运算，用该方式比用户自定义JAVA SCRIPT脚本速度更快。
 13. Merge Rows
用于比较两组输入数据，一般用于更新后的数据重新导入到数据仓库中。
 14. Add constants：
增加常量值。
 15. Row denormaliser
同Normaliser过程相反。
 16. Row flattener
表扁平化处理，指定需处理的字段和扃平化后的新字段，将其它字段做为组合Key进行扃平化处理。



