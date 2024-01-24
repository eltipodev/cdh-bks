import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import { cartsService, usersService } from "../services/index.services.js";
import CustomError from "../services/errors/error.generator.js";
import UserDto from "../DAL/dtos/users.dto.js";
import { generateToken } from "../utils/utils.js";
import { generateUserSignupErrorInfo } from "../services/errors/info.js";
import { logger } from "../utils/logger.js";
import { transporter } from "../utils/nodeMailer.js";

export const loginUser = (req, res) => {

	if (req.user && req.user.rol) {
		return res.redirect("/api/user/current");
	}

	try {

		return res.status(200).render("products", {
			pageTitle: "Login",
			message: "Ingresar al sitio",
			status: "sucess",
			user: req.user,
			sucess: true,
		});

	} catch (error) {

		return res.status(500).json(
			{
				error: error.message
			});
	}
};

export const signupUser = (req, res) => {
	if (req.user) {
		return res.redirect("/api/user/login");
	}

	try {
		return res.status(200).render("products", {
			pageTitle: "Signup",
			message: "registros de usuarios",
			user: "",
			status: "sucess",
			sucess: true,
		});
	} catch (error) {

		return res.status(500).json(
			{
				error: error.message
			});
	}
};

export const loginPassport = (req, res) => {
	try {

		const token = generateToken(req.user);

		res
			.cookie("token", token, { maxAge: 2 * 60 * 60 * 200, httpOnly: true })// 2 horas
			.redirect("/api/vista/products");

	} catch (error) {
		return res.status(500).json(
			{
				error: error.message
			});
	}

};

export const current = async (req, res) => {

	const userDto = new UserDto(req.user);
	const cartId = req.user.cart;

	const cartTotalQuantity = await cartsService.getCartTotalQuantity(cartId);

	try {

		return res.status(200).render("profile", {
			pageTitle: "Profile",
			message: "Profile User",
			userDto,
			cartTotalQuantity,
			user: { cart: cartId },
			status: "sucess",
			sucess: true,
		});

	} catch (error) {

		return res.status(500).json(
			{
				error: error.message
			});
	}
};

export const logout = (req, res) => {
	try {
		res.clearCookie("token");
		req.logout(() => {
			res.redirect("/api");
		});
	} catch (error) {

		return res.status(500).json({
			error: error.message
		});
	}
};

export const resetMsgPassword = async (req, res) => {

	const { email } = req.body;
	console.log("==> emailss", email);

	const isEmail = await usersService.findByEmail(email);

	if (!isEmail) {
		return (
			CustomError.createError({
				name: ErrorsName.REGISTER_ERROR,
				cause: generateUserSignupErrorInfo(email),
				message: ErrorsMessages.DATE_ALREADY_EXISTS,
				code: EErrors.BAD_REQUEST
			}));
	}

	try {

		const token = generateToken(email);

		const updateProductById = await usersService.updateById(email, token);

		if (!updateProductById) {
			return res.status(500).json({
				error: "error"
			});
		}

		const mailOptions = {
			from: "finquin",
			to: email,
			subject: "Prueba Nodemailer",
			html: `<h1>probando nodemailer</h1><h2><a href="http://localhost:8080/api/user/resetpass/${token}" > reset password<h2/> `
		};

		await transporter.sendMail(mailOptions);
		logger.info("==> Email restablecer contraseña enviado");

		return res.status(200).json({
			message: "send email"
		});

	} catch (error) {

		return res.status(500).json({
			error: error.message
		});
	}
};

export const resetMsgPasswordPage = async (req, res) => {
	const { tid } = req.params;
	console.log("==> tid", tid);

	return res.status(200).render("products", {
		pageTitle: "Reset Password",
		user: req.user || "",
		message: "Reset your Password",

	});
};

////////////////////////////////////////////////
/// PUT Actualizar un producto              ///
//////////////////////////////////////////////
// [x]
// export const updateUserById = async (req, res) => {

// 	const pid = req.params.pid;
// 	const body = req.body;

// 	try {

// 		const updateProductById = await productsService.updateById(pid, body);

// 		return res.status(updateProductById.code).json({
// 			pageTitle: "Productos",
// 			message: updateProductById.message,
// 			payload: updateProductById.payload,
// 			status: updateProductById.status,
// 		});

// 	} catch (error) {

// 		res.status(500).json({
// 			error: error.message
// 		});
// 	}
// };
