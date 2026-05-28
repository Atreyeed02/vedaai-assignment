import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";

new Worker(
  "paper-generation",

  async (job) => {

    console.log("Processing Job:", job.id);

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

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
  },

  {
    connection: redisConnection,
  }
);

console.log("🚀 Worker Started");