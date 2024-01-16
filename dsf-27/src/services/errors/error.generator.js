import { extractFileNameAndLineNumber } from "./error.extrat.file.location.js";

export default class CustomError {
	static createError({ name = "Error", cause, message, code = 1 }) {

		const error = new Error(message, { cause });
		const stackTrace = (new Error()).stack;

		const { folder, fileName, lineNumber } = extractFileNameAndLineNumber(stackTrace);

		error.name = name;
		error.code = code;
		error.message = message;
		error.folder = folder;
		error.fileName = fileName;
		error.lineNumber = lineNumber;

		throw error;
	}

	static createErrorJson({ name = "Error", cause, message, code = 1 }) {
		const stackTrace = new Error().stack;

		const { folder, fileName, lineNumber } = extractFileNameAndLineNumber(stackTrace);

		return {
			name,
			code,
			message,
			folder,
			fileName,
			lineNumber,
			cause
		};
	}
}

