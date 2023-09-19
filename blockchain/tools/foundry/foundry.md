---
title: Foundry
---
# Foundry
[Foundry](https://book.getfoundry.sh/) es una herramienta para desarrollar smart contract utilizando Solidity. Este set de herramientas permite gestionar dependencias, realizar diferentes tipos de test, hacer debug, exportar reportes de gas, verificar contratos, realizar scripts para automatizar tareas, entre otros.

La intención de este artículo, más allá de lo que ya está dicho, es dejar constancia de algunos pasos
## Obtener smart contract completo (flatten)
A veces cuando necesitamos verificar el smart contract o subir el código a algún servicio necesitamos exportarlo en un solo archivo donde todas sus dependencias estén definidas. Foundry tiene varias formas de hacer esto, una de ellas es usando flatten:
```sh
forge flatten -o ContratoCompleto.sol src/MiContrato.sol
```
De esta forma conseguiremos un único archivo que posee el contrato y sus dependencias.
