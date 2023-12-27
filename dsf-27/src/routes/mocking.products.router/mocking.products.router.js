import express from "express";
import { generateProducts } from "../../test/faker.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const products = generateProducts();
	res.json(products);
});

export default router;