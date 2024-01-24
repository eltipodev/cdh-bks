import config from "../config/env.config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport(
	{
		service: "gmail ",
		auth: {

			user: config.nodeEmailer_User,
			pass: config.nodeEmailer_Password
		}

	});