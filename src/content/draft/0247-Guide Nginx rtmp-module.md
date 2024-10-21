title: Guide Nginx rtmp-module
date: 2018/04/18 06:25:04
categories:
 - tryghost

tags:
 - 未归档 



---

服务器请使用 nginx rtmp-module架设，架设好了用 ffmpeg 命令行来测试播摄像头。主播客户端请使用rtmp进行推流给rtmp-module，粉丝请使用 rtmp / flv + http stream 进行观看，PC-web端的粉丝请使用 Flash NetStream来观看，移动 web端的粉丝请使用 hls / m3u8 来观看。如果你试验成功要上线了，出现压力了，那么把nginx分层（接入层+交换层），稍微改两行代码，如果资金不足以全国部署服务器，那么把 nginx-rtmp-module 换为 cdn 的标准直播服务，也可以直接调过 nginx，一开始就用 cdn 的直播服务，比如网宿（斗鱼的直播服务提供商）。

作者：韦易笑
链接：https://www.zhihu.com/question/25497090/answer/72397450
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



