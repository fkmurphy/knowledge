
Enumeramos los puertos mediante el comando:
`nmap -sV -sC -O -p- 172.17.0.3`
<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig1.png" alt="">
</figure>

Encontramos los puertos
- 80 HTTP
- 22 SSH
### HTML
En puerto 80 encontramos un index con el mensaje siguiente

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig2.png" alt="Mensaje de Juan para Camilo -> te he dejado un correo con un mensaje importante">
</figure>

Enumeramos directorios con dirb

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig3.png" alt="">
</figure>
No encontramos nada relevante

### SSH

Con el mensaje que encontramos podemos intentar usar hydra con el usuario `camilo` y el diccionario `rockyou.txt`. Encontramos la contraseña

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig4.png" alt="">
</figure>

Accedemos mediante ssh
<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig5.png" alt="">
</figure>

Si recodamos, Camilo tiene un email para leer, entonces navegamos a `/var/mail/camilo`

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig6.png" alt="">
</figure>

Vemos que el correo de Juan para Camilo tiene la contraseña del usuario `juan`. Ingresamos con este:

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig7.png" alt="">
</figure>

El usuario `juan`  puede ejecutar `ruby` como sudo y sin password

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig8.png" alt="">
</figure>

Entonces escalamos privilegios desde ruby usando el comando
```
sudo ruby -e 'exec "/bin/sh"'
```

<figure>
  <img src="security/writeups/dockerlabs/vacaciones/attachments/fig9.png" alt="">
</figure>
Obtenemos acceso a root.