title: NoSQL LevelDB for java
date: 2015/12/10 16:18:44
categories:
 - tryghost

tags:
 - store 



---

借鉴的 hbase 的思想，本身也是 activeMQ 的核心组件。
作为持久化队列的良性基础模块。TPS 能到13W+
使用场景 队列数据落地。

https://github.com/dain/leveldb

可行的，还有跟进的版本 http://rocksdb.org/

```language-xml
       <dependency>
            <groupId>org.iq80.leveldb</groupId>
            <artifactId>leveldb-project</artifactId>
            <version>0.7</version>
       </dependency>
```

```language-java
public class LocalStoreFactory {

  static LogWriter writer = null;

  static {
    if (writer == null) {
      try {
        writer = Logs.createLogWriter(createTempFile("table", ".log"), 10000);
        System.out.println("绑定一个临时文件");
        System.out.println(writer.getFile().getAbsolutePath());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  public static void write(String data) {
    try {
      writer.addRecord(toSlice(data), false);
    } catch (IOException e) {
      System.out.println("异常");
    }
  }

  public static LogWriter getWriter() {
    return writer;
  }

  public static LogReader getReader() {
    FileChannel fileChannel = null;
    LogReader reader = null;
    try {
      try {
        fileChannel = new FileInputStream(writer.getFile()).getChannel();
        System.out.println("读取一个临时文件");
        System.out.println(writer.getFile().getAbsolutePath());
      } catch (FileNotFoundException e) {
        System.out.println("文件读取失败");
      }

      reader = new LogReader(fileChannel, new LogMonitor() {
        public void corruption(long l, String s) {

        }

        public void corruption(long l, Throwable throwable) {

        }
      }, true, 0);
    } catch (Exception e) {
      Closeables.closeQuietly(fileChannel);
    }
    return reader;
  }


  private static Slice toSlice(String value) throws UnsupportedEncodingException {
    byte[] bytes = value.getBytes("UTF-8");
    Slice slice = Slices.allocate(bytes.length);
    SliceOutput sliceOutput = slice.output();
    for (int i = 0; i < 1; i++) {
      sliceOutput.writeBytes(bytes);
    }
    return slice;
  }

}
```



