import { generateToken } from "../utils/utils.js";

export const loginUser = (req, res) => {
	if (req.user && req.user.rol) {
		return res.redirect("/api/user/profile");
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

		return res.redirect("/api/user/profile");
	}

	try {

		return res.status(200).render("products", {
			pageTitle: "Signup",
			message: "registros de usuarios",
			user: req.user || "",
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

	const token = generateToken(req.user);

	res
		.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })// 2 horas
		.redirect("/api/vista/products");
};

export const profile = (req, res) => {

	try {
		const userObject = {
			firstName: req.user.firstName,
			user: req.user.user,
			age: req.user.age,
			lastName: req.user.lastName,
			email: req.user.email,
			rol: req.user.rol || "USER",
		};

		return res.status(200).render("profile", {
			pageTitle: "Profile",
			message: "Profile User",
			user: userObject,
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

		res.redirect("/api");
	} catch (error) {
		return res.status(500).json({
			error: error.message
		});
	}
};