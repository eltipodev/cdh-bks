import authRouter from "./auth.router/auth.router.js";
import cartsRouter from "./carts.router/carts.router.js";
import cartsVistaRouter from "./carts.router/carts.vista.router.js";
import chatVistaRouter from "./chat.router/chat.router.js";
import errorRouter from "./error.router/error.router.js";
import express from "express";
import loggerRouter from "./logger.router/logger.router.js";
import mockingproductsRouter from "./mocking.products.router/mocking.products.router.js";
import productsRouter from "./products.router/products.router.js";
import productsVistaRouter from "./products.router/products.vista.router.js";

import userRouter from "./users.router/users.router.js";

const router = express.Router();

router.use("/vista/products", productsVistaRouter);
router.use("/vista/carts", cartsVistaRouter);
router.use("/vista/chat", chatVistaRouter);

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/error", errorRouter);

router.use("/mockingproducts", mockingproductsRouter);
router.use("/loggerTest", loggerRouter);

export default router;