"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = __importDefault(require("../models/Assignment"));
const paperQueue_1 = require("../queues/paperQueue");
const createAssignment = async (req, res) => {
    console.log("[TEMPORARY DEBUG] backend controller hit: createAssignment");
    try {
        const assignment = await Assignment_1.default.create(req.body);
        console.log("[TEMPORARY DEBUG] Mongo save success:", assignment._id);
        // Trigger paper generation job on BullMQ
        const job = await paperQueue_1.paperQueue.add("generate-paper", {
            assignmentId: assignment._id,
            title: assignment.title,
            instructions: assignment.instructions,
            questionTypes: assignment.questionTypes,
        });
        console.log("[TEMPORARY DEBUG] queue job added:", job.id);
        res.status(201).json({
            success: true,
            data: assignment,
            jobId: job.id,
        });
    }
    catch (error) {
        console.error("[TEMPORARY DEBUG] Failed to create assignment:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create assignment",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment_1.default.find().sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            data: assignments,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch assignments",
        });
    }
};
exports.getAssignments = getAssignments;
