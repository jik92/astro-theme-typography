title: Dingtalk 第三方平台开发
date: 2018/08/13 01:51:04
categories:

- Third-party platform

tags:

-  dingtalk

------

# 开发步骤

1. 在开发者后台[获取CorpSecret](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.mvsqM1&treeId=371&articleId=106926&docType=1)信息。
2. 通过企业的CorpId 和 CorpSecret信息换取access_token信息。
3. 查询CorpSecret的[按部门授权范围](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.tuFqD6&treeId=371&articleId=106091&docType=1)

# 登陆绑定

参阅

* https://open-doc.dingtalk.com/docs/doc.htm?source=search&treeId=367&articleId=106818&docType=1

## 前端请求

```
//此初始化参数从getAccessJsSdkInfo.json请求中获取
dd.config({
    agentId: '', // 必填，微应用ID
    corpId: '',//必填，企业ID
    timeStamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    type:0/1,   //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    jsApiList : [ 'runtime.info', 'biz.contact.choose',
        'device.notification.confirm', 'device.notification.alert',
        'device.notification.prompt', 'biz.ding.post',
        'biz.util.openLink' ] // 必填，需要使用的jsapi列表，注意：不要带dd。
});

//这一步拿到的 code 去getOauthUserInfo.json 获取用户数据
dd.runtime.permission.requestAuthCode({
    corpId: "corpid",
    onSuccess: function(result) {
    /*{
        code: 'hYLK98jkf0m' //string authCode
    }*/
    },
    onFail : function(err) {}
 
})

```



## 后端代码

* 注意这个collUrl是请求者当前的 url

```java
  /**
   * 获取前端 ddconfig初始化信息
   */
  @ResponseBody
  @RequestMapping("getAccessJsSdkInfo.json")
  public Map<String, Object> getAccessJsSdkInfo(@RequestParam String collUrl) throws Exception {

    //2.获取 access_token
    String token = getToken();
    //3.获取 get_jsapi_ticket
    HttpRequest ticketRequest = HttpRequest
        .get("https://oapi.dingtalk.com/get_jsapi_ticket?access_token=" + token);
    String js_ticket = (String) JSONObject.parseObject(ticketRequest.body()).get("ticket");
    Long timestamp = new Date().getTime();
    //4.在后端通过sign(js_ticket, nonceStr, timeStamp, url)计算前端校验需要使用的签名信息。
    String
        signature =
        getJsApiSingnature(collUrl, "zuoyun",
                           timestamp, js_ticket);
    Map<String, Object> result = Maps.newHashMap();

    //5、将：‘url’，‘nonceStr’，‘agentId’，‘timeStamp’，‘corpId’，‘signature’传递到前端页面。
    System.out.println("jsticket ===>" + js_ticket);
    result.put("jsticket", js_ticket);
    result.put("signature", signature);
    result.put("nonceStr", "zuoyun");
    result.put("timeStamp", timestamp.toString());
    result.put("corpId", DingTalkSDK.CORP_ID);
    //debug参数
    result.put("debug_token", token);
    result.put("debug_agentid", DingTalkSDK.AGENT_ID);
    result.put("debug_url", collUrl);
    System.out.println(JSON.toJSON(result));
    return result;
  }


  /**
   * 通过code获取用户信息，回调系统
   */
  @ResponseBody
  @RequestMapping("getOauthUserInfo.json")
  public JSONObject getOauthUserInfo(HttpServletResponse response, @RequestParam String code) {

    HttpRequest userInfoRequest = HttpRequest
        .get("https://oapi.dingtalk.com/user/getuserinfo?access_token=" + getToken() + "&code=" + code);
    String jsonUser = userInfoRequest.body();
    System.out.println("钉钉用户登录" + jsonUser);
    System.out
        .println("https://oapi.dingtalk.com/user/getuserinfo?access_token=" + getToken() + "&code=" + code);
    JSONObject user = JSONObject.parseObject(jsonUser);
    String userId = user.get("userid").toString();

    try {
      //拿到微信账号以后，呼起
      if (StringUtils.isNotBlank(userId)) {
        String jm = JwtUtil.encrypt(userId);
        String param = URLEncoder.encode(jm, "utf8");
        System.out.println(param);
        response.sendRedirect(domain + "/MIMP/index.html#/loading?wechat=" + param);
      } else {
        response.sendRedirect(domain + "/MIMP/index.html#/loading?wechat=error");
      }
    } catch (Exception e) {
      try {
        response.sendRedirect(domain + "/MIMP/index.html#/loading?wechat=error");
      } catch (IOException e1) {
        return buildFailedResult("系统异常");
      }
    }
    return buildFailedResult("系统异常");
  }

  private static String getJsApiSingnature(String url, String nonce, Long timeStamp, String jsTicket) {
    String plainTex = "jsapi_ticket=" + jsTicket + "&noncestr=" + nonce + "&timestamp=" + timeStamp + "&url=" + url;
    String signature;
    try {
      MessageDigest crypt = MessageDigest.getInstance("SHA-1");
      crypt.reset();
      crypt.update(plainTex.getBytes("UTF-8"));
      signature = byteToHex(crypt.digest());
      return signature;
    } catch (Exception e) {
      throw new IllegalArgumentException("加密错误");
    }
  }
```



## 响应

# 引用

* https://open-doc.dingtalk.com/docs/doc.htm?treeId=371&articleId=106816&docType=1
* https://open-doc.dingtalk.com/docs/doc.htm?treeId=366&articleId=106812&docType=1
* https://open-doc.dingtalk.com/docs/doc.htm?treeId=171&articleId=107553&docType=1