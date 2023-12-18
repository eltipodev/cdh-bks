
import { createOrder, findAllCartView, findByIdCartView } from "../../controllers/carts.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import { passportCall } from "../../utils/utils.js";
const router = express.Router();

// [x];
////////////////////////////////////////////////
/// GET Listar todos los  Carrito           ///
//////////////////////////////////////////////
router.get("/", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN"]), findAllCartView);

// [x];
////////////////////////////////////////////////
/// GET Listar Carro por Id                 ///
//////////////////////////////////////////////
router.get("/:cid", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), findByIdCartView);

// [x];
////////////////////////////
/// GET Order          ///
//////////////////////////
router.get("/:cid/purchase", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), createOrder);

export default router;