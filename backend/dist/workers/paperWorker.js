"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
new bullmq_1.Worker("paper-generation", async (job) => {
    console.log("Processing Job:", job.id);
    await new Promise((resolve) => setTimeout(resolve, 3000));
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
}, {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
});
