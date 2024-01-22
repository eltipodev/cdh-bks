<script setup>
import NavMainHeader from "./modules/shared/components/NavMainHeader.vue";
import {RouterView } from "vue-router";

// eslint-disable-next-line no-unused-vars

</script>

<template>
	<NavMainHeader />
	<main class="site-main">
		<RouterView />
	</main>
</template>

<style>

.site-main{
	align-items: center;
	display: flex;
	flex:1;
	flex-direction: column;
	justify-content: flex-start;
	padding: 90px 2rem;
	min-height: 100vh;

}

.site-main--modify{
	justify-content: center;
}

</style>