import orderModel from "../models/order.model";

class OrderManager {
	async createOrder(order) {
		const orderCreate = await orderModel.create(order);
		return orderCreate;
	}
}

const orderManager = new OrderManager();
export default orderManager;