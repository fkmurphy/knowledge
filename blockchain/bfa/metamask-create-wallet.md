---
title: Registro de BFA Simple usando Metamask
---
# Registro de BFA Simple usando Metamask
Hoy en día es muy común utilizar [Metamask](https://metamask.io/) o alguna wallet similar. Como todo, tiene sus trade-off, sin embargo creo que es una buena forma de registrarse fácilmente, incluso podría ser mucho más fácil de lo planteado en este artículo.

Para poder usar una wallet en BFA hay que realizar cuatro pasos.
## 1. Registrarse con un correo electrónico en la web oficial
Lo primero que hay que hacer es registrarse con un correo electrónico en el sitio oficial de BFA. La dirección exacta del formulario de registro es la siguiente: https://registro.bfa.ar/accounts/register/. En caso de que este enlace cambie, es posible acceder desde https://bfa.ar buscando el botón de ingresar.

## 2. Agregar tu wallet
Una vez que la cuenta está creada y es accesible, hay que crear una wallet en Metamask. Para ello hay muchísimos artículos y videos que voy a listar a continuación. Recomiendo usar la extensión del navegador y que se asegure de instalar la extensión correcta, por ejemplo en el caso de [Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
- [Comenzar con Metamask - Oficial](https://support.metamask.io/hc/es/articles/360015489531-Comenzar-con-MetaMask)
- [Video - Cómo crear una billetera en Metamask](https://www.youtube.com/watch?v=Wwb9D0j2hn0)

## 3. Firmar un mensaje
En este paso lo más importante a destacar es que la clave privada jamás debe ser compartida. Es por ello que BFA no va a pedirte nunca tu clave privada. Para demostrar que se es propietario de una determinada dirección (wallet), podes firmar un mensaje. Para ello creé la siguiente herramienta https://firmar.julianmurphy.ar/. 
1. Acceder al [sitio](https://firmar.julianmurphy.ar/) con el navegador donde está instalada la wallet de metamask 
2. Hacer click al botón conectar
3. Click al botón `Firmar`
4. Metamask va a solicitarte si queres aceptar o rechazar la firma, por supuesto, hay que aceptar.
5. En el campo `Firma` aparecerá un texto (`hash`) que es la firma que se va a utilizar para comprobar que se es dueño de esa dirección.
6. Además, en la parte inferior está un texto adicional donde se puede copiar la dirección de la wallet por si fuera necesario.

## 4. Registrar la wallet en BFA
Los datos que tendremos en este punto son:
- Dirección de la wallet de metamask. Va a ser parecido a: `0xbd8ee0bxxxxxx8xx5a8dasdx1`
- Firma del mensaje. Es algo parecido al siguiente texto: `0x8d....0e57337af3000a4432c33e72293xxxx4c669cdexxxxx203f5c0eceb2fe80bc17437bb008e9e.....59f2f19565231xxxx03de7f81ad1b`

Entonces con estos datos:
1. Dirigirse a https://bfa.ar
2. Iniciar sesión con la cuenta creada en el punto 1
3. Hacer click en el botón `Agregar nueva cuenta o verificar existente`. Se abrirá una ventana (modal).
4. Indicar un nombre que identifique la cuenta (sé creativo).
5. Completar el campo `dirección` con la dirección de la wallet de metamask
6. Completa el campo `Signature` con la firma del mensaje que se obtuvo en el punto 3
7. Click en agregar.

En poco tiempo se marcará la cuenta como verificada y se acreditará ether.