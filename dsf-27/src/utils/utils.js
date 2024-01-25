import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import { generateGetLoginErrorInfo, generateUserSignupEmptyErrorInfo, } from "../services/errors/info.js";
import CustomError from "../services/errors/error.generator.js";
import bcrypt from "bcrypt";
import config from "../config/env.config.js";
import jwt from "jsonwebtoken";
import { logger } from "./logger.js";
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
export const generateToken = (user, email = null) => {

	if (email) {

		return jwt.sign(email, KEYJWT);
	}

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
				const { firstName, lastName, user, email, password } = req.body;

				if (!user || !firstName || !lastName || !email || !password) {
					console.log("==> error", req.body);
					const errorJson = CustomError.createErrorJson({
						message: {
							name: `${ErrorsName.REGISTER_ERROR}`,
							cause: `${generateUserSignupEmptyErrorInfo()}`,
							message: `${ErrorsMessages.DATE_EMPTY}`,
							code: `${EErrors.BAD_REQUEST}`
						}
					});

					logger.error(errorJson);
					CustomError.createError({
						name: ErrorsName.REGISTER_ERROR,
						cause: generateUserSignupEmptyErrorInfo(),
						message: ErrorsMessages.DATE_EMPTY,
						code: EErrors.BAD_REQUEST
					});
				}

				console.log("==> todo ok", req.body);
				return next();
			}

			if (!user) {

				const errorJson = CustomError.createErrorJson({
					message: {
						name: `${ErrorsName.LOGIN_GET_ERROR}`,
						cause: `${generateGetLoginErrorInfo()}`,
						message: `${ErrorsMessages.INVALID_CREDENTIALS}`,
						code: `${EErrors.UNAUTHORIZED}`
					}
				});

				logger.error(errorJson);

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

export const verifyToken = (token) => {
	const secretKey = config.secret_jwt;

	try {
		const decoded = jwt.verify(token, secretKey);
		return decoded;
	} catch (error) {
		console.error("Error al verificar el token:", error.message);
		return null;
	}
};
