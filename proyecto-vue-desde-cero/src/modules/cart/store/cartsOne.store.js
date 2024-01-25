import { onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import servicesApi from "@/api/servicesApi";
import { useRoute } from "vue-router";

export const useCartOneStore = defineStore("productsOne", () => {
	const route = useRoute();
	const cartsId = ref([]);
	const cartsOne = ref([]);
	const cartProduct = ref([]);
	const isLoading = ref(true);

	cartsId.value = route.params.id;

	console.log("==> route.name", route.name);

	watch(
		() => route.params.id,
		async (newCartId) => {
			console.log("==> newCartId", newCartId);
			try {

				if (route.name === "carts-one") {

					if (cartsId.value.length) {

						isLoading.value = true;

						const { data } = await servicesApi.oneCart(newCartId);

						if (data) {

							cartsOne.value = data;
							cartProduct.value = data.payload.products;

							isLoading.value = false;
						}
					}
				}
			} catch (error) {
				console.log("==> error", error);
			}
		}
	);

	onMounted(() => {
		// Trigger the initial load when the component is mounted
		watch(() => cartsId.value);
	});

	return {
		cartsOne,
		cartProduct,
		isLoading
	};
});
