export default {
	name: "products",
	component: () => import("../layouts/ProductsLayouts.vue"),
	children: [

		{
			path: "one/:id",
			name: "products-one",
			component: () => import("../views/ProductsOneViews.vue"),
		},
		{
			path: "all",
			name: "products-all",
			component: () => import("../views/ProductsAllViews.vue"),
		}
	],
	redirect: { name: "products-all" }
};