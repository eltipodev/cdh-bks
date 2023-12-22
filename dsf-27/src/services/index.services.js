import { Carts, Products, Users } from "../DAL/daos/factory.js";
import CartsRepository from "./carts.service.js";
import ProductsRepository from "./products.service.js";
import UsersRepository from "./users.service.js";

export const usersService = new UsersRepository(new Users());
export const productsService = new ProductsRepository(new Products());
export const cartsService = new CartsRepository(new Carts());

