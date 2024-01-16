
import __dirname from "../utils/__dirname.utils.js";
import dotenv from "dotenv";
import { join } from "path";
import program from "../../commander.js";

const { environment, port } = program.opts();

dotenv.config({
	path: join(
		__dirname,
		environment === "test" ? "../.env.testing" :
			environment === "prod" ? "../.env.production.local" :
				environment === "cdh" ? "../.env" :
					environment === "dev" ? "../.env.development.local" :
						"../.env"
	)
});

const config = {
	admin_password: process.env.ADMIN_PASSWORD,
	admin_email: process.env.ADMIN_EMAIL,
	port: port || process.env.PORT,
	environment: process.env.ENVIRONMENT,
	environmentlogger: process.env.ENVIRONMENTLOGGER,
	mongo_uri: process.env.MONGO_INITDB_ROOT_USERNAME,
	mongo_initdb_root_password: process.env.MONGO_INITDB_ROOT_PASSWORD,
	mongo_initdb_root_database: process.env.MONGO_INITDB_ROOT_DATABASE,
	secret_jwt: process.env.SECRETJWT,
	github_client_id: process.env.GITHUB_CLIENT_ID,
	github_client_secret: process.env.GITHUB_CLIENT_SECRET,
	google_client_id: process.env.GOOGLE_CLIENT_ID,
	google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
	persistence: process.env.PERSISTENCE
};

export default config;