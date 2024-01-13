<template>
	<h2 v-if="!products">
		...Cargando
	</h2>
	<template v-else>
		<h3>One product</h3>
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
</script>
