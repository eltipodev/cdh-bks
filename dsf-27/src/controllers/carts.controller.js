import cartsMongo from "../DAL/daos/mongo/carts.dao.js";
import { cartsService } from "../services/index.services.js";

//[x]
///////////////////////////////////////////////////
/// GET Método traer todos los carritos        ////
//////////////////////////////////////////////////
export const findAllCarts = async (req, res) => {
	try {

		const getAllCarts = await cartsService.findAll();

		res.status(getAllCarts.code).json({
			pageTitle: "Carritos",
			message: getAllCarts.message,
			payload: getAllCarts.payload,
			status: getAllCarts.status,
			sucess: getAllCarts.sucess
		});

	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
};

//[x]
////////////////////////////////////////////////////
/// GET Método Listar carrito por ID           ////
//////////////////////////////////////////////////
export const findByIdCart = async (req, res) => {
	const cid = req.params.cid;
	try {
		const getCartsById = await cartsMongo.getCartsById(cid);

		const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

		return res.status(getCartsById.code).json({
			pageTitle: "Carrito",
			message: getCartsById.message,
			payload: getCartsById.payload,
			cartTotalQuantity,
			status: getCartsById.status,
			sucess: getCartsById.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
};

//[x]
////////////////////////////////////////////////
/// Método para agregar Carrito             ///
//////////////////////////////////////////////
export const createCart = async (req, res) => {
	try {
		const addCart = await cartsService.createObj();
		return res.status(addCart.code).json({
			pageTitle: "Carrito",
			message: addCart.message,
			payload: addCart.payload,
			status: addCart.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
};

// ======================================================

//[x]
////////////////////////////////////////////////
/// POST agregar un Producto a l Carrito    ///
//////////////////////////////////////////////
export const addByProductCart = async (req, res) => {
	const { cid, pid } = req.params;

	const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

	try {
		const addCart = await cartsService.udpateByCidByPId(cid, pid);
		return res.status(addCart.code).json({
			pageTitle: "Carrito",
			message: addCart.message,
			payload: addCart.payload,
			status: addCart.status,
			cartTotalQuantity
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
};

// [x]
/////////////////////////////////////////////////////////
/// Métodor Elimimar un producto al carrito          ///
///////////////////////////////////////////////////////
export const deleteByIdProductCart = async (req, res) => {

	const { cid, pid } = req.params;
	try {
		const deleteProductToCartById = await cartsService.deleteByCidByPid(cid, pid);

		return res.status(deleteProductToCartById.code).json({
			pageTitle: "Carrito",
			message: deleteProductToCartById.message,
			payload: deleteProductToCartById.payload,
			status: deleteProductToCartById.status,
		});
	} catch (error) {

		res.status(500).json({
			error: error.message
		});
	}
};

// [x]
///////////////////////////////////////////////////////
/// Método Borrar Todos los productos de un carrito///
/////////////////////////////////////////////////////
export const deleteAllCarts = async (req, res) => {
	const cid = req.params.cid;
	try {
		const deleteAllProductsByCart = await cartsService.deleteAll(cid);
		return res.status(deleteAllProductsByCart.code).json({
			pageTitle: "Carrito",
			message: deleteAllProductsByCart.message,
			payload: deleteAllProductsByCart.payload,
			status: deleteAllProductsByCart.status,
		});

	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
};

//[x]
///////////////////////////////////////////////////////////////
/// Método actualizar el carrito con varios productos       ///
//////////////////////////////////////////////////////////////
export const updateByCartPids = async (req, res) => {

	const cid = req.params.cid;
	const pids = req.body;

	try {
		const updateCartById = await cartsService.updateByIdByPids(cid, pids);
		return res.status(updateCartById.code).json({
			pageTitle: "Carrito",
			message: updateCartById.message,
			payload: updateCartById.payload,
			status: updateCartById.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
};

// [x]
/////////////////////////////////////////////////////////
/// Método Actualizar quantitf en el  carrito        ///
///////////////////////////////////////////////////////
export const updateByBodyCart = async (req, res) => {
	const { cid, pid } = req.params;
	const obj = req.body;
	try {
		const updateCartByIdBody = await cartsService.updateByCidByPidQuantitf(cid, pid, obj);
		return res.status(updateCartByIdBody.code).json({
			pageTitle: "Carrito",
			message: updateCartByIdBody.message,
			payload: updateCartByIdBody.payload,
			status: updateCartByIdBody.status,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
};

//[x]
/////////////////////////////////////////////////
/// Método mostrar todos los carrito    ////
///////////////////////////////////////////////
export const findAllCartView = async (req, res) => {
	try {
		const { limit = "10", page = "", sort = "", query = "" } = req.query;

		const getAllCarts = await cartsService.findAllView(limit, page, sort, query);

		res.status(getAllCarts.code).render("cart", {
			pageTitle: "Carritos",
			message: getAllCarts.message,
			payload: getAllCarts.payload,
			status: getAllCarts.status,
			sucess: getAllCarts.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
};

// [x]
////////////////////////////////////////////////////
/// Método Listar carrito por ID vista         ////
//////////////////////////////////////////////////
// eslint-disable-next-line no-unused-vars
export const findByIdCartView = async (req, res) => {
	const cid = req.params.cid;
	try {
		const getCartsById = await cartsService.findByCidView(cid);

		const cartTotalQuantity = await cartsService.getCartTotalQuantity(cid);

		return res.status(getCartsById.code).render("cart", {
			pageTitle: "Carrito",
			user: req.user || "",
			message: getCartsById.message,
			cartTotalQuantity,
			payload: getCartsById.payload,
			status: getCartsById.status,
			sucess: getCartsById.sucess
		});
	} catch (error) {
		res.status(500).json(
			{
				error: error.message
			});
	}
};
