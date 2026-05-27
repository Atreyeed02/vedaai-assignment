import express from "express";

import {
  createAssignment,
  getAssignments,
} from "../controllers/assignment.controller";

const router = express.Router();

router.post("/", createAssignment);
router.get("/", getAssignments);

export default router;