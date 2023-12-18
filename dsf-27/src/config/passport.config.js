import { compareData, generateToken, hashData } from "../utils/utils.js";
import { ExtractJwt } from "passport-jwt";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import cartsManager from "../daos/carts.dao.js";
import config from "./env.config.js";
import passport from "passport";
import userManager from "../daos/users.dao.js";

const clientIdGoogle = config.google_client_id;
const clientSecretGoogle = config.google_client_secret;
const callbackURLGoogle = `http://localhost:${config.port}/api/auth/google/callback`;
const keyJWT = config.secret_jwt;

const clientID = config.github_client_id;
const clientSecret = config.github_client_secret;
const callbackURL = `http://localhost:${config.port}/api/auth/github/callback`;

///////////////////////////////
/// Passport Local Signup  ///
/////////////////////////////
passport.use("signup", new LocalStrategy({
	passReqToCallback: true,
	usernameField: "user"
}, async (req, user, password, done) => {

	const { firstName, lastName, email } = req.body;

	if (!firstName || !lastName || !email || !user || !password) {
		return done(null, false, { message: "Todos los campos tienen que estar completos" });
	}
	const isUser = await userManager.findByUser(user);
	const isEmail = await userManager.findByEmail(email);

	if (isUser || isEmail) {
		return done(null, false, { message: "Usuario se encuentra registrado" });
	}

	try {

		const addCart = await cartsManager.createCart();
		const hasHedPassword = await hashData(password);
		// eslint-disable-next-line no-unused-vars
		const createUser = await userManager.creatOne({
			...req.body, password: hasHedPassword, cart: addCart.payload._id
		});
		done(null, createUser, { message: "Usuario creado" });
	} catch (error) {
		done(error);
	}
}));

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
///////////////////////////////
/// Passport Google Login  ///
/////////////////////////////
passport.use("google", new GoogleStrategy(
	{
		clientID: clientIdGoogle,
		clientSecret: clientSecretGoogle,
		callbackURL: callbackURLGoogle
	}, async function (accessToken, refreshToken, profile, done) {
		try {

			const userByDB = await userManager.findByUser(profile._json.login);

			if (userByDB) {
				if (userByDB.isGoogle) {
					const token = generateToken(userByDB);

					return done(null, token);
				}
				else {
					return done(null, false);
				}
			}

			const addCart = await cartsManager.createCart();
			const infoUser = {
				user: profile._json.given_name || "none",
				firstName: profile._json.family_name || "none",
				lastName: profile._json.name || "none",
				email: profile._json.email || "none",
				isGoogle: true,
				age: 0,
				cart: addCart.payload._id
			};

			const createUser = await userManager.creatOne(infoUser);

			const token = generateToken(createUser);

			done(null, token);

		} catch (error) {
			done(error);
		}
	}
)
);

///////////////////////////
/// Passport JWT Login ///
///////////////////////////
const fromCookies = (req) => {
	return req.cookies.token;
};
passport.use(
	"jwt",
	new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
		secretOrKey: keyJWT
	},
		async (jwt_payload, done) => {
			try {

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
