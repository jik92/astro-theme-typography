---
title: About Java Concurrent Knowledge
pubDate: 2015-11-25
categories: [ 'java' ]
description: ''
---

# 原子

```java
  @Test
  public void _testMain() throws Exception {
    AtomicLong aLong = new AtomicLong(1);
  }
```

# 基础接口 callable\future\futuretask

```java
public class ThreadDemoTest {

  @Test
  public void testMain() throws Exception {
    new Thread(new Runnable() {
      public void run() {
        System.out.println("hello world");
      }
    }).start();
  }

  @Test
  public void testMain2() throws Exception {
    ExecutorService executor = Executors.newCachedThreadPool();

    Future<Long> result = executor.submit(new Callable<Long>() {
      public Long call() throws Exception {
        return 0L;
      }
    });
    System.out.println(result.get());

    FutureTask<Long> result2 = new FutureTask<Long>(new Callable<Long>() {
      public Long call() throws Exception {
        return 0L;
      }
    });
    executor.submit(result2);
    System.out.println(result2.get());


  }
}
```

# 线程池

```java
  @Test
  public void testMain4() {
    //线程安全的数据结构

    //常见的阻塞队列,即队列满等待
    Queue<Long> queue1 = new ArrayBlockingQueue<Long>(1024);
    Queue<Long> queue2 = new LinkedBlockingDeque<Long>(1024);
    Queue<Long> queue3 = new PriorityBlockingQueue<Long>(1024);

    //常见的数据字段
    Map<String, Object> dict = new ConcurrentHashMap<String, Object>();
  }
```

# 线程安全数据结构

```java
  @Test
  public void testMain4() {
    //线程安全的数据结构

    //常见的阻塞队列,即队列满等待
    Queue<Long> queue1 = new ArrayBlockingQueue<Long>(1024);
    Queue<Long> queue2 = new LinkedBlockingDeque<Long>(1024);
    Queue<Long> queue3 = new PriorityBlockingQueue<Long>(1024);

    //常见的数据字段
    Map<String, Object> dict = new ConcurrentHashMap<String, Object>();
  }

```

# 工具

```java
  @Test
  public void testMain5() throws InterruptedException {

    //闭锁, 当 countDown 调用3次, wait 阻塞才会释放
    CountDownLatch latch = new CountDownLatch(3);

    latch.countDown();
    latch.countDown();
    latch.countDown();

    latch.wait();

    //栅栏,当2个线程阻塞才会释放
    CyclicBarrier barrier = new CyclicBarrier(2);
    barrier.await();

    //信号量, 保证1个线程通过当前方法
    Semaphore semaphore = new Semaphore(1);

    semaphore.acquire();

    semaphore.release();
  }
```

# 增强包 guava

```java
//todo
```

线城池

```java
  @Test
  public void testMain3() throws Exception {
    //固定最大线程数
    ExecutorService executor1 = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    //存在超时机制,缓存复用线程
    ExecutorService executor2 = Executors.newCachedThreadPool();
    //单列线程
    ExecutorService executor3 = Executors.newSingleThreadExecutor();
    //线程周期执行,固定大小
    ExecutorService executor4 = Executors.newScheduledThreadPool(4);
  }
```

# forkjoin

```java
  @Test
  public void testMain6() {

    ForkJoinPool pool = new ForkJoinPool(Runtime.getRuntime().availableProcessors());
    pool.invoke(new SubTask());
    Long result=pool.submit(new SubTask2()).get();
  }


class SubTask extends RecursiveAction {

  private int beg;
  private int end;

  @Override
  protected void compute() {
    if (end - beg > Runtime.getRuntime().availableProcessors()) {
      int mid = (beg + end) / 2;
      SubTask
          t1 = new SubTask().setBeg(beg).setEnd(mid);
      SubTask
          t2 = new SubTask().setBeg(mid).setEnd(end);
      invokeAll(t1, t2);
    } else {

      return;
    }
  }

  public int getBeg() {
    return beg;
  }

  public SubTask setBeg(int beg) {
    this.beg = beg;
    return this;
  }

  public int getEnd() {
    return end;
  }

  public SubTask setEnd(int end) {
    this.end = end;
    return this;
  }
}

class SubTask2 extends RecursiveTask<Long> {

  private int beg;
  private int end;

  @Override
  protected Long compute() {

    List<RecursiveTask<SubTask2>> subtasks =
        new ArrayList<RecursiveTask<SubTask2>>();

    if (end - beg > Runtime.getRuntime().availableProcessors()) {
      int mid = (beg + end) / 2;
      SubTask2
          t1 = new SubTask2().setBeg(beg).setEnd(mid);
      SubTask2
          t2 = new SubTask2().setBeg(mid).setEnd(end);
      t1.fork();
      t2.fork();

      return t1.join() + t2.join();
    }
    return 1L;
  }

  public int getBeg() {
    return beg;
  }

  public SubTask2 setBeg(int beg) {
    this.beg = beg;
    return this;
  }

  public int getEnd() {
    return end;
  }

  public SubTask2 setEnd(int end) {
    this.end = end;
    return this;
  }
}
```

# actors/eventBus 模型

```java
  @Test
  public void testMain7() {
    EventBus eventBus = new EventBus("test");
    EventListener listener = new EventListener();

    eventBus.register(listener);

    eventBus.post(new TestEvent(200));
    eventBus.post(new TestEvent(300));
    eventBus.post(new TestEvent(400));

    System.out.println("LastMessage:" + listener.getLastMessage());

  }


class TestEvent {

  private final int message;

  public TestEvent(int message) {
    this.message = message;
    System.out.println("event message:" + message);
  }

  public int getMessage() {
    return message;
  }
}

class EventListener {

  public int lastMessage = 0;

  @Subscribe
  public void listen(TestEvent event) {
    lastMessage = event.getMessage();
    System.out.println("Message:" + lastMessage);
  }

  public int getLastMessage() {
    return lastMessage;
  }
}
```

# 并发框架 Disruptor

效率很高，有很多 hack 写法，非常值得学习

https://github.com/LMAX-Exchange/disruptor
http://ifeve.com/disruptor-getting-started/

# 书籍

《JAVA并发编程实践》

# 很有意思的一个项目

http://sourceforge.net/projects/javaconcurrenta/



