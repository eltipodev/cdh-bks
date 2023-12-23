import { cartModel } from "../DAL/models/cart.model.js";
import { v4 as uuidv4 } from "uuid";

export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	// [x]
	//////////////////////////////
	/// Método crear orden   ////
	////////////////////////////
	createOrder = async (order) => {
		const orderCreate = await this.dao.create(order);
		console.log("==> orderCreate", orderCreate);

		return orderCreate;
	};

	// [x]
	/////////////////////////////////
	/// Método efectuar pago    ////
	///////////////////////////////
	orderPay = async (cid, user) => {
		try {

			const cart = await cartModel
				.findById(cid)
				.populate("products.product");

			let products = cart.products;

			let stockAvailable = [];
			let stockUnAvailable = [];
			let totalAmount = 0;

			for (let i of products) {
				if (i.product.stock >= i.quantity) {
					i.product.stock -= i.quantity;
					await i.product.save();
					totalAmount += i.quantity * i.product.price;
					stockAvailable.push(i);
				} else {
					stockUnAvailable.push(i);
				}
			}

			cart.products = stockUnAvailable;

			await cart.save();

			if (stockAvailable.length) {
				const order = {
					code: uuidv4(),
					purchase_datetime: new Date(),
					amount: totalAmount,
					purchaser: user.email
				};

				const paymentStatusCompleted = await this.dao.createOrder(order);
				return { stockAvailable, totalAmount, paymentStatusCompleted };
			}

			return stockUnAvailable;

		} catch (error) {
			console.error("Error al procesar el pedido:", error);
		}
	};
}