"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paperQueue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
exports.paperQueue = new bullmq_1.Queue("paper-generation", {
    connection: redis_1.redisConnection,
});
