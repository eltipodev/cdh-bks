import { ref } from "vue";
import servicesApi from "@/api/servicesApi";

const useProductOne = (productId) => {

	const product = ref();
	const isLoading = ref(false);
	const errorMessage = ref();

	const searchProduct = async () => {

		isLoading.value = true;
		product.value = null;

		try {
			const { data } = await servicesApi.oneProduct(productId);
			product.value = data;
			errorMessage.value = null;

		} catch (error) {
			errorMessage.value = "No se pudo cargar";
		} finally {
			isLoading.value = false;
		}
	};

	searchProduct();

	return {
		product,
		isLoading,
		errorMessage,

	};
};

export default useProductOne;
