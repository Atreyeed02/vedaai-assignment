import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";

import { redisConnection } from "../config/redis";
import { getIO } from "../socket";

new Worker(
  "paper-generation",

  async (job) => {

    const { assignmentId } = job.data;

    console.log("📄 Processing Job:", job.id);

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

      const generatedPaper = {
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
      };

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

      // ❌ Emit failed status
      getIO().emit("paper-status", {
        status: "failed",
        assignmentId,
      });

      throw error;
    }
  },

  {
    connection: redisConnection.duplicate(),
  }
);

console.log("🚀 Worker Started");