
import { addByProductCart, createCart, deleteAllCarts, deleteByIdProductCart, findAllCarts, findByIdCart, updateByBodyCart, updateByCartPids } from "../../controllers/carts.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import { createOrder } from "../../controllers/ticket.controller.js";
import express from "express";
import { passportCall } from "../../utils/utils.js";
const router = express.Router();

// [x];
////////////////////////////////////////////////
/// GET Listar todos los  Carrito           ///
//////////////////////////////////////////////
router.get("/", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN"]), findAllCarts);

// [x];
////////////////////////////////////////////////
/// GET Listar Carro por Id                 ///
//////////////////////////////////////////////
router.get("/:cid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), findByIdCart);

//[x]
////////////////////////////////////////////////
/// POST para agregar Carrito               ///
//////////////////////////////////////////////
router.post("/", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), createCart);

//[x]
////////////////////////////////////////////////
/// POST agregar un Producto a l Carrito    ///
//////////////////////////////////////////////
router.post("/:cid/products/:pid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), addByProductCart);

//[x]
////////////////////////////////////////////////
/// DELETE Eliminar un Producto del Carrito ///
//////////////////////////////////////////////
router.delete("/:cid/products/:pid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), deleteByIdProductCart);

////////////////////////////////////////////////
/// DELETE todos los productos de un carrito///
//////////////////////////////////////////////
router.delete("/:cid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), deleteAllCarts);

//[x]
/////////////////////////////////////////////////////
/// PUT para actualizar el carrito con un arreglo///
///////////////////////////////////////////////////
router.put("/:cid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), updateByCartPids);

//[x]
/////////////////////////////////////////////////////
/// PUT para actualizar cantidad por body        ///
///////////////////////////////////////////////////
router.put("/:cid/products/:pid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN"]), updateByBodyCart);

// [x];
////////////////////////////
/// GET ejecutar Order  ///
//////////////////////////
router.get("/:cid/purchase", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), createOrder);

export default router;