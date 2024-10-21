title: MCU Ardunio Codes
date: 2020/02/25 00:00:00
categories:
 - soc
tags:
 - mcu
 - arduino 



---

# 背景

​	目前拿到的MCU有ESP8266、ESP32 、Arduino Nano、ESP 8266 01 四块，都能够基于ardunio做传感器实验

![](https://tva1.sinaimg.cn/large/0082zybpgy1gc98zjrr7gj30u60lctba.jpg)

# 使用IDE

## Clion

1. install Arduino IDE

2. install CP210x driver

3. install VScode , PlatformIO Plugin

4. new sketch file , set c++ 14 , buard 9600, run [project]-upload

   ![](https://tva1.sinaimg.cn/large/0082zybpgy1gc9571cmcwj317g0qygn4.jpg)

## PlatformIO VSCode (recommend)

1. install vscode
2. install platformio plugin
3. new sketch , arduino nano amega318/9600 buard
4. use build/upload/monitor
5. configure `platformio.ini` ,set `lib_deps`

## Arduino Cli

* https://github.com/arduino/arduino-cli

## Others

* design `https://fritzing.org/download/`

# 场景

* https://www.w3cschool.cn/arduino

## 引脚

![Arduino UNO板](https://atts.w3cschool.cn/attachments/tuploads/arduino/board_description.jpg)



![](https://tva1.sinaimg.cn/large/00831rSTgy1gcbbqdypi4j31e50u042v.jpg)



用例

* https://github.com/jik1992/training_arduino
* https://github.com/arduino/arduino-cli

### 常用语法

```c
void setup(){
  #引脚使用
	pinMode(13, OUTPUT);
	digitalWrite(pin, value) 
  #random
	randomSeed(analogRead(0));
}
void loop(){
  #others
  delay(1000); 
  
  #COM串口通信
  Serial.begin(9600);
  Serial.println(sensorValue);
  Serial.read();
  int sensorValue = analogRead(A0);
  Serial.println(sensorValue);

  #PWM
  #analogRead values go from 0 to 1023, analogWrite values 	from 0 to 255
  #https://www.arduino.cc/reference/en/language/functions/analog-io/analogwrite/
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val / 4); 
  
  randNumber = random(10, 20);// print a random number from 10 to 19
  
  


}

```

# 常用库

## DHT11

* [https://platformio.org/lib/show/19/DHT%20sensor%20library/examples](https://platformio.org/lib/show/19/DHT sensor library/examples)

![](https://tva1.sinaimg.cn/large/0082zybpgy1gcab3qgmtaj30xc0hhdh2.jpg)



### U8g2 OLED 

U8G2_SSD1306_128X64_NONAME_1_HW_I2C

* https://github.com/olikraus/u8g2

![How to Connect the Geekcreit 0.96 Inch OLED I2C Display to Arduino - Wiring Diagram](https://startingelectronics.org/tutorials/arduino/modules/OLED-128x64-I2C-display/arduino-oled-connection.jpg)



## Clock DS3231

* https://platformio.org/lib/show/1197/RTCLib/examples



![img](https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2016/10/rtc.png?resize=714%2C393&ssl=1)



## SG90

* https://platformio.org/lib/show/883/Servo?utm_source=platformio&utm_medium=piohome

![img](https://www.electronics-lab.com/wp-content/uploads/2018/05/servo_bb-schematics.png)

## JoyStick

### Connection

- VCC -> 5V
- GND -> GND
- VRx -> A0
- VRy -> A1
- SW -> D2

```c
int VRx = A0;
int VRy = A1;
int SW = 2;

int xPosition = 0;
int yPosition = 0;
int SW_state = 0;
int mapX = 0;
int mapY = 0;

void setup() {
  Serial.begin(9600); 
  
  pinMode(VRx, INPUT);
  pinMode(VRy, INPUT);
  pinMode(SW, INPUT_PULLUP); 
  
}

void loop() {
  xPosition = analogRead(VRx);
  yPosition = analogRead(VRy);
  SW_state = digitalRead(SW);
  mapX = map(xPosition, 0, 1023, -512, 512);
  mapY = map(yPosition, 0, 1023, -512, 512);
  
  Serial.print("X: ");
  Serial.print(mapX);
  Serial.print(" | Y: ");
  Serial.print(mapY);
  Serial.print(" | Button: ");
  Serial.println(SW_state);

  delay(100);
  
}
```



## MPU6050

* https://platformio.org/lib/show/221/MPU6050?utm_source=platformio&utm_medium=piohome

<img src="https://howtomechatronics.com/wp-content/uploads/2019/04/Arduino-and-MPU6050-Circuit-Diagram.png" alt="Arduino and MPU6050 Circuit Diagram" style="zoom:80%;" />

##  

## Buzzer

### Connection

* VCC
* D4

```c
#include <Arduino.h>
int pinBuzzer = 4; //管脚D3连接到蜂鸣器模块的信号脚
 
void setup() {
  pinMode(pinBuzzer, OUTPUT); //设置pinBuzzer脚为输出状态
}
 
void loop() { 
   long frequency = 300; //频率, 单位Hz
 
   //用tone()函数发出频率为frequency的波形
   tone(pinBuzzer, frequency );
   delay(1000); //等待1000毫秒
   
   noTone(pinBuzzer);//停止发声
   delay(2000); //等待2000毫秒
}
```





![img](https://hackster.imgix.net/uploads/attachments/495697/F3DDJQ4IAP6UGTG.png?auto=compress%2Cformat&w=680&h=510&fit=max)

# IR sensor 

* https://platformio.org/lib/show/4/IRremote?utm_source=platformio&utm_medium=piohome

```c
#include <IRremote.h>

int RECV_PIN = 11;

IRrecv irrecv(RECV_PIN);
decode_results results;

void setup()
{
  Serial.begin(9600);
  Serial.println("Enabling IRin");
  irrecv.enableIRIn(); // Start the receiver
  Serial.println("Enabled IRin");
}

IRsend irsend;

void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    irrecv.resume(); // Receive the next value
  }
  delay(100);

  for (int i = 0; i < 3; i++) {
		irsend.sendSony(0x4AB0F7B6, 12);
		delay(40);
	}
}

```

<img src="https://www.yiboard.com/data/attachment/forum/201908/17/145506ev5e97e4h94x2h2m.png" alt="img" style="zoom:80%;" />

# BigSound

* D0 ( Digital output ) --> Digital 3
* \+ --> 5V
* G ( ground ) --> GND
* AO ( Analog output ) --> Analog 0

```c
int Analog_Pin = A0; 
int Digital_Pin = 3; 
  
void setup ()
{
  pinMode(Analog_Pin, INPUT);
  pinMode(Digital_Pin, INPUT);
       
  Serial.begin (9600); 
}
  
void loop ()
{
  float Analog;
  int Digital;
    
 
  Analog = analogRead (Analog_Pin);
  Digital = digitalRead (Digital_Pin);
    
 
  Serial.print("Analog voltage :"); 
  Serial.print(Analog, 4);  
  Serial.print("V, ");
  Serial.print("Limit :");
  
  if(Digital==1)
  {
      Serial.println(" reached ");
  }
  else
  {
      Serial.println(" Not yet reached ");
  }
  Serial.println("----------------------------------------------------------------");
  delay (200);
}
```



### Blink

https://github.com/blinker-iot/blinker-doc

```c
#define BLINKER_WIFI

#include <Blinker.h>

char auth[] = "0a54e5d24068";
char ssid[] = "Home_901";
char pswd[] = "Aa123456";

// 新建组件对象
BlinkerButton Button1("btn-abc");
BlinkerNumber Number1("num-abc");

int counter = 0;

// 按下按键即会执行该函数
void button1_callback(const String & state)
{
    BLINKER_LOG("get button state: ", state);
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
}

// 如果未绑定的组件被触发，则会执行其中内容
void dataRead(const String & data)
{
    BLINKER_LOG("Blinker readString: ", data);
    counter++;
    Number1.print(counter);
}

void setup()
{
    // 初始化串口
    Serial.begin(115200);
    BLINKER_DEBUG.stream(Serial);
    
    // 初始化有LED的IO
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    // 初始化blinker
    Blinker.begin(auth, ssid, pswd);
    Blinker.attachData(dataRead);

    Button1.attach(button1_callback);
}

void loop() {
    Blinker.run();
}
```

### ## Relay

![](https://tva1.sinaimg.cn/large/0082zybpgy1gc840jxmucj30rs0fsta8.jpg)

```c
/*
   Relay
   继电器控制，通过串口控制继电器开关LED灯
*/
int incomedate = 0;
int relayPin = 13; //继电器引脚

void setup() {
  pinMode(relayPin, OUTPUT);
  Serial.begin(9600); //设置串口波特率9600
}

void loop() {

  if (Serial.available() > 0)//串口接收到数据
  {
    incomedate = Serial.read();//获取串口接收到的数据
    if (incomedate == 'H')
    {
      digitalWrite(relayPin, HIGH);
      Serial.println("LED OPEN!");
    } else if (incomedate == 'L')
    {
      digitalWrite(relayPin, LOW);
      Serial.println("LED CLOSE!");
    }
  }

}
```



# Light

```c
const int D7 = 13; //D7 pin
int state = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(D7, OUTPUT); //定义LED灯输入模式；
  Serial.println("v0.1.1");

}

void loop() {
  // put your main code here, to run repeatedly:
  delay(1000);
  Serial.print("toggle: ");
  Serial.println(state);
  if (state == 0) {
    state = 1;
  }
  else {
    state = 0;
  }

  if (state == 1) {
    digitalWrite(D7, 50);
  } else {
    digitalWrite(D7, LOW);
  }
}
```



# Keyboard

* https://platformio.org/lib/show/891/Keyboard?utm_source=platformio&utm_medium=piohome

```


```

## AiThinker A9G 

* http://wiki.ai-thinker.com/gprs
* 


