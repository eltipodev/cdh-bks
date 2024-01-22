<script setup>

const props = defineProps({

	product :	{
		type:Object,
		default: null
	}

});

// eslint-disable-next-line no-unused-vars
const {_id,title,description,code,price,status,thumbnails,category,stock} = props.product;

</script>

<template>
	<div class="products-ctn">
		<div class="products-main">
			<img

				class="button-actions add"
				:class="{ move :!isAdmin }"
				cartId=""
				:prodId="`${_id}`"
				src="http://localhost:8080/img/plus-sign-in-a-circle-svgrepo-com.svg"
				alt=""
			>

			<img
				v-if="isAdmin"
				class="button-actions delete move"
				:prodId="`${_id}`"
				src="http://localhost:8080/img/empty-wood-bucket.svg"
				alt=""
			>

			<div>
				<img
					:src="`http://localhost:8080${thumbnails}` || 'http://localhost:8080/img/imagen_vacio.webp'"
					class="products-main-img"
					:alt="'imagen de una ' + title"
				>

				<div class="products-footer-credits">
					<span>Foto generada con IA</span>
				</div>
			</div>

			<div class="products-header">
				<div class="products-header-title">
					{{ title }}<span class="products-stock">({{ stock }})</span>
				</div>
			</div>

			<div class="products-main-description-ctn">
				<span class="products-main-description"> {{ description }}</span>
			</div>
		</div>

		<div class="products-footer">
			<div class="products-footer-price">
				{{ price }}
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>

.products-id{
	background-color: #d8d8d8;
	font-size: 16px;
	width: 100%;
}

.products-ctn{
	align-items: center;
	background-color: #464545;
	border: 0.5px solid #9f9e9c;
	border-radius: 10px;
	box-shadow: 10px 10px 5px 5px rgb(0 0 0 / 25%);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 220px;

}

.products-header{
	padding: 2px;
	text-align: center;
}

.products-header-title{
	color: rgb(233 233 233);
}

.products-main{
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;padding: 2px;
	position: relative;
}

.button-actions{
	background-color: aliceblue;
	border: 0;
	border-radius: 0 10px 0 0 ;
	box-sizing: border-box;
	color: white;
	height: 30px;
	position: absolute;
	width: 30px;
}

.button-actions.add{
	background-color: #51a3f0;
	right: 32px;
	top:0;
}

.move{
	right: 0!important;
}

.button-actions.delete{
	background-color: #c45050;
	right: 2px;
	top:0;
}

.products-main-img{
	border-radius: 10px 10px 0;
	height: 150px;
	width: 100%;

}

.products-main-description-ctn{
	align-items: center;
	display: flex;
	justify-content: center;
	padding: 10px 0;
	text-align: center;
}

.products-stock{
	color: rgb(221 221 126);
	vertical-align:super;
}

.products-main-description{
	color: #c7c7c7;
	font-size: 16px;
	text-align: center;
	white-space: break-spaces;
}

.products-footer{
	display: flex;
	flex-direction: column;padding: 2px;
}

.products-footer-credits{
	align-items: center;
	display: flex;
	justify-content: center;
	width: 220px;
}

.products-footer-credits a,p,span{
	color: #b56666;
	font-size: 10px;
	padding: 0 0.5px;
	text-decoration: none;
}

.products-footer-price::before{
	content: "$";
	padding: 0 2px 0 0;
}

.products-footer-price{
	align-items: center;
	color: #b4d087;
	display: flex;
	font-size: 22px;
	font-weight: 900;
	justify-content: center;
	padding: 0 0 5px;
}

.products-footer-vermas{
	background-color: #13568d;
	border-radius: 12px;
	font-size: 22px;
	padding: 0 0 5px;
	text-align: center;
}

.products-footer-vermas a{
	color: #e3e3e3;
}

.product-id-single{
	color: white;
	font-size: 10px;
	text-orientation: mixed;
	writing-mode: horizontal-tb;

}
</style>