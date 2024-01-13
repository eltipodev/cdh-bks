// import axios from "axios";

const ecommerceApi = async () => {

	const response = await fetch("../db/objet.json");

	const data = await response.json();
	const products = data[0].payload.docs;

	return products;

	// console.log("==>  products", data[0].payload.docs);

};
// const ecommerceApi = axios.create({
// 	baseURL: "http://localhost:8080/api"
// });

export default ecommerceApi;