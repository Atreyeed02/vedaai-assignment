import mongoose from "mongoose";

const QuestionTypeSchema = new mongoose.Schema({
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

const AssignmentSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Assignment",
  AssignmentSchema
);