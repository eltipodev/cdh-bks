import app from "../../app.js";
import config from "./env.config.js";

const PORT = config.port || 3030;

app.listen(PORT, () => {
	console.info("==> Servidor Iniciado en el puerto: ", PORT);
});
