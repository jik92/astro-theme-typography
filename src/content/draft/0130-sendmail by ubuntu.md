title: sendmail by ubuntu
date: 2016/04/03 23:43:32
categories:
 - tryghost

tags:
 - 未归档 



---

apt-get install mailutils  
apt-get install postfix  

dpkg-reconfigure postfix  


// no subject  
echo "test" | mail me@mail.com  
  
// method one  
echo "here is text content " | mail -s "here is subject" me@gmail.com  
  
// method two  
mail -s "here is subject" me@gmail.com < here_is_text_content.text  


debug 日志

tail -f /var/log/mail*  
telnet localhost 25  


No configuration 表示不要做任何配置；
Internet Site 表示直接使用本地SMTP服务器发送和接收邮件；
Internet with smarthost 表示使用本地SMTP服务器接收邮件，但发送邮件时不直接使用本地SMTP服务器，而是使用第三方smart host来转发邮件；
Satellite system 表示邮件的发送和接收都是由第三方smarthost来完成。
Local only 表示邮件只能在本机用户之间发送和接收。


http://www.liaoxuefeng.com/article/00137387674890099a71c0400504765b89a5fac65728976000



