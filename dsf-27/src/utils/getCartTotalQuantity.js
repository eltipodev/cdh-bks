
import { findById as findByCidView } from "../services/carts.service.js";

const getCartTotalQuantity = async (cid) => {
	try {
		const getCartsById = await findByCidView(cid);

		if (getCartsById && getCartsById.payload && getCartsById.payload.products && Array.isArray(getCartsById.payload.products)) {

			if (getCartsById.payload.products.length > 0) {

				const cartTotals = getCartsById.payload.products.reduce((totals, product) => {
					if (product.product && product.quantity && product.product.price) {
						totals.quantity += product.quantity;
						totals.totalPrice += product.quantity * product.product.price;
					}

					return totals;

				}, { quantity: 0, totalPrice: 0 });

				cartTotals.totalPrice = Number(cartTotals.totalPrice.toFixed(2));
				return cartTotals;

			} else {
				return { quantity: 0, totalPrice: 0 };
			}

		} else {
			return { quantity: 0, totalPrice: 0 };
		}

	} catch (error) {
		console.error("Error:", error);

		return 0;
	}
};

export default getCartTotalQuantity;