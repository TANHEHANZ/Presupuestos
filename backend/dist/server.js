"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./modules/routes"));
const path_1 = __importDefault(require("path"));
const createServer = () => {
    const app = (0, express_1.default)();
    app
        .disable("x-powered-by")
        .use(express_1.default.urlencoded({ extended: true }))
        .use(express_1.default.json({ limit: "50mb" }))
        .use(express_1.default.json())
        .use((0, cors_1.default)())
        .use("/v1/api/", routes_1.default)
        .use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    app.get("/", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../src/modules/public/index.html"));
    });
    return app;
};
exports.createServer = createServer;
