



title: ML  Jetson Nano
date: 2020/02/25 00:00:00
categories:
 - soc

tags:
 - mcu
 - ml  
 - Jetson nano



---

# Jetson Nano

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190816154316511.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTExMTk4MTc=,size_16,color_FFFFFF,t_70)

128cuda/4gLPDDR4/16GeMMC/5V2A or 5V4A

Power 

* Jumper j48->5v4A
* Default ->5v2A



1. Flash Disk image

2. add Swap

   ```bash
   sudo fallocate -l 2G /swapfile
   sudo swapon --show
   free -h
   ```

3. open ssh-server

4. add third library

   ```bash
   sudo apt-get install git 
   sudo apt-get install cmake
   sudo apt-get install libatlas-base-dev gfortran
   sudo apt-get install libhdf5-serial-dev hdf5-tools
   sudo apt-get install python3-dev
   ```

5. python

   ```bash
   #install jtop
   sudo pip install --upgrade pip
   sudo -H pip install jetson-stats
   sudo jtop
   
   #switch watt mode
   sudo nvpmodel -q
   sudo nvpmodel -m1
   
   #base library
   sudo apt-get install git cmake
   sudo apt-get install libfreetype6-dev
   
   pip install -g virtualenv virtualenvwrapper
   pip install pillow
   pip install matplotlib
   pip install jupyter #jupyter notebook
   pip insatll pycuda
   
   #2.1 install tensorflow
   #https://devtalk.nvidia.com/default/topic/1048776/jetson-nano/official-tensorflow-for-jetson-nano-/
   
   #2.2 install keras
   pip install numpy==1.16
   pip install scipy
   pip install keras
   
   #2.3 scikit-learn
   pip install Cython
   pip install sklearn 
   
   #2.4 install pytorch 
   #https://devtalk.nvidia.com/default/topic/1049071/jetson-nano/pytorch-for-jetson-nano/
   #2.4.1 install  torchvision
   sudo apt-get install libjpeg-dev zlib1g-dev
   git clone -b v0.3.0 https://github.com/pytorch/vision torchvision
   cd torchvision
   python setup.py install 
   cd ../  # attempting to load torchvision from build dir will result in import error
   
   
   ```

6. jetson inference engine

   ```bash
   #https://github.com/dusty-nv/jetson-inference/blob/master/docs/building-repo-2.md
   git clone https://github.com/dusty-nv/jetson-inference
   cd jetson-inference
   git submodule update --init
   mkdir build
   cd build
   cmake ..	
   ```

   

## Forum

* https://devtalk.nvidia.com/default/board/371/

## Quote

* [Doc](https://developer.download.nvidia.com/assets/embedded/secure/jetson/Nano/docs/NVIDIA_Jetson_Nano_Developer_Kit_User_Guide.pdf?h616Yaddd0Krw-471NIIx0ySWfXF4h-hIcdxiP6FpzHRcdzyI_pU3HNHC7zYKER_MoTLKVS3sqHcTbR56JrojkrHLh3YWwMKApg5hMqZBDHyhChi0n-DEdAAW99Dhtd2bzUtC4KSTdEcZRwNf54hXV5QmfYswUIh-MdZqWX-fMwWrsNcQ965h-lk7Z1CuhfH0B8-XlP-)
* https://developer.nvidia.com/embedded-computing

* https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#intro



[https://medium.com/@yanweiliu/nvidia-jetson-nano%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-%E4%B8%80-%E5%88%9D%E6%AC%A1%E4%BD%BF%E7%94%A8-4dce57a0b2b1](https://medium.com/@yanweiliu/nvidia-jetson-nano學習筆記-一-初次使用-4dce57a0b2b1)