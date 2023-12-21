/* eslint-disable no-case-declarations */
import { URI } from "../../config/mongo.config";
import config from "../../config/env.config.js";

export let Basic;
export let Order;
export let Products;
export let Carts;
export let User;

let connection;

switch (config.persistence) {
	case "MONGO":
		// eslint-disable-next-line no-unused-vars
		connection = URI;
		const { default: BasicMongo } = await import("../daos/mongo/carts.dao.js");
		const { default: orderManager } = await import("../daos/mongo/order.dao.js");
		const { default: ProductsManager } = await import("../daos/mongo/products.dao.js");
		const { default: CartsManager } = await import("../daos/mongo/carts.dao.js");
		const { default: userManager } = await import("../daos/mongo/user.dao.js");

		Basic = BasicMongo;
		Order = orderManager;
		Products = ProductsManager;
		Carts = CartsManager;
		User = userManager;

		break;
	default:
		console.log("Error no hay persistencia");
		break;
}

console.log("==> config.persistence", config.persistence);