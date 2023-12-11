import { chat } from "../../controllers/chat.controller.js";
import express from "express";

const router = express.Router();

router.get("/", chat);

export default router;