title: Oauth JWT
date: 2017/10/30 01:53:52
categories:
 - tryghost

tags:
 - 未归档 



---

JWT是一种轻量的客户端认证授权协议
有两篇文章很好的概括

* http://blog.leapoahead.com/2015/09/06/understanding-jwt/
* http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/

基础结构体为
Header.Payload.Signature
```
其中
1.Header
base64({
  "typ": "JWT",
  "alg": "HS256"
})
2.Payload
base64({"userId":"xx"})
3.Signature
前两者求MAC，类似这样
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```
保证授权颁发的token不可篡改，但是将部分用户信息暴露在网络。

对应实现
https://github.com/jwtk/jjwt
```language-xml
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.0</version>
        </dependency>

```
```language-java
public class JsonWebTokenUtility {

  private SignatureAlgorithm signatureAlgorithm;
  private Key                secretKey;

  public JsonWebTokenUtility() {
    signatureAlgorithm = SignatureAlgorithm.HS512;
    String encodedKey = "demo";
    secretKey = deserializeKey(encodedKey);
  }

  public String createJsonWebToken() {
    return Jwts
        .builder()
        .setSubject("jik1992")
        .claim("email", "zuo.zhong@163.com")
        .claim("roles", Lists.newArrayList("admin"))
//        .setExpiration(new Date())
        .signWith(getSignatureAlgorithm(), getSecretKey()).compact();
  }


  public Object parseAndValidate(String token) {
    try {
      User user = new User();
      Claims claims = Jwts.parser().setSigningKey(getSecretKey()).parseClaimsJws(token).getBody();
      String userId = claims.getSubject();
      String email = (String) claims.get("email");
      List roleNames = (List) claims.get("roles");
      Date expirationDate = claims.getExpiration();
      return user
          .setUsername(userId)
          .setEmail(email)
          .setRoles(roleNames);
    } catch (JwtException ex) {
      System.out.println(ex.getMessage());
      return null;
    }
  }

  private Key deserializeKey(String encodedKey) {
    byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
    return new SecretKeySpec(decodedKey, getSignatureAlgorithm().getJcaName());
  }

  private String serializeKey(Key key) {
    return Base64.getEncoder().encodeToString(key.getEncoded());
  }

  private SignatureAlgorithm getSignatureAlgorithm() {
    return signatureAlgorithm;
  }

  private Key getSecretKey() {
    return secretKey;
  }


  public static void main(String[] args) {
    JsonWebTokenUtility utility = new JsonWebTokenUtility();
    //密钥存储
    String token = utility.createJsonWebToken();
    System.out.println(token);
    System.out.println(JSON.toJSONString(utility.parseAndValidate(token)));
  }
}


```

## 引用
* https://keyholesoftware.com/2016/06/20/json-web-tokens-with-spring-cloud-microservices/
* https://juejin.im/post/59f849316fb9a0450f213cbf
* https://segmentfault.com/a/1190000009164779





