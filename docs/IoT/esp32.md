---
title: ESP-32
---

El ESP32 (o en mi caso ESP-wroom-32) es un dispositivo SoC que posee características muy superiores a un Arduino UNO o un ESP826. Dentro de estas características, cuenta con la capacidad de comunicarse vía Wifi y Bluetooth.
Su bajo costo y las prestaciones hace que sea muy demandado.

Una de las características que más me llamó la atención es que cuenta con 2 procesadores (CPU) que pueden controlarse individualmente con una frecuencia ajustable entre 80 y 240 MHz. Algo no menor, ya que tengo mi ESP32 con algunos sensores corriendo con un solo núcleo hace 5 meses y podría haber aprovechado mucho de ello en vez de estar realizando delays para enviar los datos vía MQTT.

El sistema operativo que posee se llama freeRTOS y posee una implementación de la pila TCP/IP propia llamada LWIP. En un [artículo](https://www.freertos.org/FreeRTOS_Support_Forum_Archive/November_2014/freertos_FreeRTOS_TCP_IP_stack_vs_lwIP_8324ceabj.html) se mencionan las razones por las que se usa esta implementación y no otras. 

Dejo a continuación una tabla de características del [manual de Espressif](https://www.cleancss.com/user-manuals/2AC7Z/-ESPWROOM32).
![](https://imgur.com/PHEyAXy.png)
