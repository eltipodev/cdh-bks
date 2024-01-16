// Coneccion a mongoose
import config from "./env.config.js";
import { logger } from "../utils/logger.js";
import mongoose from "mongoose";

const URI = `mongodb+srv://${config.mongo_uri}:${config.mongo_initdb_root_password}@cluster0.rnsfnkz.mongodb.net/${config.mongo_initdb_root_database}?retryWrites=true&w=majority`;

mongoose.connect(URI)
	.then(() => logger.info("Conectado a mongoose"))
	.catch(err => logger.error("==> error ", err));

export default URI;
