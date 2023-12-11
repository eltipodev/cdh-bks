// Coneccion a mongoose
import config from "./env.config.js";
import mongoose from "mongoose";

const URI = `mongodb+srv://${config.mongo_uri}:${config.mongo_initdb_root_password}@cluster0.rnsfnkz.mongodb.net/${config.mongo_initdb_root_database}?retryWrites=true&w=majority`;

mongoose.connect(URI)
	.then(() => console.log("Conectado a mongoose"))
	.catch(err => console.log("==> error ", err));

export default URI;
