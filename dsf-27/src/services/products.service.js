import productManager from "../daos/products.dao.js";

//[x]
export const findAll = async (limit, page, sort, query) => {

	const querys = {};
	const category = query.category;
	const stock = query.stock;

	if (category && category !== "Todos") {
		querys.category = category;
	}

	if (stock === "1 a 20")
		querys.stock = {
			$gte: 1,
			$lte: 20
		};

	if (stock === "sin stock")
		querys.stock = {
			$gte: 0,
			$lte: 0
		};

	if (stock === "mas de 100")
		querys.stock = {
			$gte: 100,
		};

	const sortOptions = {
		ascd: { price: 1 },
		desc: { price: -1 },
		default: ""
	};

	const sortSelect = sortOptions[sort] || sortOptions["default"];

	const options = {
		limit,
		page,
		sort: sortSelect,
		collation: { locale: "en", strength: 2 },
		lean: true
	};

	const getAllProducts = await productManager.getAllProducts(querys, options, category);
	return getAllProducts;
};

//[x]
export const findAllView = async (limit, page, sort, query) => {

	const querys = {};
	const category = query.category;
	const stock = query.stock;

	if (category && category !== "Todos") {
		querys.category = category;
	}

	if (stock === "1 a 20")
		querys.stock = {
			$gte: 1,
			$lte: 20
		};

	if (stock === "sin stock")
		querys.stock = {
			$gte: 0,
			$lte: 0
		};

	if (stock === "mas de 100")
		querys.stock = {
			$gte: 100,
		};

	const sortOptions = {
		ascd: { price: 1 },
		desc: { price: -1 },
		default: ""
	};

	const sortSelect = sortOptions[sort] || sortOptions["default"];

	const options = {
		limit,
		page,
		sort: sortSelect,
		collation: { locale: "en", strength: 2 },
		lean: true
	};

	const getAllProducts = await productManager.getAllProducts(querys, options, category);
	return getAllProducts;
};

//[x]
export const updateById = async (pid) => {
	const updateProductById = await productManager.getProductById(pid);
	return updateProductById;
};

//[x]
export const addByObj = async (prd) => {
	const addProduct = await productManager.addProduct(prd);
	return addProduct;
};

//[x]
export const deleteById = async (pid) => {
	const deleteById = await productManager.deleteProductById(pid);
	return deleteById;

};

export const findById = async (pid) => {
	const getProductById = await productManager.getProductById(pid);
	return getProductById;
};

