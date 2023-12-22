import { cartsService, ticketsService } from "../services/index.services.js";

///////////////////////////////////////
/// Método Vista crear ticket     ////
/////////////////////////////////////
export const createOrderView = async (req, res) => {
	const cid = req.params.cid;

	try {
		const getCartsById = await cartsService.findByCidView(cid);
		const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);
		let stockAvailable = await cartsService.findByPidStock(getCartsById);
		stockAvailable = { products: stockAvailable };

		return res.status(getCartsById.code).render("order", {
			pageTitle: "Order",
			user: req.user || "",
			message: getCartsById.message,
			cartTotalQuantity,
			payload: stockAvailable,
			status: getCartsById.status,
			sucess: getCartsById.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}

};

/////////////////////////////////
/// Método  crear ticket     ////
////////////////////////////////
export const createOrder = async (req, res) => {
	const cid = req.params.cid;
	const user = req.user;

	try {

		const cart = await cartsService.findByCidView(cid);
		let stockAvailable = await cartsService.findByPidStock(cart);

		stockAvailable = { products: stockAvailable };

		const orderPurchase = await ticketsService.orderPay(cid, user);

		return res.status(cart.code).json({
			pageTitle: "Order",
			user: req.user || "",
			message: cart.message,
			orderPurchase,
			payload: stockAvailable,
			status: cart.status,
			sucess: cart.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}

};