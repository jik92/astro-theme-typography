title: FED Build Tools-Gulp、Browserify
date: 2016/07/16 05:44:12
categories:
 - tryghost

tags:
 - nodejs 



---

↓主流方案
# FIS3
http://fis.baidu.com/
>百度的构建方案,比较重,有自己的闭环生态

# Webpack
>这个功能强大，但是配置复杂，并没有想象中的成熟

↓我的构建工具方案
# NPM+Browserify+Gulp
http://www.gulpjs.com.cn/
http://browserify.org/
https://segmentfault.com/a/1190000002941361
>流式插件化构建工具, 前端代码压缩

## Browserify
模块化前端代码，基于 CommonJS 风格管理，统一前后端命名空间
```language-bash
browserify main.js -o bundle.js --debug
watchify main.js -o 'exorcist static/bundle.js.map > static/bundle.js' -d
```

## Gulp
### 常用插件列表
* watchify+browserify
* live-reload
* less
* csslint/eslint

### exp
```language-bash
var gulp = require("gulp");
var browserify = require("browserify");
var watchify = require('watchify');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');


var customOpts={
        entries: "./fed_modules/main.js",
        //代码压缩
        debug: true
        };
        

var b = watchify(browserify(assign({}, watchify.args,customOpts)));
    b.on('update', build); // 当任何依赖发生改变的时候，运行打包工具
    b.on('log', gutil.log); // 输出编译日志到终端
    
    
gulp.task("browserify", build);

function build() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./static/"));
};

gulp.task('watch', function () {    
    livereload.listen();
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('static/*.js');
});

```

## 参考
http://my.oschina.net/fellowtraveler/blog/719108







