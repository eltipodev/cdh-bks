# Guia

- El ```.env.example``` renombrar a  ```.env```
y rellenar con los campos que faltan
- npm i
- ```npm start:cdh``` o ```npm run start:cdh```


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
   - Modificar los permisos de modificación y eliminación de productos para que:
     - Un usuario PREMIUN solo pueda borrar los productos que le pertenecen.
     - El admin pueda borrar cualquier producto, incluso si es de un owner.

5. **Lógica del Carrito:**
   - Modificar la lógica del carrito para que un usuario PREMIUN NO pueda agregar a su carrito un producto que le pertenece.

6. **Nueva Ruta en API para Cambiar Rol:**
   - Implementar una nueva ruta en el router de api/users, la cual será `/api/users/PREMIUN/:uid`. Esta ruta permitirá cambiar el rol de un usuario de "user" a "PREMIUN" y viceversa.

