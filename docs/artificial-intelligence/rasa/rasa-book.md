---
title: Introduction to chatbots and the Rasa Framework
---
Antes, quiero comentar que este artículo no fue revisado y son las notas (textuales o no) de lo que voy leyendo del libro. Por lo tanto, puede que hayan partes mal redactadas o que incluso las haya comprendido mal. Con el tiempo pretendo mejorarlo y hacer una revisión más exhaustiva. Si vas a leer este artículo y te animas a mejorarlo, es bienvenido, mi repositorio está abierto en github.

Hay partes pocas del libro que saltee porque creo que no es necesario para el objetivo que lo estoy leyendo, como por ejemplo Text to Speech (TTS), que no creo indispensable utilizarlo en el proyecto. Las notas están en orden según voy leyendo.

Nuevamente pido disculpas y espero que sea útil como resumen en español.
# Machine Learning
## Etapas
Training stage
Inference stage
Evaluation stage
## Métricas
Interesante [Matriz de confusión](../confusion-matrix.md)
Falta ver mejor las métricas finales de Recall, precision, F1Score y accuracy.
## Overfitting and underfitting
El overfitting, cuando se utilizan muchos datos del set para entrenar y el modelo no puede generalizar. "Recuerda más de lo que aprende". A la hora de clasificar los datos de entrenamiento funciona bien, pero con datos nuevos no. El underfitting:
- cuando el algoritmo es muy simple y no tiene el poder de capturar la complejidad de la info de entrenamiento
- la arquitectura de red o funcionalidad usada no es la mejor para la tarea. Por ejemplo modelos bag-of-words(BoW) no son `suitables` para NLP taks.
- Training a model for too few epochs (a full training pass over the entire training data so that each example has been seen once) or at too low a learning rate (a scalar used to train a model via gradient descent, which can determine the degree of weight changes).
- Using a too-high regularization rate (a scale used to indicate the penalty degree on a model's complexity; the penalty can reduce the power of fitting) to train a model.

Además hay algunas cosas sobre overfitting y underfitting. Términos como los siguientes serían interesantes conocer más.
>ML scientists have already developed various methods against overfitting, such as adding more **training data, regularization, dropout, and stopping early**.

## TL - Qué pasa cuando la información que tenemos no es suficiente para entrenar?

Transfer learning (TL)
Es un método donde el modelo puede usar conocimiento de otro modelo para otra tarea. Este termino es común en el dominio de chatbots por muchas razones:
- TL Necesita menos info para entrenar: usualmente se requiere mucha info en los modelos ML tradicionales
- TL hace un entrenamiento rápido: solo necesita pocas `epochs` de entrenamiento para hacer un fine-tuning para nuevas tareas. Generalmente es más rápido que usar el método de ML tradicional.

# Procesamiento de lenguaje natural (NLP)
Es un subcampo de la lingüística y ML. Se preocupa por la interacción de humano-maquina vía texto o habla.
Parece que en un principio, antes del 2013, no había un método que prevalezca en NLP.
## Cómo se representa la información textual al procesarla "computacionalmente"? 
Las series en tiempo se puede representar como señales y ondas (voces). Las imagenes como pixeles en una posicion con un valor determinado. El tema es el texto. Uno de los metodos como one-hot encoding que representa cada palabra y frase, usa BoW (bag of words) representa oraciones y parrafos, pero era obvio que no era el camino. Despue de aplicar one-hot encoding, la dimension de cada vector será el tamaño del vocabulario entero (jeje el cine 4d se queda corto). Todos los valores son 0, excepto un 1 que representa la posicion de la palabra. Cada vector desperdicia espacio y no indica el significado semantico de la palabra en si misma. Osea, cada par de dos palabras, son ortogonales entre si.

El modelo BoW, cuenta las apariciones de la palabra en el texto e ignora la dependencia y orden entre las palabras del contexto

## Cómo construir modelos para texto?
Los métodos tradicionales dependen fuertemente de funciones diseñadas manualmente:
- TF-IDF (Tema frequency-inverse document frequency), representa la importacia de una palabra respecto a su frecuencia tanto en un articulo como en todo un grupo de articulos.

>Usamos topic modeling para informarnos de la plantilla del documento y el ratio de diferentes plantillas para cada articulo con respecto a la información estadística. También usamos informacion linguistica para las funcionalidades diseñadas manualmente (pagina 30)

Un ejemplo tomando de ejemplo IEPY una herramienta opensource que es usada para "relation extraction", esta es un lista de funcionalidades diseñadas de IEPY construct for its relation extraction task. 
- números de tokens
- symbols_in_between
- in_same_sentence
- mas en pagina 30.
Después de un montón de funcionalidades, recien se utilizan algunos algoritmos de ML para hacer modelos. Por ejemplo, clasificadores:
- SGD
- NN
- SVC
- RF
- AdaBoost

**RASA** resuelve "entity recognition" (reconocimiento de entidades) a través de la aplicación tradicional de NLP. La ventaja es que el proceso de entrenamiento puede ser realmente rapido y requiere menos información (label data) para entrenar un modelo funcional. 

En 2013 Tomas Mikolov publica Continuos BOW (CBOW) y skip-gram models. Poco después de word2vec fue lanzado. Word2vec resuelve el principal punto de nuestro primer problema de una forma elegante, entrenando una shallow neural network (red neuronal poco profunda) con un texto corpus largo (que es un dataset gigante de mucho tiempo 1b palabras por ejemplo COCA).
> Una shallow network es una red que posee una sola capa oculta (hidden layer) a  diferencia de deep network.

Para ver el contexto de cada una de las palabras, el algoritmo incorpora el significado semantico de cada palabra sobre un vector denso (`dense vector`) fuerte y misterioso llamado `word embedding`. De esta forma como el vector es fuerte xq la palabra incorpora el significado semantico en si mismo, podemos hacer operaciones como `king - man + woman = queen` que son inimaginables con `one-hot encoding`.  Es misterioso porque no se entiende el valor en cada dimension de la palabra incrustada (`word embeddings`).

Es el comienzo de una nueva era NLP. Entonces el primer paso normalmente es transformar las palabras en `word embeddings`. Con esto, el popular deep learning (DL) en `computer vision` puede ser aplicado al texto. Esto resuelve nuestra segunda pregunta sobre cómo modelar los textos.
Esta invención convirtió a `one-hot encodig` a vectores que son densos, misteriosos, elengantes y expresivos.

Luego, con la investigación, se descubrieron deficiencias: la misma palabra podría significar varias cosas dependiendo el contexto como `bank`: `riverbak` y `financial bank`. Esto porque el vector de representación de `word2vec` es estático independientemente del contexto. Entonces: Por qué no hacer un vector que represente la palabra en un contexto? Los primeros modelos se lo conoce como Embeddings from language models (`ELMo`). Estos no tienen una inscrustación fija para cada palabra, pero mira el contexto de la oración antes de asignar la inscrustación a cada palabra. Usando un bidireccional `long short-term memory (LSTM)`. El LSTM es un `recurrent neural network RNN` especial que puede aprender de "long-term dependencies" (osea, en un gran contexto o con información relevante y el punto donde es necesario). Esto funciona bien en varios problemas y es core de los NLP basados en deep learning.

## Transformers
Los santos y benditos transformers (all you need is attention), fueron lanzados en 201, y consiguieron increibles resultados en tareas de traductores. No usan `LSTM` pero usan mucho de mecanismos de atención. este mecanismo es una función que mapea a una query y setea un par key-value a una salida. La salida es computada como una suma ponderada (weighted sum) de los valores, donde el peso de cada valor se calcula mediante una función de la consulta y la clave correspondiente del valor. Algunos investigadores NLP piensan que estos mecanismos son la mejor alternativa a LSTM, porque funcionan mejor en dependencias a largo termino (esto de grandes contextos informativos).

Transformer adoptan una estructura `encoder-decode` in la arquitectura. Son muy similares pero no cumplen la misma función. El encoder está compuesto por una pila de N capas identicas `encoder layers`. El decoder tambien esta compuesto por N capas identicas `identical decoder layers`. Ambas capas están usando el mecanismo de atención, como nucleo del componente.

El gran suceso fue que los investigadores lograron excelentes modelos basados en Transformer. Los mas famosos `GPT` y `BERT`. 
#### GPT 
El primero (GPT) esta compuesto enteramente de capas decoders. **El objetivo es producir un texto parecido al humano**. Fue desarrollado 3 versiones (GPT1,2,3). La calidad de GPT-3 es alta.
#### Bert
**El objetivo de bert es proveer una mejor representación para ayudar a que una amplia gama de tareas posteriores (sentence-pair classification taks, single-sentence classification task, QA task, single-sentence tagging task) logren mejores resultados**. BERT derivó en tres familias, las mas conocidas son XLNet, RoBERTa, ALBERT, ELECTRA, ERNIE, BERT-WWM, and DistilBERT.

## Tareas basicas de NLP
Los `embeddings representations` de las palabras, frases y oraciones reducen la dura carga de trabajo en diseñar funcionalidades.

Si se consideran los textos como secuencias y diferentes tipos de etiquetas como categorias, entonces las tareas basicas de NLP pueden categorizarse en los siguientes grupos con respecto a las IO Data structures:
- desde categorias a secuencias: generar texto y picture-caption generation
- desde secuencias a categorias: clasificar texto, analisis de sentimiento, relation extraction. El objetivo de clasificar el texto acorde a la intención del texto. La tarea de clasificación es una de las dos partes importantes de `NLU` (natural language understanding). Lo más comun de `sequences to categories` incluye TextCNN, TextRNN, Transformers y sus variantes. Generalmente extraen la semantica de la secuencia (el texto) dentro de un vector y enotnces clasifica el vector en categorias.
- synchronus sequence to sequence (seq2seq): por ejemplo tokenización, Part-of-speech `POS tagging`, semantic role labeling, y named ER (`NER`). Este ultimo es una parte importante de `NLU`. Lo más comun de seq2seq incluye `CRF (conditional random fields)`, `BiLSTM (bidirectional LSTM)-CRF`, transformers y sus variantes. Lo mas comun en produccion es que estén basados en una `sequence annotation` (cada elemento en la secuencia es clasificado uno por uno y finalmente, la clasificacion resultante de todos los elementos son combinados dentro de otra secuencia).
- Asynchronous seq2seq: por ejemplo incluye machine translation, automatic summarization y keyboard input methods.

**En la construcción de chatbots**, `intention-recognition task` es una `zsequence-to-category task` mientras ER es un `synchronus seq2seq task`. Automatic speech recognition `ASR` puede ser generalmente considerado como synchronous sequence (voice signals) a sequence (text). Al igual que `Text to speech (TTS)`, pero desde text-to-voice signals. 
Dialogue managment (DM) es generalmente considerado como un asynchronous sesquece (conversation history) a la categoria `category` (next action) task.

# Chatbot basics
Hay dos tipos principales:
- task oriented: finalizar tareas especificas al interaccionar con gente, ex. reservar un vuelo para alguien
- chitchat bot: son más humanos, como si fuera chatear entre personas.

>Los chatbot son un diamente en la corona para NLP. Es un reto, y tipicamente no encontramos que se usen los mismos patrones a usar en todas partes, desde ambas perspectivas tecnologia y negocios. Los chitchat chatbots son también muy importantes e interesantes pero no serán abordados en este libro.

## Is a chatbot really necessary? (business domain) Pagina 16

## Introduction to chatbot architecture
Al principio los chatbots estaban basados en plantillas y reglas, un ejemplo es AIML (AI Markup Language), que extrae información por reglas desde las preguntas de los usuarios y puede correr scripts para obtener información mediante una API para enriquecer las respuestas. Estos chatbot son llamados Artificial Linguistic Internet Computer Entity(Alicebot) y contienen 40.000 tipos de datos diferentes, que construyen una gran base de conocimiento basada en reglas. Esto tiene sus desventajas porque se suele hacer difícil encontrar la respuestas para las preguntas.

Recientemente, el proceso principal para construir chatbots está unificado. Consiste en 5 modulos diferentes:
- ASR to convert user speech into text
- NLU para interpretar la entrada del usuario
- DM tomar decisiones sobre la siguiente accion con respecto al estado del dialogo en curso.
- NLG (natural language generation) para generar respuestas basadas en texto
- TTS para convertir la salida de texto en voz.

El libro se centra en NLU y DM principalmente.

## ASR (ver hoja 18)

## NLU Natural Language understanding (hoja 19)
Interpreta la entrada del usuario basada en texto. Reconoce el `intento` y las entidades relevantes de lo que introdujo el usuario. El modulo NLU principalmente clasifica las preguntas de los usuarios a nivel de oracion y obtiene la intención clara por clasificación de intención. El NLU reconoce las entidades claves a nivel palabra para una pregunta y realiza el llenado de espacios. Para sistemas de dialogos multi-dominio, hay una tarea adicional antes de clasificar el `intent` y NER, que es clasificar el dominio.

La clasificacion de dominio es usada para predecir el tópico (`topic`) sobre lo que los usuarios quieren hablar, por ejemplo:
> Play Michael jacksons billie jean (music domain)

Esta clasificación es innecesaria para un sistema de dialogo de un solo dominio. **RASA está diseñado como un sistema de dialogo de un solo dominio** por lo que no incluye la funcionalidad de clasificar el dominio.

Un ejemplo simple de `intent calssification and NER`. Un usuario introduce `i want to eat pizza`. El NLU puede rapidamente reconocer que el `intent` es `Restaurant search` y la entidad clave es `pizza`. Con el `intent` y entidades claves (`key entities`) definidas, esto ayudará al modulo `DM` a crear consultar en la bases de datos backend para extraer la información objetivo o continuar más rondas de conversación para completar los casilleros que falten para completar la pregunta.

Desde un punto de vista de NLP y ML, `intent recognition` es una tarea típica de clasificación de texto y el `slot filling` una tarea típica de `ER`.

Ambas tareas necesitan datos etiquetados. Esto consiste en intentos como `greet, afirm, restaurant_search, medical`. Dentro del intento `restaurant_search`, está también contenido la entidad `food`. Lo mismo para `disease` en el `intent: medical`. Necesitaremos mucho más `label data` para entrenar un modelo funcional. Lo siguientes son datos de ejemplos de entrenamiento usados por Rasa. El formato de los datos claramente muestran que contiene texto y etiquetas (`text and labels`).
```json
{
	common_examples: [{
		text: "Hello",
		intent: "greet",
		entities: []
	},
	{
		text: "Good morning",
		intent: "greet",
		entities: []
	},
	{
		text: "Where can I find a place for ramen?",
		intent: "restaurant_search",
		entities: [{
			start: 7,
			end: 8,
			value: "ramen",
			entity: "food"
		}]
	},
	{
		text: "I'm having a fever. What medicine should I take?",
		intent: "medical",
		entities: [{
			start: 3,
			end: 4,
			value: "fever",
			entity: "disease"
		}]
	}]
}
```

A primera vista parece similar a información basada en reglas AIML. De hecho, estamos usando datos etiquetados para entrenar modelos de ML mucho mas complicados. Este modelo permitira generalizar muchos mas casos comparado con un sistema basado en reglas, por ejemplo `pizza` y `ramen` son ejemplos de comida. Entonces cuando el usuario introduzca `cake` y `salad`, un buen sistema NLU deberá poder etiquetar estas entidades de comida correctamente.

El input del usuario debera pasar por el preprocesamiento NLP, cada oracion es dividida, tokenizada y etiquetada (`POS labeling`), etc. Para algunas aplicaciones es importante hacer **coreference** para reemplazar pronombres originales con nombres completos para reducir la ambiguedad.

Necesitamos diseñar la funcionalidad y el entrenamiento del modelo. Se puede hacer manualmente `number_of_Tokens, symbols_in_between, bag_of_words_in_Between`. Luego se hace la clasificación de algoritmos de ML, como la clasificación linear o support vector machines (SVMs) para hacer `intent classification` y el etiquetado de  modelos como hidden markov model (HMM) y CRF para hacer `ER`. De otra manera, podemos usar word2vec para hacer UL sobre un gran corpus, para embeber caracteristicas ocultas de palabras dentro de `word embeddings` e ingresarlas dentro de modelos `DNN` como las `convolutional neural networks`(CNN) o RNNs para hacer `intent classification` y `ER`.

Para el entrenamiento, podemos lograr una mayor recuperación para que el sistema cubra mas tipos de diferentes entradas de usuario. Tambien hacer uso de un modulo basado en reglas, que ayudara a entrenar mejor el modelo.

## DM Dialogue managment
DM decide cual es la acción actual de un usuario acorde a la conversacion previa. La tarea principal es coordinar y manejar el flujo de toda (whole) la conversacion. Analizando y manteniendo el contexto, decide si el `intent` del user es suficientemente claro y la información en la entidad es lo suficientemente buena para consultar las bases de datos o elegir la mejor accion.

Si decide que la info no es completa o es ambigua, comenzara a manejar un contexto de conversación de multiples turnos manteniendo lo que escribe el usuario para obtener mas información o proveer al usuario posibles items a elegir. 

Entonces, DM es responsable de la historia y mantener el estado de la conversacion, el historial de acciones del usuario (`systems action history`) y los resultados potenciales de la base de conocimiento.

Cuando finalmente decide que tiene toda la información que necesita, DM convierte la petición del usuario en la query correspondiente a la base de datos (knowledge graph) para buscar la información correcta o actuar para completar la tarea (por ejemplo, llamar a un amigo mediante siri).

En la practica, DM es responsable de muchas pequeñas tareas y es altamente personalizable acorde a los requerimientos del producto. Muchas implementaciones de DM usan un sistema basado en reglas y esto no es una tarea facil para desarrollar o mantener. En trabajos recientes **incluyendo RASA**, la gente comenzo el modelado del estado de DM en tareas de etiquetado secuencial SL (`sequential labeling`). Algunos avances usan `deep RL`, donde un modulo de simulacion de usuario es agregado. 

## NLG o Natural Language Generation
NLG convierte la respuesta de los agentes  en un texto humanamente legible. Hay dos caminos principalmente para hacer esto: 
- template-based methods: crea una respuesta simple sin mucha flexibilidad, sin embargo son diseñados por humanos y por ello son generalmente buenos para leerse por humanos
- DL-based methods: son flexibles generando y personalizando respuestas pero como es automaticamente generado por DNNs es dificil controlar la calidad y estabilidad de los resultados.

En casos reales la gente tiende a usar template-based method y agregar nuevas funcionalidades (como elegir de manera aleatoria un pool de templates) para darle mas flexibilidad.

NLG es casi el ultimo reto en la interaccion humano-maquina. Para un chitchat bot normalmente se aplica el modelo generativo seq2seq a grandes volumenes de corpus y directametne genera una respuesta para la entrada del usuario. Pero esto normalmente no lo hace un chatbot para servicio personalizado y con un dominio vertical. Los usuarios necesitan respuestas precisas y  concretas de sus dudas. Estamos trabajando para tener grandes cantidades de datos para entrear un modelo funcional que genere texto que parezca a un humano real (como gpt3 logra esto).

En el mientras se usan modulos NLG que usan plantillas basadas en reglas. es como una operacion inversa para llenar los casilleros, para llenar resultados en un template y generar las respuestas a los usuarios. Los trabajos mas avanzados tambien usan `DL` para generar automaticamente plantillas con slots basados en la informacion entrenada.

También hay trabajos que intentan usar `DL` para entrenar un chatbot E2E (end to end) orientado a la tarea(? task-oriented). Algunos investigadores convierten cada modulo NLU, DM y NLG en modulos DL. Otras partes de la investigacion trabajan con "memory networks" que es similar a seq2seq y codifica (encodes) la base de conocimiento completa en una DNN complicada y que combina estas con preguntas codificadas para descodificar una respuesta objetivo. Este trabajo  se aplicó a tareas de maquinas lectoras como Stanford Question Answering Dataset (SQuAD) y obtuvo algunos buenos resultados.

## TTS text to speech pagina 25

# Rasa Framework finalmente 
The Rasa framework consists of mainly four parts, outlined as follows:
- NLU: Extract user's intent and key context information
- Core: Choose the best response and action according to dialogue history
- Channel and action: Connect chatbot to users and backend services
- Helper functions such as Tracker Store, Lock Store, and Event Broker
![](https://rasa.com/docs/rasa/img/architecture.png)
## Arquitectura
Rasa contiene 2 partes principales:
- Rasa: que tambien posee NLU y Core.
- Rasa SDK

El Rasa NLU convierte la entrada del user en un intento y entidades. 

El Rasa Core decide la siguiente accion basado en los registros historicos y actuales de dialogo.

Rasa ofrece el SDK, que ayuda a personalizar acciones. Puede llamar a servicios externos para realizar una tarea (por ejemplo un bot de clima llama a la api para proveer la informacion actualizada). En rasa este tipo de acciones que dependen del contexto de negocio es llamado una `customized action`. Estas acciones corren en un proceso individual del servidor, entonces son llamadas `Action Server`. Las `action server` se comunican con Rasa Core mediante HTTP.

Un buen bot necesita una amigable UI. Rasa soporta aplicaciones `instant messaging (IM)` y conecta estos mediante `Rasa channels`. El flujo de trabajo es:
```
Action Server <--> Rasa Core <-- Rasa NLU
						--> Client -->
```

La arquitectura de Rasa sigue cuidadosamente la teoria de la Ley de Conway's:
>Cualquier organización que diseñe un sistema producirá un diseño que copia la estructura de comunicación de dicha organización 

Finalmente, Rasa Core y Rasa NLU trabajan juntos dentro de un paquete llamado **Rasa**.

El SDK es otro paquete aparte y la razon detras de este diseño es que el NLU y el Core son normalmente desarrollados por el equipo de algoritmos, mientras los `Customized actions` son desarrollados por el equipo de ingeneria de python.
