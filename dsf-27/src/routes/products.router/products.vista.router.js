import { findAllProductView, findByIdProductView } from "../../controllers/products.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import passport from "passport";

const router = express.Router();

////////////////////////////////////////////////
/// GET Lista todos los productos           ///
//////////////////////////////////////////////
router.get("/", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), findAllProductView);

////////////////////////////////////////////////
/// GET Lista  un producto por ID           ///
//////////////////////////////////////////////
router.get("/:pid", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), findByIdProductView);

export default router;

