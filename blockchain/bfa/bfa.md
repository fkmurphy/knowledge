---
title: BFA - Blockchain Federal Argentina
---
# [Blockchain Federal Argentina](https://bfa.ar)
Esta blockchain es un fork de Ethereum en la versión byzantium (2017), utiliza un mecanismo de consenso de tipo PoA (Proof of Authority) donde los nodos selladores (o sealers) están específicamente identificados a través de un convenio previo y pueden pertenecer tanto a entidades públicas como privadas.

Existen otros tipos de nodos. Por ejemplo los nodos transaccionales proveen servicios directos a usuarios finales permitiendo a usuarios comunicarse con la blockchain y así utilizar los contratos inteligentes.

La documentación sobre los [conceptos base](https://gitlab.bfa.ar/blockchain/docs/-/wikis/ConceptosYCompromisos) y también [introducción con un lenguaje no tan técnico](https://gitlab.bfa.ar/blockchain/docs/-/wikis/Brief-BFA).
## Sobre el gas
La blockchain de BFA permite realizar transacciones de forma gratuita, esto implica que el _Ether_ es dispensado gratuitamente, siendo sólo una formalidad representativa del costo operacional (_gas_) al momento de procesar la petición del usuario.

Creo que es válido decir que el poder de procesamiento es brindado de forma gratuita a nivel mundial ya que sólo es necesario estar registrado en el [sitio web oficial](https://bfa.ar) y agregar una wallet mediante un procedimiento que se menciona en la sección de **crear una wallet**.

Muchos de los nodos selladores son de diferentes instituciones públicas como universidades, CABASE y el NIC de Argentina (principal impulsor de BFA según entiendo), sin embargo también hay nodos y servicios de otras entidades brindados a partir de beneficiarse del mismo ecosistema. [Ver más](https://bfa.ar/bfa/que-es-bfa)

### Consideraciones
En esta sección es importante aclarar que el uso responsable de la red (tanto en su ambiente de prueba como de producción) hace a la eficiencia de la misma, ya que los nodos suelen ocupar al rededor de 80GB de disco al día de la fecha (23/09/2023) sin mencionar el CPU y memoria RAM requerida. También el costo de mantenimiento, actualización y monitorización de los mismos.

Sin dudar esto debe ser considerado ya que hoy en día no existen muchas razones por las cuales probar sobre las redes de prueba o producción. Se podría clonar la red mediante cualquier herramienta de desarrollo como Hardhat o Foundry fácilmente e incluso podría disponibilizar es ambiente privado para que otros usuarios lo prueben. Hay que tener en cuenta que cualquier esfuerzo por optimizar mejora también la performance del proyecto que va a finalmente publicar en BFA.

## Crear una wallet
Para comenzar a transaccionar en BFA es necesario registrarse en el sitio oficial y luego agregar una wallet. El proceso de creación de cuenta suele ser rápido si ya se tiene experiencia con las herramientas del instructivo oficial. En esta wiki se encuentran dos formas de llevar a cabo el proceso:
- [Simple - Usando Metamask](./metamask-create-wallet)
- [Procedimiento oficial - Guía](./create-bfa-wallet-official-process)

## Red de producción y red de prueba

La red de producción posee una carpeta específica en el núcleo llamada `network` y su NetworkID es: `47525974938 (0xb10c4d39a)`. El `chainId` de la red es `200941592 (0xbfa2018)`

La red de pruebas posee una carpeta específica en el núcleo llamada `test2network` y posee el NetworkID: `55555000000 (0xcef5606c0)`. El `chainId` de la red es `99118822 (0x5e86ee6)`

## Nodo Transaccional
Este nodo sirve para enviar transacciones a la blockchain y por lo tanto también es posible utilizarlo para consultas.

El [repositorio del núcleo](https://gitlab.bfa.ar/blockchain/nucleo) contiene una pequeña [documentación](https://gitlab.bfa.ar/blockchain/nucleo/-/wikis/home) sobre los bloques y qué es un nonce. Además, posee una serie de pasos para instalar el nodo.

Según lo mencionado en el chat técnico de telegram, un nodo productivo en modo `full` puede ocupar al rededor de 85GB de espacio al 5 de agosto del 2023.
### Nodos públicos
Nodo disponible para BFA Test versión 2:
`http://public.test2.bfa.ar:8545`

Nodo disponible para BFA Producción:
`http://public.bfa.ar:8545`

### Modos de sincronización
Existen diferentes modos de sincronización que a partir de las operaciones que deseemos o la información que necesitemos vamos a elegir. Dentro de estas podemos elegir `full`, `snap` o `light`. En algunas partes de los documentos aparece `fast`, quizá con el cambio de versión de `geth` dejó de funcionar, pero no es reconocido. En el archivo `config.toml` podemos modificarlo así:
```
[Eth]
NetworkId = 55555000000
SyncMode = "light"
```

### Instalación
La propuesta principal es la instalación del nodo en un servidor `Ubuntu server 18.04` o `Debian 9.5`. También existe la posibilidad de instalarlo a través de la imagen oficial en [Hub Docker](https://hub.docker.com/r/bfaar/nodo/), sin embargo diría que esta última es la menos recomendable. Una guía de instalación puede encontrarse en el [README](https://gitlab.bfa.ar/blockchain/nucleo/-/blob/master/README.md)

Creé el [artículo "Levantar un nodo de BFA en docker"](./create-bfa-node-in-docker) donde intento explicar la configuración del nodo.

#### Consideraciones y problemas
El nodo suele presentar problemas con las versiones de geth que se utilizan. En el [issue #8, se menciona el error en la instalación de nodo de pruebas](https://gitlab.bfa.ar/blockchain/nucleo/-/issues/8#note_141), donde el autor del comentario indica que se debe usar la versión de golang `1.17.2` y agregar los repositorios de `ppa:ethereum/ethereum` (a.k.a `geth`). De este comentario estimo que surge la solución del autor al crear un [repositorio](https://gitlab.bfa.ar/ferromariano/nodo-y-api-para-docker)  solucionando el problema.


## Los smart contracts más famosos de BFA
### TSA2
La versión 2 de Timestamp Authority es un contrato inteligente que está almacenado en la blockchain de BFA. Este se utiliza para enviar hash de documentos y así tener una forma transparente de representar el momento del sellado de un documento determinado. Por ejemplo, puede servir para cumplir con el artículo 317 del código civil y comercial de Argentina que habla de `fecha cierta` y al mismo tiempo el hash garantizará la integridad del documento, ya que si cambia en lo más mínimo, el hash será diferente.

Se puede probar desde el sitio oficial si un documento fue estampado, cuándo y en que bloque:  https://bfa.ar/sello2
#### Código del contrato y API
Se puede ver el [repositorio del contrato](https://gitlab.bfa.ar/blockchain/tsa2/-/tree/master). Este también contiene una API en Javascript que permite comunicarse con un nodo mediante RPC y enviar hash para estampar.

### TSA1
**Sobre TSAv1:** existe una API pública y oficial para utilizarlo https://tsaapi.bfa.ar/api/tsa/stamp/
## Sobre la comunidad
Este es el punto más difícil para mi, creo que esta red es muestra de la cultura que compartimos los argentinos y claramente el esfuerzo llevado a cabo para lograr esta blockchain es increíble. Si uno busca un servicio similar, cercano a lo "gubernamental" y soberano, en mi conocimiento solo está [LACChain](https://lacchain.net) y sin embargo los costos para cualquier pyme, industria muy pequeña u organismos, es altísimo. De todas formas, esta sección no se trata de encontrar ventajas y desventajas en ello. Estos son los puntos que encuentro interesantes al momento de hablar de la comunidad de BFA:

Se cuenta con un sitio sobrio, cada año se mejora la calidad de la información y quiénes forman parte de BFA, incluyendo los casos de uso. No consigo investigar mucho sobre el registro aún, pero sería interesante utilizar tecnología MPC para facilitar el uso a usuarios finales.

El repositorio de Gitlab está disponible para consultar los repositorios y la wiki. Lamentablemente el registro es cerrado y sólo es posible leer.

La base de conocimientos  debería poseer un mayor orden sobre los contenidos. Es difícil encontrar toda la documentación, está dispersa en varios lugares y lograr finalmente probar un proyecto con éxito o levantar un nodo suele parecer tarea difícil. No quiero que se mal entienda, la comparación que menciono es con respecto a otras blockchain EVM compatibles, no estoy diciendo que no se deba leer la documentación o investigar. Entrar al mundo "BFA" (aún conociendo otras blockchains) es un poco tedioso, la información sobre los RPC públicos, la versión que utilizan de compilación, los problemas de levantar los nodos porque quizá dejó de funcionar hace años un repositorio, entre otros. En fin, esta documentación intenta ser parte de una recolección de toda esa información y condensarla para que a futuro quizá le sirva a alguien.

El enfoque de PoA hace difícil y centralizada la gestión de una red soberana y creo que este es el principal punto a considerar. Si bien es posible incorporarse, el proceso es centralizado y está sujeto a un acuerdo que previamente se debe aprobar.

En cuanto a los canales de comunicación existen múltiples:
- Existen listas de correo que no son tan accesibles y que se debe tener autorización previa para formar parte.
- El correo electrónico y el formulario de contacto están disponibles, en otros tiempos he escrito desde un organismo público y no recibí respuestas.
- El canal técnico en Telegram está abierto al público y esto hace un poco más alcanzable para consultas. Pocas personas aportan netamente en respuestas y se puede obtener un mejor soporte de miembros oficiales o experimientados. Actualmente encuentro que las personas que ingresan al grupo llegan con el fin de hacer un relevamiento para una investigación o tesis. De las personas que llegan para desarrollo, suelen conseguir una gran advertencia sobre el exceso de uso de gas, sobre googlear y leer código o sobre las bases del software libre y la comunidad. Creo que esto último en particular no fortalece a la comunidad y hace que se cierren oportunidades de personas que son potenciales colaboradores.


## Links
- [Grafana Monitor de BFA](https://bfa.ar/monitor/)
- [Implementación de un nodo BFA y API TSA](https://docs.google.com/document/d/1b9MZ5CQNPQh8bjs9OSuavdmHvJeBhxa21JBpdOmb_MI/edit#heading=h.klw7ixefri5f)
- [BFAExplorer - Explorador de bloques/transacciones/direcciones](https://bfaexplorer.com.ar:8443/)
