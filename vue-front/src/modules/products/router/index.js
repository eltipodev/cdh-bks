// export default {
// 	name: "products",
// 	component: () => import("../layouts/AuthLayout.vue"),
// 	children: [
// 		{
// 			path: "",
// 			name: "login",
// 			component: () => import("../views/LoginViews.vue"),
// 		},
// 		{
// 			path: "/signup",
// 			name: "signup",
// 			component: () => import("../views/SignupViews.vue"),
// 		}
// 	]
// };

import isAuthenticatedGuard from "../../../router/auth-guard";

export default {
	name: "products",
	beforeEnter: [isAuthenticatedGuard],
	component: () => import("../layouts/ProductsLayouts.vue"),
	children: [
		{
			path: "all",
			name: "products-all",
			component: () => import("../views/ProductsAllViews.vue")
		},
		{
			path: "one",
			name: "products-one",
			component: () => import("../views/ProductsOneViews.vue")
		}
	],
	redirect: { name: "products-all" }

};