<script setup>
const props = defineProps({

	cart :	{
		type:Object,
		default: null
	}

});

const {	title,description,price,thumbnails} = props.cart.product;
console.log("==> cart",props.cart);

</script>

<template>
	<div class=" carts-ctn">
		<div class="carts-main">
			<div class="carts-main-main">
				<div class="carts-main-img-ctn">
					<img
						:src="`http://localhost:8080${thumbnails}`"
						alt="imagen de una {title}"
						class="carts-main-img"
					>
				</div>
			</div>
			<div class="carts-header">
				<div class="carts-header-title">
					{{ title }}
				</div>
				<div class="carts-main-description">
					{{ description }}
				</div>
				<div class="carts-footer-price-ctn ">
					<div class="carts-quantity-ctn">
						<span class="carts-quantity-mas">+</span>
						<span class="carts-quantity">{{ props.cart.quantity }}</span>
						<span class=" carts-quantity-menos">-</span>
					</div>
					<span class="carts-footer-price">$ {{ price }}</span>
				</div>
			</div>
		</div>
		<div class="carts-footer-credits">
			<span>Foto de </span><a
				href="https://unsplash.com/es/@{attbName.urlAttb}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
			>foto</a>
			<span>en</span><a
				href="https://unsplash.com/es/fotos/{attbName.codeAttb}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
			>
				Unsplash</a>
		</div>
	</div>
</template>

<style lang="css" scoped>

</style>