export const gitHubAuth = (req, res) => {

	const token = req.user;
	res.cookie("token", token, { maxAge: 11111000, secure: false, httpOnly: true });
	res.redirect("/api/vista/products");

};