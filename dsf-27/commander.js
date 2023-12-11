import { program } from "commander";

program
	.option("-e ,--environment <environment>", "ambiente a ejecutar", "dev")
	.option("-p ,--port  <port>", "puerto a utilizar", 8080)
	.parse();

console.log("==>  program.opts", program.opts());
export default program;