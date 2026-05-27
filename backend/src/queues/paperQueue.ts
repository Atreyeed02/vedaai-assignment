import { Queue } from "bullmq";

export const paperQueue = new Queue(
  "paper-generation",
  {
    connection: {
      url: process.env.REDIS_URL!,
    },
  }
);