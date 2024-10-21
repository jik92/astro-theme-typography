title:  ApiManager yapi
date: 2019/01/20 16:55:48
categories:

- nodejs

tags:

- Saas

---

非常好用的api 管理工具，支持 swagger 导入

https://yapi.ymfe.org/

# 使用

## 安装 mongodb

docker pull  mongo 

docker run  --name some-mongo   -p 27017:27017   -d mongo   --auth   

docker    exec  -it  容器ID   /bin/bash     

```
mongo  
use admin
db.createUser({user:"root",pwd:"root",roles:[{role:'root',db:'somedb'}]})  
exit  
```

mongo  ip/somedb  -uroot -p

## 安装 yapi

```bash
mkdir yapi
cd yapi
git clone https://github.com/YMFE/yapi.git vendors 
cp vendors/config_example.json ./config.json 
cd vendors
npm install --production --registry https://registry.npm.taobao.org
npm run install-server 
node server/app.js 
```



![20190120154799208266395.png](http://img.sandseasoft.com/20190120154799208266395.png)



# 参考

https://yapi.ymfe.org/devops/index.html

https://yapi.ymfe.org/documents/index.html

