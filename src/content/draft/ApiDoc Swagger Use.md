title: ApiDoc Swagger Use
date: 2019/01/20 20:07:18
categories:

 - java

tags:
 - java-doc



---

基于 Java 注解的 RestFul API文档生成工具，基于 springboot 的 doc 文档生成

# 官网
* http://swagger.io/
* https://github.com/springfox/springfox
* https://asciidoctor.org/docs/asciidoctor-maven-plugin/

# 依赖
```language-xml
             <!--doc文档-->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>

        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.7.0</version>
        </dependency>
```

# 配置
2.MyJsonMapper.java
```language-java
public class MyJsonMapper extends ObjectMapper {

  public MyJsonMapper() {
    this.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
  }
}

```
3.MySwaggerConfig.java
```language-java
@Configuration
@EnableSwagger2
public class SwaggerConfig extends WebMvcConfigurerAdapter {

  @Bean
  public Docket createRestApi() {
    ApiInfo apiInfo = new ApiInfoBuilder()
        .title("API文档")
        .description("接口文档")
        .version("0.0.1")
        .build();
    List<ResponseMessage> msg = Lists.newArrayList();

    for (StatusConstant statusConstant : StatusConstant.values()) {
      msg.add(new ResponseMessageBuilder()
                  .code(statusConstant.val())
                  .message(statusConstant.msg())
                  .responseModel(new ModelRef("Error")).build());
    }

    return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(apiInfo)
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.zhuyun.slff.api"))
        .paths(PathSelectors.any())
        .build()
        .globalResponseMessage(RequestMethod.GET, msg)
        .globalResponseMessage(RequestMethod.POST, msg)
        .useDefaultResponseMessages(false);
  }


  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("swagger-ui.html")
        .addResourceLocations("classpath:/META-INF/resources/");

    registry.addResourceHandler("/webjars/**")
        .addResourceLocations("classpath:/META-INF/resources/webjars/");
  }


}

```
# 访问地址

0.0.0.0:8080/swagger-ui.html

# 常用注解
```language-java
@ApiClass

@ApiError

@ApiErrors

@ApiOperation

@ApiParam

@ApiParamImplicit

@ApiParamsImplicit

@ApiProperty

@ApiResponse

@ApiResponses

@ApiModel

```

# 静态文档生成

1. 依赖

   ```xml
           <dependency>
               <groupId>io.github.swagger2markup</groupId>
               <artifactId>swagger2markup</artifactId>
               <version>1.3.3</version>
           </dependency>
   ```

   

2. Test

```language-java
/**
 * Created by ZuoYun on 2018/8/14. Time: 10:12 AM Information:
 */
public class AppTest {

  @Test
  public void main() throws MalformedURLException {
    URL remoteSwaggerFile = new URL("http://0.0.0.0:8080/v2/api-docs");
    Path outputDirectory = Paths.get("slff-resource/asciidoc");

    Swagger2MarkupConfig config = new Swagger2MarkupConfigBuilder()
        .withMarkupLanguage(MarkupLanguage.MARKDOWN)
//        .withOutputLanguage(Language.ZH)
//        .withPathsGroupedBy(GroupBy.TAGS)
        .build();

    Swagger2MarkupConverter.from(remoteSwaggerFile)
        .withConfig(config)
        .build()
        .toFolder(outputDirectory);
  }
}
```


## 使用 zuul 对 swagger 的文档做聚合

https://github.com/dyc87112/swagger-butler

```
<dependencies>
    <dependency>
        <groupId>com.didispace</groupId>
        <artifactId>swagger-butler-core</artifactId>
        <version>1.2.0</version>
    </dependency>
</dependencies>
```

使用注解 @EnableSwaggerButler

application.properties

```
#注意根路由要改不然无法暴露 swagger-ui.html
zuul.servlet-path=/api

# use zuul routes generate swagger resources
swagger.butler.api-docs-path=v2/api-docs
swagger.butler.swagger-version=2.0
swagger.butler.auto-generate-from-zuul-routes=true
swagger.butler.ignore-routes=slff-cloud-zuul
```

通过对 zuul 的解析，自动绑定所有路由 doc



# 其他

 * 注意这里 doc 在解析泛型的时候支持有限，局限于 Spring Spec没有办法工作，所以取巧的方法是用 List 包装一下
 * <https://github.com/swagger-api/swagger-core/issues/498> 
