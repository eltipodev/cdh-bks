<template>
	<h2 v-if="!products">
		...Cargando
	</h2>
	<template v-else>
		<h3>All product</h3>
		<ProductComponents
			v-for="product in products"
			:key="product.id"
			:product="products"
			:json-data="jsonData"
		/>
	</template>
</template>

<script setup>
import ProductComponents from "../components/ProductComponents.vue";
import {mapActions } from "vuex";
import { onMounted } from "vue";

const { loadEntries } = mapActions("products", ["loadEntries"]);

onMounted(() => {
	loadEntries();
});

</script>
