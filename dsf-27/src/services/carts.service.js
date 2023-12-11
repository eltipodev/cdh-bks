import cartsManager from "../daos/carts.dao.js";

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
	console.log("==> cid", cid);
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
	const updateByCidByPidQuantitf = await cartsManager.updateCartByIdBodyQuantify(cid, pid, obj);
	return updateByCidByPidQuantitf;
};

//[ ]
/////////////////////////////////////////////////
/// GET Método mostrar todos los carrito    ////
///////////////////////////////////////////////
export const findAllView = async (limit, page, sort, query) => {
	const getAllCarts = await cartsManager.getAllCarts(limit, page, sort, query);
	return getAllCarts;
};

// [ ]
////////////////////////////////////////////////
/// Método Listar carrito por ID           ////
//////////////////////////////////////////////

export const findByCidView = async (cid) => {
	const getCartsById = await cartsManager.getCartsById(cid);
	return getCartsById;
};
