/* eslint-disable no-constant-condition */

import authRouter from "../modules/auth/router/index";
import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import productRouter from "../modules/products/router/index";

const routes = [

	// {
	// 	path: "/",
	// 	name: "home",
	// 	component: () => import("../HomeViews.vue")
	// },
	// {
	// 	path: "/chat",
	// 	name: "chat",
	// 	component: () => import("../ChatViews.vue")
	// },
	// {
	// 	path: "/cart",
	// 	name: "cart",
	// 	component: () => import("../CartViews.vue")
	// },
	// {
	// 	path: "/carts",
	// 	name: "carts",
	// 	component: () => import("../CartsViews.vue")
	// },
	{
		path: "/products",
		...productRouter
	}
	,
	// {
	// 	path: "/login",
	// 	name: "login",
	// 	component: () => import("../LoginViews.vue")
	// },

	// {
	// 	path: "/register",
	// 	name: "register",
	// 	component: () => import("../RegisterViews.vue")
	// },
	{
		path: "/auth",
		...authRouter
	}
	,
	{
		path: "/:pathMatch(.*)*",
		name: "NoPageFound",
		component: () => import("../modules/shared/pages/NoPageFound.vue")
	}

];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// const canAcces = () => {
// 	return new Promise((resolve) => {

// 		const isAdminp = true;

// 		if (isAdminp) {
// 			resolve(true);
// 		} else {
// 			console.log("Bloqueado");

// 			resolve(false);
// 		}
// 	});

// };

// router.beforeEach(async (to, from, next) => {
// 	const authorized = await canAcces();

// 	authorized
// 		? next()
// 		: next({ name: "NoPageFound" });
// });

export default router;