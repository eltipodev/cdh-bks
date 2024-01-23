
<script setup>
import CartsOneItem from "../components/CartsOneItem.vue";
import { storeToRefs } from "pinia";
import {useCartOneStore} from "@/modules/cart/store/cartsOne.store";

const store = useCartOneStore();
const{cartsOne,cartProduct,isLoading} = storeToRefs(store);

console.log("==> cartProduct",cartProduct);

</script>

<template>
	<h2 v-if="isLoading">
		...Cargando
	</h2>
	<template v-else>
		<CartsOneItem
			v-for="cart in cartProduct"
			:key="cart._id"
			:cart="cart"
		/>
	</template>
</template>
