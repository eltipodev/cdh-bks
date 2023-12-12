// export { userModel } from "../models/users.model.js";
// export { productModel } from "../models/products.model.js";
// export { cartModel } from "../models/cart.model.js";
// export { mongoose } from "mongoose";
// export { config } from "../config/env.config.js";
// export { app } from "../../app.js";

// import bodyParser from "body-parser";

import __dirname from "../utils/__dirname.utils.js";

import config from "../config/env.config.js";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import express from "express";
// import { gitHubAuth } from "../controllers/aut.controller.js";
import indexRouter from "../routes/index.js";
import passport from "passport";

export {
	express,
	passport,
	cookieParser,
	__dirname,
	indexRouter,
	exphbs,
	config,

};

