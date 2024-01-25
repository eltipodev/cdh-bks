// [x]

import { EErrors, ErrorsMessages, ErrorsName } from "../services/errors/errors.enum.js";
import { cartsService, productsService } from "../services/index.services.js";
import CustomError from "../services/errors/error.generator.js";
import { generateAuthorizationRolErrorInfo } from "../services/errors/info.js";
import permission from "../utils/permission.js";

////////////////////////////////////////////////
/// GET Lista todos los productos en vista  ///
//////////////////////////////////////////////
// [x]
export const findAllProductView = async (req, res) => {

	const cid = req.user.cart;
	// eslint-disable-next-line no-unused-vars
	const { limit = "10", page = "1", sort = "default", ...query } = req.query;

	const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

	try {

		const getAllProducts = await productsService.findAllView(limit, page, sort, query);

		res.status(getAllProducts.code).render("products", {
			pageTitle: "Productos",
			user: req.user || "",
			message: getAllProducts.message,
			cartTotalQuantity,
			payload: getAllProducts.payload,
			status: getAllProducts.status,
			sucess: getAllProducts.sucess,
			pagination: getAllProducts.pagination,

		});
	} catch (error) {

		res.status(500).json(
			{
				error: error.message
			});
	}
};

// [x]
////////////////////////////////////////////////
/// GET Lista todos los productos           ///
//////////////////////////////////////////////

export const findAllProduct = async (req, res) => {
	const user = req.user.rol;
	const { limit = "10", page = "1", sort = "default", ...query } = req.query;
	try {

		const getAllProducts = await productsService.findAll(limit, page, sort, query);

		res.status(getAllProducts.code).json({
			pageTitle: "Productos",
			message: getAllProducts.message,
			payload: getAllProducts.payload,
			status: getAllProducts.status,
			sucess: getAllProducts.sucess,
			cartId: req.user.cart,
			user,
			pagination: getAllProducts.pagination,
		});
	} catch (error) {

		res.status(500).json(
			{
				error: error.message
			});
	}
};

////////////////////////////////////////////////
/// GET Lista  un producto por ID por vista ///
//////////////////////////////////////////////
// [x]
export const findByIdProductView = async (req, res) => {

	const pid = req.params.pid;

	const cid = req.user.cart;

	const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

	try {

		const updateProductById = await productsService.updateById(pid);

		return res.status(updateProductById.code).render("products", {
			pageTitle: "Producto",
			user: req.user || "",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
			cartTotalQuantity,
			sucess: updateProductById.sucess,
		});

	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};

////////////////////////////////////////////////
/// POST para agregar producto              ///
//////////////////////////////////////////////
// [x]
export const addProduct = async (req, res) => {
	let id = req.user._id;

	if (req.user.rol === "ADMIN") {

		id = "ADMIN";

	}

	const prd = {
		owner: id,
		...req.body
	};
	console.log("==> prd", prd);

	try {
		const addProduct = await productsService.addByObj(prd);

		return res.status(addProduct.code).json({
			pageTitle: "Productos",
			message: addProduct.message,
			payload: addProduct.payload,
			status: addProduct.status,
		});
	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};

////////////////////////////////////////////////
/// DELETE eliminar un producto              //
//////////////////////////////////////////////
// [x]
export const deleteByIdProduct = async (req, res) => {

	const pid = req.params.pid;

	const hasPermission = await permission(req);
	const userRol = req.user.rol;
	try {
		if (!hasPermission) {
			CustomError.createError({
				name: ErrorsName.ROUTE_ACCESS,
				cause: generateAuthorizationRolErrorInfo(userRol),
				message: ErrorsMessages.USER_UNAUTHORIZED,
				code: EErrors.FORBIDDEN
			});
		}

		const deleteProductById = await productsService.deleteById(pid);

		return res.status(deleteProductById.code).json({
			pageTitle: "Productos",
			message: deleteProductById.message,
			payload: deleteProductById.payload,
			status: deleteProductById.status,
		});
	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};

////////////////////////////////////////////////
/// PUT Actualizar un producto              ///
//////////////////////////////////////////////
// [x]
export const updateProductById = async (req, res) => {

	const pid = req.params.pid;
	const body = req.body;

	try {

		const updateProductById = await productsService.updateById(pid, body);

		return res.status(updateProductById.code).json({
			pageTitle: "Productos",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
		});

	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};

////////////////////////////////////////////////
/// GET Lista  un producto por ID           ///
//////////////////////////////////////////////
// [x]
export const findByIdProduct = async (req, res) => {
	try {
		const pid = req.params.pid;
		const updateProductById = await productsService.findById(pid);

		return res.status(updateProductById.code).json({
			pageTitle: "Productos",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
		});

	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};