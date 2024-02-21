
import { changePassword, current, formDocuments, loginPassport, loginUser, logout, premiunUser, premiunUserId, resetMsgPassword, resetMsgPasswordPage, saveUserDocuments, signupUser } from "../../controllers/users.controller.js";
import authenticateMiddleware from "../../middleware/authenticate.middleware.js";
import express from "express";
import passport from "passport";
import { passportCall } from "../../utils/utils.js";
import upload from "../../middleware/multer.middleware.js";
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

/////////////////////
/// Get  Premiun ///
///////////////////
router.get("/PREMIUN/:uid", passport.authenticate("jwt", { session: false }), premiunUser);

/////////////////////
/// Post  Premiun ///
///////////////////
router.post("/PREMIUN/:uid", passport.authenticate("jwt", { session: false }), premiunUserId);

////////////////////////////
/// Post Reset Password ///
//////////////////////////
router.get("/resetpass/:tid", resetMsgPasswordPage);

////////////////////////////
/// Post Reset Password ///
//////////////////////////
router.post("/resetpass", resetMsgPassword);

////////////////////////////
/// Post Reset Password ///
//////////////////////////
router.post("/changepass", changePassword);

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
router.get("/current", passportCall("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER", "PREMIUN"]), current);

////////////////////
/// Get  Logout  ///
//////////////////
router.get("/logout", passportCall("jwt", { session: false }), logout);

////////////////////////
/// Get  Documents  ///
//////////////////////
router.get("/:uid/documents", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER", "PREMIUN"]), formDocuments);

////////////////////////
/// Post  Documents  ///
//////////////////////
router.post("/:uid/documents", passport.authenticate("jwt", { session: false }), authenticateMiddleware(["ADMIN", "USER", "PREMIUN"]), upload.fields([
	{ name: "dni", maxCount: 1 },
	{ name: "address", maxCount: 1 },
	{ name: "bank", maxCount: 1 }
]), saveUserDocuments);

export default router;