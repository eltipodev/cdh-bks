import __dirname from "./__dirname.utils.js";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "App FruitStore",
			version: "1.0.0",
		},
	},
	apis: [`${__dirname}/docs/*.yaml`]
};
console.log("==> apis", `${__dirname}/docs/.yaml`);
// eslint-disable-next-line no-unused-vars
export const swaggerSetup = swaggerJSDoc(options);