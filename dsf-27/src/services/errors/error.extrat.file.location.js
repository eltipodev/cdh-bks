export const extractFileNameAndLineNumber = (stackTrace) => {

	const lineNumbers = stackTrace.split("\n")[2].split(":")[2];
	const fileErrorsName = stackTrace.split("\n")[2].split(":")[1].split("/").pop();
	const fileLocationErrorFolder = stackTrace.split("\n")[2].split(":")[1].split("/");

	const LocationErrorFolder = fileLocationErrorFolder[fileLocationErrorFolder.length - 2];

	if (stackTrace) {

		return {
			folder: LocationErrorFolder,
			fileName: fileErrorsName,
			lineNumber: lineNumbers
		};
	}
};