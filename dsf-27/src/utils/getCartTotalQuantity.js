
import { findById as findByCidView } from "../services/carts.service.js";

const getCartTotalQuantity = async (cid) => {
	try {
		const getCartsById = await findByCidView(cid);

		// Verificar si getCartsById y getCartsById.payload están definidos
		if (getCartsById && getCartsById.payload && getCartsById.payload.products && Array.isArray(getCartsById.payload.products)) {

			if (getCartsById.payload.products.length > 0) {
				const cartTotalQuantity = getCartsById.payload.products.reduce((total, product) => {
					if (product.product && product.quantity) {
						return total + product.quantity;
					} else {
						return total;
					}
				}, 0);

				return cartTotalQuantity;
			} else {
				// Manejar el caso en el que no hay productos en el carrito
				return 0;
			}

		} else {
			// Manejar el caso en el que alguna propiedad está indefinida
			return 0;
		}

	} catch (error) {
		console.error("Error:", error);
		// Manejar el error según tus necesidades
		return 0;
	}
};

export default getCartTotalQuantity;