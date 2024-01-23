/* eslint-disable no-unused-vars */

import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import servicesApi from "@/api/servicesApi";

export const useProductAllStore = defineStore("products", () => {

	const cartId = ref("1");
	const message = ref(null);
	const pageTitle = ref(null);
	const productAll = ref([]);
	const pagination = ref([]);
	const hasNextPage = ref(false);
	const hasPrevPage = ref(false);
	const limit = ref(10);
	const nextPage = ref(null);
	const page = ref(1);
	const pagingCounter = ref(1);
	const prevPage = ref(null);
	const totalDocs = ref(1);
	const totalPages = ref(1);
	const userStatus = ref("USER");
	const isLoading = ref(true);
	const currentPage = ref(1);

	onMounted(async () => {
		try {

			isLoading.value = true;

			const data = await servicesApi.allProducts();
			console.log("==> data", data);
			if (data.payload.docs.length > 0) {

				productAll.value = data.payload.docs;
				cartId.value = data.cartId;

				isLoading.value = false;
			}

		} catch (error) {
			console.log("==> error", error);
		}
	});

	return {
		cartId,
		currentPage,
		hasNextPage,
		hasPrevPage,
		isLoading,
		limit,
		message,
		nextPage,
		page,
		pageTitle,
		pagination,
		pagingCounter,
		prevPage,
		productAll,
		totalDocs,
		totalPages,
		userStatus,
	};
}
);