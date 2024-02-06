/* eslint-disable no-undef */
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

const user = {
	user: "ADMIN",
	password: "ADMIN"
};

let cookieData;
describe("====Test Router User====", () => {

	describe("==> POST", () => {
		it("Endpoint POST /api/user/login login user", async () => {

			const response = await requester.post("/api/user/login").send(user);
			const cookie = response.headers["set-cookie"][0];
			cookieData = {
				name: cookie.split("=")[0],
				value: cookie.split("=")[1].split(";")[0]
			};
			// expect(response.status).to.equal(200);
			expect(cookieData.name).to.equal("token");
			expect(cookieData.value).to.have.lengthOf(440);
			// await new Promise(resolve => setTimeout(resolve, 3000));
		});

		// it("Endpoint POST /api/user/sigun register user", async () => {

		// 	const signup = {

		// 		firstName: "test1115",
		// 		lastName: "test115",
		// 		user: "testt115",
		// 		age: "144",
		// 		email: "test14145@gmail.com",
		// 		password: "ggg"

		// 	};

		// 	const response = await requester.post("/api/user/signup").send(signup);
		// 	expect(response.statusCode).to.be.equal(200);
		// 	// expect(cookieData.name).to.equal("token");
		// 	// expect(cookieData.value).to.have.lengthOf(440);
		// 	// await new Promise(resolve => setTimeout(resolve, 3000));
		// });

	});

});

// registros de usuarios