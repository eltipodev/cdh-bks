export default class CustomError {
	static generateErrorg(message, code, name) {
		const error = new Error(message);
		error.code = code;
		error.name = name;
		throw error;
	}
}