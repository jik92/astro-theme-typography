title: K3S Traefik Guide
date: 2020/12/16 17:58:25
categories:

 - ops

tags:

 - k3s 
 - traefik
 - docker

---

## Concepts

https://doc.traefik.io/traefik/getting-started/quick-start/

![Architecture](https://doc.traefik.io/traefik/assets/img/architecture-overview.png)

* [*Providers*](https://doc.traefik.io/traefik/providers/overview/) discover the services that live on your infrastructure (their IP, health, ...)
* [*Entrypoints*](https://doc.traefik.io/traefik/routing/entrypoints/) listen for incoming traffic (ports, ...)
* [*Routers*](https://doc.traefik.io/traefik/routing/routers/) analyse the requests (host, path, headers, SSL, ...)
* [*Services*](https://doc.traefik.io/traefik/routing/services/) forward the request to your services (load balancing, ...)
* [*Middlewares*](https://doc.traefik.io/traefik/middlewares/overview/) may update the request or make decisions based on the request (authentication, rate limiting, headers, ...)

## Featrue

* TCP/HTTP代理
* 自动 let‘encript 证书
* 服务自发现
* 金丝雀发布
* 流量复制

## Step

### Installation of k3s

```shell
# uninstall
sh /usr/local/bin/k3s-uninstall.sh
# 0x01 install 
curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh \ 				          			| INSTALL_K3S_MIRROR=cn INSTALL_K3S_EXEC="--no-deploy traefik --tls-san 81.68.107.111" \
      sh  -
# 已经安装了，修改/etc/systemd/system/k3s.service
# ExecStart=/usr/local/bin/k3s \
#    server \
#        '--disable=traefik' 
systemctl daemon-reload
service k3s restart

# 0x02 change mirrors
cd /var/lib/rancher/k3s/agent/etc/containerd/ && cp config.toml config.toml.tmpl
# edit added
[plugins.cri.registry.mirrors]
  [plugins.cri.registry.mirrors."docker.io"]
    endpoint = ["https://docker.mirrors.ustc.edu.cn"]
<<EOF
# restart and check
systemctl restart k3s
crictl info

#
kubectl get pods --all-namespaces

```

### Installation of traefik

```shell
# https://doc.traefik.io/traefik/v2.3/user-guides/crd-acme/


```

## Usage

```

```



# Quate

* https://docs.rancher.cn/docs/k3s/quick-start/_index
* https://doc.traefik.io/traefik/v2.3/