import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";

import { redisConnection } from "../redis";
import { getIO } from "../socket";

new Worker(
  "paper-generation",

  async (job) => {

    const { assignmentId } = job.data;

    console.log("📄 Processing Job:", job.id);

    getIO().emit("paper-status", {
      status: "generating",
      assignmentId,
    });

    try {

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