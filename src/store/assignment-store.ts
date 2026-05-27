import { create } from "zustand";

interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

interface AssignmentStore {
  title: string;
  dueDate: string;
  instructions: string;

  questionTypes: QuestionType[];

  setTitle: (title: string) => void;
  setDueDate: (date: string) => void;
  setInstructions: (instructions: string) => void;

  setQuestionTypes: (
    questions: QuestionType[]
  ) => void;
}

export const useAssignmentStore =
  create<AssignmentStore>((set) => ({
    title: "",
    dueDate: "",
    instructions: "",

    questionTypes: [],

    setTitle: (title) => set({ title }),

    setDueDate: (dueDate) =>
      set({ dueDate }),

    setInstructions: (instructions) =>
      set({ instructions }),

    setQuestionTypes: (questionTypes) =>
      set({ questionTypes }),
  }));