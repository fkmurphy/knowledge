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
- LSP de Rust (rust-analyzer).