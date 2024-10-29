---
title: Kubernetes Collections
pubDate: 2024-1-1
categories: [ '面试', 'docker','k8s' ]
description: ''
---

```bash
# 1，初始化 
# 创建资源
kubectl create -f demo-deployment.yaml 
# 删除资源
kubectl delete -f demo-service.yaml
# CD 命令 
# 服务回滚
kubectl configuration cleaned up
kubectl rollout restart deploy xxx
kubectl rollout status deploy xxx -w --timeout=10m

# 2. Debug 命令
# 单个运行容器 
kubectl run nginx --replicas=3 --labels="app=example" --image=nginx:1.10 --port=80
# 暴露一个服务
kubectl expose deployment nginx --port=88 --type=NodePort --target-port=80 --name=nginx-service
# 镜像修改
kubectl set image daemonset abc *=nginx:1.9.1

# 3. 线上资源修改
# 扩容 scale
kubectl scale --current-replicas=2 --replicas=3 deployment/mysql
# 资源修改
kubectl set resources deployment nginx -c=nginx --limits=cpu=200m,memory=512Mi
# 删除 pod
kubectl delete pod {podName} --grace-period=60

# 4. Info 信息
# pod/node 信息
kubectl get pod -o wide --all-namespaces
kubectl get node
# 服务详细信息
kubectl get svc -n kube-system
kubectl get deploy -o wide

# 5. 查看发布服务的详细信息
kubectl logs --tail=20 nginx
kubectl exec -it nginx-deployment-58d6d6ccb8-lc5fp bash
```

### 以前文章堆叠

### 国内云托管

> http://www.daocloud.io

### 单机监控

> https://github.com/google/cadvisor

### 集群托管

> https://github.com/shipyard/shipyard

### 云平台(TODO)

coreOS+etcd+kubernetes(Mesos)

### 概念

* daemon
* image
* container
* Environment
* Port
* Volumes

```
sudo docker -H tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock -d
```

### 工具

* docker
* docker2boot
* docker-machine
* compase
* docker-hub
* docker-regitstry
* kitematic

### 命令

```language-bash
docker ps
docker images
docker run/stop  --name/--p/--link -d
docker rm/rmi
docker commit
docker save
docker export
docker exec -it 2d97d96edf92 /bin/bash
service docker start/stop/restart
```

## 运维脚本

```language-bash
#  杀死所有正在运行的容器 
docker kill $(docker ps -a -q) 

#  删除所有已经停止的容器 
docker rm $(docker ps -a -q) 

#  删除所有未打 dangling 标签的镜像 
docker rmi $(docker images -q -f dangling=true) 

#  删除所有镜像 
docker rmi $(docker images -q) 

```

### 制作迁移镜像(TODO)

xxx

### 暴露 Docke API(TODO)

### 最新的 docker 版本

```language-bash
sudo apt-get install apt-transport-https  
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9  
sudo sh -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"  
sudo apt-get update  
apt-get install -y lxc-docker  
apt-get update -y lxc-docker  
ln -sf /usr/bin/docker /usr/local/bin/docker  
```

### 代理镜像

```language-bash
https://help.aliyun.com/knowledge_detail/40557.html
https://lug.ustc.edu.cn/wiki/mirrors/help/docker
```



