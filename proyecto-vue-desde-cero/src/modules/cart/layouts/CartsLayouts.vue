<script setup>

</script>
<template>
	<h1>CartsLayouts</h1>
	<section class="section-products">
		<RouterView />
	</section>
</template>

<style scoped>
:root{
	--height-carts:120px;
	--width-carts:120px;
}

section{
	align-items: center;;
	display: flex;
	flex-flow: column wrap;
	gap: 25px;
	justify-content: center;
}

span{
	padding: 1px 2px;
}

.carts-id-single{
	font-weight: 600;
}

.carts-id-single-text{
	font-size: 13px;
	padding: 12px 0;
	writing-mode: vertical-lr;
}

.carts-section-views{
	align-items: flex-start;
}

.carts-ctn{
	align-items: center;
	border: 1px solid hsl(0deg 0% 62%);
	border-radius: 5px ;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
	margin-top: 12px;

	/* width: 400px; */
}

.carts-ctn-row{
	flex-direction: row;
	justify-content: flex-start;
	width: auto;
}

.carts-main-img-ctn{
	border-radius: 5px  0 0 ;

}

.carts-main-img{
	border-radius: 5px  0 0 ;
	height: var(--height-carts);

}

.carts-main{
	align-items: flex-start;
	background-color: rgb(252 216 161);
	border-radius: 10px 0 0;
	display: flex;
	justify-content: flex-start;
	width: 100%;
}

.carts-main-modifiy{
	width: auto;
}

.carts-quantity-ctn{
	background-color: rgb(239 208 0);
	box-sizing:content-box ;
	color:black;
	font-weight: 700;
	width: 100%;
}

.carts-quantity{
	background-color: rgb(239 208 0);
	color: black;
	font-size: 18px;
	font-weight: 600;

}

.carts-quantity-menos{
	background-color: rgb(255 255 255);

}

.carts-quantity-mas{
	background-color: rgb(255 255 255);
}

.carts-id{
	align-items: center;
	background-color: aliceblue;
	border-radius: 5px 5px 0 0;
	color:black;
	display: flex;
	font-size: 42px;
	font-weight: 0;;
	height: var(--height-carts);
	justify-content: center;
	text-align: center;
	width: 40px;
}

.carts-header{
	align-items: flex-start;
	background-color: rgb(252 216 161);
	border-radius: 5px 5px 0 0;
	display: flex;
	flex-direction: column;
	height: var(--height-carts);
	justify-content: space-between;
	width: 100%;
}

.carts-header-title{
	background-color: rgb(66 66 66);
	color: rgb(216 216 216);
	font-size: 18px;
	padding: 3px 0;
	text-align: center;
	width: 100%;
}

.carts-main-main{
	background-color: white;
	border-radius: 5px 5px 0 0;
	display: flex;
	justify-content: center;
}

.carts-main-main-modifity{
	flex-direction: column;
	text-align: center;
}

.carts-footer-credits{
	align-items: center;
	background-color: rgb(48 69 88);
	border: 1px solid hsl(0deg 0% 62%);
	border-radius: 0 0  5px 5px;
	display: flex;
	font-size: 10px;
	justify-content: center;
	padding:4px;
	width: 100%;
}

.carts-footer-price-ctn{
	display: flex;
	font-size: 16px;
	justify-content:end;;
	padding: 3px;
	text-align: center;
	width: 100%;
}

.carts-footer-price{
	color: black;
	font-size: 24px;
	font-weight: 700;
	text-align: center;
	width: 100%;

}

.carts-main-description{
	align-items: center;
	background-color: rgb(48 48 48);
	display: flex;
	flex: 1;
	font-size: 16px;
	justify-content: center;
	overflow: hidden;
	padding: 2px;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 350px;
}

.carts-id-mongo{
	font-size: 5px;
	text-orientation: mixed;
	writing-mode: vertical-rl;
}

</style>