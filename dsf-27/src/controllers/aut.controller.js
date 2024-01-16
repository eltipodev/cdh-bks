export const gitHubAuth = (req, res) => {

	const token = req.user;
	res.cookie("token", token, { maxAge: 11111000, httpOnly: true });
	res.redirect("/api/vista/products");

};