
import { current, loginPassport, loginUser, logout, signupUser } from "../../controllers/users.controller.js";
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
	// failureRedirect: "/api/error"
}));

//////////////////////
/// Get  Profile  ///
////////////////////
router.get("/current", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER"]), current);

////////////////////
/// Get  Logout  ///
//////////////////
router.get("/logout", logout);

export default router;