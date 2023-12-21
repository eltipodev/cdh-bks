# Guia

- El ```.env.development.local.example``` renombrar a  ```.env.development.local```
y rellenar con los campos que faltan
- npm i
- npm start:dev
- ruta current ```/api/user/current```
- La order creada en mongo se puede ver que se creo en la terminal
-


## ENTREGA DEL PROYECTO FINAL

### Se debe entregar:

- [x]  El DAO seleccionado (a través de un parámetro en línea de comandos, similar a la implementación anterior) será devuelto por una Factory para que la capa de negocio opere con él. (La Factory puede ser opcional)

- [ ] Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

- [x]  Modificar la ruta `/current` para evitar enviar información sensible. En su lugar, enviar un DTO del usuario con solo la información necesaria.

## Objetivos generales

- [x]  Profesionalizar el servidor

## Objetivos específicos

- [x]  Aplicar una arquitectura profesional para nuestro servidor
- [x]  Aplicar prácticas como patrones de diseño, mailing, variables de entorno, etc.

### Se debe entregar:

- [x]  Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.

- [ ]  Realizar un middleware que pueda trabajar en conjunto con la estrategia "current" para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
  - [x] Sólo el administrador puede crear, actualizar y eliminar productos.
  - [x] Sólo el usuario puede enviar mensajes al chat.
  - [x] Sólo el usuario puede agregar productos a su carrito.

### Se debe entregar:

- [x]  Crear un modelo Ticket que contará con todas las formalizaciones de la compra. Este contará con los campos:
  - [x] Id (autogenerado por mongo)
  - [x] code: String (autogenerado y único)
  - [x] purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
  - [x] amount: Number, total de la compra.
  - [x] purchaser: String, contendrá el correo del usuario asociado al carrito.

- [x]  Implementar, en el router de carts, la ruta `/:cid/purchase`, la cual permitirá finalizar el proceso de compra de dicho carrito.
  - [x] La compra debe corroborar el stock del producto al momento de finalizarse.
    - [x] Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
    - [x] Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.

### Se debe entregar:

- [x] Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra .
- [x] En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
- [x] Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener solo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

## Formato

- [x]  Link al repositorio de Github con el proyecto (sin node_modules)
- [x]  Además, archivo .env para poder correr el proyecto.

## Sugerencias

- [x]  Te recomendamos ver el vídeo explicativo disponible en la carpeta de clase.

