title: Server IRC
date: 2016/07/13 01:28:15
categories:
 - tryghost

tags:
 - manage 



---

# IRC Server

https://github.com/unrealircd/unrealircd
https://www.unrealircd.org/docs/Installing_from_source

```language-bash
cp /root/unrealircd/conf/examples/example.conf /root/unrealircd/conf/unrealircd.conf

config error: /root/unrealircd/conf/unrealircd.conf:144: please change the the name and password of the default 'bobsmith' oper block
config error: /root/unrealircd/conf/unrealircd.conf:378: set::cloak-keys: (key 2) Keys should be mixed a-zA-Z0-9, like "a2JO6fh3Q6w4oN3s7"
config error: /root/unrealircd/conf/unrealircd.conf:379: set::cloak-keys: (key 3) Keys should be mixed a-zA-Z0-9, like "a2JO6fh3Q6w4oN3s7"
config error: /root/unrealircd/conf/unrealircd.conf:376: set::cloak-keys: All your 3 keys should be RANDOM, they should not be equal
config error: /root/unrealircd/conf/unrealircd.conf:386: set::kline-address must be an e-mail or an URL
config error: 5 errors encountered

sh ./bin/unrealircd 
```

# IRC Web Client

https://github.com/erming/shout
http://shout-irc.com/docs/

# IRC Local Client
https://github.com/mephux/komanda

or maybe irssi
```language-bash
yum install irssi

irssi
/window new 
/connect 172.16.1.15
/join deploy
/nick zuoyun
```

# IRC Cloud 
http://webchat.freenode.net/

# IRC Protocl
https://en.wikipedia.org/wiki/Internet_Relay_Chat
https://www.alien.net.au/irc/index.html



