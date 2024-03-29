import { addProduct, deleteByIdProduct, findAllProduct, findByIdProduct, updateProductById } from "../../controllers/products.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import passport from "passport";
const router = express.Router();

/////////////////////////////////////////
/// GET Lista todos los productos     ///
////////////////////////////////////////
router.get("/", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER", "PREMIUN"]), findAllProduct);

/////////////////////////////////////////
/// POST para agregar producto       ///
///////////////////////////////////////
router.post("/", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "PREMIUN"]), addProduct);

/////////////////////////////////////
/// DELETE eliminar un producto   ///
////////////////////////////////////
router.delete("/:pid", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "PREMIUN"]), deleteByIdProduct);

////////////////////////////////////
/// PUT Actualizar un producto  ///
//////////////////////////////////
router.put("/:pid", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "PREMIUN"]), updateProductById);

///////////////////////////////////////
/// GET Lista  un producto por ID  ///
/////////////////////////////////////
router.get("/:pid", findByIdProduct);

export default router;