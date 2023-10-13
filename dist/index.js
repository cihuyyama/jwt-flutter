"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
// import log from "./utils/logger";
const routes_1 = __importDefault(require("./routes"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use(deserializeUser_1.default);
app.get('/', (req, res) => {
    return res.send("App is Running").end();
});
app.use(routes_1.default);
const port = 5000;
app.listen(5000, () => {
    // log.info(`App started at http://localhost:${port}`)
    console.log(`App started at http://localhost:${port}`);
    (0, connectToDb_1.default)();
});
