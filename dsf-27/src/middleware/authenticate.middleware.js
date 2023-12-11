const authenticateMiddleware = (roles) => {
	return (req, res, next) => {

		if (req.user && req.user.role) {
			if (!roles.includes(req.user.role)) {
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
