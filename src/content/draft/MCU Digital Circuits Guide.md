title: MCU Digital Circuits Guide
date: 2020/02/26 00:00:00
categories:
- soc
tags:
- mcu
---

## 数字电路知识

电子元件

* 传感器
* 电阻器
* 电容器
* 电感 小型变压器
* 二极管
* 三极管
* 集成电路
* 晶体管
* 贴片元件
* 开关
* 接插件
* 电机
  * DC motor 直流电机
  * Servo motor 伺服电机
  * Stepper motor 步进电机

工具

* 圆口电焊、刀口电焊
* 吸锡枪、热风枪
* 平口钳、拨线钳
* PCB 钢网
* 面包版
* 热熔胶枪
* 万用表、示波器
* 数字电源

软件

* Altium Designer

其他相关

* FPGA
* STM32

其他芯片

* K210
* OBD

# 知识

## 串口通信

RISC-AVR-ATmega8

* UART 控制线 XCK 信号线 Tx Rx

* I2C 控制线 SCL 信号线 SDA `#include <Wire.h>`
* SPI 控制线 SCK 信号线 MOSI MISO

Pin

* 模拟/analog
* IO/I2C总线
* SPI总线
* PWM输出


