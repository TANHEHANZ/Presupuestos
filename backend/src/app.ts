import dotenv from "dotenv";
dotenv.config();
import { createServer } from "./server";
import config from "./infraestructure/config/config";

const server = createServer();

server.listen(config.port, () => {
  console.log(`PRESUPUESTOS BACKEND Run in :  http://localhost:${config.port}`);
});
