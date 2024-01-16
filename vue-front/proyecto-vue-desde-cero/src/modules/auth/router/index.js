export default {
	name: "auth",
	component: () => import("../layouts/AuthLayouts.vue"),
	children: [
		{
			path: "login",
			name: "login",
			component: () => import("../views/LoginViews.vue"),
		},
		{
			path: "signup",
			name: "signup",
			component: () => import("../views/SignupViews.vue"),
		}
	],
	redirect: { name: "login" }
};