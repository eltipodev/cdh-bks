import cartsManager from "../daos/carts.dao.js";
import { hashData } from "../utils/utils.js";
import userManager from "../daos/users.dao.js";

export const createobj = async () => {
	const addCart = await cartsManager.createCart();
	return addCart;
};

export const hashPass = async (password) => {
	const hasHedPassword = await hashData(password);
	return hasHedPassword;
};

export const userNew = async ({
	body, password, cart
}) => {
	const createUser = await userManager.creatOne({
		body, password, cart
	});
	return createUser;
};