title: MCU ESP8066x and ESP32 Guide
date: 2020/02/20 00:00:00
categories:
- soc
tags:
- mcu
- Esp
---

# 背景

物联网开发芯片，整合wifi直接使用

* ESP01（ESP8266-01）
* ESP8266  80Mhz 512kb 8M
* ESP32 2core 

公司之间关系是这样的，espressif（乐鑫）研发的ESP芯片组，然后AIThinker（ESP12F）和Doiting（ESP12E）这两家公司各自出了自己的开发版，实际上使用操作都是一样的，不过各自有生态工具和教程可以使用 

ESP乐鑫

* https://www.espressif.com/zh-hans/
* https://docs.espressif.com/projects/esp-idf/zh_CN/latest/get-started/establish-serial-connection.html

DOITING

* https://github.com/SmartArduino/DoHome
* http://nodemcu-dev.doit.am/1.html
* http://support.doiting.com/index/getOneArticle?id=86

AiThinker

* https://docs.ai-thinker.com/esp8266
* https://docs.ai-thinker.com/esp_download

# 编程环境

## 编程语言

* AT+指令
* arduino
* mircopython

## 工具
* clion
* visual code
* arduino ide

## Driver
CP210x（USB2TTL COM flash tool）
https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers

## 开发环境搭建

1. 交叉编译包

   * 可以考虑现在编译 
     * https://nodemcu-build.com/index.php
     * https://github.com/marcelstoer/nodemcu-pyflasher

2. 安装CP210x驱动（另一种G340自行查阅）

3. 上电刷机

   ```python
   pip install esptool
   pip install pyserial
   #check com status
   ls /dev/tty.*
   #烧入时，先摁住flash键，再摁一下reset键，即重启进入烧入状态
   esptool.py --port /dev/tty.wchusbserial1420 write_flash --flash_freq 40m --flash_mode dout --flash_size 4MB 0x0 bin/eagle.flash.bin 0x10000 bin/eagle.irom0text.bin 0x3FB000 bin/blank.bin 0x3FC000 bin/esp_init_data_default_v8.bin 0x3FE000 bin/blank.bin
   ```

IDE

* Ardunio

  * https://www.arduino.cc/

  * add third library in manager `http://arduino.esp8266.com/stable/package_esp8266com_index.json`

  * https://arduino-esp8266.readthedocs.io/en/latest/installing.html#using-git-version

    ```c
    void setup() {
      // put your setup code here, to run once:
      Serial.begin(115200);
    }
    
    void loop() {
      // put your main code here, to run repeatedly:
      delay(1000);
      Serial.println("hello world");
    }
    ```




![](https://raw.githubusercontent.com/espressif/arduino-esp32/master/docs/esp32_pinmap.png)

### RestAPI

https://github.com/marcoschwartz/aREST

```c
// Import required libraries
#include <ESP8266WiFi.h>
#include <aREST.h>
// Create aREST instance
aREST rest = aREST();

// WiFi parameters
const char* ssid = "Home_901";
const char* password = "Aa123456";

// The port to listen for incoming TCP connections
#define LISTEN_PORT           80

// Create an instance of the server
WiFiServer server(LISTEN_PORT);

// Variables to be exposed to the API
int temperature;
int humidity;

// Declare functions to be exposed to the API
int ledControl(String command);

void setup(void)
{
  // Start Serial
  Serial.begin(115200);
  // Init variables and expose them to REST API
  temperature = 24;
  humidity = 40;
  rest.variable("temperature", &temperature);
  rest.variable("humidity", &humidity);

  // Function to be exposed
  rest.function("led", ledControl);

  // Give name & ID to the device (ID should be 6 characters long)
  rest.set_id("1");
  rest.set_name("esp8266");

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" IP: " + ip);
  Serial.println(" WiFi connected!");
  server.begin();
  Serial.println(" Server started!");
}

void loop() {

  // Handle REST calls
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
  while (!client.available()) {
    delay(1);
  }
  rest.handle(client);

}

// Custom function accessible by the API
//localhost:8080/led?params=1
int ledControl(String command) {
  int state = command.toInt();

  Serial.print("State value:");
  Serial.println(state);

  if (state == 1)
  {
    digitalWrite(relayPin, HIGH);
  } else if (state == 0)
  {
    digitalWrite(relayPin, LOW);
  }
  return 1;
}
```

### 

## Library

* https://github.com/spacehuhn/esp8266_deauther
* https://github.com/esp8266/Arduino
* https://github.com/espressif/arduino-esp32

## Quote

ESP8266

* https://www.esp8266.com/wiki/doku.php?id=start
* https://github.com/pfalcon/esp-open-sdk

third-plugin

* https://blog.csdn.net/toopoo/article/details/85953723

NodeMCU

* https://github.com/nodemcu/nodemcu-firmware
* https://nodemcu.readthedocs.io/en/master/



引脚

|      | static const uint8_t D0  = 16; |
| ---- | ------------------------------ |
|      | static const uint8_t D1  = 5;  |
|      | static const uint8_t D2  = 4;  |
|      | static const uint8_t D3  = 0;  |
|      | static const uint8_t D4  = 2;  |
|      | static const uint8_t D5  = 14; |
|      | static const uint8_t D6  = 12; |
|      | static const uint8_t D7  = 13; |
|      | static const uint8_t D8  = 15; |
|      | static const uint8_t D9  = 3;  |
|      | static const uint8_t D10 = 1;  |