import Redis from "ioredis";
import { Worker } from "bullmq";

const connection = new Redis(process.env.REDIS_URL);

new Worker(
  "paper-generation",
  async (job) => {
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
  },
  {
    connection,
  }
);