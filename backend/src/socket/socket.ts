import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: unknown) => {

  io = new Server(server as never, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", () => {
    console.log("Client connected");
  });
};

export const getIO = () => io;