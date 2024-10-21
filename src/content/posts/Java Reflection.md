---
title: Java Reflection
pubDate: 2014-12-24
categories: [ 'java' ]
description: ''
---

# 动态代理

Java最常用的技术之一，也是最容易发生问题的点，大量的工作日志当中都会出现，无论是启动还是运行时。

## 基于 java.lang.reflect 接口实现动态代理

1. 定义公共接口 Subject，创建被代理对象 SubjectImpl
2. 创建被代理对象的处理对象 JDKInvocationHandler，持有目标对象 Subject 的引用
3. 使用 JDK 的 Proxy 类的静态方法 newProxyInstance 创建代理对象

```java
package com.mycompany.app;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

interface Subject {
    void doOperation();
}

class SubjectImpl implements Subject {
    @Override
    public void doOperation() {
        System.out.println("SubjectImpl doOperation...");
    }
}

class JDKInvocationHandler implements InvocationHandler {
    private final Subject target;

    public JDKInvocationHandler(Subject target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Proxy before JDKInvocationHandler doOperation...");
        Object result = method.invoke(target, args);
        System.out.println("Proxy after JDKInvocationHandler doOperation...");

        // add post process logic if necessary
        return result;
    }
}


/**
 * Hello world!
 */
public class App {


    public static void main(String[] args) {
        // 将生成的代理类保存在根目录下（com/sun/proxy/XXX.class）
        System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
        Subject target = new SubjectImpl();
        Subject proxy = (Subject) Proxy.newProxyInstance(SubjectImpl.class.getClassLoader(), new Class[]{Subject.class}, new JDKInvocationHandler(target));
        proxy.doOperation();
    }
}

```

## 基于 gclib 库实现动态代理

1. 创建 Enhancer 对象，动态生成字节码的绝大部分逻辑都是在这个类中完成的。
2. 设置被代理类(目标对象)，生成的代理类会继承自这个接口，也就意味着这个类不能是 final 类型的。
3. 设置回调对象(实现 MethodInterceptor 接口)，在这里根据需要添加横切逻辑。
4. 调用 Enhaner 的 create() 方法创建代理对象。

```java
package com.mycompany.app;

import net.sf.cglib.core.DebuggingClassWriter;
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

class RealSubject {
    public void doOperation() {
        System.out.println("RealSubject doOperation...");
    }
}

class CglibMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println("Cglib before RealSubject doOperation...");
        Object result = methodProxy.invokeSuper(o, args);
        System.out.println("Cglib after RealSubject doOperation...");
        return result;
    }
}

public class App2 {
    public static void main(String[] args) {
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "./");
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(RealSubject.class);
        enhancer.setCallback(new CglibMethodInterceptor());
        RealSubject proxy = (RealSubject) enhancer.create();
        proxy.doOperation();
    }
}

```

<table style="border: 1px solid #000"><thead><tr><th>对比项</th><th>JDK 动态代理</th><th>CGLIB</th></tr></thead><tbody><tr><td>生成代理类的方式</td><td>继承&nbsp;<code>JDK</code>&nbsp;中&nbsp;<code>Proxy</code>，实现被代理类的所有接口</td><td>继承被代理类，实现&nbsp;<code>CGLIB</code>&nbsp;的&nbsp;<code>Factory</code>&nbsp;接口</td></tr><tr><td>被代理对象的要求</td><td>必须实现接口，可以是&nbsp;<code>final</code>&nbsp;类</td><td>非&nbsp;<code>final</code>&nbsp;类，方法也要是非&nbsp;<code>final</code>&nbsp;类型的</td></tr><tr><td>集成方式</td><td><code>JDK</code>&nbsp;内置</td><td>第三方动态字节码生成类库</td></tr></tbody></table>

# 引用

* https://ifeve.com/%e5%a6%82%e4%bd%95%e5%ae%9e%e7%8e%b0%e4%b8%80%e4%b8%aa%e7%ae%80%e6%98%93%e7%89%88%e7%9a%84-spring-%e5%a6%82%e4%bd%95%e5%ae%9e%e7%8e%b0-aop%ef%bc%88%e4%b8%ad%ef%bc%89/#more-54508





