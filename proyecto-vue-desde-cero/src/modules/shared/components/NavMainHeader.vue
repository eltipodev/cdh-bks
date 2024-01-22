
<script setup>
import LogoShared from "./LogoShared.vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductAllStore } from "@/modules/products/store/productsAll.store";

const store = useProductAllStore();

const {cartId} = storeToRefs(store);
console.log("==> cartId",cartId);
const isAdmn ="false";

</script>

<template>
	<header class="site-header">
		<div class="ctn site-header__ctn">
			<div class="site-header__seccion">
				<LogoShared />
			</div>
			<div class="site-header__col2">
				<nav class="site-nav__ctn">
					<!-- <ul>
						<Link to="admin">
							Admin-Panel
						</Link>
					</ul> -->
					<ul>
						<RouterLink to="products-all">
							Products
						</RouterLink>
					</ul>
				</nav>
				<div class="user-ctn ">
					<span
						v-if="isAdmn"
						class="profile-user-rol"
					>Admin</span>

					<span
						v-if="isAdmn"
						class="profile-user-rol"
					>User</span>

					<!--
					<a
					class="profile-user-logout"
					href="/logout"
					>Logout</a>
					<a
					class="user"
					href="/current"
					>{{ user.user }}</a>
					{{else}}
					<a
					class="login"
					href="/login"
					>Login</a>
					<a
					class="signup"
					href="/signup"
					>Signup</a> -->

					<a href="/current"> <img
						class="user-img"
						alt=""
					></a>
					<div class="cart-nav-ctn">
						<div class="cart-img-ctn">
							<a
								id="cartId"
								class="cart-img"

								:href="'/carts/' + cartId"
							>
								<svg
									width="34px"
									height="34px"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g
										id="SVGRepo_bgCarrier"
										stroke-width="0"
									/>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<g id="SVGRepo_iconCarrier">
										<path
											d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
											stroke="#fff"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</g>
								</svg>
							</a>
						</div>

						<div class="cart-count-ctn">
							<span class="cart-count">11</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>

li {
	display: inline-block;
	list-style: none;
	text-decoration: none;
}

a{
	text-decoration: none;
}

/*
nav{
	background-color:rgb(27 27 31);
	font-size: 16px;
	padding: 5px;
	text-align: center;
	width: 100%;
} */

.nav-header{
	position: fixed;
	z-index: 100;

}

/*
.site-header {
	align-items: center;
	background-color: rgb(27 27 31);
	display: flex;
	justify-content: space-between;
} */

/*
.site-header-wrapper{
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
}

.site-nav{
	background: none;
	flex: 1;
} */

/* stylelint-disable-next-line selector-class-pattern */
.site-header__ctn{
	align-items: center;
	background-color: rgb(34 33 33);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 10px;
	position: fixed;
	width: 100%;
	z-index: 100;
}

/* stylelint-disable-next-line selector-class-pattern */
.site-nav__ctn{
	align-items: center;
	display: flex;
	flex-wrap: wrap;

}

/* stylelint-disable-next-line selector-class-pattern */
.site-header__seccion{
	padding: 5px;
	text-align:center
}

.site-header__col2{
display: flex;
align-items: center;
justify-content: center;
}
.user-ctn{
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	margin: 0 4px;
}

.user-img{
	background-color: white;
	border-radius: 50px;
	height: 25px;
	width: 25px;
}

.login{
	margin-right: 12px;
}

.signup{
	margin-right: 12px;
}

/* .cart-count {
	background-color:red;
	border:  2px red;
	border-radius: 10px;
	bottom: 0;
	font-size: 0.7em;
	height: 18px;
	padding: 1px;
	position: absolute;
	right: 0;
	text-align: center;
	width: 18px;

} */

.cart-count-ctn {
	place-self: end;
}

.cart-count{
	background-color:red;
	border:  2px red;
	border-radius: 10px;
	color: white;
	font-weight: 700;
	height: 18px;
	padding: 1px;
	text-align: center;
	width: 18px;
}

.cart-nav-ctn{
	display: grid;
}

.cart-img-ctn,.cart-count-ctn{
	grid-area: 1/2;
}

.router-link-exact-active{
background-color: rgb(72 72 72);
}

</style>