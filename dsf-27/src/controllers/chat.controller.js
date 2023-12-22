// import { getCartTotalQuantity } from "../services/carts.service.js";
import { cartsService } from "../services/index.services.js";

export const chat = async (req, res) => {

	const cid = req.user.cart;

	const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

	return res.status(200).render("chat", {
		pageTitle: "Chat",
		user: req.user || "",
		cartTotalQuantity
	});
};