---
title: Introducción Ethereum
---
# Ethereum
## Introducción
Ethereum es una de las blockchains más populares. A mi criterio, que posee una de las comunidades más innovadoras y rápidas en implementar nuevas funcionalidades y soluciones.

Está preparada para ejecutar código arbitrario (smart contracts) a través de la llamada Ethereum Virtual Machine. Esta computadora es una implementación basada en la estructura de datos en pila (stack) y posee un set de instrucciones llamados Opcodes que es similar a cualquier lenguaje ensamblador y que finalmente va a ser compilado a bytecode. Para más información:
- [EVM - Ethereum.org](https://ethereum.org/en/developers/docs/evm/)
- [EVM - Evm.codes](https://www.evm.codes/about)

Se puede encontrar una descripción de cada opcode en el siguiente sitio:
https://www.evm.codes/

Aunque obviamente también está el sitio oficial:
https://ethereum.org/es/developers/docs/evm/opcodes/

También es posible probar el lenguaje ensamblador a través de su playground en modo Mnemonic.
https://www.evm.codes/playground

## Migración a PoS (Proof of stake)
Algo interesante de Ethereum es que en 2022 dejó de utilizar el mecanismo de consenso [Proof of Work](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) para utilizar el mecanismo [Proof of stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/).
En dicho mecanismo, existen validadores que utilizan sus Ether (criptomoneda nativa de la red) para verificar los nuevos bloques y propagarlos a través de la red. El mínimo para participar como validador de la red es de 32 ETH actualmente, un número que no tiene mucho que ver en cuanto a lo técnico, sin embargo permite que la cantidad de validadores no sea tan masiva, pudiendo confirmar el bloque de manera más ágil.
En aquél momento, algunas de las ventajas que se escuchaban dentro y fuera de la comunidad eran:
- Mejoras la descentralización, supuestamente permitiría evitar el ataque del 51%.
- Apoyo a la causa de reducción de emisiones CO2 (deja de requerir gran potencial de procesamiento como en PoW).
- Mayormente deflacionario o equilibrado

### Actualidad en pool de staking
En la actualidad existen diversos pools para hacer staking sin la necesidad de poseer los 32ETH. Algunos poseen más libertades que otros, sin embargo un problema que se plantea es si centralizar los ether sobre un servicio, no otorga mayor poder a ese pool lo que haría a la red más centralizada. Actualmente (23/08/2023) los más conocidos y en orden de mayor ether staked son:
- [Lido](https://lido.fi)
- [Coinbase Wrapped staked ETH](https://www.coinbase.com/price/coinbase-wrapped-staked-eth)
- [Rocket Pool](https://rocketpool.net/)

Como se puede observar en la siguiente imagen es ampliamente utilizado Lido.
![](https://i.imgur.com/4BKaI0N.png)


## Herramientas interesantes
- [Defi Llama - Información de diversas blockchain, principalmente EVM compatibles](https://defillama.com/)
- [Evm.codes - El playground está bueno para revisar algunas cosas y la tabla de opcodes es muy fácil de leer](https://evm.codes)
- [Tenderly.co - Analizar transacciones, hacer fork de redes y otras herramientas muy buenas](https://tenderly.co)
- [Etherscan - Buscar transacciones, cuentas, bloques, etc.](https://etherscan.io)
