"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(object, options) {
    const key = process.env.ACCESS_TOKEN_PRIVATE_KEY;
    const signingKey = Buffer.from(String(key), "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    const key = process.env.ACCESS_TOKEN_PUBLIC_KEY;
    const publicKey = Buffer.from(String(key), 'base64').toString('ascii');
    try {
        const decode = jsonwebtoken_1.default.verify(token, publicKey);
        return decode;
    }
    catch (error) {
        return null;
    }
}
exports.verifyJwt = verifyJwt;
