'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAssignmentStore } from "@/store/assignment-store";

interface QuestionRow {
  id: string;
  type: string;
  count: number;
  marks: number;
}

const QUESTION_TYPES = [
  'Multiple Choice',
  'Short Answer',
  'True/False',
  'Essay',
  'Fill in the Blanks',
] as const;

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
}

function createDefaultRow(): QuestionRow {
  return {
    id: generateId(),
    type: 'Multiple Choice',
    count: 1,
    marks: 1,
  };
}

export default function QuestionBuilder() {
  const { questionTypes, setQuestionTypes } = useAssignmentStore();

  const [rows, setRows] = useState<QuestionRow[]>(() => {
    if (questionTypes && questionTypes.length > 0) {
      return questionTypes.map((qt) => ({
        id: generateId(),
        type: qt.type,
        count: qt.count,
        marks: qt.marks,
      }));
    }
    return [createDefaultRow()];
  });

  const { totalQuestions, totalMarks } = useMemo(() => {
    return rows.reduce(
      (acc, row) => ({
        totalQuestions: acc.totalQuestions + row.count,
        totalMarks: acc.totalMarks + row.count * row.marks,
      }),
      { totalQuestions: 0, totalMarks: 0 }
    );
  }, [rows]);

  // Sync rows back to Zustand store whenever they change
  useEffect(() => {
    const storeQuestionTypes = rows.map((r) => ({
      type: r.type,
      count: r.count,
      marks: r.marks,
    }));
    setQuestionTypes(storeQuestionTypes);
  }, [rows, setQuestionTypes]);

  const addRow = () => {
    setRows((prev) => [...prev, createDefaultRow()]);
  };

  const removeRow = (id: string) => {
    if (rows.length === 1) {
      return;
    }
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRow = (id: string, field: keyof QuestionRow, value: string | number) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Question Types
        </h3>
        <button
          type="button"
          onClick={addRow}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium',
            'bg-blue-600 text-white shadow-sm',
            'hover:bg-blue-700 active:bg-blue-800',
            'dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            'dark:focus-visible:ring-offset-gray-900'
          )}
        >
          <Plus className="h-4 w-4" />
          Add Question Type
        </button>
      </div>

      {/* Column labels (visible on desktop) */}
      <div
        className={cn(
          'hidden md:grid md:grid-cols-[1fr_auto_auto_auto] gap-4 px-4',
          'text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'
        )}
      >
        <span>Question Type</span>
        <span className="w-36 text-center">No. of Questions</span>
        <span className="w-36 text-center">Marks per Question</span>
        <span className="w-10" />
      </div>

      {/* Rows */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {rows.map((row) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 items-center',
                'rounded-xl border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-800/60',
                'p-4 shadow-sm',
                'hover:border-gray-300 dark:hover:border-gray-600',
                'hover:shadow-md',
                'transition-all duration-150'
              )}
            >
              {/* Question Type Select */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 md:hidden">
                  Question Type
                </label>
                <Select
                  value={row.type}
                  onValueChange={(value) => updateRow(row.id, 'type', value)}
                >
                  <SelectTrigger
                    className={cn(
                      'w-full rounded-lg border-gray-200 dark:border-gray-700',
                      'bg-gray-50 dark:bg-gray-900/50',
                      'focus:ring-2 focus:ring-blue-500/30',
                      'transition-colors duration-150'
                    )}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUESTION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 md:hidden">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={row.count}
                  onChange={(e) =>
                    updateRow(
                      row.id,
                      'count',
                      Math.max(1, Math.min(50, Number(e.target.value) || 1))
                    )
                  }
                  className={cn(
                    'w-full md:w-36 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm',
                    'bg-gray-50 dark:bg-gray-900/50',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
                    'transition-colors duration-150',
                    'text-center'
                  )}
                />
              </div>

              {/* Marks per Question */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 md:hidden">
                  Marks per Question
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={row.marks}
                  onChange={(e) =>
                    updateRow(
                      row.id,
                      'marks',
                      Math.max(1, Math.min(100, Number(e.target.value) || 1))
                    )
                  }
                  className={cn(
                    'w-full md:w-36 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm',
                    'bg-gray-50 dark:bg-gray-900/50',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
                    'transition-colors duration-150',
                    'text-center'
                  )}
                />
              </div>

              {/* Remove Button */}
              <div className="flex justify-end md:justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length === 1}
                  className={cn(
                    'inline-flex items-center justify-center rounded-lg p-2',
                    'text-gray-400 dark:text-gray-500',
                    'hover:bg-red-50 hover:text-red-600',
                    'dark:hover:bg-red-950/30 dark:hover:text-red-400',
                    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
                    'dark:focus-visible:ring-offset-gray-900'
                  )}
                  aria-label="Remove question type"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div
        className={cn(
          'rounded-xl border border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800/40',
          'px-5 py-4',
          'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'
        )}
      >
        <div className="flex items-center gap-6">
          <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Questions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalQuestions}
            </p>
          </div>
          <div
            className="hidden sm:block h-10 w-px bg-gray-200 dark:bg-gray-700"
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Marks
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalMarks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
