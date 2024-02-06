import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import { cartsService, usersService } from "../services/index.services.js";
import { generateToken, hashData, verifyToken } from "../utils/utils.js";
import CustomError from "../services/errors/error.generator.js";
import UserDto from "../DAL/dtos/users.dto.js";
import bcrypt from "bcrypt";
import { generateUserSignupErrorInfo } from "../services/errors/info.js";
import { logger } from "../utils/logger.js";
import { transporter } from "../utils/nodeMailer.js";
import { userModel } from "../DAL/models/users.model.js";

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

		const token = generateToken(email, { expiresIn: "1h" });

		const obj1 = { email };
		const obj2 = { token };

		const updateProductById = await usersService.updateById(obj1, obj2);

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

	const decodedToken = verifyToken(tid);

	if (!decodedToken) {
		logger.error("Token inválido o expirado");
		return res.redirect("/api/login");
	}

	try {
		const findByToken = await userModel.findOne({ token: tid });

		if (!findByToken) {
			logger.error("Token no encontrado en la base de datos");
			return res.redirect("/api/login");
		}

		return res.status(200).render("reset", {
			pageTitle: "Reset Password",
			user: req.user || "",
			email: findByToken.email,
			message: "Reset your Password",
		});
	} catch (error) {
		logger.error("Error al buscar el token en la base de datos:", error);
		return res.redirect("/api/login");
	}
};

export const changePassword = async (req, res) => {

	const newPassword = req.body.password;
	const email = req.body.email;

	const findByEmail = await userModel.findOne({ email: email });

	const decripytPassword = await bcrypt.compare(findByEmail.password, newPassword);

	if (decripytPassword) {
		logger.error("No puede ser el mismo password");

		return res.status(400).send({
			message: "No puede ser el mismo password"
		});

	}

	const hashPass = await hashData(newPassword);

	const obj1 = { email };
	const obj2 = { password: hashPass, token: "" };

	const updatePassword = await usersService.updateById(obj1, obj2);

	if (updatePassword.status === "sucess") {
		return res.redirect("api/user/login");
	}

	return res.status(500).send({ message: "hubo un error" });

	// const decripytPassword = await bcrypt.compare(inputPassword, user.password);

	// if (vefiredPass) {
	// 	// La contraseña es correcta
	// 	console.log("La contraseña es correcta");
	// } else {
	// 	// El usuario no existe o la contraseña es incorrecta
	// 	console.log("El usuario no existe o la contraseña es incorrecta");
	// }

	// const { tid } = req.params;

	// const decodedToken = verifyToken(tid);

	// if (!decodedToken) {
	// 	return res.status(500).json({
	// 		message: "Token error",

	// 	});
	// }

	// return res.status(200).render("products", {
	// 	pageTitle: "Reset Password",
	// 	user: req.user || "",
	// 	message: "Reset your Password",

	// });

};

export const premiunUser = async (req, res) => {
	const { uid } = req.params;
	try {
		return res.status(200).render("premiun", {
			pageTitle: "Premiun",
			user: uid,
			message: "Premiun",
		});

	} catch (error) {

		return res.redirect("/api/login");
	}

};

export const premiunUserId = async (req, res) => {
	const { uid } = req.params;
	const { rol } = req.body;

	const findUser = await usersService.findById(uid);

	if (!findUser) {
		return res.status(200).json({
			sucess: "error",
			message: "no existe el usuario",
		});
	}

	try {
		const obj1 = {
			_id: uid
		};
		const obj2 = {
			rol: rol
		};

		// eslint-disable-next-line no-unused-vars
		const updateByOwrn = await usersService.updateById(obj1, obj2);

		return res.status(200).json({
			sucess: "ok",
			message: "change rol",
		});

	} catch (error) {
		logger.error("Error al cambiar rol", error);
		return res.redirect("/api/login");
	}

};
