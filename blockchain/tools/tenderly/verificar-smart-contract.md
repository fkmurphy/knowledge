---
title: Verificar un smart contract
---
# Verificando un SC en Tenderly
Al momento de probar un smart contract con [Tenderly](./tenderly) posiblemente quieras verificarlo para usar sus funciones y analizar su funcionamiento.

Al momento de verificarlo tiene varias opciones, sin embargo, la opción de subir la carpeta del proyecto no me agrada. Una opción es usar [`JSON Upload`](https://docs.soliditylang.org/en/latest/metadata.html).

![](https://imgur.com/Y9KU4c6.png)

## [Foundry](../foundry/foundry) - Obtener el JSON metadata del contrato
Bueno, en foundry es bastante simple, con el siguiente comando:

```sh
forge verify-contract  0xaxxefaddresscontractd8xx3ax MiContrato --show-standard-json-input > etherscan.json
```

De esta forma obtenemos un archivo JSON que posee el cómo interactuar con el contrato (ABI) y cómo reproducir la compilación y verificación del smart contract deployed. Más o menos como lo siguiente:
```JSON
{"language":"Solidity","sources":{"src/MiContrato.sol":{"content":"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n\nimport \"@openzeppelin/contracts/token/ERC721/ERC721.sol\";\nimport \"@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol\";\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\nimport \"@openzeppelin/contracts/utils/Counters.sol\";\n\ncontract MiContrato is ERC7.....n            return result + (rounding == Rounding.Up && 1 << (result * 8) < value ? 1 : 0);\n        }\n    }\n}\n"}},"settings":{"remappings":["@openzeppelin/=lib/openzeppelin-contracts/","ds-test/=lib/forge-std/lib/ds-test/src/","forge-std/=lib/forge-std/src/","openzeppelin-contracts/=lib/openzeppelin-contracts/"],"optimizer":{"enabled":true,"runs":200},"metadata":{"bytecodeHash":"ipfs","appendCBOR":true},"outputSelection":{"*":{"":["ast"],"*":["abi","evm.bytecode","evm.deployedBytecode","evm.methodIdentifiers","metadata"]}},"evmVersion":"paris","libraries":{}}}
```

Una vez realizado este paso, es posible usar el JSON en el proceso de verificación de smart contract de [Tenderly](./tenderly). Seleccionar correctamente la versión de compilación (en mi caso `0.8.19`) y estará verificado.

![](https://i.imgur.com/4WjUIdQ.png)

De esta forma, es posible simular transacciones directamente desde la plataforma para luego analizarlas.
