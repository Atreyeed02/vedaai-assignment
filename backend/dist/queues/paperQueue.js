"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paperQueue = void 0;
const bullmq_1 = require("bullmq");
exports.paperQueue = new bullmq_1.Queue("paper-generation", {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
});
