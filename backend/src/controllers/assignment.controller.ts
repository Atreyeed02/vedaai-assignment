import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import { paperQueue } from "../queues/paperQueue";

export const createAssignment = async (
  req: Request,
  res: Response
) => {
  // console.log("[TEMPORARY DEBUG] backend controller hit: createAssignment");
  try {
    const assignment = await Assignment.create(req.body);
      

    // Trigger paper generation job on BullMQ
    const job = await paperQueue.add(
      "generate-paper",
      {
        assignmentId: assignment._id,
        title: assignment.title,
        instructions: assignment.instructions,
        questionTypes: assignment.questionTypes,
      }
    );
    // console.log("[TEMPORARY DEBUG] queue job added:", job.id);

    res.status(201).json({
      success: true,
      data: assignment,
      jobId: job.id,
    });
  } catch (error) {
    console.error("[TEMPORARY DEBUG] Failed to create assignment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create assignment",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAssignments = async (
  req: Request,
  res: Response
) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
};