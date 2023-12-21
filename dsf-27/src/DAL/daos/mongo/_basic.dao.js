// NOTE:  ES PARA TENER	 METODOS COMUNES TENERLO EN CUENTA VER CLASE  29. Desarrollo de un servidor web basado en capas completo,obserbar el return no hace falta poner el await
// [x] ESTO ES UN EJEMPLO

export default class BasicMongo {

	constructor(model) {
		this.model = model;
	}

	async getAll() {
		return this.model.find();
	}
	async getById(id) {
		return this.model.findById(id);
	}

	async create0ne(obj) {
		return this.model.create(obj);
	}

	async delete0ne(id) {
		return this.model.findByIdAndDelete(id);
	}
}

