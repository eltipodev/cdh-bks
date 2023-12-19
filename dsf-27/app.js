
import "./src/config/mongo.config.js";
import "./src/config/passport.config.js";

// import { __dirname, cookieParser, exphbs, express, indexRouter, passport } from "./src/utils/import.utils.js";

import __dirname from "./src/utils/__dirname.utils.js";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import express from "express";
import indexRouter from "./src/routes/index.js";
import passport from "passport";
// import bodyParser from "body-parser";

const app = express();//[x] 5.1.1
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

