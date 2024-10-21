title: Document convert-to
date: 2017/04/14 06:35:30
categories:
 - tryghost

tags:
 - 未归档 



---

# 文档转换方案
## 安装LibreOffice
可以看到这么一个命令
```language-bash
--convert-to output_file_extension[:output_filter_name[:output_filter_options]] [--outdir output_dir] files
      Batch convert files (implies --headless).
      If --outdir is not specified then current working dir is used as output_dir.
      Eg. --convert-to pdf *.doc
          --convert-to pdf:writer_pdf_Export --outdir /home/user *.doc
          --convert-to "html:XHTML Writer File:UTF8" *.doc
          --convert-to "txt:Text (encoded):UTF8" *.doc
```


```language-bash
./soffice --headless --invisible --convert-to pdf *.*
```
### 兼容性测试
* pdf转换目前 xls/xlsx/doc/docx
* html转换支持 doc/docx

## web端使用
https://github.com/mozilla/pdf.js
使用
```language-bash
curl https://sjbglc.ghzq.com.cn/file/web/viewer.html?file=1.pdf
```
## pdf处理工具
https://www.pdflabs.com/docs/pdftk-cli-examples/

## 参考
* https://help.libreoffice.org/Common/About_Converting_Microsoft_Office_Documents/zh-CN






