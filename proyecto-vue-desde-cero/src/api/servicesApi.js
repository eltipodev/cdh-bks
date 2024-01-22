import api from "@/lib/axios";

export default {
	async allProducts() {
		try {
			const response = await api.get("/products");
			// console.log("==> allProducts response:", response);
			return response.data;
		} catch (error) {
			console.error("==> allProducts error:", error);
			throw error;
		}
	},

	async oneProduct(productId) {
		try {
			const response = await api.get(`/products/${productId}`);
			// console.log("==> OneProduct response:", response);

			return response;
		} catch (error) {
			console.error("==> OneProduct error:", error);
			throw error;
		}
	},

	async oneCart(cartId) {
		try {
			const response = await api.get(`/carts/${cartId}`);
			// console.log("==> OneCart response:", response);

			return response;
		} catch (error) {
			console.error("==> OneProduct error:", error);
			throw error;
		}
	}
};
