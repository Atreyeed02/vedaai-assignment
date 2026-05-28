import { Queue } from "bullmq";
import { redisConnection } from "../redis";

export const paperQueue = new Queue(
  "paper-generation",
  {
    connection: redisConnection,
  }
);