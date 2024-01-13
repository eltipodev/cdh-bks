import auth from "../modules/auth/store";
import { createStore } from "vuex";
import products from "../modules/products/store";

const store = createStore({
	modules: {
		auth,
		products
	}
});

export default store;