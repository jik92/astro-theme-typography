title: Test Junit4/Mockito
date: 2015/08/31 06:43:05
categories:
 - tryghost

tags:
 - java 



---

# Junit4
批量测试
```language-java
@RunWith(Suite.class)
@Suite.SuiteClasses(SuitTest.class)
public class ParamTest {

}
```

批量参数测试
```language-java
@RunWith(Parameterized.class)
public class ParameterizedTest {


  @Parameter(value = 0)
  public int a;
  @Parameter(value = 1)
  public int b;
  @Parameter(value = 2)
  public int c;

  @Parameters
  public static List<Object[]> data() {
    return Lists.asList(new Object[]{-1, 1, 0}, new Object[][]{{20, 20, 40}, {30, 30, 60}, {-5, -5, -10}});
  }

  @Test(timeout = 1000)
  public void hello() {
    Assert.assertEquals(a + b, c);
  }

  @Test(expected = IllegalArgumentException.class)
  public void exception() {
    throw new IllegalArgumentException("Xxx");
  }

  @Before
  public void setUp() throws Exception {
    System.out.println("测试执行前");
  }

  @After
  public void tearDown() throws Exception {
    System.out.println("测试执行后");
  }
}

```



# Mockito
>http://mockito.org/

原语

 * mock/spy
 * 验证:verify(times/never/atLeastOnce/atLeast/atMost)=>method
 * 判断:when=>thenReturn/thenThrow
 * 断言:doThrow()/doAnswer()/doNothing()/doReturn()  
 * 填充:anyInt(), anyString()

参考
>http://site.mockito.org/mockito/docs/current/org/mockito/Mockito.html

# Htmlunit

# Seleuium




