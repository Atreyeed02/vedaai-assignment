import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";

import Assignment from "../models/Assignment";
import { redisConnection } from "../redis";
import { getIO } from "../socket";

new Worker(
  "paper-generation",

  async (job) => {

    const { assignmentId } = job.data;

    console.log("📄 Processing Job:", job.id);

    // 🔥 Update DB status
    await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        status: "generating",
      }
    );

    // 🔥 Emit generating status
    getIO().emit("paper-status", {
      status: "generating",
      assignmentId,
    });

    try {

      // Fake AI delay
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      // Random question generation
      const sampleQuestions = [
        "Define Force",
        "What is Newton's First Law?",
        "Explain gravity",
        "What is friction?",
        "State Ohm's Law",
        "Define acceleration",
        "What is momentum?",
        "Explain kinetic energy",
      ];

      const randomQuestion =
        sampleQuestions[
          Math.floor(
            Math.random() * sampleQuestions.length
          )
        ];

      const generatedPaper = {
        sections: [
          {
            title: "Section A",
            difficulty: "Easy",
            questions: [
              {
                question: randomQuestion,
                marks: 2,
              },
            ],
          },
        ],
      };

      // ✅ Save generated paper in MongoDB
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          generatedPaper,
          status: "completed",
        }
      );

      console.log("✅ Paper Generated");

      // ✅ Emit completed status
      getIO().emit("paper-status", {
        status: "completed",
        assignmentId,
      });

      return {
        success: true,
        paper: generatedPaper,
      };

    } catch (error) {

      console.error("❌ Worker Error:", error);

      // ❌ Update failed status
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          status: "failed",
        }
      );

      // ❌ Emit failed status
      getIO().emit("paper-status", {
        status: "failed",
        assignmentId,
      });

      throw error;
    }
  },

  {
    connection: redisConnection,
  }
);

console.log("🚀 Worker Started");