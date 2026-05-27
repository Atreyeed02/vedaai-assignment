import express from "express";
import cors from "cors";

import paperRoutes from "./routes/paperRoutes";
import assignmentRoutes from "./routes/assignment.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/paper", paperRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;