---
title: Firmar mensajes con Ethers.js
description: "Herramienta en SvelteKit para firmar mensajes con Metamask y Ethers.js y simplificar el registro de una wallet en la Blockchain Federal Argentina (BFA)."
---

# Firmar mensajes con Ethers.js

> Publicado originalmente en el blog el 2025-03-29.

## Firma de mensajes con Ethers.js y billeteras inyectadas en Svelte
El registro en la Blockchain Federal Argentina (BFA) puede resultar un proceso técnico y complejo para muchos usuarios. El proceso oficial por parte de BFA al día de la fecha es bastante tedioso e implica descargar archivos y ejecutar código.

Este repositorio surge como una solución para simplificar este proceso, haciendo uso de la familiaridad y accesibilidad de las billeteras inyectadas como Metamask. Al permitir a los usuarios firmar mensajes directamente desde su billetera en su navegador, se genera un hash verificable que facilita la demostración de propiedad.

Dado que el proceso de registro es centralizado y sólo BFA puede modificarlo, esta herramienta ofrece una alternativa práctica y amigable para aquellos que buscan una forma más sencilla de validar su identidad en la blockchain.

Para ello podes ir a [https://firmar.julianmurphy.dev/](https://firmar.julianmurphy.dev/) y realizar tu firma.


Podes verificar el código de este front o descargarlo y ejecutarlo desde [https://github.com/fkmurphy/sign_message_web3_example](https://github.com/fkmurphy/sign_message_web3_example)

Si queres más información sobre el registro de BFA, hace un tiempo cree un artículo en esta wiki: [Registro de BFA Simple usando Metamask](./metamask-create-wallet.md)

### Herramientas utilizadas
Es un front a partir de SvelteKit. Para el manejo de la wallet está la parte visual de Web3 Onboard y EteherJS para manejar la firma.
SvelteKit: Un marco de desarrollo web que permite crear aplicaciones web rápidas y eficientes.
