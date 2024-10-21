title: Java SpringTask / Quartz
date: 2015/06/17 17:35:58
categories:
 - tryghost

tags:
 - 未归档 



---

## Cron生成
http://www.jeasyuicn.com/cron/

## SpringTask 
>最简单的方法, 方便写死直接开启
```language-xml
    <task:annotation-driven/>

    <context:annotation-config/>
    <bean class="org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor"/>
    <context:component-scan base-package="com.raycloud.dmj.schedules"/>
```
然后
```
@Scheduled(cron="0/5 * *  * * ? ")
```

## Quartz 
>非 Spring 托管，动态增加移除, 持久化 job

1. 数据库脚本在对应版本的 doc 里面，其中还有丰富的案列
2. 重要对象Scheduler／JobDetail／Trigger

```language-java
@Component
public class InitTask implements InitializingBean {


  private static SchedulerFactory sf                 = new StdSchedulerFactory();
  private static String           TRIGGER_GROUP_NAME = "TRIGGER_GROUP_NAME";


  public static int closeJob(String jobName, String jobGorupName) {
    //关闭任务调度
    try {
      Scheduler sche = sf.getScheduler();
      JobKey jobKey = JobKey.jobKey(jobName, jobGorupName);
      return sche.deleteJob(jobKey) ? 0 : 1;
    } catch (SchedulerException e) {
      return 2;
    }
  }

  public static int addJob(String jobName, String jobGorupName, Class<? extends Job> job, Object task, String cron) {
    try {
      // 判断任务是否存在
      Scheduler scheduler = sf.getScheduler();
      JobKey jobKey = JobKey.jobKey(jobName, jobGorupName);
      if (scheduler.checkExists(jobKey)) {
        return 1;// 任务已经存在
      }
      // 创建一个JobDetail实例，指定SimpleJob
      Map<String, Object> JobDetailmap = new HashMap<String, Object>();
      JobDetailmap.put("name", jobName);// 设置任务名字
      JobDetailmap.put("group", jobGorupName);// 设置任务组
      JobDetailmap.put("jobClass", job.getCanonicalName());// 指定执行类
      // Task.class.getCanonicalName()
      JobDetail jobDetail = JobDetailSupport.newJobDetail(JobDetailmap);
      // 添加数据内容
      jobDetail.getJobDataMap().put("task", task);// 传输的上下文

      CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(cron);
      CronTrigger cronTrigger = TriggerBuilder
          .newTrigger()
          .withSchedule(cronScheduleBuilder).build();
      scheduler.scheduleJob(jobDetail, cronTrigger);

//      SimpleTriggerImpl simpleTrigger = new SimpleTriggerImpl();
//      simpleTrigger.setName(jobName);
//      simpleTrigger.setGroup(TRIGGER_GROUP_NAME);
//      simpleTrigger.setStartTime(
//          new Date()
//      );
//      simpleTrigger.setRepeatInterval(seconds * 1000);
//      simpleTrigger.setRepeatCount(-1);
//      scheduler.scheduleJob(jobDetail, simpleTrigger);

      scheduler.start();// ⑤调度启动
      return 0;// 添加成功
    } catch (Exception e) {
      return 2;// 操作异常
    }
  }

  public static void resumeJob() {
    try {
      SchedulerFactory schedulerFactory = new StdSchedulerFactory();
      Scheduler scheduler = schedulerFactory.getScheduler();
      scheduler.start();
    } catch (Exception e) {
      e.printStackTrace();

    }
  }

  @Override
  public void afterPropertiesSet() throws Exception {
//    closeJob("demo", "demoGroup");
//    addJob("demo", "demoGroup", HelloJob.class, "demo!!!", "* * * * * ?");
    resumeJob();
  }
}
```
对应表存储的quartz.properties
```language-bash
#  Default Properties file for use by StdSchedulerFactory
#  to create a Quartz Scheduler Instance, if a different
#  properties file is not explicitly specified.
# 
# 集群配置（自动主备容灾）
org.quartz.jobStore.isClustered = true
org.quartz.scheduler.instanceId = AUTO
# 基础配置
org.quartz.scheduler.instanceName: DefaultQuartzScheduler
org.quartz.scheduler.rmi.export: false
org.quartz.scheduler.rmi.proxy: false
org.quartz.scheduler.wrapJobExecutionInUserTransaction: false
org.quartz.threadPool.class: org.quartz.simpl.SimpleThreadPool
org.quartz.threadPool.threadCount: 10
org.quartz.threadPool.threadPriority: 5
org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true
org.quartz.jobStore.misfireThreshold: 60000
# ============================================================================
#  Configure JobStore
# ============================================================================
# 默认配置，数据保存到内存
# org.quartz.jobStore.class: org.quartz.simpl.RAMJobStore
# 持久化配置
org.quartz.jobStore.class:org.quartz.impl.jdbcjobstore.JobStoreTX
org.quartz.jobStore.driverDelegateClass:org.quartz.impl.jdbcjobstore.StdJDBCDelegate
org.quartz.jobStore.useProperties:true
# 数据库表前缀
org.quartz.jobStore.tablePrefix:QRTZ_
org.quartz.jobStore.dataSource:qzDS

# ============================================================================
#  Configure Datasources
# ============================================================================
# JDBC驱动
org.quartz.dataSource.qzDS.driver:com.mysql.jdbc.Driver
org.quartz.dataSource.qzDS.URL:jdbc:mysql://localhost:3306/task
org.quartz.dataSource.qzDS.user:root
org.quartz.dataSource.qzDS.password:xxxx
org.quartz.dataSource.qzDS.maxConnection:10

```


#### Quartz 2.x 引用
* http://www.quartz-scheduler.org/downloads
* http://www.quartz-scheduler.org/documentation/quartz-2.2.x/quick-start.html
* http://www.quartz-scheduler.org/documentation/quartz-2.2.x/tutorials/




