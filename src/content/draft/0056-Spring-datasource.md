title: Spring-datasource
date: 2015/11/23 08:29:53
categories:
 - tryghost

tags:
 - java 



---

data-source 配置
```language-xml
       <bean id="logFilter" class="com.alibaba.druid.filter.logging.Slf4jLogFilter">
        <property name="statementExecutableSqlLogEnable" value="true"/>
    </bean>

    <bean id="stat-filter" class="com.alibaba.druid.filter.stat.StatFilter">
        <property name="slowSqlMillis" value="1000" />
        <property name="logSlowSql" value="true" />
    </bean>


    <bean id="dataSourceOracle" class="com.alibaba.druid.pool.DruidDataSource"
          init-method="init" destroy-method="close">
        <property name="driverClassName" value="${ojdbc.driverClass}"/>
        <property name="url" value="${ojdbc.url}"/>
        <property name="username" value="${ojdbc.username}"/>
        <property name="password" value="${ojdbc.password}"/>
        <!-- 配置初始化大小、最小、最大 -->
        <property name="initialSize" value="10"/>
        <property name="minIdle" value="1"/>
        <property name="maxActive" value="50"/>
        <!-- 配置获取连接等待超时的时间 -->
        <property name="maxWait" value="10000"/>
        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
        <property name="timeBetweenEvictionRunsMillis" value="60000"/>
        <!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
        <property name="minEvictableIdleTimeMillis" value="300000"/>
        <property name="testWhileIdle" value="true"/>
        <!-- 这里建议配置为TRUE，防止取到的连接不可用 -->
        <property name="testOnBorrow" value="true"/>
        <property name="testOnReturn" value="false"/>
        <!-- 打开PSCache，并且指定每个连接上PSCache的大小 -->
        <property name="poolPreparedStatements" value="true"/>
        <property name="maxPoolPreparedStatementPerConnectionSize"
                  value="20"/>
        <!-- 这里配置提交方式，默认就是TRUE，可以不用配置 -->
        <property name="defaultAutoCommit" value="true"/>
        <!-- 验证连接有效与否的SQL，不同的数据配置不同 -->
        <property name="validationQuery" value="select 1 FROM DUAL "/>
        <property name="filters" value="stat"/>
        <property name="proxyFilters">
            <list>
                <ref bean="logFilter"/>
                <ref bean="stat-filter"/>
            </list>
        </property>
    </bean>

```
 spring-tx.xml 配置
```language-xml
    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <tx:annotation-driven transaction-manager="txManager" proxy-target-class="true"/>

```

jdbc-template
```language-xml
       <bean id="jdbcTemplate"
          class="org.springframework.jdbc.core.JdbcTemplate"
          lazy-init="false">
        <property name="dataSource" ref="expressDataSource"/>
    </bean>
```




手动事务使用
``` language-java
  @Resource
  private PlatformTransactionManager txnMgr;
  public void deleteItems(Staff staff, Long sysItemId) {


    TransactionStatus status = txnMgr.getTransaction(new DefaultTransactionDefinition());
    try {
      stockService.deleteStock4DeleteSysItem(staff, dmjItem);
      iDmjItemDAO.deleteBySysItemId(staff, sysItemId);
      iDmjSkuDAO.deleteBySysItemId(staff, Lists.newArrayList(sysItemId));
      erpBridgeDAO.deleteByItemSysId(staff, Lists.newArrayList(sysItemId));
      skuErpBridgeDAO.deleteByItemSysId(staff, Lists.newArrayList(sysItemId));
      txnMgr.commit(status);

    } catch (Exception e) {
      txnMgr.rollback(status);
      logger.error(LogHelper.buildLogHead(staff) + "批量删除异常", e);
      throw new DataAccessException("批量删除异常");
    }
  }
```

![](http://img.sandseasoft.com/image/d/b0/cc88f852d1f1fd1d9a6cfa8f9d2b9.png)



