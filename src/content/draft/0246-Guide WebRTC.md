title: Guide WebRTC
date: 2018/04/18 06:11:11
categories:
 - tryghost

tags:
 - 未归档 



---

### 核心接口
https://webrtc.org
https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia

有几个条件
* 必须使用 https 协议 origin 
* 必须有 stun 服务器, 一般私服有 

```language-javascript

var yourVideo = document.getElementById("yours");
var theirVideo = document.getElementById("theirs");
var yourConnection, theirConnection;

if (hasUserMedia()) {

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    
    .then(function(stream) {
        /* 使用这个stream stream */
    yourVideo.src = window.URL.createObjectURL(this.stream);
            if (hasRTCPeerConnection()) {
                // 稍后我们实现 startPeerConnection
                startPeerConnection(this.stream);
            } else {
                alert("没有RTCPeerConnection API");
            }
})
.catch(function(err) {
  /* 处理error */
    console.log(err);
});

### 服务器搭建参考
* Collider Server
* STUN/TURN/ICE Server


```
### 参考
https://github.com/muaz-khan/WebRTC-Experiment
https://github.com/webrtc/samples
https://github.com/andyet/SimpleWebRTC
https://github.com/webrtc/apprtc



