import http from "http";
import dotenv from "dotenv";

import app from "./app";

import connectDB from "./config/db";

import { initSocket } from "./socket/socket";

import "./workers/paperWorker";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});