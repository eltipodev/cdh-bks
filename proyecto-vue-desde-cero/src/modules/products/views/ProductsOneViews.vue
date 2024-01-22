
<script setup>
import ProductOneItem from "../components/ProductOneItem.vue";
import { storeToRefs } from "pinia";
import {useProductOneStore} from "@/modules/products/store/productsOne.store";

const productOneStore  = useProductOneStore();
const {productOne,isLoading}  = storeToRefs(productOneStore);

</script>

<template>
	<h2 v-if="isLoading">
		...Cargando
	</h2>
	<template v-else>
		<ProductOneItem
			v-for="product in [productOne]"
			:key="product._id"
			:product="product"
		/>
	</template>
</template>

	<style scoped>

	</style>

