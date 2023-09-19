---
title: Rust
---
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
En Rust las variables son inmutables por defecto y posee inferencia de tipos. Estas  (para mi) son las principales características a tener en cuenta.
```rust
let apple = 5; // inmutable entero (i32)
let mut apple_mut = 6; // mutable entero (i32)
```
#### Sobre los `string`
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
