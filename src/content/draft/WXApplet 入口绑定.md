title:  WXApplet 入口绑定
date: 2018/08/13 01:51:04
categories:
- build_env
- dev
tags:
- wechat
---

# how to use

## wechat deploy

1. login http://mp.weixin.qq.com/  
2. add your trust domain
3. saving AppID、AppSecret to update run.sh

## server deploy

1. git clone source
2. mysql -h xxx -u xxx -p > use xxx; source mini_program.sql
3. mvn clean install 
4. get slff.jar scp your test server
5. edit run.sh and sh run.sh

## develop

1. downloading https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18081011
2. login and take your project, compiler 
3. console.info 

## see more

- https://developers.weixin.qq.com/miniprogram/introduction/
- https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html

# 关键入口请求

## 用户入口

### WXApplet 前端请求

```javascript
// 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.info("code",res.code)
        var code=res.code;
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            console.info("前台用户信息", res.userInfo)

            var iv=res.iv;
            var encryptedData=res.encryptedData;

            wx.request({
              url: 'https://mini.server.tech84.com/sdk/getOauthUserInfo',
              data:{
                code: code,
                iv: iv,
                encryptedData: encryptedData,
              },
              success: function (res) {
                console.log("后台用户会话", res.data)
              }
            })

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
```



### WXApplet后端代码



#### Controller

```java

import com.google.common.collect.ImmutableMap;

import com.alibaba.fastjson.JSON;
import com.github.kevinsawicki.http.HttpRequest;
import com.zhuyun.slff.Model.BaseModel;
import com.zhuyun.slff.repo.UserRepo;
import com.zhuyun.slff.utils.StatusConstant;
import com.zhuyun.slff.utils.WXAppletUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import cn.hutool.crypto.SecureUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by ZhouFangyuan on 2018/8/10. Information:
 */
@Api(value = "授权接口")
@RestController
@RequestMapping("sdk/")
public class SDKApi {

  final static Logger logger    = LoggerFactory.getLogger(SDKApi.class);
  @Value("${appKey}")
  private      String appKey    = "";
  @Value("${appSecret}")
  private      String appSecret = "";

  @Autowired
  private UserRepo userRepo;

  @ResponseBody
  @RequestMapping(value = "getOauthUserInfo", method = RequestMethod.GET)
  @ApiOperation(value = "小程序用户登陆", notes = "登录")
  public Object getOauthUserInfo(HttpServletRequest request,
                                 @ApiParam(value = "用户登录凭证", defaultValue = "", required = true)
                                 @RequestParam String code,
                                 @ApiParam(value = "密文", defaultValue = "", required = true)
                                 @RequestParam String encryptedData,
                                 @ApiParam(value = "加密算法的初始向量", defaultValue = "", required = true)
                                 @RequestParam String iv

  ) {
    logger.debug(code);
    String result = "";
    String userInfo = "";
    HttpRequest
        req =
        HttpRequest.get(
            "https://api.weixin.qq.com/sns/jscode2session?appid=" + appKey + "&secret=" + appSecret + "&js_code="
            + code + "&grant_type=authorization_code");
    if (req.ok()) {
      result = req.body();
      logger.debug("oauth_info {} ", result);
      String seesion = JSON.parseObject(result).get("session_key").toString();
      String openid = JSON.parseObject(result).get("openid").toString();
      String expires_in = JSON.parseObject(result).get("expires_in").toString();
      String unionid = "";
      if (JSON.parseObject(result).containsKey("unionid")) {
        unionid = JSON.parseObject(result).get("unionid").toString();
      }

      logger.debug("detail_info {} {} {} ", encryptedData, seesion, iv);
      try {
        userInfo = WXAppletUtils.getUserInfo(encryptedData, seesion, iv);
      } catch (Exception e) {
        logger.error("解析报错", e);
      }

      return BaseModel.buildSuccess(ImmutableMap
                                        .of(
                                            "openid", openid,
                                            "unionid", unionid,
                                            "sys_session", SecureUtil.simpleUUID(),
                                            "userInfo", userInfo
                                        ));
    }
    return BaseModel.buildFail(StatusConstant.NO_AUTH);


  }

}
```



#### encryptedData解析

参阅

- https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject
- https://developers.weixin.qq.com/miniprogram/dev/api/unionID.html

```java

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.Arrays;

import java.io.UnsupportedEncodingException;
import java.security.AlgorithmParameters;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.spec.InvalidParameterSpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import cn.hutool.core.codec.Base64;

/**
 * 微信小程序信息获取
 */
public class WXAppletUtils {

  /**
   * 解密用户敏感数据获取用户信息
   *
   * @param sessionKey    数据进行加密签名的密钥
   * @param encryptedData 包括敏感数据在内的完整用户信息的加密数据
   * @param iv            加密算法的初始向量
   */
  public static String getUserInfo(String encryptedData, String sessionKey, String iv) {
    // 被加密的数据
    byte[] dataByte = Base64.decode(encryptedData);
    // 加密秘钥
    byte[] keyByte = Base64.decode(sessionKey);
    // 偏移量
    byte[] ivByte = Base64.decode(iv);
    try {
      // 如果密钥不足16位，那么就补足.  这个if 中的内容很重要
      int base = 16;
      if (keyByte.length % base != 0) {
        int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
        byte[] temp = new byte[groups * base];
        Arrays.fill(temp, (byte) 0);
        System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
        keyByte = temp;
      }
      // 初始化
      Security.addProvider(new BouncyCastleProvider());
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding", "BC");
      SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
      AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
      parameters.init(new IvParameterSpec(ivByte));
      cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
      byte[] resultByte = cipher.doFinal(dataByte);
      if (null != resultByte && resultByte.length > 0) {
        return new String(resultByte, "UTF-8");
      }
    } catch (NoSuchProviderException | NoSuchAlgorithmException | BadPaddingException | InvalidKeyException | InvalidAlgorithmParameterException | NoSuchPaddingException | InvalidParameterSpecException | IllegalBlockSizeException | UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    return "N/A";
  }
}
```



### 响应

```javascript
{
    "status": 200,
    "msg": "响应成功！",
    "data": {
        "openid": "ofI3t0Pz7cCVgZDgSyJRfRy3LXvk",
        "unionid": "oSeNlwmWdck1PcsYj_eWwH9DQPwI",
        "sys_session": "c771a43be3aa42408d03f043a0104de8",
        "userInfo": "{\"openId\":\"ofI3t0Pz7cCVgZDgSyJRfRy3LXvk\",\"nickName\":\"Ji.K BD7NYS\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Changsha\",\"province\":\"Hunan\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/jygPpswYc4ic1EayaudvFUAwiaic4ianrcOb0ahvLYNJNsJke24N5zUHSGSIYk83SRelNu0KNsyliaht2vUOzQsn77g/132\",\"unionId\":\"oSeNlwmWdck1PcsYj_eWwH9DQPwI\",\"watermark\":{\"timestamp\":1534096338,\"appid\":\"wxb698c2ed1f4d42b9\"}}"
    }
}

```

# 引用

* https://www.jianshu.com/p/856fe2195ffe