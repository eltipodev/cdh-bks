import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import CustomError from "../services/errors/error.generator.js";
import bcrypt from "bcrypt";
import config from "../config/env.config.js";
import { generateUserSignupEmptyErrorInfo } from "../services/errors/info.js";
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

export const passportCall = (strategy, options) => {
	return (req, res, next) => {
		passport.authenticate(strategy, options, (err, user, info) => {

			if (err) {

				return next(err);
			}

			if (strategy === "signup") {
				const { firstName, lastName, user, email } = req.body;

				if (!user || !firstName || !lastName || !email || passport) {

					CustomError.createError({
						name: ErrorsName.REGISTER_ERROR,
						cause: generateUserSignupEmptyErrorInfo(),
						message: ErrorsMessages.DATE_EMPTY,
						code: EErrors.BAD_REQUEST
					});
				}

				return next();
			}

			if (!user) {

				CustomError.createError({
					name: ErrorsName.LOGIN_GET_ERROR,
					cause: info.cause,
					message: ErrorsMessages.INVALID_CREDENTIALS,
					code: EErrors.UNAUTHORIZED
				});
			}

			req.user = user;
			next();
		})(req, res, next);
	};
};

