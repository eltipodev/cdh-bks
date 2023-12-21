// NOTE:  ES PARA TENER	 METODOS COMUNES TENERLO EN CUENTA VER CLASE  29. Desarrollo de un servidor web basado en capas completo
// [x] ESTO ES UN EJEMPLO de como se usa extenderlo

import BasicMongo from "./_basic.dao.js";

import { usersModel } from "../../models/users.model.js";

class UsersMongo extends BasicMongo {
	constructor() {
		super(usersModel);
	}
}

export const usersMongo = new UsersMongo();