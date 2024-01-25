import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import CustomError from "../services/errors/error.generator.js";
import { generateAuthorizationRolErrorInfo } from "../services/errors/info.js";

const authenticateMiddleware = (roles) => {

	return (req, res, next) => {
		const rol = req.user.rol;
		console.log("==> roles", roles, rol);
		if (req.user && rol) {
			if (!roles.includes(rol)) {
				CustomError.createError({
					name: ErrorsName.ROUTE_ACCESS,
					cause: generateAuthorizationRolErrorInfo(rol),
					message: ErrorsMessages.USER_UNAUTHORIZED,
					code: EErrors.FORBIDDEN
				});
			} else {
				next();
			}
		} else {
			return res.redirect("/api");
		}

	};
};

export default authenticateMiddleware;
