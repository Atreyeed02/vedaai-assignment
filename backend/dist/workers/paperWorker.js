"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
new bullmq_1.Worker("paper-generation", async (job) => {
    console.log("Processing Job:", job.id);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
        success: true,
        paper: {
            sections: [
                {
                    title: "Section A",
                    difficulty: "Easy",
                    questions: [
                        {
                            question: "Define Force",
                            marks: 2,
                        },
                    ],
                },
            ],
        },
    };
}, {
    connection: redis_1.redisConnection,
});
console.log("🚀 Worker Started");
