---
title: Postgresql
---
# Postgres

## NULL es un problema, al menos en versiones <15
Al crear una constraint que haga único un campo o un grupo de campos debemos tener en cuenta a los valores NULL. Estos, en especial en postgres, el NULL cuando se compara es diferente a otro NULL. La expresión `NULL = NULL` resulta ser `falsa` porque se consideran dos valores desconocidos.

Es un caso común tener `softdelete` y crear el campo `deleted_at` en la tabla. El problema es cuando queremos identificar unívocamente un conjunto de campos siempre y cuando no estén eliminados y eso implica que usaremos la expresión `deleted_at IS NULL`. Sin embargo, nuestra restricción de conjunto único no cumplirá nunca ya que todos los campos `deleted_at` con valor `NULL` son diferentes entre sí.

Por ejemplo, si tenemos la siguiente tabla con un índice único `(name, organization, deleted_at)`

| id |  name | organization | deleted_at |
|---|-----|-----|------|
| 1  | juan | 1 | NULL |
| 2  | juan | 1 | NULL |
| 3  | pedro | 1 | NULL |
| 4 | juan | 2 | NULL |

Se repetirán registros como los `id`: `1` y `2`. 

Entonces podríamos crear un índice que contenga un `index_predicate` que es un índice parcial. Lamentablemente si quisiéramos usar la cláusula `ON CONFLICT` (que nos permite realizar `upsert` o `nothing` en el caso de coincidir con algún registro) tendríamos un problema en Postgres <15 porque sólo puede inferir un índice único (unique index) sin una cláusula where. El posible intento sería algo como:
```
INSERT (name,organization, deleted_at)
VALUES ('juan',1, NULL)
ON CONFLICT
   (name,organization,(deleted_at is null)) WHERE deleted_at IS NULL
DO NOTHING
```

Y fallaría. Sin embargo hay [artículos](https://betakuang.medium.com/why-postgresqls-on-conflict-cannot-find-my-partial-unique-index-552327b85e1) donde se menciona la versión 9.5 donde es posible utilizar index_predicate y no lo he probado. En la versión 12 no fue posible de realizar.

El error mencionado en dicho artículo es: `ERROR: there is no unique or exclusion constraint matching the ON CONFLICT specification.` Cuando se ejecuta la query:
```sql
INSERT INTO person (company_id, personnel_no, name)  
VALUES (1, 1, "Boss")  
ON CONFLICT (company_id, personnel_no)  
DO UPDATE SET name = EXCLUDED.name;
```
y se debe a que está intentando inferir un índice a través de sus campos, cuando el índice es parcial usando un `index_predicate`:
```SQL
CREATE UNIQUE INDEX uniq_idx_company_personnel  
ON person(company_id, personnel_no) WHERE company_id > 0;
```

Para solucionarlo propone este paso:
```sql
INSERT INTO person (company_id, personnel_no, name)  
VALUES (1, 1, "Boss")  
ON CONFLICT (company_id, personnel_no) WHERE company_id > 0  
DO UPDATE SET name = EXCLUDED.name;
```

Otra posible solución (bastante mala) sería crear un índice único con `COALESCE(deleted_at, VALOR_DEFAULT)` donde seleccionamos una valor que no podría considerarse válido dentro de nuestro set de datos. Esto en la fecha puede ser fácil si no requerimos la fecha `1970-01-01` sin embargo no siempre aplica.

La instrucción para crear el índice quedaría:
```sql
CREATE UNIQUE INDEX my_index_idx ON mytable (name, organization, COALESCE(deleted_at, '1970-01-01'));
```

A partir de la versión 15 se comienza a considerar la expresión `NULL = NULL` como verdadera. 