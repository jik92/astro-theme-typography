title: JavaLib hutool
date: 2017/11/01 06:10:15
categories:
 - tryghost

tags:
 - java 



---

## 官网<i class="em em-gift"></i>
http://hutool.mydoc.io/ 
## 功能
* 布隆过滤
* 克隆接口
* 类型转换
* 基于DFA有限自动机的多个关键字查找
* HTTP客户端
* IO和文件
* 反射代理类的简化（AOP切面实现）
* Setting（一种扩展Properties的配置文件）
* System（JVM和系统信息等）
* WatchService的封装（文件变动监控）

## 比较有意思的几个用法
```language-java
IdcardUtil.isValidCard("430104199207173518");
NetUtil.localIpv4s();
NetUtil.isUsableLocalPort(6379);
NetUtil.isValidPort(6379);
ReUtil.extractMulti("(\\w)aa(\\w)", content, "$1-$2");
XmlUtil.readXML();
ZipUtil.gzip();
Singleton.get(Dog.class);
# 优先有限队列，大数据排序算法
BoundedPriorityQueue<Integer> queue = new BoundedPriorityQueue<Integer>(5);
Validator.validateChinese("我是一段zhongwen", "内容中包含非中文");
# 反射相关
Demo cat = ProxyUtil.proxy(new DemoImpl(), TimeIntervalAspect.class);
cat.demo();

User user = new User();
DynaBean bean = DynaBean.create(user);
bean.set("name", "李华");
bean.set("age", 12);
String name = bean.get("name");
//执行指定方法
bean.invoke("testMethod");

# 加密算法相关
//AES
    String content = "test中文";
    byte[] key = SecureUtil.generateKey(SymmetricAlgorithm.AES.getValue()).getEncoded();
    SymmetricCrypto aes = new SymmetricCrypto(SymmetricAlgorithm.AES, key);
    byte[] encrypt = aes.encrypt(content);
    byte[] decrypt = aes.decrypt(encrypt);
    System.out.println(new String(decrypt));
//RSA
    RSA rsa = new RSA();
    rsa.getPrivateKey();
    rsa.getPrivateKeyBase64();
    rsa.getPublicKey();
    rsa.getPublicKeyBase64();
    byte[] encrypt = rsa.encrypt(StrUtil.bytes("我是一段测试aaaa", CharsetUtil.CHARSET_UTF_8), KeyType.PublicKey);
    byte[] decrypt = rsa.decrypt(encrypt, KeyType.PrivateKey);
    System.out.println(new String(decrypt));

# DFA算法，多次匹配正则
WordTree tree = new WordTree();
tree.add("xxx");
tree.add("ss");
tree.add("11");
List<String> matchAll = tree.matchAll("xxx11ss", -1, false, false);
```



