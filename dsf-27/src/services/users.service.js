
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
	updateById = async (email, token) => {

		const updateUserById = await this.dao.updateUserById(email, token);
		return updateUserById;
	};

	creatOne = async (obj) => {
		const createOne = await this.dao.creatOne(obj);
		return createOne;
	};

}

