import { Carts, Products } from "../DAL/daos/factory.js";
import CartsRepository from "./carts.service.js";
import ProductRepository from "./products.service.js";

// eslint-disable-next-line no-unused-vars
const productService = new ProductRepository(new Products());
// eslint-disable-next-line no-unused-vars
const cartsService = new CartsRepository(new Carts());
