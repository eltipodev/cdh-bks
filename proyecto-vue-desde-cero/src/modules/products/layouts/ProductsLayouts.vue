
<script setup>

</script>
<template>
	<h1>ProductsLayouts</h1>
	<section class="section-products">
		<RouterView />
	</section>
</template>

<style>
.section-products{

	display: flex;
    flex-flow: row wrap;
	margin-top: 22px;
	/* max-width: 1078px; */
	padding: 1px;
justify-content: center;
	gap:16px

}
</style>