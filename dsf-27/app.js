
// import "./src/config/mongo.config.js";
import "./src/config/passport.config.js";
import "./src/DAL/daos/factory.js";
import __dirname from "./src/utils/__dirname.utils.js";
import config from "./src/config/env.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { __dirname, cookieParser, exphbs, express, indexRouter, passport } from "./src/utils/import.utils.js";
import errosMiddleware from "./src/middleware/erros.middleware.js";
import exphbs from "express-handlebars";
import express from "express";
import indexRouter from "./src/routes/index.js";
import passport from "passport";

const WHITELIST = config.whitelist_url_frontEnd;

// eslint-disable-next-line no-unused-vars
const corsOptions = {
	origin: function (origin, callback) {
		if (WHITELIST.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Cors Error"));
		}
	},
	credentials: true
};

const app = express();//[x] 5.1.1
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());//[x] 5.1.2
app.use(express.urlencoded({ extended: true }));// 5.2.2
app.use(cookieParser("SecretCookie"));
app.use(express.static(__dirname + "/public"));// 5.2.3

app.use(passport.initialize());
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));// 5.2.4
app.set("views", __dirname + "/views");// 5.2.5
app.set("view engine", ".hbs");// 5.2.6
app.use("/api", indexRouter);// 5.2.7

app.use("*", (req, res) => {
	if (req.user) {
		return res.redirect("/api/user/current");
	}
	res.status(200).render("products", {
		pageTitle: "Login",
		message: "Ingresar al sitio",
		status: "sucess",
		sucess: true,
	});
});

app.use(errosMiddleware);

// Registra el helper "eq"
const hbs = exphbs.create({});

// eslint-disable-next-line no-unused-vars
let total = 0;
let totalDes = 0;

hbs.handlebars.registerHelper({
	eq: (a, b) => a === b,
	multiply: (a, b) => a * b,
	multTotaly: (a, b, stockAvailable) => {
		const result = a * b;
		total += result;

		if (stockAvailable === true) {
			const resultDes = a * b;
			totalDes += resultDes;
		}

		return result.toFixed(2);
	},
	getTotal: () => totalDes.toFixed(2),
	totalReset: () => {
		total = 0;
		totalDes = 0;
	}
});

// app.use((err, req, res, next) => {
// 	res.status(500).render("error", { error: err.message });
// });

export default app;

