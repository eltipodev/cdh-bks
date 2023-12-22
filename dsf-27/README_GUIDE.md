TODO
[ ] Ver tengo todos los productos con stock pero al comprar devuelve productos sin stock de compra anterior
[ ] Ver tema del ticket que no esta en funcionamiento eb repository

# Guia
## eltipodev
1. .env.example eliminar el .example y completar los valores
2. ``npm install``
3. Iniciar con ``npm run start:dev``
4. Estructura de carpetas :

**1.** Files
   - **5.1** `app.js`:
     - **5.1.1** ```const app = express()```: Creamos una instancia del servidor web utilizando el framework *Express.js*, ```app``` se convierte en el **objeto** que representa la aplicación web.
     - **5.1.2** ```app.use(express.json())```: Es un **middleware** integrado en *Express.js* que se utiliza para analizar el cuerpo de las solicitudes entrantes con formato ```JSON```.
     -



app.use(cookieParser("SecretCookie"));

app.use(express.urlencoded({ extended: true }));// 5.2.2
app.use(express.static(__dirname + "/public"));// 5.2.3

**5.** Files
   - **5.1** `server.js` :
        - Iniciamos nuestro servidor
        - importamos los archivos app.js
   - **5.2** `app.js`:
  		- **5.2.1** `app.use(express.json())` :**Middleware** se utiliza para analizar el cuerpo de las solicitudes **HTTP** con formato **JSON**. Permite que la aplicación web pueda recibir datos en formato **JSON** en las solicitudes **POST** o **PUT**
  		- **5.2.2** `app.use(express.urlencoded({ extended: true }))` : **Middleware** se utiliza para analizar el cuerpo de las solicitudes **HTTP** con formato de formulario.Analiza los datos del formulario y los convierte en un objeto **JavaScript** para utilizar en tu código. El ``{ extended: true }`` permite el análisis de datos más complejos, como arreglos y objetos anidados.
  		- **5.2.3** `app.use(express.static(__dirname + "/public"))` : **Middleware** de **Express** utilizado para servir *archivos estáticos*. Toma como argumento la *ruta absoluta* al directorio que contiene los *archivos estáticos*  que deseas servir.
  		- **5.2.4** `app.engine("handlebars", engine())` : Configuramos el motor de vistas de la aplicación para que use **Handlebars**.
  		- **5.2.5** ``app.set("views", __dirname + "/views")``: Establecemos la ubicación de las vistas.
  		- **5.2.6** ``app.set("view engine", "handlebars")``: Establecemos el motor de vistas predeterminado para la aplicación como **Handlebars**.
  		- **5.2.7** ``app.use("/api", indexRouter)``: Configuramos un **middleware**. extablecemos el enrutador llamado **indexRouter** en la ruta **/api**.Todas este es nuestro ruta principal con eñ prefijo */api*.

**6.** *src*
   - **6.1** `_dirname.js` : Es una *variable global* que representa el *directorio actual* del archivo en el que se encuentra. Se utiliza para construir la *ruta completa* al directorio de archivos estáticos.
   - **6.2** `app.js`:




⊠ Proyect
├❏ scr
│├❏ css
│├⊠ routes
││├❏ carts.routes
││├❏ products.routes
││└❏ index.js
│├❏ views
│├❏ img
│└❏ js
├❏ .env
├❏ .env.example
├❏ .eslintrc.json
├❏ .stylelintrc.json
├❏ package.json
├❏ app.js
└❏ server.js

1. Endoinponts

	`api/json/products/up` :
     - endpoints sin metodos para probar funcionamiento de la ruta

	`api/json/products` :
     - Endpoints que realiza el metodo getAllProducts
     - Devuelve un listado de productos
     - O un arreglo vacio
     -
	`api/json/products?limit=1` :
     - Endpoints que usa el metodo getAllProducts
     - Devuelve un listado de productos por el valor del limite ingresado

2. Endpoint 1: GET /api/products

	``api/up`` :

	`api/products/up` :
   	- endpoints sin metodos para probar funcionamiento de la ruta

	`api/cards/up`:
   	- endpoints sin metodos para probar funcionamiento de la ruta

3. Metodos

``getAllProducts``:

   - *Descripción*: Este método se encarga de proporcionar información sobre los productos almacenados en la base de datos.

  - *Respuesta Exitosa*: Si existen productos almacenados, se devolverá una lista con la información de los productos.

  - *Respuesta Vacía*: Si no hay productos almacenados, la respuesta será un arreglo vacío [].

  - *Endpoint que Utilizan el Metodo*:
	 - GET /api/products


TODO: revisar la explicacin del metodo

``addProducts``:

   - *Descripción*: Este método se encarga de agregar nuevos productos

  - *Respuesta Exitosa*: Si existen productos almacenados, se devolverá una lista con la información de los productos.

  - *Respuesta Erronea*: Si se encuentra que el codigo suministrado ya esta en nuestro registro de productos almacenados,la respuesta sera un mensaje indicando el mismo

  - *Endpoint que Utilizan el Metodo*:
	 - POST /api/products

``fileExists``:

   - *Descripción*: Este método se encarga de agregar nuevos productos

  - *Respuesta Exitosa*: Si existen productos almacenados, se devolverá una lista con la información de los productos.

  - *Respuesta Erronea*: Si se encuentra que el codigo suministrado ya esta en nuestro registro de productos almacenados,la respuesta sera un mensaje indicando el mismo

  - *Endpoint que Utilizan el Metodo*:
	 - POST /api/products








