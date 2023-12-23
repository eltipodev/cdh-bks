import orderModel from "../../models/order.model.js";
// import { ticketsService } from "../../../services/index.services.js";

class TicketMongo {
	constructor() {
	}

	async createOrder(order) {
		const orderCreate = await orderModel.create(order);
		console.log("==> orderCreate", orderCreate);

		return orderCreate;
	}
}

export default TicketMongo;