const isAuthenticatedGuard = async (to, from, next) => {

	return new Promise(() => {
		const isAdminp = true;
		if (isAdminp) {
			console.log("autentificado");
			next();
		} else {
			console.log("no autentificado");
			next({ name: "login" });
		}
	});
};

export default isAuthenticatedGuard;