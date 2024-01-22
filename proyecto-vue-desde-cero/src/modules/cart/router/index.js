export default {
	name: "carts",
	component: () => import("../layouts/CartsLayouts.vue"),
	children: [

		{
			path: "one/:id",
			name: "carts-one",
			component: () => import("../views/CartsOneViews.vue"),
		},
		{
			path: "all",
			name: "carts-all",
			component: () => import("../views/CartsAllViews.vue"),
		}
	],
	redirect: { name: "products-all" }
};