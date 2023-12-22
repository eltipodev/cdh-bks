/* eslint-disable no-case-declarations */
import URI from "../../config/mongo.config.js";
import config from "../../config/env.config.js";
import mongoose from "mongoose";

export let Carts;
export let Products;
// export let Users;
// export let Order;

console.log("==> config.persistence ", config.persistence);

switch (config.persistence) {

	case "MONGO":
		// eslint-disable-next-line no-case-declarations, no-unused-vars
		const connection = mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const { default: CartsMongo } = await import("./mongo/carts.dao.js");
		const { default: ProductsMongo } = await import("./mongo/products.dao.js");
		// const { default: UsersMongo } = await import("./mongo/users.mongo.js");
		// const { default: OrderMongo } = await import("./mongo/order.mongo.js");

		Carts = CartsMongo;
		Products = ProductsMongo;
		// Users = UsersMongo;
		// Order = OrderMongo;
		break;

	default:
		console.log(" ==> No se suministro persistencia");
		break;
}