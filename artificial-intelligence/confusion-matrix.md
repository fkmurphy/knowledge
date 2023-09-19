---
title: Matriz de confusión
---
La matriz de confusión permite comparar las predicciones realizadas por un modelo contra las categorizaciones reales de los casos.

Por qué utilizarlo?
Muchas veces se intenta estimar si un modelo es mejor que otro y para ello se basa en la cantidad de casos que logró identificar correctamente. Esto es muy general, ya que dichos casos están en diferentes categorías. 

Por ejemplo:
> Se quiere encontrar cuál modelo clasifica mejor las imágenes que son de perros y cuáles son de gatos. Una vez listo el set de datos, se procede a categorizar imágenes con cada uno de los modelos y así obtener métricas. Entonces, podría decirse que si de 100 imágenes se predicen correctamente 90, el modelo tuvo un 90% de acierto y por lo tanto es muy bueno. Si otro modelo predice correctamente 85 imágenes de 100, entonces tiene un acierto de 85% y no es tan bueno como el anterior. Finalmente, podemos decidir cuál es el mejor modelo?

En el anterior ejemplo se utiliza una métrica de exactitud que es útil cuando el set de datos es balanceado, es decir, posee la misma cantidad de imágenes de perros que de gatos. En la práctica normalmente sucede que tenemos más casos de algunas categorías que de otras. Esto hará que el modelo seleccionado a través de la métrica de exactitud sea muy bueno para predecir una categoría y muy malo para predecir la otra.

Con la matriz de confusión es posible cuantificar el desempeño de cada modelo aún teniendo sets de datos desbalanceados.

Para ello se hace una matriz cuadrada donde sus filas y columnas representen las categorías. En cada casillero se ubicarán el número de casos que predijo el modelo contrastado con lo que debería haber sido. Por ejemplo, si una imagen debía estar clasificada como "perro" y el modelo predijo "gato", entonces quedará en la columna "perro" y fila "gato", de otra forma, si se clasificó correctamente, esa métrica será contabilizada en la misma categoría tanto para la columna como la fila. La diagonal de la matriz, indicará los resultados que dieron correctamente, mientras los demás valores indicarán cuantos desaciertos tuvo el modelo.

En la siguiente tabla se muestran los casos acertados (predichos correctamente por el modelo) siendo 70 para la categoría "perro" y los 20 para la categoría gato. En las otras columnas, tenemos 4 casos que deberían haber sido clasificados como "gato" sin embargo el modelo predijo que eran "perro" y lo mismo para los 5 casos de perro que fueron categorizados de manera incorrecta. 

|          | Perro        | Gato      |
| :--------: | :--------: | :-------: |
| Perro    |  71          |    4    |   
| Gato     |   5          |    20   |

## Links interesantes
[ Plot confusion matrix - Scikit Learn](https://scikit-learn.org/stable/auto_examples/model_selection/plot_confusion_matrix.html)

