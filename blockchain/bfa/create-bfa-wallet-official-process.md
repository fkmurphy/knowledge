---
title: Crear una wallet - Proceso oficial
---
# Proceso oficial para creación de wallet
El proceso oficial posee un instructivo que se puede descargar una vez registrado en el [sitio de BFA](https://bfa.ar). Para ello es necesario registrarse con un correo electrónico. La URL exacta del formulario de registro es la siguiente: [URL de registro](https://registro.bfa.ar/accounts/register/). En caso de que este enlace cambie, es posible acceder desde [https://bfa.ar](https://bfa.ar) buscando el botón de ingresar.

## Generación de claves
Una forma sería instalar [geth](https://geth.ethereum.org/) y utilizarlo en local. La otra forma es ejecutando el nodo de BFA en docker `docker run --rm -it bfaar/nodo bash`.

**Consideraciones con docker:** si está usando `bfaar/node` tiene que realizar un `git pull` para obtener el último contenido del nodo (va a servir para el paso de verificación). Si tiene problemas porque `package.lock` tiene cambios, una opción simple podría ser ejecutar un `git reset --hard HEAD` y ejecutar nuevamente `git pull`.

Para crear la cuenta se debe usar el comando:
```
geth account new
```

Al ejecutarlo se pedirá la contraseña (es opcional) y si todo sale bien mostrará un mensaje como el siguiente:
```
INFO [09-20|20:00:30.465] Maximum peer count                       ETH=50 LES=0 total=50
Your new account is locked with a password. Please give a password. Do not forget this password.

Your new key was generated

Public address of the key:   0xxxx0xxxxxxxxxxxx88exxx1c5xxxxxxb1xxx
Path of the secret key file: ~/Library/Ethereum/keystore/UTC--2023-09-20T23-00-42.102834000Z--xxx0xxxxxxxxxxxx88exxx1c5xxxxxxb1xxx

- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!
- You must REMEMBER your password! Without the password, it's impossible to decrypt the key!
```

En el mensaje se muestra el address generada y un archivo que contiene la clave privada. Está demás decir que la clave privada no se debe compartir y debe resguardarse en un lugar seguro.

Se puede listar las cuentas a través del comando `geth account list`. 
### Consultar la clave privada
Una vez generada la cuenta es posible consultarla mediante el comando:
```
ethkey inspect --private <ethereum-path>/keystore/UTC-<timestamp>
```
El comando retornará una salida similar a:
```
Address: 0x....
Public key: ....
Private key: ....
```


## Firmar
Una vez obtenida la wallet (junto con la clave privada) es necesario firmar un mensaje. Se puede usar el [archivo `sign.js` ](https://gitlab.bfa.ar/blockchain/nucleo/blob/master/bin/sign.js)) o también en las instrucciones que descargó está el equivalente en python. Entonces usando el binario, se debe ejecutar:
```sh
# sign.js sign <keystore> [<password-opcional>]
sign.js sign /home/bfa/.ethereum/keystore/UTC-<timestamp> <password>
```

El comando retornará un hash con la firma.

**Nota:** Como se ve en el comentario, debe indicar la ubicación de su archivo que contiene la clave privada y la contraseña si es que posee una (en caso contrario no completar). La variante con `python` es cambiar `sign.js` por `sign.py`.

### Asociar la wallet a la cuenta de BFA
Lo unico que falta es ingresar a la página de BFA con la cuenta creada. Dentro de la cuenta es necesario seguir los pasos siguientes:
1. Hacer click en `agregar nueva cuenta o verificar existente`. 
2. Completar el campo de nombre
3. Indicar la dirección de la wallet (`address`)
4. Indicar la firma (campo `signature`) obtenida al ejecutar el comando `sign` en el paso anterior.
5. Agregar

![](https://imgur.com/uJqOe92.png)