import express from "express";
import { logger } from "../../utils/logger.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		logger.fatal("Fatal error");
		logger.error("loggerTest");
		logger.warning("loggerTest");
		logger.info("loggerTest");
		logger.http("loggerTest");
		logger.debug("loggerTest");

		res.send({ status: "success", message: "Probando loggers" });
	} catch (error) {
		console.error("==> error", error);
		res.status(500).send({ status: "error", message: "Error interno del servidor" });
	}
});

export default router;

