<script setup>

import { RouterLink } from "vue-router";

defineProps(
	{
		to:{
			type:String
		}

	}
);
</script>

<template>
	<RouterLink class ="nav-filter-item"
		:to="{name:to}"
	>
		<slot></slot>
	</RouterLink>
</template>

<style scoped>
.nav-filter{
	background:none ;
	margin-top: 30px;
	text-align: center;
	width: none;
}

.nav-filter-item{
	background-color: hsl(183, 34%, 27%);
	border-radius: 4px;
	font-weight: 500	;
	margin-right: 4px;
	font-weight: 500;
	padding: 2px;
}

a{
	color: hsl(183, 34%, 77%);
}

</style>