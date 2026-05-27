import express from "express";
import { paperQueue } from "../queues/paperQueue";
import { Job } from "bullmq";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const job = await paperQueue.add(
    "generate-paper",
    {
      subject: "Science",
    }
  );

  res.json({
    success: true,
    jobId: job.id,
  });
});

router.get("/status/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.fromId(paperQueue, jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const state = await job.getState();
    const result = job.returnvalue;

    res.json({
      success: true,
      state,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get job status",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;