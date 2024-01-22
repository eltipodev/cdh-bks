import { onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import servicesApi from "@/api/servicesApi";
import { useRoute } from "vue-router";

export const useProductOneStore = defineStore("productsOne", () => {
	const route = useRoute();
	const productId = ref([]);
	const productOne = ref([]);
	const isLoading = ref(true);

	productId.value = route.params.id;

	console.log("==> route.name", route.name);

	watch(
		() => route.params.id,
		async (newProductId) => {
			try {

				if (route.name === "products-one") {
					isLoading.value = true;

					const { data } = await servicesApi.oneProduct(newProductId);

					if (data.payload) {
						console.log("==> data.value", data.payload);

						productOne.value = data.payload;
						isLoading.value = false;
					}
				}
			} catch (error) {
				console.log("==> error", error);
			}
		}
	);

	onMounted(() => {
		// Trigger the initial load when the component is mounted
		watch(() => productId.value);
	});

	return {
		productOne,
		isLoading
	};
});
