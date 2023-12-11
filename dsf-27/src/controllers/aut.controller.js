export const gitHubAuth = (req, res) => {

	const token = req.user;
	res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
	res.redirect("/api/vista/products");

};