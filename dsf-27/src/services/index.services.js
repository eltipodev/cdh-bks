import { Carts, Products } from "../DAL/daos/factory.js";
import CartsRepository from "./carts.service.js";
// import UsersRepository from "./usersRepository.js";
import ProductsRepository from "./products.service.js";
// import MessagesRepository from "./messagesRepository.js";
// import TicketsRepository from "./ticketsRepository.js";
// import ResetTokensRepository from "./resetTokensRepository.js";

// export const usersService = new UsersRepository(new Users());
export const productsService = new ProductsRepository(new Products());
export const cartsService = new CartsRepository(new Carts());
// export const messagesService = new MessagesRepository(new Messages());
// export const ticketsService = new TicketsRepository(new Tickets());
// export const resetTokensService = new ResetTokensRepository(new ResetTokens());