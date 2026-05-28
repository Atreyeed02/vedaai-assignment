"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";

import { api } from "@/lib/api";
import { socket } from "@/lib/socket";

// TYPES
type Question = {
  question: string;
  marks: number;
};

type Section = {
  title: string;
  difficulty: string;
  instruction: string;
  questions: Question[];
};

type Paper = {
  sections: Section[];
};

// DIFFICULTY BADGE
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return {
        bg: "bg-[#e6f4ea]",
        text: "text-[#137333]",
        border: "border-[#ceead6]",
      };

    case "medium":
      return {
        bg: "bg-[#fef7e0]",
        text: "text-[#b06000]",
        border: "border-[#feebc8]",
      };

    case "hard":
      return {
        bg: "bg-[#fce8e6]",
        text: "text-[#c5221f]",
        border: "border-[#fad2cf]",
      };

    default:
      return {
        bg: "bg-[#f1f3f4]",
        text: "text-[#3c4043]",
        border: "border-[#dadce0]",
      };
  }
};

export default function GeneratedPaperPage() {
  const [loading, setLoading] = useState(false);

  const [jobId, setJobId] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);

  const [status, setStatus] = useState("queued");

  const [paper, setPaper] = useState<Paper>({
    sections: [],
  });

  // GET JOB ID
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const id = params.get("jobId");

    if (id) {
      setJobId(id);

      setGenerating(true);
    }
  }, []);

  // SOCKET REALTIME UPDATES
  useEffect(() => {
    if (!jobId) return;

    socket.connect();

    socket.on("paper-status", (data) => {
      console.log("Socket Update:", data);

      setStatus(data.status);

      if (data.jobId !== jobId) return;

      if (data.status === "completed") {
        if (data.paper) {
          setPaper(data.paper);
        }

        setGenerating(false);
      }

      if (data.status === "failed") {
        setGenerating(false);
      }
    });

    return () => {
      socket.off("paper-status");
    };
  }, [jobId]);

  // POLLING FALLBACK
  useEffect(() => {
    if (!jobId) return;

    let intervalId: ReturnType<typeof setInterval>;

    const checkStatus = async () => {
      try {
        const response = await api.get(
          `/paper/status/${jobId}`
        );

        const data = response.data;

        if (data.success) {
          if (data.state === "completed") {
            if (data.result?.paper) {
              setPaper(data.result.paper);
            }

            setStatus("completed");

            setGenerating(false);

            clearInterval(intervalId);
          }

          if (data.state === "failed") {
            setStatus("failed");

            setGenerating(false);

            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Polling Error:", error);

        setStatus("failed");

        setGenerating(false);

        clearInterval(intervalId);
      }
    };

    checkStatus();

    intervalId = setInterval(
      checkStatus,
      3000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [jobId]);

  // DOWNLOAD PDF
  const downloadPDF = () => {
    window.print();
  };

  // REGENERATE
  const regeneratePaper = async () => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    setLoading(false);
  };

  return (
    <div className="dark flex h-screen bg-black overflow-hidden text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          darkMode={true}
          setDarkMode={() => {}}
          onMenuClick={() => {}}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-black">
          {/* HERO */}
          <div className="relative bg-black p-8 mb-8 border border-zinc-800">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>

                <span className="text-xs uppercase tracking-[0.35em] text-zinc-500 font-semibold">
                  AI GENERATED
                </span>
              </div>

              <h1 className="text-5xl font-black tracking-tight leading-tight">
                Customized Question Paper Ready
              </h1>

              <p className="text-zinc-400 mt-5 text-[15px] leading-7 max-w-3xl">
                Your AI generated paper is ready.
              </p>

              <div className="flex items-center gap-4 mt-7">
                <button
                  onClick={downloadPDF}
                  className="bg-orange-500 px-6 py-3 rounded-2xl text-sm font-semibold text-white hover:bg-orange-600 transition"
                >
                  Download PDF
                </button>

                <button
                  onClick={regeneratePaper}
                  className="bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-zinc-800 transition-all duration-300"
                >
                  {loading
                    ? "Regenerating..."
                    : "Regenerate"}
                </button>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="mb-4">
            <p className="text-lg font-semibold text-white">
              Status: {status}
            </p>
          </div>

          {/* PAPER */}
          <div className="mb-4">
  <p className="text-lg font-semibold text-white">
    Status: {status}
  </p>
</div>
          <div
            id="paper"
            className="max-w-4xl mx-auto bg-white text-black p-10 shadow-2xl"
          >
            {generating ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

                <h3 className="mt-6 text-xl font-bold">
                  Generating Paper...
                </h3>
              </div>
            ) : (
              <>
                {/* HEADER */}
                <div className="text-center border-b-2 border-black pb-6 mb-8">
                  <h1 className="text-3xl font-bold uppercase">
                    Delhi Public School
                  </h1>

                  <p className="mt-2 text-sm uppercase tracking-widest">
                    AI Assessment Paper
                  </p>
                </div>

                {/* STUDENT INFO */}
                <div className="border border-black p-4 mb-8 text-sm">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      Name:
                      ___________________
                    </div>

                    <div>
                      Roll Number:
                      ___________________
                    </div>

                    <div>
                      Section:
                      ___________________
                    </div>

                    <div>
                      Date:
                      ___________________
                    </div>
                  </div>
                </div>

                {/* SECTIONS */}
                <div className="space-y-10">
                  {paper.sections?.map(
                    (section, sectionIndex) => {
                      const badge =
                        getDifficultyBadge(
                          section.difficulty
                        );

                      return (
                        <div key={sectionIndex}>
                          <div className="flex items-center justify-between border-b pb-2 mb-4">
                            <div className="flex items-center gap-3">
                              <h2 className="text-xl font-bold uppercase">
                                {section.title}
                              </h2>

                              <span
                                className={`px-2 py-1 rounded-full text-xs border ${badge.bg} ${badge.text} ${badge.border}`}
                              >
                                {section.difficulty}
                              </span>
                            </div>
                          </div>

                          <p className="italic text-gray-600 mb-6">
                            {section.instruction}
                          </p>

                          <div className="space-y-6">
                            {section.questions?.map(
                              (q, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between gap-4"
                                >
                                  <div>
                                    <span className="font-bold mr-2">
                                      {index + 1}.
                                    </span>

                                    {q.question}
                                  </div>

                                  <div className="font-bold whitespace-nowrap">
                                    [{q.marks} Marks]
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}