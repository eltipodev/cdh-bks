import { logger } from "./logger.js";
import { productsService } from "../services/index.services.js";

const permission = async (req) => {

	const userOwner = req.user._id;
	const userRol = req.user.rol;

	const pid = req.params.pid;

	const findProduct = await productsService.findById(pid);

	const pidOwner = findProduct.payload.owner;
	const pidRol = findProduct.payload.rol;

	logger.info("userOwner", userOwner);
	logger.info("userRol", userRol);
	logger.info("pidOwner", pidOwner);
	logger.info("pidRol", pidRol);

	if (userRol !== "ADMIN" && pidRol !== "ADMIN" && pidOwner !== userOwner) {
		return false;
	}

	return true;
};

export default permission;
