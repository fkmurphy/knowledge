---
title: Manejando versiones con pyenv
---
# Manejando versiones con pyenv
Epa epa, estaba intentando ejecutar un script de python y de golpe me encuentro con un error:
```
Traceback (most recent call last):
  File "encode_image.py", line 6, in <module>
    import tensorflow as tf
ModuleNotFoundError: No module named 'tensorflow'
```

Entonces dije, por qué no agregarlo a mi knowledge por si a alguien más le sirve?

Resulta que el paquete que estaba ejecutando en mi ambiente virtual requería que utilice otra versión de tensorflow que ya no tenía soporte en Python 3.10. Por lo tanto tuve que reducir de versión.

Para poder manejar estas versiones se puede utilizar [pyenv](https://github.com/pyenv/pyenv). La [guía de instalación](https://github.com/pyenv/pyenv#installation) está disponible en el repositorio.

## Instalar una versión determinada
Ejecute
```sh
pyenv install 3.7
```

## Ver versiones disponibles
Ejecute 
```sh
pyenv versions
```

## Usar globalmente por defecto una versión
```sh
pyenv global 3.7.16
```
Puede consultar la versión:
```sh
python --version
```

## Crear un `virtualenv` con una version determinada
ejecute
```
pyenv virtualenv 3.7.16 nuevovirtualenv
```

Recuerde que puede iniciar el ambiente con el comando:
```sh
pyenv activate nuevovirtualenv
```
