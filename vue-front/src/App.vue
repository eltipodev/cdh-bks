<!-- script -->

<template>
	<NavHeader />
	<RouterView />
</template>

<script setup>
// import { onMounted,ref } from "vue";

import NavHeader from "../src/modules/shared/components/NavHeader.vue";

// const products = ref(null);
// let data;
// // eslint-disable-next-line no-unused-vars
// const jsonData = ref(data);

// onMounted(async () => {

// 	const response = await fetch("../db/objet.json");

// 	data = await response.json();

// 	products.value = data[0].payload.docs;
// 	// console.log("==>  products", data[0].payload.docs);
// });

// const getDataGuitarPlayer = () => {
// 	fetch("https://finquin.github.io/jazzsongs/js/data.json")
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error(`hubo un error : ${response.status}`);
// 			}
// 			return response.json();
// 		})
// 		.then(data => dataJson.push(...data))
// 		.then(() => {
// 			addCoverFrontSelect();
// 			albumFrontCoverHtml();
// 		})
// 		.catch(error => {
// 			console.error("Error al extraer json:", error);
// 		});
// };

</script>

<!-- style -->
<style>
h1 {
	text-transform: uppercase;
}
</style>

