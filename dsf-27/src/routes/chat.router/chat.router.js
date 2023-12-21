import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import { chat } from "../../controllers/chat.controller.js";
import express from "express";
import { passportCall } from "../../utils/utils.js";

const router = express.Router();

router.get("/", passportCall("jwt", { session: false }), authenticateMiddleware(["USER"]), chat);
export default router;