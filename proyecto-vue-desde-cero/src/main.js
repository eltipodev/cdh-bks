import "./assets/main.css";

import { defaultConfig, plugin } from "@formkit/vue";
import App from "./App.vue";
import config from "./modules/shared/formkit.config";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

createApp(App)
	.use(createPinia())
	.use(plugin, defaultConfig(config))
	.use(router)
	.mount("#app");
