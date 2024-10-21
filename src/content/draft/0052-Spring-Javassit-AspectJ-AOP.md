title: Spring-Javassit/AspectJ/AOP
date: 2015/11/20 17:38:02
categories:
 - tryghost

tags:
 - java 



---

# 引言
基于 jvm 的静态语言的动态实现一般有几种方法， 其中分两大类，jvm 的动态代理和字节码编程。其中 jvm 动态代理 proxydynmic 面对接口编程，字节码编程主要对应的包是 cglib 和 javassit，cglib 性能很好，有很多约束条件，如需要默认的初始化构造方法。javassit 相对来说更加好用，由于 classloader 默认一个类只能够加载一次，也需要 agent 支持或者自定义 classloader。

# 代理类
 
1.5之后的特性, JVM级别做了AOP支持，核心Instrumentation接口。
使用
-javaagent:daemon.jar 

# 字节码增强
![](http://img.sandseasoft.com/image/c/b2/50383d59d486d145365d6fd0e2db6.png)

 * cglib
 * javaassit



# 一些工具 
 * Btree

https://github.com/jbachorik/btrace2
http://www.iteye.com/topic/1005918

 * beanutils


# 注意
动态代理类生成的对象会占用PermGen 内存，而PermGen内存是极难回收的，吃完就会 OOM。
 spring 的反射是基于 cglib 的，aop 也是基于 cglib 的，那么如果PermGen 内存溢出请检查反射是否使用不当，或者性能问题导致代理类无法及时释放。

claasloader 要求同一个类只能注册一次， 如果需要做到类重载那么需要自定义一个 classloader。

![](http://img.sandseasoft.com/image/6/bb/2a5ab206a6c4103f666017b41604c.png)

# Javassist 使用
```language-java
public class JavassistDemo1 {

  /**
   * 动态构造对象
   */
  @Test
  public void demo() throws NotFoundException, CannotCompileException, ClassNotFoundException, IllegalAccessException,
                            InstantiationException, NoSuchMethodException, InvocationTargetException, IOException {
    ClassPool cp = ClassPool.getDefault();
    //另一种方法,当 classpool 没有被引用的时候,会被释放
//    ClassPool cp = new ClassPool(true);
    Loader loader = new Loader(cp);

    CtClass ctClass = cp.makeClass("com.raycloud.express.monitor.javassist.sample.ExpDemo");

    StringBuffer body = null;
    //参数  1：属性类型  2：属性名称  3：所属类CtClass
    CtField ctField = new CtField(cp.get("java.lang.String"), "name", ctClass);
    ctField.setModifiers(Modifier.PRIVATE);
    //设置name属性的get set方法
    ctClass.addMethod(CtNewMethod.setter("setName", ctField));
    ctClass.addMethod(CtNewMethod.getter("getName", ctField));
    ctClass.addField(ctField, CtField.Initializer.constant("default"));

    //参数  1：参数类型   2：所属类CtClass
    CtConstructor ctConstructor = new CtConstructor(new CtClass[]{}, ctClass);
    body = new StringBuffer();
    body.append("{\n name=\"me\";\n}");
    ctConstructor.setBody(body.toString());
    ctClass.addConstructor(ctConstructor);

    //参数：  1：返回类型  2：方法名称  3：传入参数类型  4：所属类CtClass
    CtMethod ctMethod = new CtMethod(CtClass.voidType, "execute", new CtClass[]{}, ctClass);
    ctMethod.setModifiers(Modifier.PUBLIC);
//    ctMethod.insertBefore("{ System.out.println($0); System.out.println($2); }");

    body = new StringBuffer();
    body.append("{\n System.out.println(name);");
    body.append("\n System.out.println(\"execute ok\");");
    body.append("\n return ;");
    body.append("\n}");
    ctMethod.setBody(body.toString());
    ctClass.addMethod(ctMethod);
    Class<?> c = ctClass.toClass();
    Object o = c.newInstance();
    Method method = o.getClass().getMethod("execute", new Class[]{});
    //调用字节码生成类的execute方法
    method.invoke(o, new Object[]{});

    //写文件,该类冻结
    ctClass.debugWriteFile();
    //生成类加载到对应的 classloader, 该类冻结
    ctClass.setName("ExpDemo$$Impl");
    Class clazz = ctClass.toClass();
    ctClass.toClass(loader);

    clazz.getMethod("show").invoke(clazz.newInstance(), "hello");
    ctClass.defrost();  // 解冻一个类，对应freeze方法

    //释放内存,踢出类
    ctClass.detach();
    ClassPool.doPruning = true;


  }

}
```

```language-java
public class JavassistDemo2 {


  /**
   * 拦截器
   */
  @Test
  public void demo() throws NotFoundException, CannotCompileException, ClassNotFoundException, IllegalAccessException,
                            InstantiationException, NoSuchMethodException, InvocationTargetException {
    // 实例化代理类工厂
    ProxyFactory factory = new ProxyFactory();

    //设置父类，ProxyFactory将会动态生成一个类，继承该父类
    factory.setSuperclass(TestProxy.class);

    //设置过滤器，判断哪些方法调用需要被拦截
    factory.setFilter(new MethodFilter() {
      @Override
      public boolean isHandled(Method m) {
        return m.getName().startsWith("get");
      }
    });

    Class<?> clazz = factory.createClass();
    TestProxy proxy = (TestProxy) clazz.newInstance();
    ((ProxyObject) proxy).setHandler(new MethodHandler() {
      @Override
      public Object invoke(Object self, Method thisMethod, Method proceed, Object[] args) throws Throwable {
        //拦截后前置处理，改写name属性的内容
        //实际情况可根据需求修改
        System.out.println(thisMethod.getName() + "被调用");
        try {
          Object ret = proceed.invoke(self, args);
          System.out.println("返回值: " + ret);
          return ret;
        } finally {
          System.out.println(thisMethod.getName() + "调用完毕");
        }
      }
    });

    proxy.setName("Alvin");
    proxy.setValue("1000");
    proxy.getName();
    proxy.getValue();

  }

}
```

```language-java
public class JavassistDemo3 {


  /**
   * 获取接口
   */
  @Test
  public void test() throws NotFoundException {
    // 获取默认类型池对象
    ClassPool classPool = ClassPool.getDefault();

    // 获取指定的类型
    CtClass ctClass = classPool.get("java.lang.String");

    System.out.println(ctClass.getName());  // 获取类名
    System.out.println("\tpackage " + ctClass.getPackageName());    // 获取包名
    System.out
        .print("\t" + Modifier.toString(ctClass.getModifiers()) + " class " + ctClass.getSimpleName());   // 获取限定符和简要类名
    System.out.print(" extends " + ctClass.getSuperclass().getName());  // 获取超类
    // 获取接口
    if (ctClass.getInterfaces() != null) {
      System.out.print(" implements ");
      boolean first = true;
      for (CtClass c : ctClass.getInterfaces()) {
        if (first) {
          first = false;
        } else {
          System.out.print(", ");
        }
        System.out.print(c.getName());
      }
    }
    System.out.println();
  }


  /**
   * 获取方法参数
   */
  @Test
  public void demo() throws NotFoundException, CannotCompileException, ClassNotFoundException, IllegalAccessException,
                            InstantiationException, NoSuchMethodException, InvocationTargetException {

    ClassLoader classLoader = ClassPool.getDefault().getClassLoader();
    // 获取要修改的类
    Class<?> clazz = classLoader.loadClass("edu.alvin.reflect.TestLib");

    // 实例化类型池
    ClassPool classPool = ClassPool.getDefault();
//    classPool.appendClassPath(clazz);
    CtClass ctClass = classPool.get(clazz.getName());

    // 获取方法
    CtMethod
        method =
        ctClass
            .getDeclaredMethod("show");
    // 判断是否为静态方法
    int staticIndex = Modifier.isStatic(method.getModifiers()) ? 0 : 1;

    // 获取方法的参数
    MethodInfo methodInfo = method.getMethodInfo();
    CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
    LocalVariableAttribute
        localVariableAttribute =
        (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);

    for (int i = 0; i < method.getParameterTypes().length; i++) {
      System.out.println("第" + (i + 1) + "个参数名称为: " + localVariableAttribute.variableName(staticIndex + i));
    }
  }


}
```
```language-java
      Loader loader = new Loader();

      CtClass ctClass = ClassPool.getDefault().get("com.raycloud.express.monitor.javassist.sample.ExpDemo");
      CtClass xxx = ClassPool.getDefault().get("com.raycloud.express.monitor.javassist.sample.SupExpDemo");
      ctClass.setSuperclass(xxx);

      String needChangeName = "setName";
      CtMethod needChangeMethod = ctClass.getDeclaredMethod(needChangeName);
      String newName = needChangeName + "$impl";
      needChangeMethod.setName(newName);
      CtMethod newMethod = CtNewMethod.copy(needChangeMethod, needChangeName, ctClass, null);

      //主要的注入代码
      StringBuffer body = new StringBuffer();
      body.append("{\nlong start = System.currentTimeMillis();\n");
      //调用原有代码，类似于method();($$)表示所有的参数
      body.append(newName + "($$);\n");
      body.append("System.out.println(\"Call to method "
                  + needChangeName
                  + " took \" +\n (System.currentTimeMillis()-start) + "
                  + "\" ms.\");\n");

      body.append("}");
      //替换新方法
      newMethod.setBody(body.toString());
      //增加新方法
      ctClass.addMethod(newMethod);
      //类已经更改，注意不能使用A a=new A();，因为在同一个classloader中，不允许装载同一个类两次
      ctClass.debugWriteFile();
      ExpDemo expDemo = (ExpDemo) ctClass.toClass(loader).newInstance();
      expDemo.setName("xxx");
    } catch (CannotCompileException e) {
      e.printStackTrace();
    }

    //也就是说这个类加载器里面的这个对象全部都被改变了
    ExpDemo b = new ExpDemo();
    b.setName("xxx");
```

# 引用资料

https://blog.newrelic.com/2014/09/29/diving-bytecode-manipulation-creating-audit-log-asm-javassist/

http://zhxing.iteye.com/blog/1703305

http://yonglin4605.iteye.com/blog/1396494


# AspectJ
cglib 需要做字节码修改必须要有一个默认的构造方法.

写一个切面
```language-java
@Component
@Aspect
public class SimpleAspect {

  @Pointcut("execution(* com.quicloud.*Controller*.*(..))")
  public void pointCut() {
  }



  @After("pointCut()")
  public void after(JoinPoint joinPoint) {
    System.out.println("after aspect executed");
  }

  @Before("pointCut() && exp()")
  public void before(JoinPoint joinPoint) {
    //如果需要这里可以取出参数进行处理
    //Object[] args = joinPoint.getArgs();
    System.out.println("before aspect executing");
  }

  @AfterReturning(pointcut = "pointCut()", returning = "returnVal")
  public void afterReturning(JoinPoint joinPoint, Object returnVal) {
    System.out.println("afterReturning executed, return result is "
                       + returnVal);
  }

  @Around("pointCut()")
  public void around(ProceedingJoinPoint pjp) throws Throwable {
    System.out.println("around start..");
    try {
      pjp.proceed();
    } catch (Throwable ex) {
      System.out.println("error in around");
      throw ex;
    }
    System.out.println("around end");
  }

  @AfterThrowing(pointcut = "pointCut()", throwing = "error")
  public void afterThrowing(JoinPoint jp, Throwable error) {
    System.out.println("error:" + error);
  }
}

```
配置
```language-xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:aop="http://www.springframework.org/schema/aop"       xsi:schemaLocation="http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd">

    <aop:aspectj-autoproxy/>
</beans>
```
pom.xml
```language-xml
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.8.7</version>
        </dependency>

```
http://docs.spring.io/spring/docs/2.5.x/reference/aop.html# aop-choosing



