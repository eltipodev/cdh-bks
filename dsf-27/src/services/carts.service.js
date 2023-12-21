import { cartModel } from "../models/cart.model.js";
import cartsManager from "../daos/carts.dao.js";
import productManager from "../daos/products.dao.js";
import { productModel } from "../models/products.model.js";

//[x]
export const findAll = async () => {
	const getAllCarts = await cartsManager.getAllCarts();
	return getAllCarts;
};

//[x]
////////////////////////////////////////////////
/// POST agregar un Producto a l Carrito    ///
//////////////////////////////////////////////
export const udpateByCidByPId = async (cid, pid) => {
	const addProductToCartById = await cartsManager.addProductToCartById(cid, pid);
	return addProductToCartById;
};

// [x]
/////////////////////////////////////////////////////////
/// Métodor Elimimar un producto al carrito          ///
///////////////////////////////////////////////////////
export const deleteByCidByPid = async (cid, pid) => {
	const deleteProductToCartById = await cartsManager.deleteProductToCartById(cid, pid);
	return deleteProductToCartById;
};

// [x]
///////////////////////////////////////////////////////
/// Método Borrar Todos los productos de un carrito///
/////////////////////////////////////////////////////
export const deleteAll = async (cid) => {
	const deleteAllProductsByCart = await cartsManager.deleteAllProductsByCart(cid);
	return deleteAllProductsByCart;
};

//[x]
////////////////////////////////////////////////
/// Método para agregar Carrito             ///
//////////////////////////////////////////////
export const createObj = async () => {
	const addCart = await cartsManager.createCart();
	return addCart;
};

////////////////////////////////////////////////////
/// GET Método Listar carrito por ID           ////
//////////////////////////////////////////////////
//[x]
export const findById = async (cid) => {
	const getCartsById = await cartsManager.getCartsById(cid);
	return getCartsById;
};

//[x]
//////////////////////////////////////////////////////////
/// Método actualizar el carrito con productos        ///
////////////////////////////////////////////////////////
export const updateByIdByPids = async (cid, pids) => {
	const updateCartByPids = await cartsManager.updateCartByPids(cid, pids);
	return updateCartByPids;

};

// [x]
/////////////////////////////////////////////////////////
/// Método Actualizar quantitf en el  carrito        ///
///////////////////////////////////////////////////////
export const updateByCidByPidQuantitf = async (cid, pid, obj) => {

	const objKey = Object.keys(obj)[0];

	if (objKey !== "quantity") {
		return {
			code: 404,
			status: "error",
			message: "Solo esta permitido la propieda quantitf",
			payload: []
		};
	}

	const objValue = obj[objKey];

	const existsCart = await cartModel.findById(cid);
	if (!existsCart) {
		return ({
			code: 404,
			status: "error",
			message: "No existe el Carrito",
			payload: existsCart
		});
	}

	const existsProduct = await productModel.findById(pid);

	if (!existsProduct) {
		return ({
			code: 404,
			status: "error",
			message: "No existe el Producto",
			payload: existsCart
		});
	}

	const productIndex = existsCart.products.findIndex(product => product
		.product.toString() === pid.toString());

	if (productIndex !== -1) {

		const updateQuantity = {
			$set: { "products.$.quantity": objValue }
		};

		const updateByCidByPidQuantitf = await cartsManager.updateCartByIdBodyQuantify(cid, pid, updateQuantity);
		return updateByCidByPidQuantitf;

	}
};

// [x]
///////////////////////////////////////
/// Método Actualizar Stock        ///
/////////////////////////////////////
export const updateByPidByStock = async (pid, cstk) => {

	// const objKey = Object.keys(obj)[0];

	if (!cstk.lenght) {
		return {
			code: 404,
			status: "error",
			message: "Solo esta permitido la propieda quantitf",
			payload: []
		};
	}

	const existsProduct = await productModel.findById(pid);

	if (!existsProduct) {
		return ({
			code: 404,
			status: "error",
			message: "No existe el Producto",
			payload: existsProduct
		});
	}

	const updateByPidByStock = await cartsManager.updateCartByIdBodyQuantify(pid, cstk);
	return updateByPidByStock;

};

//[X]
/////////////////////////////////////////////////
/// GET Método mostrar todos los carrito    ////
///////////////////////////////////////////////
export const findAllView = async (limit, page, sort, query) => {
	const getAllCarts = await cartsManager.getAllCarts(limit, page, sort, query);
	return getAllCarts;
};

// [x]
////////////////////////////////////////////////
/// Método Listar carrito por ID           ////
//////////////////////////////////////////////
export const findByCidView = async (cid) => {
	const getCartsById = await cartsManager.getCartsById(cid);
	return getCartsById;
};

// [x]
///////////////////////////////////////////
/// Método ver cantidad  el Stock     ////
/////////////////////////////////////////
export const findByPidStock = async (getCartsById) => {

	const cartOrder = await getCartsById.payload.products;
	cartOrder.forEach((e) => {

		if (e.quantity <= e.product.stock) {
			e.stockAvailable = true;
		} else {
			e.stockAvailable = false;
		}
	});

	return cartOrder;
};

// [x]
/////////////////////////////////
/// Método efectuar pago    ////
///////////////////////////////

export const orderPay = async (cid) => {
	try {

		const cart = await cartModel
			.findById(cid)
			.populate("products.product");

		let products = cart.products;

		let stockAvailable = [];
		let stockUnAvailable = [];

		for (let i of products) {
			if (i.product.stock >= i.quantity) {
				i.product.stock -= i.quantity;
				await i.product.save();
			} else {
				stockUnAvailable.push(i);
			}
		}

		cart.products = stockUnAvailable;

		await cart.save();

	} catch (error) {
		console.error("Error al procesar el pedido:", error);
	}
};

// [x]
///////////////////(///////////////
/// Método crear ticket vista ////
/////////////////////////////////
export const createOrderView = async () => {

};

// const cart = await cartModel.findById(cid).populate("products.product").lean();