
export const generateUserErrorInfo = (user) => {
	return `Una de las propiedas del usuario es incompleta o no valida
	Lista de propiedades:
	* first_name : Se necesita un string, se recibió ${user.first_name}
	* last_name : Se necesita un string, se recibió ${user.last_name}
	* email : Se necesita un string, se recibió ${user.email}`;
};

export const generateUserSignupErrorInfo = (user, email) => {
	return `Una de las propiedas del ya esta registrada lista de propiedades: User : ${user} , email : ${email}`;
};

export const generateGetLoginErrorInfo = () => {
	return "Usuario o Contraseña incorrecto";
};

//[x]
export const generateUserSignupEmptyErrorInfo = () => {
	return "Campos Vacios ,todos los campos son obligatorios";
};

export const generateAuthorizationRolErrorInfo = (rol) => {
	return `Usuario no autorizado. No se puede acceder con el rol de '${rol}'`;
};

export const generateGetProductErrorInfo = (pid) => {
	return `El id ${pid} no corresponde con ningún producto.`;
};

export const generateGetProductParamsErrorInfo = (bdy) => {
	return `Solo esta permitido la propieda quantitf,se recibido ${bdy} `;
};

export const generateGetCartParamsErrorInfo = (obj) => {
	return `Solo esta permitido la propieda quantitf,se recibido ${obj} `;
};

export const generateGetCartErrorInfo = (cid) => {
	return `El id ${cid} no corresponde con ningún carrito.`;
};

export const generateGetProductCodeErrorInfo = () => {
	return "El codigo ya existe";
};
export const generateGetProductNoFoundErrorInfo = () => {
	return "No hay productos";
};
