"use client";

import { useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottom-nav";

import { ProgressBar } from "@/components/ui/progress-bar";
import FileDropzone from "@/components/ui/file-dropzone";
import QuestionBuilder from "@/components/assignment/question-builder";

import { useAssignmentStore } from "@/store/assignment-store";
import { api } from "@/lib/api";

import {
  ArrowLeft,
  Bell,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  Check,
  FileText,
  Upload,
  HelpCircle,
  ClipboardCheck,
} from "lucide-react";

const STEPS = ["Details", "Resources", "Questions", "Review"];

export default function CreateAssignment() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [publishing, setPublishing] = useState(false);

  // Zustand Store
  const {
  title,
  dueDate,
  instructions,
  questionTypes,
  setTitle,
  setDueDate,
  setInstructions,
} = useAssignmentStore();

  const nextStep = () => {

  // Step 1 validation
  if (currentStep === 0) {

    if (!title.trim()) {
      alert("Assignment title is required");
      return;
    }

    if (!dueDate) {
      alert("Due date is required");
      return;
    }

    const selectedDate = new Date(dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Due date cannot be in the past");
      return;
    }

    if (!instructions.trim()) {
      alert("Instructions are required");
      return;
    }
  }

  if (currentStep < STEPS.length - 1) {
    setCurrentStep((prev) => prev + 1);
  }
};

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const publishAssignment = async () => {
  // console.log("[TEMPORARY DEBUG] Publish Assignment button clicked.");
  setPublishing(true);

  try {
    const formData = {
      title,
      dueDate,
      instructions,
      questionTypes,
    };

    // console.log(
    //   "[TEMPORARY DEBUG] Sending API request to POST /assignments",
    //   formData
    // );

    const response = await api.post(
  "/assignments",
  formData
);

    // console.log(
    //   "[TEMPORARY DEBUG] API Response received:",
    //   response.data
    // );

    // console.log(
    //   "[TEMPORARY DEBUG] Redirecting to /generated-paper"
    //  );

    window.location.href = `/generated-paper?jobId=${response.data.jobId}`;

  } catch (error: unknown) {
  console.error("Failed to publish assignment", error);

  const err = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
    message?: string;
  };
  
  alert(
    "Failed to publish assignment: " +
      (
        err.response?.data?.message ||
        err.message ||
        "Unknown error"
      )
  );
} finally {
  setPublishing(false);
}
};
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[70px] border-b border-zinc-800 px-6 flex items-center justify-between bg-black">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-zinc-900"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/"
              className="p-2 rounded-full hover:bg-zinc-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>Assignments</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">
                Create New
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-zinc-900"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button className="relative p-2 rounded-full hover:bg-zinc-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center font-semibold">
              JD
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-black px-4 md:px-8 py-6">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs uppercase tracking-wider text-zinc-500 mb-3">
              {STEPS.map((step, index) => (
                <span
                  key={step}
                  className={
                    index <= currentStep
                      ? "text-white"
                      : "text-zinc-600"
                  }
                >
                  {step}
                </span>
              ))}
            </div>
              <ProgressBar
  steps={STEPS}
  currentStep={currentStep}
/>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              {/* STEP 1 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <Card>
                    <SectionTitle
                      icon={<ClipboardCheck className="h-5 w-5" />}
                      title="Assignment Details"
                    />

                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        label="Assignment Title"
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                        placeholder="Enter assignment title"
                      />

                      <FormField
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                          setDueDate(e.target.value)
                        }
                        placeholder=""
                      />
                    </div>

                    <div className="mt-5">
                      <FormField
                        label="Additional Instructions"
                        value={instructions}
                        onChange={(e) =>
                          setInstructions(e.target.value)
                        }
                        placeholder="Enter assignment instructions..."
                        multiline
                      />
                    </div>
                  </Card>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 1 && (
                <Card>
                  <SectionTitle
                    icon={<Upload className="h-5 w-5" />}
                    title="Upload Resources"
                  />

                  <FileDropzone
  onFilesChange={setUploadedFiles}
/>
                </Card>
              )}

              {/* STEP 3 */}
              {currentStep === 2 && (
                <Card>
                  <SectionTitle
                    icon={<HelpCircle className="h-5 w-5" />}
                    title="Question Builder"
                  />

                  <QuestionBuilder />
                </Card>
              )}

              {/* STEP 4 */}
              {currentStep === 3 && (
                <Card>
                  <SectionTitle
                    icon={<FileText className="h-5 w-5" />}
                    title="Review Assignment"
                  />

                  <div className="space-y-5">
                    <ReviewItem
                      title="Assignment Title"
                      value={title}
                    />

                    <ReviewItem
                      title="Due Date"
                      value={dueDate}
                    />

                    <ReviewItem
                      title="Instructions"
                      value={instructions}
                    />

                    <ReviewItem
                      title="Uploaded Files"
                      value={`${uploadedFiles.length} files uploaded`}
                    />
                  </div>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Buttons */}
          <div className="max-w-5xl mx-auto mt-8 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 text-sm hover:bg-zinc-900 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:opacity-90"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={publishAssignment}
                disabled={publishing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" />
                {publishing ? "Publishing..." : "Publish Assignment"}
              </button>
            )}
          </div>
        </main>

        {/* Mobile Nav */}
        <BottomNav />
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
      {children}
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  multiline = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  type?: string;
  multiline?: boolean;
}) {
  const baseClasses =
    "w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-500 outline-none focus:border-orange-500 transition";

  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-400">
        {label}
      </label>

      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={5}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function ReviewItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-sm text-zinc-400 mb-1">
        {title}
      </p>

      <p className="text-white font-medium">
        {value || "Not provided"}
      </p>
    </div>
  );
}
