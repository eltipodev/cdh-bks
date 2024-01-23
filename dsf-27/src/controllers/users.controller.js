import UserDto from "../DAL/dtos/users.dto.js";
import { cartsService } from "../services/index.services.js";
import { generateToken } from "../utils/utils.js";

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