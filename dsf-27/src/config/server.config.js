import { Server } from "socket.io";
import app from "../../app.js";
import config from "./env.config.js";
import { logger } from "../utils/logger.js";

process.env.TZ = "America/Argentina/Buenos_Aires";

const PORT = config.port || 3030;

const httpServer = app.listen(PORT, () => {
	logger.info("==> Servidor Iniciado en el puerto: ", PORT);

});

const socketServer = new Server(httpServer);
const messages = [];

socketServer.on("connection", (socket) => {
	logger.info(`==> Cliente conectado  ${socket.id}`);

	socket.on("newUser", (userName) => {
		socket.broadcast.emit("userConnected", userName);
	});

	socket.on("message", (infoMessage) => {

		messages.push(infoMessage);
		socketServer.emit("chat", messages);
	});
});

