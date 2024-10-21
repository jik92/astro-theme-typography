title: 在http请求上加上no-cache，组织客户端缓存动态请求
date: 2016/03/16 08:02:28
categories:
 - tryghost

tags:
 - 未归档 



---

两种做法，1、tomcat上加filter，2、在nginx上加上代理参数

1、tomcat上加filter
依赖jar

    <groupId>com.raycloud</groupId>
<artifactId>commons-utils</artifactId>
<version>1.0.0-SNAPSHOT</version>
public void doFilter(ServletRequest arg0, ServletResponse arg1,
            FilterChain arg2) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) arg1;
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        arg2.doFilter(arg0, arg1);
    }
然后在web.xml中加上过滤器

    <filter>
    <filter-name>nocacheFilter</filter-name>
    <filter-class>com.raycloud.utils.filter.NoCacheFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>nocacheFilter</filter-name>
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>nocacheFilter</filter-name>
    <url-pattern>*.do</url-pattern>
</filter-mapping>
url-pattern 可以根据自己的需要进行修改，注意一些静态请求不需要加上这个条件

2、在nginx上加上代理参数


在代理参数上加上
add_header Pragma "no-cache";
add_header Cache-Control "no-cache";




