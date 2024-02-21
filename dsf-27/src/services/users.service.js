
export default class UsersRepository {
	constructor(dao) {
		this.dao = dao;
	}

	findById = async (id) => {
		const findById = await this.dao.findById(id);
		return findById;
	};

	findByUser = async (user) => {
		const findByUser = await this.dao.findByUser(user);
		return findByUser;
	};

	findByEmail = async (email) => {
		const findByEmail = await this.dao.findByEmail(email);
		return findByEmail;

	};

	//[x]
	updateById = async (obj1, obj2) => {

		const updateUserById = await this.dao.updateUserById(obj1, obj2);
		return updateUserById;
	};

	creatOne = async (obj) => {
		const createOne = await this.dao.creatOne(obj);
		return createOne;
	};

	// eslint-disable-next-line no-unused-vars
	saveUserDocuments = async ({ uid, dni, address, bank }) => {

		console.log("==> uid, dni, address, bank", uid, dni, address, bank);
		const saveUserDocuments = await this.dao.updateUserById(uid, {
			documents:
				[
					{
						name: "dni",
						status: true,
						reference: dni[0].path
					},
					{
						name: "address",
						status: true,
						reference: address[0].path
					},
					{
						name: "bank",
						status: true,
						reference: bank[0].path
					}
				]
		});
		return saveUserDocuments;
	};

}

