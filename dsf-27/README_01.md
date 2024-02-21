 TODO
[ ] Reparar actualizacion cuando se agrega un producto al
[ ] No actualiza user
# Guia

- El ```.env.example``` renombrar a  ```.env```
y rellenar con los campos que faltan
- npm i
- ```npm start:cdh``` o ```npm run start:cdh```
- La order creada en mongo se puede ver que se creo en la terminal
- Tomate, Frutilla, Pasas de Uvas tienen 0 stock para pruebas
- user: coderHouse pass: coderHouse rol: ADMIN
- Endopoints mockup http://localhost:8080/api/mockingproducts


# Formato

- **Link al repositorio de GitHub:** (Incluir aquí el enlace al repositorio sin la carpeta `node_modules`)

## Sugerencias

- Céntrate solo en los errores más comunes.
- Puedes revisar el documento de testing .

## Aspectos a incluir

### 1. Generar un módulo de Mocking para el servidor

- Crear un módulo que pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de MongoDB.
- Este comportamiento deberá ocurrir solo en un endpoint determinado, por ejemplo, `'/mockingproducts'`.

### 2. Customizador de errores y diccionario

- Crear un customizador de errores.
- Generar un diccionario para los errores más comunes al crear un producto, agregarlo al carrito, etc.

**Observación:** Incluye detalles adicionales o ejemplos específicos según sea necesario.
