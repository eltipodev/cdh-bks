import bcrypt from "bcrypt";
import config from "../config/env.config.js";
import jwt from "jsonwebtoken";
import passport from "passport";

const KEYJWT = config.secret_jwt;

////////////////
/// Bcrypt  ///
//////////////
export const hashData = async (data) => {
	return bcrypt.hash(data, 10);
};
export const compareData = async (data, hashData) => {
	return bcrypt.compare(data, hashData);
};

/////////////
/// JWT  ///
///////////
export const generateToken = (user) => {
	const payload = {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		user: user.user,
		age: user.age,
		password: user.password,
		isGitHub: user.isGitHub,
		rol: user.rol,
		cart: user.cart,

	};
	return jwt.sign(payload, KEYJWT);
};

/////////////////////
/// passportCall ///
///////////////////
export const passportCall = (strategy) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, function (err, user, info) {
			if (err) return next(err);
			if (!user) {

				return res.status(401).send({
					error: info.message ? info.message : info.toString()
				});
			}
			req.user = user;
			next();
		})(req, res, next);
	};
};
