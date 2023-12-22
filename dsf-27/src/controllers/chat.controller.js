import { getCartTotalQuantity } from "../services/carts.service.js";

export const chat = async (req, res) => {

	const cid = req.user.cart;

	const cartTotalQuantity = await getCartTotalQuantity(cid);

	return res.status(200).render("chat", {
		pageTitle: "Chat",
		user: req.user || "",
		cartTotalQuantity
	});
};