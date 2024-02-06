/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

const user = {
	user: "ADMIN",
	password: "ADMIN"
};

let cookieData;
// eslint-disable-next-line no-unused-vars
let cid;
let pidtest = "6556a4c8488c5c5ef331c67d";

describe("====Test Router Cart====", () => {
	before(async () => {
		const response = await requester.post("/api/user/login").send(user);
		const cookie = response.headers["set-cookie"][0];
		cookieData = {
			name: cookie.split("=")[0],
			value: cookie.split("=")[1].split(";")[0]
		};

		// console.log("==> response", response.headers["set-cookie"][0].split("=")[1].split(";")[0]);
		// console.log("==> cookieData", response);
		// expect(response.status).to.equal(200);

	});

	describe("==> POST", () => {
		it("Endpoint POST /api/cart create cart", async () => {

			const response = await requester.post("/api/carts").set("Cookie", [`${cookieData.name} = ${cookieData.value}`]);
			cid = response.body.payload._id;
			// console.log("==> cidsssssssssssss", cid);
			expect(response.status).to.equal(200);
			expect(response.body.payload.products).to.be.an("array").that.is.empty;
			expect(response.body.payload._id).to.have.lengthOf(24);
			// await new Promise(resolve => setTimeout(resolve, 3000));
		});

		it("Endpoint POST /api/carts/cid/products/pid add product  cart", async () => {

			const response = await requester.post(`/api/carts/${cid}/products/${pidtest}`).set("Cookie", [`${cookieData.name} = ${cookieData.value}`]);

			const getCartsById = await requester.get(`/api/carts/${cid}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			expect(response.status).to.equal(200);
			expect(response.body.payload._id).to.equal(cid);
			expect(response.body.status).to.equal("sucess");
			expect(getCartsById.body.payload.products.some(product => product.product._id === pidtest)).to.be.true;

		});

	});

	describe("===> GET", () => {

		it("Endpoint GET /api/carts list all carts", async () => {
			const response = await requester.get("/api/carts").set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			expect(response.status).to.equal(200);
			expect(response.body.message).to.be.equal("Carritos Encontrados");
			expect(response.body.sucess).to.be.equal(true);

		});

	});

	describe("===> PuT", () => {
		it("Endpoint PUT /api/carts/cid/products/pid Udpate cart by array", async () => {

			const products = ["6556a4c8488c5c5ef331c686", "6556a4c8488c5c5ef331c684", "6556a4c8488c5c5ef331c689", "6556a4c8488c5c5ef331c6a0", "6556a4c8488c5c5ef331c687"];

			const response = await requester.put(`/api/carts/${cid}`)
				.send(products)
				.set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			// console.log("==> response", response);

			expect(response.status).to.equal(200);
			expect(response.body.payload._id).to.equal(cid);
			expect(response.body.message).to.equal("Se actualizaron los productos en el Carrito");
		});
	});

	describe("===> DELETE", () => {
		it("Endpoint DELETE /api/carts/cid/products/pid delete one product by cart", async () => {
			const response = await requester.delete(`/api/carts/${cid}/products/${pidtest}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);
			expect(response.status).to.equal(200);
			expect(response.body.payload._id).to.equal(cid);
			expect(response.body.message).to.equal("Producto Eliminado del carrito");
		});
	});

	describe("===> DELETE", () => {
		it("Endpoint DELETE /api/carts/ Delete all product by cart", async () => {
			const response = await requester.delete(`/api/carts/${cid}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			const verifyCart = await await requester.get(`/api/carts/${cid}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			// console.log("==> response", response);
			expect(response.status).to.equal(200);
			expect(response.body.payload._id).to.equal(cid);
			expect(verifyCart.body.payload.products).to.be.an("array").that.is.empty;
			expect(response.body.message).to.equal("Todos los Productos Eliminados del carrito");
		});
	});

});

