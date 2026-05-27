"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paperQueue_1 = require("../queues/paperQueue");
const bullmq_1 = require("bullmq");
const router = express_1.default.Router();
router.post("/generate", async (req, res) => {
    const job = await paperQueue_1.paperQueue.add("generate-paper", {
        subject: "Science",
    });
    res.json({
        success: true,
        jobId: job.id,
    });
});
router.get("/status/:jobId", async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await bullmq_1.Job.fromId(paperQueue_1.paperQueue, jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }
        const state = await job.getState();
        const result = job.returnvalue;
        res.json({
            success: true,
            state,
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get job status",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.default = router;
