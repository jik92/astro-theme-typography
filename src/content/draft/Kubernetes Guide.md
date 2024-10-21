title: Kubernete Guide
date: 2020/12/11 17:58:25
categories:

 - ops

tags:

 - kubernete 
 - minikube
 - docker

---

# Introduction

## Feature

- **自我修复**

- - 在节点故障时重新启动失败的容器，替换和重新部署，保证预期的副本数量；杀死健康检查失败的容器，并且在未准备好之前不会处理客户端请求，确保线上服务不中断。

- **弹性伸缩**

- - 使用命令、UI或者基于CPU使用情况自动快速扩容和缩容应用程序实例，保证应用业务高峰并发时的高可用性；业务低峰时回收资源，以最小成本运行服务。

- **自动部署和回滚**

- - K8S采用滚动更新策略更新应用，一次更新一个Pod，而不是同时删除所有Pod，如果更新过程中出现问题，将回滚更改，确保升级不受影响业务。

- **服务发现和负载均衡**

- - K8S为多个容器提供一个统一访问入口（内部IP地址和一个DNS名称），并且负载均衡关联的所有容器，使得用户无需考虑容器IP问题。

- **机密和配置管理**

- - 管理机密数据和应用程序配置，而不需要把敏感数据暴露在镜像里，提高敏感数据安全性。并可以将一些常用的配置存储在K8S中，方便应用程序使用。

- **存储编排**

- - 挂载外部存储系统，无论是来自本地存储，公有云（如AWS），还是网络存储（如NFS、GlusterFS、Ceph）都作为集群资源的一部分使用，极大提高存储使用灵活性。

- **批处理**

- - 提供一次性任务，定时任务；满足批量数据处理和分析的场景。

## Architecture

https://kubernetes.io/zh/docs/concepts/overview/components/

![Kubernetes 组件](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)

* Contoller plane component
  * Kube-apiserver -   一组维护用的restful接口, 提供了资源操作的唯一入口，并提供认证、授权、访问控制、API注册和发现等机制
  * etcd - highly-available key value store 保存了整个集群的状态
  * Kube-scheduler - scheduling decisions 负责资源的调度，按照预定的调度策略将Pod调度到相应的机器上
  * Kube-controller-manager 负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；
    * Node Controller
    * Replication Controller
    * Endpoints Controller
    * Service Account & Token Controllers
* Node
  * kubelet - 每个节点运行的deamon 负责维护容器的生命周期，同时也负责Volume（CVI）和网络（CNI）的管理
  * kube-proxy - 网络代理 负责为Service提供cluster内部的服务发现和负载均衡
* Container Runtime 负责镜像管理以及Pod和容器的真正运行（CRI）
  * docker - deprecated
  * containerd 
  * CRI-O
* Addons
  * DNS 
    * coreDNS
  * Network
    * Fannel
    * Calico
    * Weave Net
  * Dashboard
  * Container Resouce Monitoring
  * Cluster-level Mertics/Loging
  * Ingress Controller 为服务提供外网入口

# Installation

## 0x00 Docker Installation

```shell
# removed old docker
sudo apt-get purge docker-ce docker-ce-cli containerd.io

# install docker by https://docs.docker.com/engine/install/centos/
# docker installation: https://developer.aliyun.com/article/110806
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# config aliyun mirror 
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://9wakipqn.mirror.aliyuncs.com"]
}
EOF

systemctl daemon-reload && systemctl restart docker
```

## Minikube Installation

```shell
# https://minikube.sigs.k8s.io/docs/start/
# minikube installation: https://developer.aliyun.com/article/221687
# https://github.com/AliyunContainerService/minikube
minikube start  --image-mirror-country cn \
                --registry-mirror=https://xxxx.mirror.aliyuncs.com \
								--image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers \
                --vm-driver=docker \
                --kubernetes-version=1.15.1 \
                --cpus=4 --memory=2200mb
minikube dashboard
#after https://kubernetes.io/docs/tasks/tools/install-kubectl/
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment hello-minikube --type=NodePort --port=8080
minikube service hello-minikube

```

## Kubernate Installation

### Key Point

* 初始化master节点是不工作的，需要worker节点
* kubeadm 后必须要有**CNI** 插件，比如 **flannel** 、**calico**，否则 nodes 会一直处于NotReady
* kubeadm init 之前确认几步
  * "kubeadm reset" if you have already created a previous cluster
  * Remove the ".kube" folder from the home or root directory
  * Disable swap permanently on the machine, especially if you are rebooting your linux system
  * And not to forget, install [a pod network add-on](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#pod-network) according to the instructions provided on the add on site (not Kubernetes site)
  * Follow the post initialization steps given on the command window by kubeadm.

### 0x01 Install kubelet kubeadm kubectl 

```shell
# 添加并信任APT证书
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

# 添加源地址
sudo add-apt-repository "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main"

# 更新源并安装最新版 kubenetes
sudo apt update && sudo apt install -y kubelet kubeadm kubectl

# 添加 completion，最好放入 .bashrc 中
source <(kubectl completion bash)
source <(kubeadm completion bash)
```

### 0x02 Close swap

```shell
sudo swapoff -a  
vim /etc/fstab
# swap default 0 0
free -h # checked 
```

### 0x03 Install k8s

```shell
# uninstall
kubeadm reset
kubeadm config images pull --image-repository='registry.cn-hangzhou.aliyuncs.com/google_containers'
# set --pod-network-cidr for fannel network plugins
kubeadm init --pod-network-cidr=10.244.0.0/16 \
						 --image-repository='registry.cn-hangzhou.aliyuncs.com/google_containers'
						 
# added manager
export KUBECONFIG=/etc/kubernetes/admin.conf
# or added for cluster
sudo cp /etc/kubernetes/admin.conf $HOME/
sudo chown $(id -u):$(id -g) $HOME/admin.conf
export KUBECONFIG=$HOME/admin.conf

# added network plugin corsOS/kube-fannel.yml ref:https://github.com/coreos/flannel
kubectl apply -f kube-flannel.yml

# check nodes status
kubectl get nodes
kubectl get pod -o wide --server=192.168.101.229:8080

# add other nodes
sudo kubeadm join 192.168.101.229:6443 \
		--token t05sp0.xxxx \
    --discovery-token-ca-cert-hash sha256:a030d0f19911*******f0df45782ce0040a62d
# get new token
kubeadm token create     
kubeadm token list
# get ca-cert hash
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | sha256sum | awk '{print $1}'

# Test
kubectl taint nodes --all node-role.kubernetes.io/master-
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pods,svc
curl http://192.168.101.233:32039 
```

### 0x04 Install Dashboard 

```shell
# Dashboard https://github.com/kubernetes/dashboard
# edit
spec:
   type: NodePort     # 
   ports:
     - port: 443
       targetPort: 8443
       nodePort: 30001   #
   selector:
     k8s-app: kubernetes-dashboard
<< EOF     
kubectl apply -f dashboard.yml
# added user
# https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md
# checkout token 
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

### Install helm3

yml file repo

```shell
snap install helm --classic
helm repo add stable http://mirror.azure.cn/kubernetes/charts/
helm repo list
helm repo update
helm search repo nginx-ingress
helm install --set name=nginx-ingress stable/nginx-ingress --generate-name

```

### Debug k8s 

```shell
# restart
systemctl restart docker
systemctl restart  kubelet

# log for checking kubelet
systemctl status  kubelet
journalctl -u kubelet --all

# check images needed pull
kubeadm config images list

# check kebe-system pods and loging
kubectl get pods -n kube-system -o wide
kubectl describe pods weave -n kube-system
kubectl logs weave-net-gq9pn -p -c weave -n kube-system

# permanmently delete some .yml pods
kubectl get deployments --all-namespaces
kubectl delete deployment xxx

kubectl scale deployments/notepad --replicas=100
kubectl set image deployments/notepad notepad=yhlben/notepad:new
kubectl rollout undo deployments/notepad

kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
kubectl deployment "nginx-deployment" image updated

```

### Docker Private Registry

```shell
docker run -d \
    -p 5000:5000 \
    -v /opt/data/registry:/var/lib/registry \
    registry

docker login 127.0.0.1:5000
docker build -f x.dockerfile -t python:3.7-alpine
docker tag python:3.7-alpine registry.container.sandseasoft.com/python:master
docker push registry.container.sandseasoft.com/python:master
```

# Usage

## Minikube

```shell
#minikube by macos
brew install minikube
minikube stop
minikube delete
# enviroment by macos
minikube start --driver=hyperkit 
minikube addons enable ingress
minikube service dashboard --url
#test NodePort
kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
kubectl expose deployment web --type=NodePort --port=8080
minikube service web --url
```

## Kubenetes

```shell
#kubectl 
kubectl get pods
kubectl get service
kubectl get ingress
kubectl port-forward service/web 10001:8080
kubectl get secrets
kubectl describe service
kubectl describe ingress
kubectl describe pods
kubectl delete services my-service
kubectl rollout restart deployment my-service
```

## Yml configuration

```yml
kind: Service
apiVersion: v1
metadata:
  name: my-service
spec:
  type: NodePort 
  selector:
    app: tomcat
  ports:
    - port: 80 
      targetPort: 8020 
      nodePort: 9000 
---
apiVersion: v1
kind: ReplicationController
metadata:
  name: tomcat
  namespace: default
spec:
  replicas: 1
  selector:
    app: tomcat
  template:
    metadata:
      name: tomcat
      labels:
        app: tomcat
    spec:
      volumes:
      - name: "config"
        hostPath:
          path: "/data/xxx"
      containers:
      - name: forme
        image: forme:k8s
        resources:
          limits:
            alpha.kubernetes.io/nvidia-gpu: 1
            cpu: 8
            memory: 4Gi
        ports:
        - containerPort: 8020 
        volumeMounts:
        - name: "config"
          mountPath: "/home/docker/code"
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
    - host: hello-world.info
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 8080

```

## Docker private register

## Using aliyun

* 去`容器镜像服务` 设置个人版仓库和密码

* ```shell
  docker login --username=jik**@163.com registry.cn-shanghai.aliyuncs.com
  docker pull registry.cn-shenzhen.aliyuncs.com/jik1992/test:latest
  cat ~/.docker/config.json
  
  # create secret 
  kubectl create secret docker-registry registry-secret \
      --docker-server=registry.cn-shenzhen.aliyuncs.com \
      --docker-username=jik1992 \
      --docker-password=jik920717 \
      -n default
      
  # edit .yml
     spec:
        serviceAccountName: test
        imagePullSecrets:
        - name: registry-secret #!important
        containers:
        - name: test
          image: registry.cn-shenzhen.aliyuncs.com/jik1992/test:latest
  ```



# Quate

* https://yeasy.gitbook.io/docker_practice/
* https://www.cnblogs.com/double-dong/p/11483670.html
* https://kubernetes.io/zh/docs/home/
* https://kubernetes.io/zh/docs/tasks/configure-pod-container/pull-image-private-registry/
* https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
* https://sysadmins.co.za/https-using-letsencrypt-and-traefik-with-k3s/