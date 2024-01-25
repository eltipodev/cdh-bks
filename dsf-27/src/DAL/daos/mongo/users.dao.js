
import { userModel } from "../../models/users.model.js";

class UsersMongo {
	constructor() {
	}
	async findById(id) {
		const findById = await userModel.findById(id);
		return findById;
	}

	async findByUser(user) {
		const findByUser = await userModel.findOne({ user });
		return findByUser;
	}

	async findByEmail(email) {
		const findByEmail = await userModel.findOne({ email });
		return findByEmail;

	}

	async creatOne(obj) {

		// // eslint-disable-next-line no-unused-vars
		// const { name, lastname, password } = obj;

		const createOne = await userModel.create(obj);
		return createOne;
	}

	// [x]
	//////////////////////////////////////
	///  Método actualizar un  user   ///
	/////////////////////////////////////
	async updateUserById(obj1, obj2) {

		const updateUserById = await userModel.updateOne(obj1, obj2);

		return ({
			code: 200,
			status: "sucess",
			message: "Producto Eliminado",
			payload: updateUserById
		});
	}

}

export default UsersMongo;
