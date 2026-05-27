import { Queue } from "bullmq";

export const paperQueue = new Queue(
  "paper-generation",
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);