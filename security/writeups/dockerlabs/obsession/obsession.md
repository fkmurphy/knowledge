Escaneamos los puertos con nmap
```
nmap -sC -sV 172.17.0.2
```
<figure>
<img src="./attachments/fig1.png" />
<figcaption></figcaption>
</figure>

Tenemos:
  - 21 FTP
  - 22 SSH
  - 80 HTTP

### HTTP
Abrimos con el navegador el sitio web 
<figure>
<img src="./attachments/fig2.png" />
<figcaption></figcaption>
</figure>

Observamos el HTML del sitio web `ctrl + u`

Encontramos un comentario:
<figure>
<img src="./attachments/fig3.png" />
<figcaption></figcaption>
</figure>

Un formulario
<figure>
<img src="./attachments/fig4.png" />
<figcaption></figcaption>
</figure>

Al hacer submit en el formulario vemos este mensaje:
<figure>
<img src="./attachments/fig5.png" />
<figcaption></figcaption>
</figure>

La petición fue a la siguiente dirección con los parámetros que se observan
```
http://172.17.0.2/.formrellyrespexit.html?nombre=qwe&apellido=qwe&telefono=qwe&email=qwe%40qweqwe.c&somatotipo=Endomorfo&llamada+a+la+accion=CAMBIAR+MI+VIDA+A+MEJOR+AHORA&campaign=BLACKFRIDAY
```

Usando dirb encontramos algunos directorios
<figure>
<img src="./attachments/fig6.png" />
<figcaption></figcaption>
</figure>

En /important solo encontramos el manifiesto hacker

<figure>
<img src="./attachments/fig7a.png" />
<figcaption></figcaption>
</figure>

Navegamos en el directorio backup y vemos un enlace a un archivo txt
<figure>
<img src="./attachments/fig7.png" />
<figcaption></figcaption>
</figure>

En backup.txt obtenemos un usuario
<figure>
<img src="./attachments/fig8.png" />
<figcaption></figcaption>
</figure>

### FTP
pero probamos anonymous en ftp
<figure>
<img src="./attachments/fig9.png" />
<figcaption></figcaption>
</figure>

hacemos get de los archivos
<figure>
<img src="./attachments/fig10.png" />
<figcaption></figcaption>
</figure>

### SSH
Con rockyou y el usuario `russoski`, probamos fuerza bruta usando `hydra`. Encontramos la clave.
<figure>
<img src="./attachments/fig11.png" />
<figcaption></figcaption>
</figure>

Accedemos por ssh
<figure>
<img src="./attachments/fig12.png" />
<figcaption></figcaption>
</figure>

Usamos `sudo -l` para observar si tenemos permisos para ejecutar sudo de alguna manera. Tenemos acceso a vim sin contraseña.
<figure>
<img src="./attachments/fig13.png" />
<figcaption></figcaption>
</figure>

Escalamos privilegios
`sudo vim -c ':!/bin/sh'`
<figure>
<img src="./attachments/fig14.png" />
<figcaption></figcaption>
</figure>

Obtuvimos acceso con root
<figure>
<img src="./attachments/fig15.png" />
<figcaption></figcaption>
</figure>

Listamos /root
<figure>
<img src="./attachments/fig16.png" />
<figcaption></figcaption>
</figure>