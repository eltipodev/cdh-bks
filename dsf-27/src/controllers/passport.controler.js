import { createobj, hashPass, userNew } from "../services/passport.service.js";

export const passportCrontol = () => {
	async (req, user, password, done) => {

		const { firstName, lastName, email } = req.body;

		if (!firstName || !lastName || !email || !user || !password) {
			return done(null, false, { message: "Todos los campos tienen que estar completos" });
		}

		try {

			const addCart = await createobj();
			const hasHedPassword = await hashPass(password);
			// eslint-disable-next-line no-unused-vars

			const createUser = await userNew({
				...req.body, password: hasHedPassword, cart: addCart.payload._id
			});

			done(null, createUser, { message: "Usuario creado" });
		} catch (error) {
			done(error);
		}
	};
};