import { cartModel } from "../DAL/models/cart.model.js";
import { productModel } from "../DAL/models/products.model.js";

export default class CartsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	//[x]
	/////////////////////////////%////////////
	/// GET mostrar todos los carritos    ///
	////////////////////////////////////////
	//[x]
	findAll = async () => {
		const getAllCarts = await this.dao.getAllCarts();
		return getAllCarts;
	};

	//[x]
	////////////////////////////////////////////////
	/// POST agregar un Producto a l Carrito    ///
	//////////////////////////////////////////////
	udpateByCidByPId = async (cid, pid) => {
		const addProductToCartById = await this.dao.addProductToCartById(cid, pid);
		return addProductToCartById;
	};

	// [x]
	/////////////////////////////////////////////////////////
	/// Métodor Elimimar un producto al carrito          ///
	///////////////////////////////////////////////////////
	deleteByCidByPid = async (cid, pid) => {
		const deleteProductToCartById = await this.dao.deleteProductToCartById(cid, pid);
		return deleteProductToCartById;
	};

	// [x]
	///////////////////////////////////////////////////////
	/// Método Borrar Todos los productos de un carrito///
	/////////////////////////////////////////////////////
	deleteAll = async (cid) => {
		const deleteAllProductsByCart = await this.dao.deleteAllProductsByCart(cid);
		return deleteAllProductsByCart;
	};

	//[x]
	////////////////////////////////////////////////
	/// Método para agregar Carrito             ///
	//////////////////////////////////////////////
	createObj = async () => {
		const addCart = await this.dao.createCart();
		return addCart;
	};

	////////////////////////////////////////////////////
	/// GET Método Listar carrito por ID           ////
	//////////////////////////////////////////////////
	//[x]
	findById = async (cid) => {
		const getCartsById = await this.dao.getCartsById(cid);
		return getCartsById;
	};

	//[x]
	//////////////////////////////////////////////////////////
	/// Método actualizar el carrito con productos        ///
	////////////////////////////////////////////////////////
	updateByIdByPids = async (cid, pids) => {
		const updateCartByPids = await this.dao.updateCartByPids(cid, pids);
		return updateCartByPids;

	};

	// [x]
	/////////////////////////////////////////////////////////
	/// Método Actualizar quantitf en el  carrito        ///
	///////////////////////////////////////////////////////
	updateByCidByPidQuantitf = async (cid, pid, obj) => {

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

			const updateByCidByPidQuantitf = await this.dao.updateCartByIdBodyQuantify(cid, pid, updateQuantity);
			return updateByCidByPidQuantitf;

		}
	};

	// [x]
	///////////////////////////////////////
	/// Método Actualizar Stock        ///
	/////////////////////////////////////
	updateByPidByStock = async (pid, cstk) => {

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

		const updateByPidByStock = await this.dao.updateCartByIdBodyQuantify(pid, cstk);
		return updateByPidByStock;

	};

	//[X]
	/////////////////////////////////////////////////
	/// GET Método mostrar todos los carrito    ////
	///////////////////////////////////////////////
	findAllView = async (limit, page, sort, query) => {
		const getAllCarts = await this.dao.getAllCarts(limit, page, sort, query);
		return getAllCarts;
	};

	// [x]
	////////////////////////////////////////////////
	/// Método Listar carrito por ID           ////
	//////////////////////////////////////////////
	findByCidView = async (cid) => {
		const getCartsById = await this.dao.getCartsById(cid);
		return getCartsById;
	};

	// [x]
	///////////////////////////////////////////
	/// Método ver cantidad  el Stock     ////
	/////////////////////////////////////////
	findByPidStock = async (getCartsById) => {

		const cartOrder = await getCartsById.payload.products;

		if (cartOrder && cartOrder.length) {

			cartOrder.forEach((e) => {

				if (e.quantity <= e.product.stock) {
					e.stockAvailable = true;
				} else {
					e.stockAvailable = false;
				}
			});

			return cartOrder;
		}
		return [];
	};

	// // [x]
	// /////////////////////////////////
	// /// Método efectuar pago    ////
	// ///////////////////////////////
	// orderPay = async (cid, user) => {
	// 	try {

	// 		const cart = await cartModel
	// 			.findById(cid)
	// 			.populate("products.product");

	// 		let products = cart.products;

	// 		let stockAvailable = [];
	// 		let stockUnAvailable = [];
	// 		let totalAmount = 0;

	// 		for (let i of products) {
	// 			if (i.product.stock >= i.quantity) {
	// 				i.product.stock -= i.quantity;
	// 				await i.product.save();
	// 				totalAmount += i.quantity * i.product.price;
	// 				stockAvailable.push(i);
	// 			} else {
	// 				stockUnAvailable.push(i);
	// 			}
	// 		}

	// 		cart.products = stockUnAvailable;

	// 		await cart.save();

	// 		if (stockAvailable.length) {
	// 			const order = {
	// 				code: uuidv4(),
	// 				purchase_datetime: new Date(),
	// 				amount: totalAmount,
	// 				purchaser: user.email
	// 			};

	// 			const paymentStatusCompleted = await ticketMongo.createOrder(order);
	// 			return { stockAvailable, totalAmount, paymentStatusCompleted };
	// 		}

	// 		return stockUnAvailable;

	// 	} catch (error) {
	// 		console.error("Error al procesar el pedido:", error);
	// 	}
	// };

	// [x]
	///////////////////////////////////
	/// Método calcular cantidad  ////
	/////////////////////////////////
	getCartTotalQuantity = async (cid) => {
		try {
			const getCartsById = await this.findByCidView(cid);

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

}