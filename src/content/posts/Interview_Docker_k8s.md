---
title: Kubernetes Collections
pubDate: 2024-1-1
categories: [ '面试', 'docker','k8s' ]
description: ''
---

# Docker/Docker-compose使用

### 概念

* daemon
* image
* container
* Environment
* Port
* Volumes

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

docker-compose up -d 
docker-compose down 
```

### DockerFile build

```bash
FROM node:20

RUN apt update
RUN apt install -y libjemalloc2
RUN apt install -y libccp4c0
RUN apt install -y libgomp1
RUN apt install -y openjdk-17-jre-headless
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2:$LD_PRELOAD

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

WORKDIR /app
COPY . .
RUN rm -r ./packages/prev-gen

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY packages/common ./packages/common
COPY packages/pentat-miner/package.json ./packages/pentat-miner/package.json
RUN corepack enable
# RUN yarn install
RUN yarn workspaces focus @accutar/pentat-miner
WORKDIR /app/packages/pentat-miner
# ENTRYPOINT ["yarn", "tsx","./src/tasks/TaskRunner.ts"]
ENTRYPOINT ["node", "/app/node_modules/.bin/tsx", "./src/tasks/TaskRunner.ts"]
# ENTRYPOINT ["yarn", "main"]

```

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

# Kubernetes 命令组

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

# google cloud k8s 使用

```bash
#!/usr/bin/env bash
gcloud auth application-default login
gcloud config set project pentat-pack-dev
gcloud auth configure-docker us-docker.pkg.dev
gcloud container clusters get-credentials --zone us-west1 pentat-miner-cluster

#sudo find . -name "*.dict" -delete
# 同步binary，挂载硬盘
gcloud compute instances start small-test
#mount rw-disk
gcloud compute instances attach-disk small-test --disk=us-pentat-resource-191202 --zone=us-west1-b
gcloud compute ssh small-test --zone=us-west1-b --command="sudo lsblk && sudo mount /dev/sdb /mnt/disks/retroxxxx"
#upload data to rw-disk and detach
gcloud compute ssh small-test --zone=us-west1-b --command="sudo rm -rf /mnt/disks/retroxxxx/bak_200103/*"
gcloud compute scp * root@small-test:/mnt/disks/retroxxxx/bak_200103
gcloud compute ssh small-test --zone=us-west1-b --command="sudo umount /dev/sdb && sudo fsck.ext4 -vy /dev/sdb "
gcloud compute instances detach-disk small-test --disk=us-pentat-resource-191202 --zone=us-west1-b
#create image
gcloud compute images delete us-pentat-resource-200109-image
gcloud compute disks delete us-pentat-resource-200109

gcloud compute images create us-pentat-resource-200109-image --source-disk=us-pentat-resource-191202 --source-disk-zone=us-west1-b
#create disk by snapshot/ssd persist disk/450
gcloud compute disks create us-pentat-resource-200109 --image=us-pentat-resource-200109-image --size=450gb --type=pd-ssd --zone=us-west1-b


#to make xxxx, and to update
ssh yunzuo@10.1.30.20 "cd /home/yunzuo/Accutar2/ && git pull origin master"
ssh -t yunzuo@10.1.30.20 "cd build/chem_react_v4/ && make -j64 chemirise"
scp yunzuo@10.1.30.20:/home/yunzuo/build/chem_react_v4/chemirise ~/.
mv chemirise xxxx
gsutil cp xxxx gs://dev-taskonline-x/
# gcloud compute instances delete yeast-client-xxxx-0 --zone=us-west1-b

#manually login chemirise ->command and change with new disk
#to manually check mount disk
#to manually check lanuch log
gcloud logging read "resource.type=gce_instance AND jsonPayload._HOSTNAME=yeast-client-xxxx-0" --limit 30 --format="table(timestamp,jsonPayload.MESSAGE)"
#shutdown small-test
gcloud compute instances stop small-test
#测试脚本 CCC1(CCCN(C1)C(=O)OC(C)(C)C)C#C

#!/usr/bin/env bash
#chemirise 开发
yarn build-chemirise-dev
#deply dev
gsutil -m rm "gs://dev-retroxxxx.yyyy.com/**"
gsutil -m cp -z js,wasm,html dist/** gs://dev-retroxxxx.yyyy.com
gsutil -m setmeta -h "Content-Type:application/wasm" "gs://dev-retroxxxx.yyyy.com/**.wasm"
gsutil -m setmeta -h "Cache-Control:private,no-cache,max-age=0" "gs://dev-retroxxxx.yyyy.com/**.html"




```
