import { fakerES_MX as faker } from "@faker-js/faker";

const generateProduct = () => {
	const product = {
		id: faker.database.mongodbObjectId(),
		name: faker.commerce.product(),
		price: faker.commerce.price(),
		category: faker.commerce.department(),
		stock: faker.number.int(100)
	};

	return product;
};

export const generateProducts = () => {
	const products = [];
	for (let i = 0; i < 100; i++) {
		const product = generateProduct();
		products.push(product);
	}
	return products;
};