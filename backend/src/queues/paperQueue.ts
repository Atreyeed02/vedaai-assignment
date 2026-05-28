import dotenv from "dotenv";
dotenv.config();
import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const paperQueue = new Queue(
  "paper-generation",
  {
    connection: redisConnection,
  }
);