import { compareData, generateToken } from "../utils/utils.js";
import { ExtractJwt } from "passport-jwt";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import cartsManager from "../daos/carts.dao.js";
import config from "./env.config.js";
import passport from "passport";
import { passportCrontol } from "../controllers/passport.controler.js";
import userManager from "../daos/users.dao.js";

const clientID = config.github_client_id;
const clientSecret = config.github_client_secret;
const callbackURL = "http://localhost:8080/api/auth/github/callback";

console.log("==> clientSecret", clientSecret);

///////////////////////////////
/// Passport Local Signup  ///
/////////////////////////////
passport.use("signup", new LocalStrategy({
	passReqToCallback: true,
	usernameField: "user"
}, passportCrontol));

//////////////////////////////
/// Passport Local Login  ///
////////////////////////////
passport.use("login", new LocalStrategy({
	usernameField: "user"
}, async (user, password, done) => {

	if (!user || !password) {
		return done(null, false, { message: "Usuario o Contraseña incorrecto" });
	}

	try {

		const userData = await userManager.findByUser(user);
		console.log("==> userData", userData);
		if (!userData) {
			return done(null, false, { message: "Usuario o Contraseña incorrecto" });
		}
		// const isValidPassword = password === userData.password;
		const isValidPassword = await compareData(password, userData.password);
		if (!isValidPassword) {
			return done(null, false, { message: "Usuario o Contraseña incorrecto" });
		}

		return done(null, userData, { message: "Usuario Creado" });

	} catch (error) {
		done(error, false, { message: "Error durante la autenticación" });
	}
}));

///////////////////////////////
/// Passport GitHub Login  ///
/////////////////////////////
passport.use("gitHub", new GitHubStrategy(({
	clientID: clientID,
	clientSecret: clientSecret,
	callbackURL: callbackURL
}),
	async (accessToken, refreshToken, profile, done) => {
		try {

			const userByDB = await userManager.findByUser(profile._json.login);

			// TODO: El token lo convierto aca o despues que lo recibo en el callback
			if (userByDB) {
				if (userByDB.isGitHub) {
					const token = generateToken(userByDB);

					return done(null, token);
				}
				else {
					return done(null, false);
				}
			}

			const addCart = await cartsManager.createCart();
			const infoUser = {
				user: profile._json.login,
				firstName: profile._json.name || "none",
				lastName: profile._json.name || "none",
				email: profile._json.email || "none",
				isGitHub: true,
				age: 0,
				cart: addCart.payload._id
			};

			const createUser = await userManager.creatOne(infoUser);

			const token = generateToken(createUser);

			done(null, token);

		} catch (error) {
			done(error);
		}
	}));

///////////////////////////
/// Passport JWT Login ///
///////////////////////////
const fromCookies = (req) => {
	console.log("==> req.cookies.name", req.cookies.name);
	return req.cookies.token;
};
passport.use(
	"jwt",
	new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
		secretOrKey: process.env.SECRETJWT
	},
		async (jwt_payload, done) => {
			try {
				console.log("==> jwt_payload.cookieName", jwt_payload);
				done(null, jwt_payload);
			}
			catch (error) {
				done(error, false);
			}
		}

	));

////////////////////////////////
/// Passport serializeUser  ///
//////////////////////////////
passport.serializeUser((user, done) => {
	done(null, user._id);
});

//////////////////////////////////
/// Passport deserializeUser  ///
////////////////////////////////
passport.deserializeUser(async (id, done) => {
	try {
		const user = await userManager.findById(id);
		return done(null, user);
	} catch (error) {
		done(error);
	}
});
