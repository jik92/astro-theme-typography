title: Oauth Shiro Usage
date: 2016/03/10 07:16:08
categories:
 - tryghost

tags:
 - java 



---

### 官网
http://shiro.apache.org/

### 架构
![](http://img.sandseasoft.com/image/e/88/be4e36b79102864554476e69c4483.png)

![](http://img.blog.csdn.net/20160114233958301)
- Subject 当前用户操作 
- SecurityManager 用于管理所有的Subject 
- Realms 用于进行权限信息的验证，也是我们需要自己实现的。
对象解释
 
* Authentication：身份认证/登录，验证用户是不是拥有相应的身份；
* Authorization：授权，即权限验证，验证某个已认证的用户是否拥有某个权限；即判断用户是否能做事情，常见的如：验证某个用户是否拥有某个角色。或者细粒度的验证某个用户对某个资源是否具有某个权限；
* Session Manager：会话管理，即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中；会话可以是普通JavaSE环境的，也可以是如Web环境的；
* Cryptography：加密，保护数据的安全性，如密码加密存储到数据库，而不是明文存储；
Web Support：Web支持，可以非常容易的集成到Web环境；
* Caching：缓存，比如用户登录后，其用户信息、拥有的角色/权限不必每次去查，这样可以提高效率；
* Concurrency：shiro支持多线程应用的并发验证，即如在一个线程中开启另一个线程，能把权限自动传播过去；
* Testing：提供测试支持；
* Run As：允许一个用户假装为另一个用户（如果他们允许）的身份进行访问；
* Remember Me：记住我，这个是非常常见的功能，即一次登录后，下次再来的话不用登录了。

### RBAC模型
角色扮演的权限模型

### 使用
http://shiro.apache.org/10-minute-tutorial.html

集成Shiro核心内容:

1. ShiroFilterFactory，Shiro过滤器工程类，具体的实现类是：
ShiroFilterFactoryBean，此实现类是依赖于SecurityManager安全管理器。主要配置Filter就好。
2. SecurityManager，Shiro的安全管理，主要是身份认证的管理，缓存管理，cookie管理，所以在实际开发中我们主要是和SecurityManager进行打交道的。
3. Realm,用于身份信息权限信息的验证。开发时集成AuthorizingRealm，重写两个方法:doGetAuthenticationInfo(获取即将需要认真的信息)、doGetAuthorizationInfo(获取通过认证后的权限信息)。
4. HashedCredentialsMatcher，凭证匹配器，用于告诉Shiro在认证时通过什么方式(算法)来匹配密码。默认(storedCredentialsHexEncoded=false)Base64编码，可以修改为(storedCredentialsHexEncoded=true)Hex编码。
5. LifecycleBeanPostProcessor，Shiro生命周期处理器，保证实现了Shiro内部lifecycle函数的bean执行。
开启Shiro的注解功能(如@RequiresRoles,@RequiresPermissions),需借助SpringAOP扫描使用Shiro注解的类,并在必要时进行安全逻辑验证，需要配置两个bean(DefaultAdvisorAutoProxyCreator(可选)和AuthorizationAttributeSourceAdvisor)实现此功能。
6 . 其它的就是缓存管理，记住登录、验证码、分布式系统共享Session之类的，这些大部分都是需要自己进行的实现，其中缓存管理，记住登录比较简单实现，并需要注入到SecurityManager让Shiro的安全管理器进行管理就好了。


### 依赖关系
http://shiro.apache.org/download.html
### 表字段
```language-sql
USE `test`;

/*Table structure for table `t_permission` */

DROP TABLE IF EXISTS `t_permission`;

CREATE TABLE `t_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionname` varchar(32) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `t_permission` */

insert  into `t_permission`(`id`,`permissionname`,`role_id`) values (1,'add',2),(2,'del',1),(3,'update',2),(4,'query',3),(5,'user:query',1),(6,'user:edit',2);

/*Table structure for table `t_role` */

DROP TABLE IF EXISTS `t_role`;

CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(32) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_role` */

insert  into `t_role`(`id`,`rolename`) values (1,'admin'),(2,'manager'),(3,'normal');

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_user` */

insert  into `t_user`(`id`,`username`,`password`) values (1,'tom','123456'),(2,'jack','123456'),(3,'rose','123456');

/*Table structure for table `t_user_role` */

DROP TABLE IF EXISTS `t_user_role`;

CREATE TABLE `t_user_role` (
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


insert  into `t_user_role`(`user_id`,`role_id`) values (1,1),(1,3),(2,2),(2,3),(3,3);


```
ShiroConfiguration.java
```language-java
@Configuration
public class ShiroConfiguration {

  private static final Logger logger = LoggerFactory.getLogger(ShiroConfiguration.class);

  /**
   * Shiro的Web过滤器Factory 命名:shiroFilter<br />
   */
  @Bean(name = "shiroFilter")
  public ShiroFilterFactoryBean shiroFilterFactoryBean(
      org.apache.shiro.web.mgt.DefaultWebSecurityManager securityManager) {
    logger.info("注入Shiro的Web过滤器-->shiroFilter", ShiroFilterFactoryBean.class);
    ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();

    //Shiro的核心安全接口,这个属性是必须的
    shiroFilterFactoryBean.setSecurityManager(securityManager);
    //要求登录时的链接(可根据项目的URL进行替换),非必须的属性,默认会自动寻找Web工程根目录下的"/login.jsp"页面
    shiroFilterFactoryBean.setLoginUrl("/login");
    //登录成功后要跳转的连接,逻辑也可以自定义，例如返回上次请求的页面
    shiroFilterFactoryBean.setSuccessUrl("/index");
    //用户访问未对其授权的资源时,所显示的连接
    shiroFilterFactoryBean.setUnauthorizedUrl("/pages/403");
        /*定义shiro过滤器,例如实现自定义的FormAuthenticationFilter，需要继承FormAuthenticationFilter
        **本例中暂不自定义实现，在下一节实现验证码的例子中体现
        */

        /*定义shiro过滤链  Map结构
         * Map中key(xml中是指value值)的第一个'/'代表的路径是相对于HttpServletRequest.getContextPath()的值来的
         * anon：它对应的过滤器里面是空的,什么都没做,这里.do和.jsp后面的*表示参数,比方说login.jsp?main这种
         * authc：该过滤器下的页面必须验证后才能访问,它是Shiro内置的一个拦截器org.apache.shiro.web.filter.authc.FormAuthenticationFilter
         */
    Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
    // 配置退出过滤器,其中的具体的退出代码Shiro已经替我们实现了
    filterChainDefinitionMap.put("/logout", "logout");

    // <!-- 过滤链定义，从上向下顺序执行，一般将 /**放在最为下边 -->:这是一个坑呢，一不小心代码就不好使了;
    // <!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
    filterChainDefinitionMap.put("/webui/**", "anon");
    filterChainDefinitionMap.put("/webjars/**", "anon");
    filterChainDefinitionMap.put("/login", "anon");
    filterChainDefinitionMap.put("/**", "authc");

    shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);

    return shiroFilterFactoryBean;
  }

  /**
   * 不指定名字的话，自动创建一个方法名第一个字母小写的bean
   */
  @Bean
  public DefaultWebSecurityManager securityManager() {
    logger.info("注入Shiro的Web过滤器-->securityManager", ShiroFilterFactoryBean.class);
    DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
    securityManager.setRealm(userRealm());
    return securityManager;
  }

  /**
   * Shiro Realm 继承自AuthorizingRealm的自定义Realm,即指定Shiro验证用户登录的类为自定义的
   */
  @Bean
  public UserRealm userRealm() {
    UserRealm userRealm = new UserRealm();
    //告诉realm,使用credentialsMatcher加密算法类来验证密文
    userRealm.setCredentialsMatcher(new SimpleCredentialsMatcher());
    userRealm.setCachingEnabled(false);
    return userRealm;
  }

  /**
   * 凭证匹配器 （由于我们的密码校验交给Shiro的SimpleAuthenticationInfo进行处理了 所以我们需要修改下doGetAuthenticationInfo中的代码; ） 可以扩展凭证匹配器，实现
   * 输入密码错误次数后锁定等功能，下一次
   */
  @Bean(name = "credentialsMatcher")
  public HashedCredentialsMatcher hashedCredentialsMatcher() {
    HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
    return hashedCredentialsMatcher;
  }

  /**
   * Shiro生命周期处理器
   */
  @Bean
  public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
    return new LifecycleBeanPostProcessor();
  }

  /**
   * 开启Shiro的注解(如@RequiresRoles,@RequiresPermissions),需借助SpringAOP扫描使用Shiro注解的类,并在必要时进行安全逻辑验证
   * 配置以下两个bean(DefaultAdvisorAutoProxyCreator(可选)和AuthorizationAttributeSourceAdvisor)即可实现此功能
   */
  @Bean
  @DependsOn({"lifecycleBeanPostProcessor"})
  public DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator() {
    DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
    advisorAutoProxyCreator.setProxyTargetClass(true);
    return advisorAutoProxyCreator;
  }

  @Bean
  public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
    AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
    authorizationAttributeSourceAdvisor.setSecurityManager(securityManager());
    return authorizationAttributeSourceAdvisor;
  }

}


```
UserRealm.java
```language-java
public class UserRealm extends AuthorizingRealm {

  @Override
  protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    String currentLoginName = (String) principals.getPrimaryPrincipal();
    List<String> userRoles = new ArrayList<String>();
    List<String> userPermissions = new ArrayList<String>();
    //从数据库中获取当前登录用户的详细信息
//    User user = userService.findByLoginName(currentLoginName);
//    if(null != user){
    //获取当前用户下所有ACL权限列表  待续。。。
    //获取当前用户下拥有的所有角色列表
//      List<Role> roles = roleService.findByUserId(user.getId());
//      for (int i = 0; i < roles.size(); i++) {
//        userRoles.add(roles.get(i).getCode());
//      }
//    }else{
//      throw new AuthorizationException();
//    }
    userRoles.add("admin");
    userPermissions.add("1");
    System.out.println("####### 获取角色：" + userRoles);
    System.out.println("####### 获取权限：" + userPermissions);
    //为当前用户设置角色和权限
    SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
    authorizationInfo.addRoles(userRoles);
    authorizationInfo.addStringPermissions(userPermissions);
    return authorizationInfo;
  }

  /**
   * 验证当前登录的Subject LoginController.login()方法中执行Subject.login()时 执行此方法
   */
  @Override
  protected AuthenticationInfo doGetAuthenticationInfo(
      AuthenticationToken authcToken) throws AuthenticationException {
    System.out.println("### 【开始认证[SessionId]】" + SecurityUtils.getSubject().getSession().getId());
    String loginName = (String) authcToken.getPrincipal();
    System.out.println(JSON.toJSONString(authcToken));
//    User user = userService.findByLoginName(loginName);
//    if (user == null) {
//      throw new UnknownAccountException();//没找到帐号
//    }
    //交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
    SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
        "admin", //用户名
        "sercet", //密码
        getName()  //realm name
    );
    return authenticationInfo;
  }
}
```
controller
```language-java
@RestController
@SpringBootApplication
public class App {

  final static Logger logger = LoggerFactory.getLogger(App.class);

  public static void main(String[] args) {
    SpringApplication.run(App.class);
  }

  @RequestMapping("/demo")
  @RequiresRoles("admin")
  @RequiresPermissions("1")
  public Object demo() {
    return "测试页面";
  }

  @RequestMapping("/logout")
  public Object logout() {
    return "logout";
  }


  @RequestMapping("/login")
  public Object login(String password) {
    //当前Subject
    org.apache.shiro.subject.Subject currentUser = SecurityUtils.getSubject();
    //传递token给shiro的realm
    UsernamePasswordToken token = new UsernamePasswordToken("admin", password, false);
    try {
      currentUser.login(token);
      return "welcome";
    } catch (AuthenticationException e) {//登录失败
      return e.getMessage();
    }
  }
}

```
### 引用
https://www.gitbook.com/book/waylau/apache-shiro-1-2-x-reference/details



