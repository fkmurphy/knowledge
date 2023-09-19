---
title: Rust
---
# Rust language
## Documentación
- [Libro oficial en linea](https://doc.rust-lang.org/book/)
- [Libro interactivo -  Brown.edu](https://rust-book.cs.brown.edu/)
- Leer el libro offline
```
rustup docs --book
```

## Herramientas principales
- Cargo - administrador de dependencias y compilación
- Rustfmt - formateo de código, se puede ejecutar sobre todo un proyecto con el comando `cargo fmt`
- rustfix: permite arreglar warnings del compilador, como por ejemplo corregir variables que no estén en uso. Se puede ejecutar mediante `cargo fix`.
- Clippy: es una herramienta de lint para analizar el código. Se puede ejecutar con `cargo clippy`
- LSP de Rust (rust-analyzer)

## Aspectos básicos

### Sobre `cargo`
La compilación se puede llevar a cabo mediante `rustc`, sin embargo para proyectos un poco más complejos será necesario usar `Cargo`. Para ello se puede crear un nuevo proyecto con:
```sh
cargo new my_project
```

Lo bueno es que ya genera un proyecto de git y agrega el archivo de configuración `Cargo.toml`. Se puede ver más en [TOML](https://toml.io/en/). Hay dos claves principales en este archivo:
- `[package]`: indica el nombre, versión y edición de Rust a usar.
- `[dependencies]`: en rust los paquetes de código se los llama `crates`, acá están las dependencias del proyecto.

Es importante saber que también se generará el archivo `Cargo.lock` donde se "bloquean" las versiones usadas en el proyecto. Esto es equivalente a otros gestores de paquetes como `package.lock`, `yarn.lock` o `composer.lock`.

#### Compilar y ejecutar
Cuando ejecutamos un proyecto se generan dos cosas:
- `target/`: hay dos carpetas `debug` y `release` dependiendo la versión construida
- `Cargo.lock`

El comando en cuestión:
```
# cargo build + execute
cargo run
```

Si se quiere revisar que el proyecto compila pero no producir un ejecutable finalmente podemos ejecutar `cargo check`.

Hay que tener en cuenta que hasta ahora sólo se generó la versión `debug`. Si se quiere realizar una versión "productiva" es necesario agregar el parámetro `--release` al comando `build`.

#### Bibliotecas adicionales
- [rand](https://crates.io/crates/rand): `library crate` (osea que es un código para usar en otros programas) para crear números random
#### Instalar y actualizar bibliotecas

Como se mencionó en el archivo `Cargo.toml` existe una sección `dependencies`. Acá es posible agregar las dependencias del proyecto. Las versiones utilizan [Semantic Versioning](https://semver.org/). Por ejemplo, si queremos instalar `rand` en este caso al menos la versión `^0.8.5` e inferior a `0.9.0`:
```toml
[dependencies]
rand = "0.8.5"
```

Y luego se ejecuta el `build`.
```
cargo build
```

Las dependencias se obtendrán de [Crates](https://crates.io).

Para actualizar los paquetes según los criterios que se tengan en `Cargo.toml` es tan simple como ejecutar `cargo update`
#### Generar y visualizar documentación
Una funcionalidad muy buena es `cargo doc` que permite generar la documentación del programa y sus dependencias. Por ejemplo, si se agrega como dependencias `rand`, al ejecutar `cargo doc --open` se abrirá la documentación y en la barra lateral izquierda estará un índice donde podrá ingresar a la documentación de dicho paquete.
### Biblioteca estándar
Como todo lenguaje posee la [biblioteca estándar llamada `prelude`](https://doc.rust-lang.org/std/prelude/index.html) . Entre las funcionalidades tenemos `std::io` que sirve para leer la entrada del usuario e imprimir el resultado como salida.

### Variables
En cuanto a las variables en Rust hay dos características a destacar:
- las variables son inmutables por defecto
- Rust posee inferencia de tipos.

Para declarar una variable mutable es necesario agregar el modificador `mut`.
```rust
let apple = 5; // inmutable entero (i32)
let mut apple_mut = 6; // mutable entero (i32)
```
#### Tipos de datos
##### Escalares
Hay cuatro tipos de datos escalares:
- enteros
- punto flotante
- booleanos
- caracteres
###### Enteros
Con la tabla del libro me parece de sobra para explicar los que existen.

|Length|Signed|Unsigned|
|---|---|---|
|8-bit|`i8`|`u8`|
|16-bit|`i16`|`u16`|
|32-bit|`i32`|`u32`|
|64-bit|`i64`|`u64`|
|128-bit|`i128`|`u128`|
|arch|`isize`|`usize`|
_extraído del libro RustBook_

Los números con signo se representan en [complemento a dos](https://es.wikipedia.org/wiki/Complemento_a_dos)

Los límites de cada variante con signo van desde -(2<sup>n - 1</sup>) a 2<sup>n - 1</sup> - 1 _con n bits._ Un `i8` tiene un rango `[-128,127]`. Las variantes sin signo pueden ir desde 0 a 2<sup>n</sup> - 1, por lo que un `u8` tiene un rango de `[0, 255]`.

Los tipos `isize` y `usize` dependen de la arquitectura de la computadora donde se ejecuta el programa, es por ello que se utiliza `arch`(64bits o 32 bits).

Un detalle interesante es que se pueden utilizar literales `57u8` y también separar con `_` para facilitar la lectura en casos como `1_000_000` (un millón).

|Number literals|Example|
|---|---|
|Decimal|`98_222`|
|Hex|`0xff`|
|Octal|`0o77`|
|Binary|`0b1111_0000`|
|Byte (`u8` only)|`b'A'`|
_extraído del libro RustBook_

Finalmente debo agregar un apartado de overflow (o underflow) al momento de realizar operaciones. Esto me queda pendiente de revisar en profundidad, sin embargo en el [libro se menciona la advertencia](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow).
###### Punto flotante
El punto flotante se tienen dos tipos `f32` y `f64` que por default es este último. Según el libro no hay un cambio notorio en performance pero sí en precisión. Los flotantes son representados mediante el estándar `IEEE-754` siendo `f32` de precisión simple y `f64` de precisión doble. 
###### Operaciones numéricas
Básicamente las tradicionales, suma (+), resta(-), división (/), multiplicación (\*) y resto (%). Solo para aclarar, en una división de enteros que no tenga resultado entero, se trunca el valor.

###### Booleanos
No hay mucho que decir, valores `true` y `false`. La palabra reservada es `bool`.

###### Caracter
Las características principales:
- La palabra reservada es `char`
- se puede inferir el tipo al usar comillas simples `'`
- ocupa un espacio de 4 bytes
- representa un valor escalar en Unicode (puede representar letras acentuadas, caracteres chinos, emojis, etc.). Los valores van desde `U+0000` y `U+E000` a `U+10FFFF`.

El libro aclara que no necesariamente un caracter a nivel "humano" es literalmente una representación de 1 `char`.

##### Tipos compuestos
###### Tuplas
Son de longitud fija/estática, no pueden crecer una vez declaradas. Cada posición de la tupla tiene un tipo de dato. Sus valores son envueltos en paréntesis y cada elmento separado por comas. Es posible deconstruir en múltiples variables o utilizar una notación de punto para acceder a cada valor.
```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let x = x.0;
    let (y,z,j) = tup;
    
}
```
_Ejemplo extraído de RustBook_

Existe un valor vacío para las tuplas y se puede crear usando sólo `()`, a este valor se le llama `unit`.

###### Arreglos
Los arreglos, correctamente llamados en Rust, poseen una longitud estática y por ello no pueden crecer una vez declarados. Se utilizan corchetes `[]` y se separa los elementos con coma. Estos son declarados en el `stack` y no en `heap`. Si se quiere declarar explícitamente el tipo se puede hacer de la siguiente manera
```rust
let a: [i32, 5] = [1,2,3,4,5]; // arreglo de 5 elementos i32
```

También es posible crear arreglos de una longitud determinada repitiendo un valor determinado:
```rust
let a = [3; 5];
// Es equivalente a
let a = [3,3,3,3,3];
```

**Leer un arreglo**
Como normalmente se suele hacer, se puede acceder a un valor utilizando la variable y la posición del elemento `a[1]`. 

En el caso de intentar acceder a una posición fuera del arreglo, habrá un error en ejecución: `index out of bounds`. Rust no permite el acceso a una memoria inválida (por fuera de los límites del arreglo).
##### Sobre los `string`
Hay una característica básica a saber sobre el tipo `string`:
- Utilizar la [estructura nativa `String`](https://doc.rust-lang.org/std/string/struct.String.html) permite tener una cadena de texto de tamaño dinámico, por lo que su composición interna es un buffer que va creciendo a medida de que es necesario (excepto que se le indique el tamaño previamente). Además está codificada en UTF-8.
- Utilizar el tipo primitivo `&str` hará una referencia estática a la cadena de texto.
#### Sobre las referencias
Aunque la variable sea mutable, las referencias también son inmutables por defecto. Si un método precisa una referencia para modificarla, se deberá dar explícitamente como mutable:
```rust
let mut my_var = String::new();
std::io::stdin().read_line(&mut my_var); // referencia mutable
```
#### Shadowing
Cuando tenemos una variable de un tipo determinado y queremos usar esa misma variable con otro tipo, podemos utilizar `shadowing` para redefinir el tipo:
```rust
let myvar = String::new();

let myvar: u32 = myvar.trim().parse().expect("Not is number");
```

De esta forma, la variable pasa de `str` a `u32`.

Para ampliar, según el libro de Rust, se le dice de esta forma ya que la segunda declaración oculta a la primera y por lo tanto, es lo que el compilador "verá" cuando use el nombre del a variable.

Falta menciona una cuestión más sobre este tema y es el scope. Si la variable tiene un shadowing en un scope más bajo, eso no implica que cambie su valor en el scope general. Para ejemplificar dejo un ejemplo que saqué del libro.
```rust
fn main() {
    let x = 5;

    let x = x + 1; // valor 6

    {
        let x = x * 2; // valor 12
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}"); // valor 6
}

```

Dicho esto, el shadowing permite reutilizar el nombre de la variable, alternando el tipo de dato manteniendo la inmutabilidad.
### Constantes
Las constante son parecidas a las variables por defecto (inmutables). Sin embargo, las constantes siempre son inmutables lo que implica que sólo pueden tener una expresión constante, en otras palabras, no puede calcularse su valor en tiempo de ejecución. Además, Rust no hará la inferencia del tipo de dato, debe ser explícitamente declarado. La palabra reservada para declarar una constante es `const`. Un buen ejemplo es el siguiente
```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

Es importante aclarar que el compilador permite evaluar un conjunto limitado de operaciones en tiempo de compilación, lo que permite calcular el valor. Esto hace que sea más legible el código, de otra forma el valor sería `10800`. [Ver más](https://doc.rust-lang.org/reference/const_eval.html)
### Control de flujo
#### Match
Podemos realizar esta operación que en otros lenguajes también es llamada `switch`:
```rust
    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
        _ => println!("unused, default value")
    }
```
Es importante tener en cuenta que tanto `guess` como `secret_number` deben ser del mismo tipo. 

#### Expresión IF
Podemos ir directamente al ejemplo: 
```rust
if number < 5 {

} else if number > 5 {

} else {

}
```

La condición debe ser un `bool`, en caso contrario se obtendrá un error.

Al ser una expresión es posible usar en una asignación:
```rust
let number = if true { 5 } else { 6 }
```

#### Bucles
En tenemos 3 tipos de bucles `loop`, `while` y `for`.
##### loop
Es un bucle infinito que no se detiene hasta explícitamente indicarlo.
```rust
fn main() {
	let mut x = String::new();
	x = loop {
		std::io::stdin().read_line(&mut x).expect("error");
		if x == "hola" {
			break String::from("saludo");
		} else if x == "continue" {
			continue;
		}
		println!("No coincide ningún valor");
	};
	
	println!("Se consiguió el valor final {}", x);
}
```

El loop puede servir para reintentar un proceso.

Al anidar un bucle dentro de otro, las palabras `break` y `continue` afectan al bucle más próximo. Sin embargo, es posible finalizar un bucle principal que anida otro bucle interior etiquetándolo con una comilla simple seguido del nombre `'[name]`. Por ejemplo:
```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}

```
_Ejemplo extraído de Rust Book_
### Funciones
En Rust se suele usar por convención `snake_case` en funciones y nombres de variables. No hay orden para definir las funciones.
```rust
fn main() {
	saludar();
}

fn greet() {
	println!("Hola");
}
```

#### Parametros
Los parámetros de la función se establecen dentro de los parentesis, separados por coma. Cada parámetro debe tener declarado su tipo.

#### Sentencias y Expresiones
En este punto lo importante es que las sentencias no devuelven valores, en otras palabras, asignar un valor a una variable no hace que puedas asignar esa sentencia a otra sentencia. Esto está mal en Rust: `let x = (let y = 1);`

A diferencia de las sentencias, una expresión siempre devuelve un valor, llamar a una función es un valor, llamar a una macro es una expresión, un ámbito creado en llaves es una expresión:
```rust
let y = {
	let x = 3;
	x + 1
	 // las expresiones no poseen ; al final
	 // si la tiene, se convierte en una sentencia y
	 // entonces no devolverá el valor
}
```

Como menciono en el ejemplo, si la última linea (expresión) `x+1` terminara en un `;` lo que haría es que pase a ser una sentencia y por lo tanto no retornará un valor.

#### Funciones con valor de retorno
Para determinar qué valor retorna una función se pone una flecha `->` seguido con el tipo de dato a retornar. Esto es sinónimo de que el último bloque de la función deberá ser una expresión. Es importante mencionar que esto no quita la opción de utilizar la palabra reservada `return`.
```rust
fn five() -> i32 {
	5
}
```
_Ejemplo extraído de RustBook_

