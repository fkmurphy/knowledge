---
title: Firmando commits
---
# Firmando commits en git

Para poder firmar los commits que realizamos y aumentar la seguridad al momento de realizar cambios en un repositorio, podemos utilizar una clave GPG.

Una vez instalado GPG con una versión `+2.1.17`, ejecutamos el comando siguiente para crear nuestra clave.

```sh
gpg --full-generate-key
```

El comando realizará una serie de preguntas para configurar el algoritmo a utilizar. Actualmente se recomienda utilizar el algoritmo EdDSA que utiliza la [curva elíptica de Edwards](https://en.wikipedia.org/wiki/Edwards_curve) con el esquema _Ed25519_.
**Nota:** si utilizará la clave para firmar en Github es importante que utilice el correo electrónico con el que se verificó la cuenta. En caso de no querer exponer su correo electrónico, está la posibilidad de utilizar un correo `no-reply` que GitHub provee en las [configuraciones de la cuenta](https://github.com/settings/emails.

Una vez creada e insertada la clave para resguardar la firma, puede consultar la misma con el siguiente comando:
```sh
$ gpg --list-secret-keys --keyid-format=long

/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot <hubot@example.com>
ssb   4096R/4BB6D45482678BE3 2016-03-10
```

De la siguiente forma podemos exportar la clave pública para importarla en donde queramos
```shell
gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
```

Puede probar firmar un mensaje de la siguiente manera:
```shell
echo "test" | gpg --clearsign
```
## Configurar git
Para firmar un commit con git, primero debemos configurarlo. Para indicar que deberá usar la firma debemos indicar cuál ID se usará y activar una configuración:
```shell
git config --global user.signingkey 3AA5C34371567BD2
```
Activamos la firma via GPG
```Shell
git config --global commit.gpgsign true
```

Al momento de hacer el commit podemos indicar firmarlo con el parámetro -S:
```sh
git commit -S -m 'comment'
```

Si falla, puede intentar agregar a su `bashrc` o `zshrc` la siguiente variable de entorno:
```sh
export GPG_TTY=$(tty)
```

## Pinentry MacOS
En el caso de MacOS puede instalar `pinentry-mac` para ingresar la clave mediante una GUI.
```shell
brew install pinentry-mac
echo "pinentry-program $(which pinentry-mac)" >> ~/.gnupg/gpg-agent.conf
killall gpg-agent
```
Desde la terminal es suficiente con poseer `pinentry`.