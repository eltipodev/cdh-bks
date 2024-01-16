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