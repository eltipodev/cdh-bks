import orderModel from "../models/order.model.js";

class OrderManager {

	async createOrder(order) {
		const orderCreate = await orderModel.create(order);
		console.log("==> orderCreate", orderCreate);

		return orderCreate;
	}
}

const orderManager = new OrderManager();
export default orderManager;