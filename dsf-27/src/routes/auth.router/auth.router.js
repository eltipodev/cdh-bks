import express from "express";
import { gitHubAuth } from "../../controllers/aut.controller.js";
import passport from "passport";

const router = express.Router();

/////////////////////////
/// EndPoint GitHub  ///
///////////////////////
router.get("/github", passport.authenticate("gitHub", { session: false, scope: ["user:email"] }));

//////////////////////////////////
/// EndPoint GitHub callback  ///
////////////////////////////////
router.get("/github/callback",
	passport.authenticate("gitHub",
		{
			session: false,
			// successRedirect: "/api/vista/products"
		}), gitHubAuth

);

/////////////////////////
/// EndPoint Google  ///
///////////////////////
router.get("/google", passport.authenticate("google", { session: false, scope: ["profile", "email"] }));

//////////////////////////////////
/// EndPoint Google callback  ///
////////////////////////////////
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/error" }), (req, res) => {
	res.redirect("/api/vista/products");
});

export default router;
