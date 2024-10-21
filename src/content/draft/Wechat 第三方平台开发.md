title: Wechat 第三方平台开发
date: 2018/08/13 01:51:04
categories:
- dev
tags:
-  wechat
------

# 开发步骤

1. 后台设置回调的服务器地址

2. 配置 java 的加密包

   > ```
   > JCE无限制权限策略文件JDK7(guohai-support/file/JDK7)
   >     -原因
   >         +用于微信消息安全模式，防止AES加密异常：java.security.InvalidKeyException:illegal Key Size
   >     -方法
   >         +如果安装了JRE，将两个jar文件放到%JRE_HOME%\lib\security目录下覆盖原来的文件
   >         +如果安装了JDK，将两个jar文件放到%JDK_HOME%\jre\lib\security目录下覆盖原来文件
   > ```

3. 前端加载js_sdk

# 登陆绑定

这里绑定请求以后，可以走两套 api 操作

* 企业号相关文档 http://work.weixin.qq.com/api/doc
* 服务号相关文档 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1445241432
* js_sdk 使用 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

## 前端请求

* 请求303跳转到目标页以后，直接参数会话可以拿到用户信息

  

  ```javascript
  //参数走getAccessJsSdkInfo.json 请求获取
  wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，公众号的唯一标识
      timestamp: , // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '',// 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
  });
  
  wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  });
  
  
  ```

  

## 后端代码

分个步骤

1. 绑定服务器 bindServer.htm的 url
2.  点击连接以后会跳转至第一步绑定的域下getOauthPageUrl.json路由
3. 由第二步303跳转到getOauthUserInfo.json步骤直接获取用户信息

用户绑定请求 js

1. 通过 url 参数请求getAccessJsSdkInfo.json获取签名

```java
  @ResponseBody
  @RequestMapping("bindServer.htm")
  public String bindServer(HttpServletRequest request) {
    String result = "";
    //绑定微信服务器
    if ("GET".equalsIgnoreCase(request.getMethod().toUpperCase())) {
      result = this.bind(request);
    } else {
      //处理消息
      result = this.processRequest(request);
    }
    return result;
  }
  
  
  /**
   * 请求获取当前用户信息
   */
  @ResponseBody
  @RequestMapping("getOauthPageUrl.json")
  public Object getOauthPageUrl(HttpServletResponse response, String state) {
    try {
      QYOauthAPI oauthAPI = new QYOauthAPI(config);
      String oauthPageUrl = oauthAPI.getOauthPageUrl(REDIRECT_URL, OauthScope.SNSAPI_BASE, state);
      response.sendRedirect(oauthPageUrl);
    } catch (Exception e) {
      return buildFailedResult(e.getMessage());
    }
    return buildFailedResult("授权异常");
  }

  /**
   * 获取code得到用户信息
   */
  @ResponseBody
  @RequestMapping("getOauthUserInfo.json")
  public JSONObject getOauthUserInfo(HttpServletResponse response, String code, String state, String ticket) {
    if (StringUtils.isBlank(code) && "prd".equals(PropertiesUtil.getProperties("env"))) {
      return buildFailedResult("code不能为空！");
    }
    try {
      QYUserAPI userAPI = new QYUserAPI(config);
      GetOauthUserInfoResponse result = userAPI.getOauthUserInfo(code);
      //拿到微信账号以后，呼起
      if (StringUtils.isNotBlank(result.getUserid())) {
        String jm = JwtUtil.encrypt(hacking(result.getUserid()));
        response
            .sendRedirect(DOMAIN + "/MIMP/index.html#/loading?wechat=" + jm + "&date=" + System.currentTimeMillis());
      } else {
        response.sendRedirect(DOMAIN + "/MIMP/index.html#/loading?wechat=error");
      }
    } catch (Exception e) {
      try {
        if ("dev".equals(PropertiesUtil.getProperties("env"))) {
          response.sendRedirect(DOMAIN + "/MIMP/index.html#/loading?wechat=" + JwtUtil.encrypt("rany"));
        } else {
          response.sendRedirect(DOMAIN + "/MIMP/index.html#/loading?wechat=error");
        }
      } catch (IOException e1) {
        return buildFailedResult("系统异常");
      } catch (Exception e1) {
        return buildFailedResult(e1.getMessage());
      }
    }
    return buildFailedResult("系统异常");
  }

```

js_sdk 相关代码

```java

  /**
   * 获取前端js_ticket
   */
  @ResponseBody
  @RequestMapping("getAccessJsSdkInfo.json")
  public JSONObject getAccessJsSdkInfo(@RequestParam String collUrl, String invalid) {
    try {
      String JS_API_TICKET = config.getJsApiTicket();
      logger.info("JS_Ticket 获取 [" + JS_API_TICKET + "]");
      String nonce_str = "zuoyun";
      Long timestamp = System.currentTimeMillis() / 1000;
      String signature = JsApiUtil.sign(JS_API_TICKET, nonce_str, timestamp, collUrl);

      //返回值
      Map<String, String> result = new HashMap<String, String>();
      result.put("appId", CORPID);
      result.put("timestamp", timestamp.toString());
      result.put("nonceStr", nonce_str);
      result.put("signature", signature);

      result.put("debug_url", collUrl);
      result.put("debug_jsapi_ticket", JS_API_TICKET);
      return buildSuccessResult(result);
    } catch (ServiceException e) {
      logger.error("调用微信接口失败," + e.getMessage(), e);
      return buildFailedResult("调用微信接口失败！");
    } catch (Exception e) {
      logger.error("调用微信接口获取ticket失败," + e.getMessage(), e);
      return buildFailedResult("调用微信接口获取ticket失败");
    }
  }


package com.github.sd4324530.fastweixin.util;

import com.github.sd4324530.fastweixin.message.aes.SHA1;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author daxiaoming
 */
public class JsApiUtil {
    /**
     * 计算 wx.config() 中需要使用的签名。每个页面都需要进行计算
     *
     * @param jsApiTicket 微信 js-sdk提供的ticket
     * @param nonceStr    随机字符串
     * @param timestame   时间戳
     * @param url         当前网页的URL，不包含#及其后面部分
     * @return 合法的签名
     * @throws Exception 获取签名异常
     */
    public static String sign(String jsApiTicket, String nonceStr, long timestame, String url) throws Exception {
        Map<String, String> paramMap = new TreeMap<String, String>();
        paramMap.put("jsapi_ticket", jsApiTicket);
        paramMap.put("noncestr", nonceStr);
        paramMap.put("timestamp", Long.toString(timestame));
        paramMap.put("url", url);

        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : paramMap.entrySet()) {
            sb.append("&").append(entry.toString());
        }
        return SHA1.getSHA1HexString(sb.substring(1));
    }

}
  
```

## 响应

# 引用

* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5