Enumeramos los puertos con nmap
<img src="./attachments/fig1.png" />

Listamos con `dirb` los directorios del puerto 80
<img src="./attachments/fig2.png" />

Si descargamos la imagen y miramos con `exiftool` los metadatos en contramos un usuario
<img src="./attachments/fig3.png" />

Utilizamos hydra para encontrar la clave del usuario
<img src="./attachments/fig4.png" />

Ingresamos mediante ssh
<img src="./attachments/fig5.png" />

Con `sudo -l`podemos encontrar que tenemos permisos para ejecutar /bin/bash como root y sin password. 
<img src="./attachments/fig6.png" />
