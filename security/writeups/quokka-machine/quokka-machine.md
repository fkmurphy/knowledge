Usamos el netdiscover para ver las IPs de nuestro segmento de red
<figure>
<img src="./attachments/fig1.png" />
<figcaption></figcaption>
</figure>

<figure>
<img src="./attachments/fig2.png" />
<figcaption></figcaption>
</figure>
<figure>
<img src="./attachments/fig3.png" />
<figcaption></figcaption>
</figure>
<figure>
<img src="./attachments/fig4.png" />
<figcaption></figcaption>
</figure>
Podemos observar que nmap descubrió el dominio WORKGROUP en nuestro objetivo y es un Windows Server 2016 (14393) a través del script smb-os-discovery. Tambien observamos que el usuario guest es soportado. Probemos acceder con el usuario invitado mediante el comando smbmap
<figure>
<img src="./attachments/fig5.png" />
<figcaption></figcaption>
</figure>

Vemos que tenemos `Compartido`, accedemos mediante smbclient
<figure>
<img src="./attachments/fig6.png" />
<figcaption></figcaption>
</figure>

Navegando a `Proyectos\Quokka\Código` encontramos algunos archivos

<figure>
<img src="./attachments/fig7.png" />
<figcaption></figcaption>
</figure>

Bajamos los archivos con `mget *`:
<figure>
<img src="./attachments/fig8.png" />
<figcaption></figcaption>
</figure>

El html no tiene nada
<figure>
<img src="./attachments/fig9.png" />
<figcaption></figcaption>
</figure>

Hay un .bat
<figure>
<img src="./attachments/fig10.png" />
<figcaption></figcaption>
</figure>

Y otro `mantenimiento - copia.bat` que contiene lo siguiente
<figure>
<img src="./attachments/fig11.png" />
<figcaption></figcaption>
</figure>

Intentemos cambiar la ip destino de la revshell
<figure>
<img src="./attachments/fig11a.png" />
<figcaption></figcaption>
</figure>

Ahora lo subimos con put
<figure>
<img src="./attachments/fig11b.png" />
<figcaption></figcaption>
</figure>

Con el comando more revisamos
<figure>
<img src="./attachments/fig11c.png" />
<figcaption></figcaption>
</figure>

Verificamos que apache esté corriendo
<figure>
<img src="./attachments/fig12a.png" />
<figcaption></figcaption>
</figure>

Creamos el shell.ps1 y lo copiamos a la carpeta de apache
<figure>
<img src="./attachments/fig12b.png" />
<figcaption></figcaption>
</figure>


Con msfconsole preparamos una revshell
<figure>
<img src="./attachments/fig13.png" />
<figcaption></figcaption>
</figure>
<figure>
<img src="./attachments/fig14.png" />
<figcaption></figcaption>
</figure>
Esperamos como máximo 1 minuto que es lo que tarda en ejecutar mantenimiento.bat y ya tenemos la sesión
<figure>
<img src="./attachments/fig15.png" />
<figcaption></figcaption>
</figure>

Estamos como administrador
<figure>
<img src="./attachments/fig16.png" />
<figcaption></figcaption>
</figure>

Vemos que en el usuario 0mar tenemos el archivo user.txt
<figure>
<img src="./attachments/fig17.png" />
<figcaption></figcaption>
</figure>


Y como somos administrador, podemos ver el desktop también de este usuario. Obtenemos admin.txt
<figure>
<img src="./attachments/fig18.png" />
<figcaption></figcaption>
</figure>
