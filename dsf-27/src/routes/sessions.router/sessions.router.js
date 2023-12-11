import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import passport from "passport";
import { sessions } from "../../controllers/sessions.controller.js";

const router = express.Router();

router.get("/current", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), sessions);

export default router;
