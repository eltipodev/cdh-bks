
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

	creatOne = async (obj) => {

		// // eslint-disable-next-line no-unused-vars
		// const { name, lastname, password } = obj;

		const createOne = await this.dao.creatOne(obj);
		return createOne;
	};
}

