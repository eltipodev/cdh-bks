import __dirname from "../utils/__dirname.utils.js";

import config from "../config/env.config.js";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import express from "express";

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

