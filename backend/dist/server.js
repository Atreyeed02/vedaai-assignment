"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./socket/socket");
require("./workers/paperWorker");
dotenv_1.default.config();
(0, db_1.default)();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app_1.default);
(0, socket_1.initSocket)(server);
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
