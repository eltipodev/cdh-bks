export default class ProductsRepository {
	constructor(dao) {
		this.dao = dao;

	}

	//[x]
	findAll = async (limit, page, sort, query) => {

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

		const getAllProducts = await this.dao.getAllProducts(querys, options, category);
		return getAllProducts;
	};

	//[x]
	findAllView = async (limit, page, sort, query) => {

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

		const getAllProducts = await this.dao.getAllProducts(querys, options, category);
		return getAllProducts;
	};

	//[x]
	updateById = async (pid) => {
		const updateProductById = await this.dao.getProductById(pid);
		return updateProductById;
	};

	//[x]
	addByObj = async (prd) => {
		const addProduct = await this.dao.addProduct(prd);
		return addProduct;
	};

	//[x]
	deleteById = async (pid) => {
		const deleteById = await this.dao.deleteProductById(pid);
		return deleteById;

	};

	findById = async (pid) => {
		const getProductById = await this.dao.getProductById(pid);
		return getProductById;
	};

}