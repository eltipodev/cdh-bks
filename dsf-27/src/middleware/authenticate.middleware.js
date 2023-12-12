const authenticateMiddleware = (roles) => {
	return (req, res, next) => {

		if (req.user && req.user.rol) {
			if (!roles.includes(req.user.rol)) {
				return res.status(403).json("No autorizado");
			} else {
				next();
			}
		} else {
			return res.redirect("/api");
		}

	};
};

export default authenticateMiddleware;
