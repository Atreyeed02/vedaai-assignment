"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.paperQueue = void 0;

import { Queue } from "bullmq";
import Redis from "ioredis";

const connection = new Redis(process.env.REDIS_URL);

exports.paperQueue = new Queue("paper-generation", {
  connection,
});