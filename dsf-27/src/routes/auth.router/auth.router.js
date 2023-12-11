import express from "express";
import { gitHubAuth } from "../../controllers/aut.controller.js";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("gitHub", { session: false, scope: ["user:email"] }));

router.get("/github/callback",
	passport.authenticate("gitHub",
		{
			session: false,
			// successRedirect: "/api/vista/products"
		}), gitHubAuth

);

export default router;
