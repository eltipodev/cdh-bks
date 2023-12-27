import { EErrors } from "../services/errors/errors.enum.js";

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
	switch (error.code) {
		case EErrors.BAD_REQUEST:
			res.status(400).send({ status: "error", error: error.name, cause: error.cause, message: error.message, folder: error.folder, fileName: error.fileName, lineNumber: error.lineNumber });
			break;
		case EErrors.UNAUTHORIZED:
			res.status(401).send({ status: "error", error: error.name, cause: error.cause, message: error.message, folder: error.folder, fileName: error.fileName, lineNumber: error.lineNumber });
			break;
		case EErrors.FORBIDDEN:
			res.status(403).send({ status: "error", error: error.name, cause: error.cause, message: error.message, folder: error.folder, fileName: error.fileName, lineNumber: error.lineNumber });
			break;
		case EErrors.NOT_FOUND:
			res.status(404).send({ status: "error", error: error.name, cause: error.cause, message: error.message, folder: error.folder, fileName: error.fileName, lineNumber: error.lineNumber });
			break;

		case EErrors.INVALID_INPUT:
			res.status(422).send({ status: "error", error: "Unprocessable Entity - Invalid Input" });
			break;
		case EErrors.SERVER_ERROR:
			res.status(500).send({ status: "error", error: error.name, cause: error.cause, message: error.message, folder: error.folder, fileName: error.fileName, lineNumber: error.lineNumber });
			break;
		default:
			res.send({ status: "error", error: "Unhandled error" });
			break;
	}
};

