import { ref } from "vue";
import servicesApi from "@/api/servicesApi";

const useCartOne = (cartId) => {

	const cart = ref();
	const isLoading = ref(false);
	const errorMessage = ref();

	const searchCart = async () => {

		isLoading.value = true;
		cart.value = null;

		try {
			const { data } = await servicesApi.oneCart(cartId);
			cart.value = data;
			errorMessage.value = null;

		} catch (error) {
			errorMessage.value = "No se pudo cargar";
		} finally {
			isLoading.value = false;
		}
	};

	searchCart();

	return {
		cart,
		isLoading,
		errorMessage,

	};
};

export default useCartOne;
