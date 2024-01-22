
<script setup>
import ProductItem from "../components/ProductAllItem.vue";
import { storeToRefs } from "pinia";
import { useProductAllStore } from "@/modules/products/store/productsAll.store";

const usesProducts  = useProductAllStore();

const {productAll,isLoading}  = storeToRefs(usesProducts);

</script>

<template>
	<h2 v-if="isLoading">
		...Cargando
	</h2>
	<template v-else>
		<ProductItem
			v-for="product in productAll"
			:key="product._id"
			:product="product"
		/>
	</template>
</template>

<style scoped>

</style>

