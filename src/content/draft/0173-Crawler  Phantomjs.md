title: Crawler  Phantomjs
date: 2016/12/14 03:37:51
categories:
 - tryghost

tags:
 - nodejs 



---

## 下载
* http://phantomjs.org/download.html
* http://phantomjs.org/api/
* http://phantomjs.org/examples/

## 使用
```language-javascript
var page = require('webpage').create(),
        system = require('system'),
            address;
if (system.args.length === 1) {
        phantom.exit(1);

} else {
        address = system.args[1];
        page.open(address, function (status) {
                    console.log(page.content);

# 设置画布大小
page.viewportSize = { width: 1440, height: 900 };

# 打印png
page.render("demo.png");

# 打印pdf
     page.paperSize = { format: 'A4', 
              orientation: 'portrait', 
              border: '1cm' };
        page.render("demo.pdf");

# 加载自定js
       page.includeJs("http://code.jquery.com/jquery-1.10.1.min.js", 
             function() {
                  page.evaluate(function() {
                  $('# Header1_HeaderTitle').html('My PhantomJS');
            });
                            phantom.exit();
        });

}
```

```langauge-bash
./phantomjs/bin/phantomjs test.js https://zuoyun.me
```



