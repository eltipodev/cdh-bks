import "./assets/main.css";

import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import config from './modules/shared/formkit.config'
import router from "./router";

createApp(App)
	.use(createPinia())
	.use(plugin, defaultConfig(config))
	.use(router)
	.mount("#app");
