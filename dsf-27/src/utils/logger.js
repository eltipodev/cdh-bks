
import { createLogger, format, transports } from "winston";
import { DateTime } from "luxon";
const { combine, colorize, timestamp, printf } = format;
import config from "../config/env.config.js";

process.env.TZ = "America/Argentina/Buenos_Aires";

const customLevels = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		fatal: "red",
		error: "red",
		warning: "yellow",
		info: "green",
		debug: "HotPink"
	}
};

const myFormat = combine(
	colorize({ all: true }),
	timestamp({
		format: () => DateTime.now().toFormat("yyyy-mm-dd hh:mm:ss"),
	}),
	printf((info) => `[${info.level}] [${info.timestamp}] ${info.message}`)
);

const environment = config.environmentlogger || "dev";

export let logger;

if (environment == "dev") {
	logger = createLogger({

		levels: customLevels.levels,
		transports: [
			new transports.Console({
				level: "debug",
				format: combine(myFormat)

			})
		]
	});

} else if (environment == "prod") {
	logger = createLogger({
		levels: customLevels.levels,
		transports: [
			new transports.Console({
				level: "info",
				format: combine(myFormat)
			}),
			new transports.File({
				filename: "log-prod-error.log",
				level: "error",
				format: format.combine(
					format.timestamp(),
					format.prettyPrint())
			})
		]
	});

}

