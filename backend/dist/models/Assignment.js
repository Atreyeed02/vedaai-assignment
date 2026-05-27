"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionTypeSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
});
const AssignmentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    questionTypes: [QuestionTypeSchema],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Assignment", AssignmentSchema);
