"use strict";

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

Object.defineProperty(exports, "__esModule", { value: true });

exports.redis = void 0;

import ioredis from "ioredis";

exports.redis = new ioredis(process.env.REDIS_URL);