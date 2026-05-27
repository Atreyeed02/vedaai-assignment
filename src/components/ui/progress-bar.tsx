"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  steps: string[]
  currentStep: number
  className?: string
}

function ProgressBar({ steps, currentStep, className }: ProgressBarProps) {
  return (
    <div
      data-slot="progress-bar"
      className={cn("w-full px-2 py-4", className)}
      role="navigation"
      aria-label="Progress"
    >
      <ol className="flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isFuture = index > currentStep
          const isLast = index === steps.length - 1

          return (
            <li
              key={step}
              className={cn(
                "relative flex items-center",
                !isLast && "flex-1"
              )}
            >
              {/* Step circle + label group */}
              <div className="z-10 flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    // Base styles
                    "flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-500 ease-in-out",
                    // Responsive sizing: smaller on mobile
                    "size-8 text-xs sm:size-10 sm:text-sm",
                    // Completed state
                    isCompleted &&
                      "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30 dark:border-orange-400 dark:bg-orange-400 dark:shadow-orange-400/20",
                    // Active state
                    isActive &&
                      "border-orange-500 bg-orange-50 text-orange-600 shadow-lg shadow-orange-500/25 ring-4 ring-orange-500/10 dark:border-orange-400 dark:bg-orange-950 dark:text-orange-300 dark:shadow-orange-400/15 dark:ring-orange-400/10",
                    // Future state
                    isFuture &&
                      "border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="size-4 sm:size-5" strokeWidth={3} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Label — hidden on mobile */}
                <span
                  className={cn(
                    "mt-2 hidden text-center text-xs font-medium transition-colors duration-300 sm:block",
                    "max-w-[5rem] truncate",
                    isCompleted && "text-orange-600 dark:text-orange-400",
                    isActive && "text-orange-600 dark:text-orange-300",
                    isFuture && "text-gray-400 dark:text-gray-500"
                  )}
                >
                  {step}
                </span>
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div className="relative mx-2 h-0.5 flex-1 sm:mx-3">
                  {/* Background track */}
                  <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                  {/* Filled portion — fills fully when step is completed */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-in-out",
                      isCompleted
                        ? "w-full bg-orange-500 dark:bg-orange-400"
                        : isActive
                          ? "w-0 bg-orange-500 dark:bg-orange-400"
                          : "w-0 bg-gray-200 dark:bg-gray-700"
                    )}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default ProgressBar
export { ProgressBar }
export type { ProgressBarProps }
