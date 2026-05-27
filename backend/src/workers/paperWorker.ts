import { Worker } from "bullmq";

new Worker(
  "paper-generation",

  async (job) => {

    console.log("Processing Job:", job.id);

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    return {
      success: true,
      paper: {
        sections: [
          {
            title: "Section A",
            difficulty: "Easy",
            questions: [
              {
                question: "Define Force",
                marks: 2,
              },
            ],
          },
        ],
      },
    };
  },

  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);