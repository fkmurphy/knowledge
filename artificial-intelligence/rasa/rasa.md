---
title: Rasa - Chatbot
tags: []
---
# Rasa Framework - Chatbots

Recomiendo el libro [Introduction to Chatbots and the Rasa Framework](https://www.amazon.com/dp/1801077053)  de [Xiaoquan Kong](https://github.com/howl-anderson) y Guan Wang.

Rasa es un framework para crear chatbots usando NLP y Machine Learning, es muy flexible al momento de configurarse y tiene la capacidad de utilizar diferentes tipos de herramientas en su arquitectura. La decisión de utilizar pipeline para procesar la información hace que sea muy simple y claro de configurar. Para todos los archivos de configuración utiliza YAML, algo que desde mi punto de vista no es tan favorable.

Dentro de las herramientas que provee existe una UI para interactuar con el bot desde la terminal y también una API Restful. 

Hay conceptos claves a entender como:
- intent: es la intención del usuario en el texto que ingresa, este deberá ser clasificado por el NLU
- entity: son las entidades del texto que pudieron ser reconocidas a través de alguno de los métodos que se configuren. Estas entidades están compuestas por dos partes, el valor y el tipo. Por ejemplo: el valor `New york` y el tipo `city`.

Rasa está dividido en dos grandes partes, Rasa Core y Rasa SDK.
>La arquitectura de Rasa sigue cuidadosamente la teoría de la Ley de Conway's:
>Cualquier organización que diseñe un sistema producirá un diseño que copia la estructura de comunicación de dicha organización 
>__Introduction to the Rasa Framework - Página 27__
## Rasa Core
Este está compuesto por un **NLU** que clasifica el `intent` y extrae las entidades (`entity`) del input que ingresa el usuario y por el componente **Core** que se encarga de elegir la mejor respuesta y acción basado en el contexto histórico y actual de los diálogos.

### Sobre el NLU
Como fue mencionado anteriormente, el módulo Rasa NLU es responsable de clasificar el intento y extraer las entidades del input del usuario. Por ejemplo:
> Cómo va a estar mañana el clima en New York?

El intento debería ser algo como `asking_for_weather` y las entidades `mañana(tomorrow)` de tipo `date` y `New York` de tipo `lugar(location)`.

El NLU utiliza algoritmos de aprendizaje supervisado para completar la función. Estos algoritmos son llamados `components` y requieren ser configurados cuidadosamente.

#### Formato de archivo
El archivo `nlu.yml` está ubicado dentro de la carpeta `data/` y actúa como datos de entrenamiento para Rasa NLU. Está en formato YAML. [Documentación oficial](https://rasa.com/docs/rasa/training-data-format/#nlu-training-data)

```yaml
version: "3.1"

nlu:
	- intent: intent_name
	  examples: |
	    - Una oración que quieras como ejemplo de entrenamiento
	    - hola
	- intent: intent_bye
	  examples: |
	    - chau
	    - nos vemos
	    - adios
```

##### Campo `intent`
El campo `intent` se usa para almacenar los ejemplos de entrenamiento. El nombre puede contener cualquier tipo de caracter (incluyendo unicode) exceptuando `/` que es usado por Rasa para darle un significado especial. 

En la lista de ejemplos se puede determinar cada ejemplo como una URL de Markdown `[entity value](entity type)`, pero también permite valores más complejos como `[entity value]{"entity":"entity type"}`

Se permiten claves como `rule` y `group`, que corresponden a etiquetas en roles y grupos de las entidades. También `value` que sirven para etiquetar sinónimos de un valor de entidad, como por ejemplo:
- `Cómo va a estar el clima [mañana]{"entity": "date"} en [New York]{"entity": "city", "value": "New York City"}`

##### Campo `synonym`
Se puede utilizar el campo `synonym` como una forma de relacionar múltiples posibles valores a una sola entidad. Este paso se ejecuta durante la inferencia cuando el componente `EntitySynonymMapper` está activado. Es **importante** saber que la traducción a sinónimos se hace luego de reconocer las entidades (no antes). Un ejemplo podría ser:
```
nlu:
	- synonym: credit
	  examples: |
	    - credit card account
	    - credit account
```

Estas dos entidades `credit card account` y `credit account` podrán ser traducidas a un valor normalizado `credit`.

##### Campo Lookup
Cuando hay que extraer entidades existen varias bibliotecas que pueden ayudar, sin embargo, si las entidades exceden el entrenamiento de los modelos usados es posible que no obtenga buenos resultados. Las tablas de búsqueda o lookups se agregan a los datos de entrenamiento de forma que sea posible añadir todos los valores **conocidos** para una entidad.

Las tablas de búsqueda no marcan directamente la entidad sino que marcan tokens en los datos de entrenamiento añadiendo una funcionalidad nueva para el extractor de entidades (`ner_crf`). En otras palabras, el modelo pondrá más foco sobre las palabras y oraciones marcadas en la `lookup feature`, incluso si no es reconocida durante la inferencia, podrá ser extraída con ayuda de las lookup.

Es importante que los valores del lookup sean bien definidos y delimitados. Además, podría suceder que una misma palabra coincida en dos tipos de entidades diferentes y en este caso no sería bueno utilizarlas. Se ha comprobado que las tablas que posean más de un millón de elementos suelen tardar desde minutos a horas en terminar de entrenarse y evaluarse.

Un ejemplo de lookup podría ser:
```
nlu:
	- lookup: employee_name
	  examples: |
	    - Raul
	    - Mariano
	    - Camila
```

Puede leer más sobre cuándo utilizar un lookup en este [enlace](https://rasa.com/blog/improving-entity-extraction/).

##### Campo regex
Se pueden usar expresiones regulares para hacer match con determinados patrones y así ayudar a la extracción de entidades (`entity`) o reconocimiento de `intent`. En Rasa se utilizan regex de python. Por ejemplo:

```
nlu:
	- regex: zipcode
	  examples: |
	    - \d{5}
```

En este ejemplo vemos que podemos determinar que el código postal será de 5 dígitos.

Con esta herramienta es posible determinar teléfonos, direcciones de IP, matrículas, entre otros, que pueden ser muy difíciles de conseguir mediante lookup.

Un detalle importante es que tanto las `regex` como los `lookup` se pueden usar de dos maneras:
1. utilizando `RegexFeaturizer` que agrega una funcionalidad a la tabla y ayuda al contexto para decidir si lo marcado por la expresión regular es lo que se buscaba. Por ejemplo, si se ingresa un número de 5 dígitos y no se refería a el código postal, sería un error. 
2. Otra forma de utilizarlo es a través de `RegexEntityExtractor` que está basado en reglas pero puede ser muy eficiente para algunos casos de uso.
## Rasa SDK
Este paquete permite crear acciones personalizadas como por ejemplo llamar a servicios externos para realizar tareas (por ejemplo llamar a una api que provee el clima o los precios de las criptomonedas principales). Estas acciones personalizadas se ejecutan en un proceso individual y a su módulo se lo llama `Action server`. Dicho módulo se comunica directamente con Rasa Core mediante HTTP. 

También soporta canales (Rasa channels) para soportar aplicaciones de mensajería instantánea (IM). El flujo de trabajo a grandes rasgos es:
```
Action Server <--> Rasa Core <-- Rasa NLU
						--> Client -->
```

Se puede instalar el paquete de Rasa SDK de la siguiente manera:
```sh
pip3 install rasa-sdk
```