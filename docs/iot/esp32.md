---
title: ESP-32
---

El ESP32 (o en mi caso ESP-wroom-32) es un dispositivo SoC que posee características muy superiores a un Arduino UNO o un ESP826. Dentro de estas características, cuenta con la capacidad de comunicarse vía Wifi y Bluetooth.
Su bajo costo y las prestaciones hace que sea muy demandado.

Una de las características que más me llamó la atención es que cuenta con 2 procesadores (CPU) que pueden controlarse individualmente con una frecuencia ajustable entre 80 y 240 MHz. Algo no menor, ya que tengo mi ESP32 con algunos sensores corriendo con un solo núcleo hace 5 meses y podría haber aprovechado mucho de ello en vez de estar realizando delays para enviar los datos vía MQTT.

El sistema operativo que posee se llama freeRTOS y posee una implementación de la pila TCP/IP propia llamada LWIP. En un [artículo](https://www.freertos.org/FreeRTOS_Support_Forum_Archive/November_2014/freertos_FreeRTOS_TCP_IP_stack_vs_lwIP_8324ceabj.html) se mencionan las razones por las que se usa esta implementación y no otras. 

Dejo a continuación una tabla de características del [manual de Espressif](https://www.cleancss.com/user-manuals/2AC7Z/-ESPWROOM32).
![](https://imgur.com/PHEyAXy.png)

## Usando el sensor de efecto Hall
Con el ESP32 podemos detectar campos magnéticos mediante un sensor de efecto hall. A grandes rasgos este sensor puede determinar cuándo está expuesto a un campo magnético externo al detectar una diferencia de potencial a partir de la desviación de los flujos de electrones hacia el extremo de la placa que compone dicho sensor.

Para esto es tan simple como usar la función `hallRead()` en el IDE arduino para ESP32 y nos retorna el valor al acercar un imán en la parte superior del encapsulado metálico.

Ejemplo:
```c
void loop() {
    Serial.println(hallRead());
    delay(25);
}
```

## Sensor touch
Los ESP32 cuentan con 10 sensores táctiles capacitivos que son:
- GPIO2 = Touch 2 
- GPIO4 = Touch 0,
- GPIO12 = Touch 5,
- GPIO13 = Touch 4,
- GPIO14 = Touch 6,
- GPIO15 = Touch 3,
- GPIO27 = Touch 7,
- GPIO32 = Touch 9,
- GPIO33 =  Touch 9,
- GPIO0 -> Puede no estar disponible en versiones con 30 GPIOs = Touch 1,

Con la función `touchRead(GPIO)` podemos leer un sensor táctil. Un ejemplo sencillo para utilizar el touch 0 con GPIO4 sería:
```c
Serial.println(touchRead(4));
delay(1000)
```
### Links útiles
[Capacitive Touch Sensor -  ESP32 ](https://randomnerdtutorials.com/esp32-touch-pins-arduino-ide/)

## Usando los dos núcleos en paralelo
Después de unos meses con mi sensor de temperatura y humedad favorito DHT22 enviando datos por MQTT para tenerla en HomeAssistant, me di cuenta de que el ESP32 tenía 2 núcleos para utilizar. con freeRTOS podemos aprovechar esto y ejecutar wifi en un núcleo y procesar los datos del sensor en el otro. Por defecto cuando utilizamos el ESP32 estamos ejecutando las tareas sobre le núcleo con índice 1.

En el siguiente ejemplo vemos un código que ejecuta en momentos diferentes, tareas de manera independiente.
```c
TaskHandle_t Task0;

void setup() {
	Serial.begin(115200);
	xTaskCreatePinnedToCore(
		loop0, // Función a ejecutar
		"Task_0", // nombre de la tarea
		1000, // tamaño de memoria en bytes que será asignada a la tarea
		NULL, // parámetros usados para crear la tarea
		1, // prioridad de ejecución
		&Task0, // Manejador que referencia a la tarea que será creada
		0 // procesador a utilizar (num processors - 1)
	);
}

void loop() {
	Serial.println("Core: " + String(xPortGetCoreID()));
	delay(1000);
}

void loop0(void *parameter) {
	while(true) {
		Serial.println("\t\tCore: " + String(xPortGetCoreID()));
		delay(250);
	}
}
```

En el monitor de salida se verá:
![](https://imgur.com/JYAvkKv.png)

Más documentación sobre esto
[Task API](https://docs.espressif.com/projects/esp-idf/en/v4.3/esp32/api-reference/system/freertos.html)

## Videos
- [SinapTec - ESP32 Desde Cero](https://www.youtube.com/watch?v=Odh0LWXOZZk&list=PL2xmtLUbEugnUoLiRTqwCm5wi2MSzsw3D&index=1)
## Links
- [Sensor de efecto Hall](https://es.wikipedia.org/wiki/Sensor_de_efecto_Hall)
- [Efecto Hall](https://es.wikipedia.org/wiki/Efecto_Hall)