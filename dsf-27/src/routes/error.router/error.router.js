import { error } from "../../controllers/error.controller.js";
import express from "express";

const router = express.Router();

router.get("/", error);

export default router;