
import { createLogger, format, transports } from "winston";
const { combine, colorize, timestamp, printf, simple } = format;

import { config } from "dotenv";

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
		fatal: "bold red",
		error: "bold red",
		warning: "bold yellow",
		info: "bold green",
		debug: "bold HotPink"
	}
};
const myFormat = combine(
	colorize({ all: true }),
	timestamp({ format: "YY-MM-DD HH:MM:SS" }),
	printf((info) => `[${info.level}] - ${info.message} - [${info.timestamp}]`)
);

const environment = config.ENVIRONMENTLOGGER || "dev";

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
				format: combine(
					colorize({ colors: customLevels.colors }),
					simple()
				)
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

