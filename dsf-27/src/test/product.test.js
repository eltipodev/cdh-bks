/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

const user = {
	user: "ADMIN",
	password: "ADMIN"
};

let cookieData;
let pid;
let page;

describe("====Test Router Product====", () => {
	before(async () => {
		const response = await requester.post("/api/user/login").send(user);
		const cookie = response.headers["set-cookie"][0];
		cookieData = {
			name: cookie.split("=")[0],
			value: cookie.split("=")[1].split(";")[0]
		};

		// console.log("==> response", response.headers["set-cookie"][0].split("=")[1].split(";")[0]);
		// console.log("==> cookieData", cookieData);
		// expect(response.status).to.equal(200);

	});

	describe("==> POST", () => {
		it("Endpoint POST /api/products create product", async () => {
			const product1 = {
				"title": "Test",
				"description": "Test",
				"code": "zsztsest",
				"price": 3.99,
				"status": true,
				"thumbnails": "/img/imagen_tomate.webp",
				"category": "Test",
				"stock": 50
			};

			const response = await requester.post("/api/products").set("Cookie", [`${cookieData.name} = ${cookieData.value}`]).send(product1);

			pid = response.body.payload._id;

			expect(response.status).to.equal(200);
			// expect(response).to.be.false;
		});

	});

	describe("===> GET", () => {

		it("Endpoint GET /api/products list products array", async () => {
			const response = await requester.get("/api/products?limit=50").set("Cookie", [`${cookieData.name}=${cookieData.value}`]);
			// console.log("==> response", response.body.payload.docs);
			expect(response.status).to.equal(200);
			expect(response.body.payload.docs).to.be.an("array");
		});

		it("Endpoint GET /api/products/:pid product by Id", async () => {

			const response = await requester.get(`/api/products/${pid}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);

			expect(response.status).to.equal(200);
			expect(response.body.payload._id).to.equal(pid);
		});

		it("Endpoint GET /api/products/?page=  product by page", async () => {
			page = 2;
			const response = await requester.get(`/api/products?page=${page}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);
			expect(response.status).to.equal(200);
			expect(response.body.payload.page).to.equal(page);
		});

	});

	describe("===> PUT", () => {
		it("Endpoint PUT /api/products/:pid Udpate product by Id", async () => {

			const udpate =
			{
				"code": "us32",
				"stock": 11122
			};

			const response = await requester.put(`/api/products/${pid}`)
				.send(udpate)
				.set("Cookie", [`${cookieData.name}=${cookieData.value}`]);
			expect(response.status).to.equal(200);
			expect(response.body.message).to.equal("Producto Encontrado");
		});
	});

	describe("===> DELETE", () => {
		it("Endpoint DELETE /api/products/:pid Delete product by Id", async () => {
			const response = await requester.delete(`/api/products/${pid}`).set("Cookie", [`${cookieData.name}=${cookieData.value}`]);
			expect(response.status).to.equal(200);
			expect(response.body.payload.deletedCount).to.equal(1);
		});
	});

});

