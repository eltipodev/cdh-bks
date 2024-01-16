import { createRouter, createWebHashHistory } from "vue-router";

import authRouter from "../modules/auth/router/index";
import productsRouter from "../modules/products/router/index";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/modules/home/views/ShopView.vue")
	},
	{
		path: "/products",
		...productsRouter
	},
	{
		path: "/auth",
		...authRouter
	},
	,
	{
		path: "/:pathMatch(.*)*",
		name: "NoPageFound",
		component: () => import("../modules/shared/views/NoPageFound.vue")
	}
]


const router = createRouter({
	history: createWebHashHistory(),
	routes,
});


export default router;
