import app from "../../app.js";
import config from "./env.config.js";

console.log("==> configsssssss", config);

const PORT = config.port || 3030;

app.listen(PORT, () => {
	console.info("==> Servidor Iniciado en el puerto: ", PORT);
});
