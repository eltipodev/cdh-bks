import { cartModel } from "../DAL/models/cart.model.js";
import cartsMongo from "../DAL/daos/mongo/carts.dao.js";
import orderMongo from "../DAL/daos/mongo/order.dao.js";
import { productModel } from "../DAL/models/products.model.js";
import { v4 as uuidv4 } from "uuid";

//[x]
export const findAll = async () => {
	const getAllCarts = await cartsMongo.getAllCarts();
	return getAllCarts;
};

//[x]
////////////////////////////////////////////////
/// POST agregar un Producto a l Carrito    ///
//////////////////////////////////////////////
export const udpateByCidByPId = async (cid, pid) => {
	const addProductToCartById = await cartsMongo.addProductToCartById(cid, pid);
	return addProductToCartById;
};

// [x]
/////////////////////////////////////////////////////////
/// Métodor Elimimar un producto al carrito          ///
///////////////////////////////////////////////////////
export const deleteByCidByPid = async (cid, pid) => {
	const deleteProductToCartById = await cartsMongo.deleteProductToCartById(cid, pid);
	return deleteProductToCartById;
};

// [x]
///////////////////////////////////////////////////////
/// Método Borrar Todos los productos de un carrito///
/////////////////////////////////////////////////////
export const deleteAll = async (cid) => {
	const deleteAllProductsByCart = await cartsMongo.deleteAllProductsByCart(cid);
	return deleteAllProductsByCart;
};

//[x]
////////////////////////////////////////////////
/// Método para agregar Carrito             ///
//////////////////////////////////////////////
export const createObj = async () => {
	const addCart = await cartsMongo.createCart();
	return addCart;
};

////////////////////////////////////////////////////
/// GET Método Listar carrito por ID           ////
//////////////////////////////////////////////////
//[x]
export const findById = async (cid) => {
	const getCartsById = await cartsMongo.getCartsById(cid);
	return getCartsById;
};

//[x]
//////////////////////////////////////////////////////////
/// Método actualizar el carrito con productos        ///
////////////////////////////////////////////////////////
export const updateByIdByPids = async (cid, pids) => {
	const updateCartByPids = await cartsMongo.updateCartByPids(cid, pids);
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

		const updateByCidByPidQuantitf = await cartsMongo.updateCartByIdBodyQuantify(cid, pid, updateQuantity);
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

	const updateByPidByStock = await cartsMongo.updateCartByIdBodyQuantify(pid, cstk);
	return updateByPidByStock;

};

//[X]
/////////////////////////////////////////////////
/// GET Método mostrar todos los carrito    ////
///////////////////////////////////////////////
export const findAllView = async (limit, page, sort, query) => {
	const getAllCarts = await cartsMongo.getAllCarts(limit, page, sort, query);
	return getAllCarts;
};

// [x]
////////////////////////////////////////////////
/// Método Listar carrito por ID           ////
//////////////////////////////////////////////
export const findByCidView = async (cid) => {
	const getCartsById = await cartsMongo.getCartsById(cid);
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

export const orderPay = async (cid, user) => {
	try {

		const cart = await cartModel
			.findById(cid)
			.populate("products.product");

		let products = cart.products;

		let stockAvailable = [];
		let stockUnAvailable = [];
		let totalAmount = 0;

		for (let i of products) {
			if (i.product.stock >= i.quantity) {
				i.product.stock -= i.quantity;
				await i.product.save();
				totalAmount += i.quantity * i.product.price;
				stockAvailable.push(i);
			} else {
				stockUnAvailable.push(i);
			}
		}

		cart.products = stockUnAvailable;

		await cart.save();

		if (stockAvailable.length) {
			const order = {
				code: uuidv4(),
				purchase_datetime: new Date(),
				amount: totalAmount,
				purchaser: user.email
			};

			const paymentStatusCompleted = await orderMongo.createOrder(order);
			return { stockAvailable, totalAmount, paymentStatusCompleted };
		}

		return stockUnAvailable;

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

// [x]
///////////////////////////////////
/// Método calcular cantidad  ////
/////////////////////////////////
export const getCartTotalQuantity = async (cid) => {
	try {
		const getCartsById = await findByCidView(cid);

		if (getCartsById && getCartsById.payload && getCartsById.payload.products && Array.isArray(getCartsById.payload.products)) {

			if (getCartsById.payload.products.length > 0) {

				const cartTotals = getCartsById.payload.products.reduce((totals, product) => {
					if (product.product && product.quantity && product.product.price) {
						totals.quantity += product.quantity;
						totals.totalPrice += product.quantity * product.product.price;
					}

					return totals;

				}, { quantity: 0, totalPrice: 0 });

				cartTotals.totalPrice = Number(cartTotals.totalPrice.toFixed(2));
				return cartTotals;

			} else {
				return { quantity: 0, totalPrice: 0 };
			}

		} else {
			return { quantity: 0, totalPrice: 0 };
		}

	} catch (error) {
		console.error("Error:", error);

		return 0;
	}
};