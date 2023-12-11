export const sessions = (req, res) => {

	if (!req.user) {
		return res.redirect("/api/user/login");
	}

	try {
		const userObject = {
			firstName: req.user.firstName,
			user: req.user.user,
			lastName: req.user.lastName,
			email: req.user.email,
			cart: req.user.cart || [],
			age: req.user.age || "",
			cookie: req.cookies.token,
			role: req.user.role || "USER"
		};

		return res.status(200).json({
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