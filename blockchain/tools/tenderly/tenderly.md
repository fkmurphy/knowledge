---
title: Tenderly
---
# Tenderly
Como herramienta de desarrollo y análisis para blockchain, es una excelente opción. Como herramienta paga, queda a tu criterio jaja.

Este servicio posee varias herramientas de análisis, de desarrollo y otras orientadas a comunicación y monitoreo en ambientes productivos. Es muy completa al momento de simular transacciones sobre replicas de una red determinada y observar en detalle la ejecución.
### Redes que soporta:

Redes que son soportadas y que poseen acceso mediante web3 gateway
- Ethereum Mainnet
- Eth Goerli
- Sepolia
- Polygon
- Polygon Mumbai
- Optimistic
- Entre otras testnets de prueba

Redes que son soportadas pero no son accesibles desde el servicio web3 gateway:
- RSK y testnet
- BSC y testnet
- Avalanche
- Arbitrum
- Fantom
- Moonbeam
- Entre otras

## [DevNet](https://docs.tenderly.co/devnets/intro-to-devnets)
Tenderly posee el módulo DevNet que permite crear redes desde cero y usarlo como ambiente de desarrollo __para smart constracts__, otorgando herramientas para el análisis y debug de las transacciones que se realizan sobre los mismos.

Con la premisa de tener un ambiente integral, donde revisar todas las transacciones y hacer debug de las mismas sin poseer herramientas de tercero en tu proyecto es el foco principal.

Desventajas que encuentro:
- Brinda un RPC temporal que expira en unos 30 minutos si no se le envía alguna transacción o en 90 minutos desde que se envía la primera transacción
- Aún no tiene desarrollado un RPC de larga duración, en otros términos, ni pagando dura más.

## [Simulations and forks](https://docs.tenderly.co/simulations-and-forks/intro-to-simulations)
### Simuladores
Los simuladores sirven, como dice la palabra, para simular transacciones sin necesidad de que sean ejecutadas en una blockchain. Incluso, se puede simular una transacción en un bloque determinado.

### Forks
Por otra parte, los forks permiten tomar una red en cualquier punto de su historia (bloques) y utilizarlos como una réplica de test totalmente aislada. Obviamente permite hacer debug de las transacciones que se realicen y brindan RPC destinados para que puedas integrar una dapp UI usando la url del fork generado como proveedor. 

Por el momento no veo que los RPC posean un límite de tiempo, parecen estar disponibles siempre y cuando no superes tu plan.

![](https://imgur.com/A5Bssht.png)
Imagen que muestra la simulación de una transacción

### [Web3 Gateway](https://docs.tenderly.co/web3-gateway/web3-gateway)
Este servicio promete un RPC listo para ambientes productivos, con rapidez y disponibilidad. Las redes que se pueden utilizar son las que se mencionan al inicio del artículo. Parece similar a otras herramientas como Infura. El uso de este servicio está medido a partir de las unidades de Tenderly (TU).
