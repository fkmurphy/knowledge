---
title: DataIndex — índice de precios de supermercados
description: Proyecto de índice de precios de supermercados en Argentina: scraping de precios, histórico por producto y métricas de inflación en alimentos.
---

# DataIndex

> Proyecto publicado originalmente en el blog el 2024-02-22.

Hace un año levante dos proyectos, el primero (Feed news) tenía que ver con una herramienta que permita capturar RSS con la intención de volver a tener algo simil al servicio que brindaba Google en su momento. El segundo está relacionado con la problemática de Argentina donde los bienes y servicios parecen no tener un valor en relación a su calidad y saber si es "caro" o "barato" depende de muchos factores pero principalmente de la inflación.

Con el poco tiempo que tengo para dedicarle y un servidor muy chico decidí que sería mejor enfocarse a la herramienta más urgente, Supermarket. Al tener los precios de los productos en supermercados es posible determinar si un producto se "encareció" en exceso o incluso si bajó de precio en el tiempo. Además, es posible conocer métricas en tiempo real sobre la inflación en alimentos y comparar diferentes cadenas de supermercados en diferentes zonas geograficas.

### Dónde lo puedo ver?

Pueden visitar el sitio [Supermarket - Data Index](https://supermarket.data-index.xyz)

### Tecnologías que usa actualmente
Para la parte de scrapping
  - Puppeteer
  - Python (beatiful soup)

Para base de datos:
  - Postgresql
  - Meilisearch (motor de búsqueda)

Para front:
  - Astro
  - svelte

Para back:
  - Nestjs

Tareas automatizadas:
  - n8n

### Q&A

**Pensas hacer opensource el código?**

Si, me gustaría, no conozco tanta información sobre las leyes de scrapping y por ello aún no es abierto. El proyecto es sin fines de lucro.

**Sobre funcionalidades**

Fui desarrollando el proyecto con las horas que me sobraban (2hs por semana intermitentes). Las funcionalidades que están no son buenas pero sí son suficientes para conocer un histórico de cada producto en diferentes supermercados.

Las cadenas de supermercados que están indexadas fueron parte de todo ese trabajo. Conocí gente que hacía scrapping utilizando AI con servicios como OpenAI, a largo plazo y en gran escala no creo que sea eficiente. Es probable que este tipo de servicios sirva en otro punto luego de obtener la información, por ejemplo clasificar los productos y/o responder a consultas específicas de los usuarios relacionadas a un producto/métrica.

Qué tal sería si este sitio no fuera navegable sino "consultable"?. El usuario podría pedir dónde comprar más barato un producto determinado, dónde le conviene realizar la compra según un listado de productos y ubicación, entre otros casos.
