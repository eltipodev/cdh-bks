import { ref } from "vue";
import servicesApi from "@/api/servicesApi";

const useProduct = () => {

	const products = ref([]);
	const isLoading = ref(true);
	const currentPage = ref(1);
	const page = ref(1);
	const cartId = ref("");
	const pageTitle = ref("");
	const pagination = ref("");
	const payload = ref("");
	const user = ref("");

	const getApi = async () => {
		try {

			isLoading.value = true;

			const { data } = await servicesApi.allProducts();

			if (data.payload.docs.length > 0) {

				products.value = data.payload.docs;
				isLoading.value = false;
			}
			console.log("==> products", products);
		} catch (error) {
			console.log("==> error", error);
		}
	};

	getApi();

	return {
		currentPage,
		isLoading,
		page,
		products,
		cartId,
		pageTitle,
		pagination,
		payload,
		user

	};
};

export default useProduct;

