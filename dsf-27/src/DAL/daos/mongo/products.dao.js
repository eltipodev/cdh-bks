import { EErrors, ErrorsMessages, ErrorsName } from "../../../services/errors/errors.enum.js";
import { generateGetProductCodeErrorInfo, generateGetProductErrorInfo, generateGetProductNoFoundErrorInfo } from "../../../services/errors/info.js";
import CustomError from "../../../services/errors/error.generator.js";
import { productModel } from "../../models/products.model.js";

class ProductsMongo {
	constructor() {
	}

	////////////////////////////////////////////////////
	/// Método traer todos los productos           ////
	//////////////////////////////////////////////////
	// eslint-disable-next-line no-unused-vars
	async getAllProducts(querys, options, category) {

		const getAllProducts = await
			productModel
				.paginate(querys, options);

		const pagination = [];

		for (let i = 1; i <= getAllProducts.totalPages; i++) {
			pagination.push(i);
		}

		if (!getAllProducts) {

			CustomError.createError({
				name: ErrorsName.PRODUCT_GET_ERROR,
				cause: generateGetProductNoFoundErrorInfo(),
				message: ErrorsMessages.INVALID_PARAMS,
				code: EErrors.NOT_FOUND,
				payload: [],
				status: "error",
				sucess: false
			});

			// return ({
			// 	code: 200,
			// 	status: "error",
			// 	message: "no hay productos",
			// 	payload: [],
			// 	sucess: false
			// });

			// throw new Error("No hay productos");
		}
		return ({
			code: 200,
			status: "sucess",
			message: "Productos Encontrados",
			payload: getAllProducts,
			category,
			options,
			sucess: true,
			pagination: pagination,
		});
	}

	//[x]
	////////////////////////////////////////////////
	/// Método para agregar producto            ///
	//////////////////////////////////////////////
	async addProduct(obj) {

		const exitsCode = await productModel.find({ code: obj.code });
		if (exitsCode.length) {

			CustomError.createError({
				name: ErrorsName.PRODUCT_GET_ERROR,
				cause: generateGetProductCodeErrorInfo(),
				message: ErrorsMessages.INVALID_PARAMS,
				code: EErrors.NOT_FOUND,
				payload: [],
				status: "error",
				sucess: false
			});

			// return ({
			// 	code: 404,
			// 	status: "error",
			// 	message: "El codigo ya existe",
			// 	payload: []
			// });
		}

		const addProduct = await productModel.create(obj);
		if (!addProduct) {
			return ({
				code: 404,
				status: "error",
				message: "no hay productos",
				payload: []
			});
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Productos Agregadp",
			payload: addProduct
		});
	}

	//[x];
	////////////////////////////////////////////////
	///  Método elimimar un  producto por Id    ///
	//////////////////////////////////////////////
	async deleteProductById(pid) {

		const deleteProductById = await productModel.deleteOne({ _id: pid });

		if (deleteProductById.deletedCount === 0) {

			CustomError.createError({
				name: ErrorsName.PRODUCT_GET_ERROR,
				cause: generateGetProductErrorInfo(pid),
				message: ErrorsMessages.INVALID_PARAMS,
				code: EErrors.NOT_FOUND,
				payload: [],
				status: "error",
				sucess: false
			});

			// return ({
			// 	code: 404,
			// 	status: "error",
			// 	message: "No existe el producto",
			// 	payload: deleteProductById
			// });
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado",
			payload: deleteProductById
		});

	}

	// [x]
	////////////////////////////////////////////////
	///  Método actualizar un  producto por Id  ///
	//////////////////////////////////////////////
	async updateProductById(id, obj) {
		const existsId = await productModel.findById(id);

		if (!existsId) {

			CustomError.createError({
				name: ErrorsName.PRODUCT_GET_ERROR,
				cause: generateGetProductErrorInfo(id),
				message: ErrorsMessages.INVALID_PARAMS,
				code: EErrors.NOT_FOUND,
				payload: [],
				status: "error",
				sucess: false
			});

			// return ({
			// 	code: 404,
			// 	status: "error",
			// 	message: "No existe el producto",
			// 	payload: existsId
			// });
		}
		const updateProductById = await productModel.updateOne({ _id: id }, obj);

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado",
			payload: updateProductById
		});
	}

	////////////////////////////////////////////////
	///  Método listar un  producto por Id      ///
	//////////////////////////////////////////////
	async getProductById(pid) {

		const getProductById = await productModel.findById(pid);

		if (!getProductById) {
			CustomError.createError({
				name: ErrorsName.PRODUCT_GET_ERROR,
				cause: generateGetProductErrorInfo(pid),
				message: ErrorsMessages.INVALID_PARAMS,
				code: EErrors.NOT_FOUND,
				payload: [],
				status: "error",
				sucess: false
			});
			// return ({
			// 	code: 404,
			// 	status: "error",
			// 	message: "No existe id del producto",
			// 	payload: getProductById,
			// 	sucess: false
			// });
		}

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Encontrado",
			payload: getProductById,
			sucess: true
		});

	}
}

export default ProductsMongo;

