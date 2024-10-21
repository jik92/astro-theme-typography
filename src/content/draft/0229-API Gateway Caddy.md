title: API Gateway Caddy
date: 2017/11/20 02:32:20
categories:
 - ops

tags:
 - caddy



---

#  Officer Index

* https://caddyserver.com/docs/

# Usage

已经出caddy2了，更好用。

1. 直接复制binary到/usr/bin

2. 提权 chmod 774 /usr/bin/caddy

3. sudo caddy run 

4. 编写Caddyfile

   ```
   appnode.sandseasoft.com {
       respond "Hello, world!"
   }
   www.sandseasoft.com {
       respond "Hello, world!"
   }
   ```

5. sudo caddy start 

6. sudo caddy reload







