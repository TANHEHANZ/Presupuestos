"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPayload = encryptPayload;
exports.decryptPayload = decryptPayload;
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("../config/config"));
const KEY = Buffer.from(config_1.default.token_secret_key, "hex");
function generateIV() {
    return (0, crypto_1.randomBytes)(16);
}
function encryptPayload(payload) {
    const iv = generateIV();
    const cipher = (0, crypto_1.createCipheriv)("aes-256-gcm", KEY, iv);
    const json = JSON.stringify(payload);
    let encrypted = cipher.update(json, "utf8", "base64");
    encrypted += cipher.final("base64");
    const authTag = cipher.getAuthTag().toString("base64");
    return {
        encryptedData: encrypted + "." + authTag,
        iv: iv.toString("base64"),
    };
}
function decryptPayload(encryptedData, ivBase64) {
    const [encrypted, authTagB64] = encryptedData.split(".");
    const iv = Buffer.from(ivBase64, "base64");
    const authTag = Buffer.from(authTagB64, "base64");
    const decipher = (0, crypto_1.createDecipheriv)("aes-256-gcm", KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
}
