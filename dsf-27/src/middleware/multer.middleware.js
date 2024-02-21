import __dirName from "../utils/__dirname.utils.js";
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {

		if (file.fieldname === "profiles") {
			return cb(null, `${__dirName}/docs/profiles`);
		}
		else if (file.fieldname === "products") {
			return cb(null, `${__dirName}/docs/products"`);
		}
		else {

			return cb(null, `${__dirName}/docs/documents`);
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
		const fileExtension = file.originalname.split(".").pop();
		cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
	}

});

// eslint-disable-next-line no-unused-vars
const upload = multer({ storage: storage });

export default upload;