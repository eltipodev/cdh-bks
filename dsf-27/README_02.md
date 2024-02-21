# Guia

- El ```.env.example``` renombrar a  ```.env```
y rellenar con los campos que faltan
- npm i
- ```npm start:cdh``` o ```npm run start:cdh```

# USUARIOS CREADOS

- user: PREMIUN  password: PREMIUN
- user: ADMIN  password: ADMIN

# PRODUCTOS CON OWNER

- El nombre el title y el owner del producto dice  "PREMIUN" y su imagen es una sandia para distinguirlos mejor

# Algunos codigos de PRODUCTOS PREMIUN

- PREMIUN
  - 65b2d6856ea78a087d3ef46f
  - 65b2d6826ea78a087d3ef46c
  - 65b2d67f6ea78a087d3ef469
  - 65b2d6726ea78a087d3ef465
  - 65b2d66e6ea78a087d3ef462


# PRODUCTOS CON OWNER ADMIN

- El nombre el title y el owner del producto dice  "ADMIN" y su imagen es un tomate para distinguirlos mejor
-
- ADMIN
  - 65b2d7d06ea78a087d3ef48
  - 65b2d7ff6ea78a087d3ef491
  - 65b2d8106ea78a087d3ef494
  - 65b2d81f6ea78a087d3ef497




## Consigna

Con base en el proyecto que venimos desarrollando, toca solidificar algunos procesos.

### Aspectos a Incluir

1. **Recuperación de Contraseña:**
  [x] - Realizar un sistema de recuperación de contraseña.
  [x] - El sistema debe enviar un correo con un enlace a una página para restablecer la contraseña (no recuperarla).
  [x] - El enlace del correo debe expirar después de 1 hora de enviado.
  [x] - Si se intenta restablecer la contraseña con la misma contraseña del usuario, debe impedirlo e indicar que no se puede colocar la misma contraseña.
  [x] - Si el enlace expira, redirigir a una vista que permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora.

2. **Nuevo Rol "PREMIUN" para Usuario:**
  [x] - Establecer un nuevo rol para el schema del usuario llamado "PREMIUN", el cual estará habilitado también para crear productos.

3. **Modificación del Schema de Producto:**
  [x] - Modificar el schema de producto para contar con un campo "owner", el cual haga referencia a la persona que creó el producto.
  [x] - Si un producto se crea sin owner, se debe colocar por defecto "admin".
  [x] - El campo owner deberá guardar solo el correo electrónico (o _id, a tu conveniencia) del usuario que lo haya creado (solo usuarios PREMIUN pueden ser owners).

4. **Modificación de Permisos de Productos:**
    [x] - Modificar los permisos de modificación y eliminación de productos para que:
    [x] - Un usuario PREMIUN solo pueda borrar los productos que le pertenecen.
    [x] - El admin pueda borrar cualquier producto, incluso si es de un owner.

5. **Lógica del Carrito:**
   - Modificar la lógica del carrito para que un usuario PREMIUN NO pueda agregar a su carrito un producto que le pertenece.

6. **Nueva Ruta en API para Cambiar Rol:**
   [x] - Implementar una nueva ruta en el router de api/users, la cual será `/api/users/PREMIUN/:uid`. Esta ruta permitirá cambiar el rol de un usuario de "user" a "PREMIUN" y viceversa.

