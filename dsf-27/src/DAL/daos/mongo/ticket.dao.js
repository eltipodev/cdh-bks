import orderModel from "../../models/order.model.js";

class TicketMongo {

	async createOrder(order) {
		const orderCreate = await orderModel.create(order);
		console.log("==> orderCreate", orderCreate);

		return orderCreate;
	}
}

export default TicketMongo;