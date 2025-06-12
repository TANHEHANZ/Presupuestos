"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("./server");
const config_1 = __importDefault(require("./infraestructure/config/config"));
const server = (0, server_1.createServer)();
server.listen(config_1.default.port, () => {
    console.log(`PRESUPUESTOS BACKEND Run in :  http://localhost:${config_1.default.port}`);
});
