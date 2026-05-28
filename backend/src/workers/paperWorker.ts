import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";

import Assignment from "../models/Assignment";
import { redisConnection } from "../redis";
import { getIO } from "../socket";

const easyQuestions = [
  "Define Force",
  "What is gravity?",
  "Explain friction",
  "Define acceleration",
  "What is velocity?",
];

const mediumQuestions = [
  "Explain Newton's Second Law",
  "Differentiate speed and velocity",
  "Explain kinetic energy",
  "What is momentum?",
  "Explain Ohm's Law",
];

const hardQuestions = [
  "Derive Newton's Third Law",
  "Explain conservation of energy",
  "Discuss electromagnetic induction",
  "Explain thermodynamics laws",
  "What is rotational motion?",
];

const getRandomQuestions = (
  questions: string[],
  count: number,
  marks: number
) => {

  const shuffled = [...questions].sort(
    () => 0.5 - Math.random()
  );

  return shuffled.slice(0, count).map(
    (question) => ({
      question,
      marks,
    })
  );
};

new Worker(

  "paper-generation",

  async (job) => {

    const { assignmentId } = job.data;

    console.log(
      "📄 Processing Job:",
      job.id
    );

    // Update status to generating
    await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        status: "generating",
      }
    );

    // Emit generating status
    getIO().emit(
      "paper-status",
      {
        status: "generating",
        assignmentId,
      }
    );

    try {

      // Fake AI delay
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 3000)
      );

      const generatedPaper = {

        sections: [

          {
            title: "Section A",

            difficulty: "Easy",

            instruction:
              "Attempt all questions",

            questions:
              getRandomQuestions(
                easyQuestions,
                3,
                2
              ),
          },

          {
            title: "Section B",

            difficulty: "Medium",

            instruction:
              "Attempt any 3 questions",

            questions:
              getRandomQuestions(
                mediumQuestions,
                3,
                5
              ),
          },

          {
            title: "Section C",

            difficulty: "Hard",

            instruction:
              "Attempt any 2 questions",

            questions:
              getRandomQuestions(
                hardQuestions,
                2,
                10
              ),
          },

        ],
      };

      // Save generated paper
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          generatedPaper,
          status: "completed",
        }
      );

      console.log(
        "✅ Paper Generated"
      );

      // Emit completed status
      getIO().emit(
        "paper-status",
        {
          status: "completed",
          assignmentId,
          paper: generatedPaper,
        }
      );

      return {
        success: true,
        paper: generatedPaper,
      };

    } catch (error) {

      console.error(
        "❌ Worker Error:",
        error
      );

      // Update failed status
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          status: "failed",
        }
      );

      // Emit failed status
      getIO().emit(
        "paper-status",
        {
          status: "failed",
          assignmentId,
        }
      );

      throw error;
    }

  },

  {
    connection: redisConnection,
  }

);

console.log("🚀 Worker Started");