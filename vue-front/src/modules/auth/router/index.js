export default {
	name: "auth",
	component: () => import("../layouts/AuthLayout.vue"),
	children: [
		{
			path: "",
			name: "login",
			component: () => import("../views/LoginViews.vue"),
		},
		{
			path: "/signup",
			name: "signup",
			component: () => import("../views/SignupViews.vue"),
		}
	]
};