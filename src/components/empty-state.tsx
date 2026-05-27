"use client";

import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

export default function EmptyState({
  title = "No assignments found",
  description = "Try adjusting your search or filter to find what you're looking for.",
  onReset,
  resetLabel = "Reset Filters",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {/* Illustrated Icon */}
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-500/10 dark:to-amber-500/10 flex items-center justify-center shadow-sm">
          <SearchX className="h-9 w-9 text-orange-400 dark:text-orange-500/70" />
        </div>
        {/* Decorative dots */}
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-200 dark:bg-orange-500/20 animate-pulse" />
        <span className="absolute -bottom-1.5 -left-1.5 h-2 w-2 rounded-full bg-amber-200 dark:bg-amber-500/20" />
      </div>

      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[260px] leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-5 px-5 py-2 text-xs font-semibold rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
