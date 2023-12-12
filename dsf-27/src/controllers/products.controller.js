// [x]
import { addByObj, deleteById, findAll, findAllView, findById, updateById } from "../services/products.service.js";

////////////////////////////////////////////////
/// GET Lista todos los productos en vista  ///
//////////////////////////////////////////////
// [x]
export const findAllProductView = async (req, res) => {

	console.log("==> req", req.user);
	// eslint-disable-next-line no-unused-vars
	const { limit = "10", page = "1", sort = "default", ...query } = req.query;

	try {

		const getAllProducts = await findAllView(limit, page, sort, query);

		res.status(getAllProducts.code).render("products", {
			pageTitle: "Productos",
			user: req.user || "",
			message: getAllProducts.message,
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

	const { limit = "10", page = "1", sort = "default", ...query } = req.query;
	try {

		const getAllProducts = await findAll(limit, page, sort, query);

		res.status(getAllProducts.code).json({
			pageTitle: "Productos",
			message: getAllProducts.message,
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

////////////////////////////////////////////////
/// GET Lista  un producto por ID por vista ///
//////////////////////////////////////////////
// [x]
export const findByIdProductView = async (req, res) => {
	console.log("==> req.user", req.user);
	const pid = req.params.pid;
	try {

		const updateProductById = await updateById(pid);

		return res.status(updateProductById.code).render("products", {
			pageTitle: "Producto",
			user: req.user || "",
			message: updateProductById.message,
			payload: updateProductById.payload,
			status: updateProductById.status,
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

	const prd = req.body;

	try {
		const addProduct = await addByObj(prd);

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

	try {
		const deleteProductById = await deleteById(pid);

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

		const updateProductById = await updateById(pid, body);

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
		const updateProductById = await findById(pid);

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