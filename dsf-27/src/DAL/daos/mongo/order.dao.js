import orderModel from "../../models/order.model.js";

class OrderMongo {

	async createOrder(order) {
		const orderCreate = await orderModel.create(order);
		console.log("==> orderCreate", orderCreate);

		return orderCreate;
	}
}

const orderMongo = new OrderMongo();
export default orderMongo;