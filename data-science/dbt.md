---
title: DBT
---
# DBT

[DBT](https://getdbt.com) es una herramienta muy interesante para la transformación de datos, además puede ayudar a realizar al mismo tiempo la documentación del proceso de transformación. Tiene la posibilidad de contratarse como servicio pero también de crear tu propia instancia a través de [dbt-core](https://github.com/dbt-labs/dbt-core) que está escrito en python y posee una licencia Apache 2.0.

Es muy fácil conectar a diferentes fuentes de datos a través de los [adaptadores](https://docs.getdbt.com/docs/supported-data-platforms) como:
- postgresql
- snowflake
- databricks
- spark

Posee una herramienta para la construcción y disposición de la documentación del proceso, pudiéndose visualizar un gráfico del flujo de transformación. 

Además de permitir versionar y mantener el proceso de transformación en código, nos permite hacer un seguimiento de las ejecuciones y hacer test de dicho proceso para saber cuándo los modelos fallan. En cuanto a los test, estos se ejecutan antes de realizar cualquier tipo de conexión a la fuente de datos, lo que significa que no va a abrir sesiones hasta no haber realizado los test correctamente.
