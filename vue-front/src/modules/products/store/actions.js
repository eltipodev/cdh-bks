import ecommerceApi from "../../../api/ecommerceApi";

export const loadEntries = async () => {

	const { products } = await ecommerceApi();
	console.log("==>  data", products);

	// const { data } = await ecommerceApi.get("/products");
	// console.log("==>  data", data);

};