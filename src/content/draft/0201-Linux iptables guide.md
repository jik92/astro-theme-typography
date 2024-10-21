title: Linux iptables guide
date: 2017/05/15 07:27:33
categories:
 - tryghost

tags:
 - 未归档 



---

### Chains
 1. PREROUTING (路由前)
 2. INPUT (数据包流入口)
 3. FORWARD (转发管卡)
 4. OUTPUT(数据包出口)
 5. POSTROUTING（路由后）
### 策略
 1. filter
 2. nat
注意这里所有策略都是链式的，即作用域从上到下，被拦截之后的策略无效
 
相关命令
```language-bash
# 启动
service iptables start
# 查看相关配置
iptables -L INPUT --line-numbers
# 更新配置
/etc/sysconfig/iptables 
# 增加记录
iptables -I INPUT -s 10.121.121.181 -p tcp --dport 8110 -j ACCEPT
# 保存
service iptables save
# 删除相关配置
iptables -D INPUT 3
# 默认规则设定关闭
iptables -P INPUT DROP    
iptables -P OUTPUT DROP    
iptables -P FORWARD DROP   

# 封整个段即从123.0.0.1到123.255.255.254的命令   
iptables -I INPUT -s 123.0.0.0/8 -j DROP   
# 封IP段即从123.45.0.1到123.45.255.254的命令   
iptables -I INPUT -s 124.45.0.0/16 -j DROP   
 
```




