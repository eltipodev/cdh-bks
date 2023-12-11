
import { loginPassport, loginUser, logout, profile, signupUser } from "../../controllers/users.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import { passportCall } from "../../utils/utils.js";
// import passport from "passport";
const router = express.Router();

////////////////////
/// Get  Login  ///
//////////////////
router.get("/login", loginUser);

////////////////////
/// Get  Signup ///
//////////////////
router.get("/signup", signupUser);

// [x]
//////////////////////////////
/// Post  Passport Login  ///
////////////////////////////
router.post("/login", passportCall("login", { session: false }
	// {
	// 	successRedirect: "/api/vista/products",
	// 	failureRedirect: "/api/error"
	// }
), loginPassport
);

//////////////////////////////
/// Post Passport Signup  ///
////////////////////////////
router.post("/signup", passportCall("signup", {
	session: false,
	successRedirect: "/api/user/login",
	failureRedirect: "/api/error"
}));

//////////////////////
/// Get  Profile  ///
////////////////////
router.get("/profile", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), profile);

////////////////////
/// Get  Logout  ///
//////////////////
router.get("/logout", logout);

export default router;