"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

type ActivityItemProps = {
  text: string;
  time: string;
  type: "ai" | "review" | "upload";
};

function ActivityItem({
  text,
  time,
  type,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-all duration-200 group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-zinc-800/20">
      
      <div
        className={cn(
          "p-2 rounded-lg shrink-0 transition-colors",
          type === "ai" &&
            "bg-orange-50 dark:bg-orange-500/10 text-orange-500",
          type === "review" &&
            "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
          type === "upload" &&
            "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
        )}
      >
        {type === "ai" && (
          <Sparkles className="h-3.5 w-3.5" />
        )}

        {type === "review" && (
          <Clock className="h-3.5 w-3.5" />
        )}

        {type === "upload" && (
          <TrendingUp className="h-3.5 w-3.5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors leading-normal">
          {text}
        </p>

        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
          {time}
        </span>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm/50 flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[300px]"
    >
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 tracking-wider uppercase flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          Recent Activity
        </h3>

        <div className="space-y-3.5">
          <ActivityItem
            text="AI generated Biology Quiz"
            time="2 mins ago"
            type="ai"
          />

          <ActivityItem
            text="Physics Assignment reviewed"
            time="10 mins ago"
            type="review"
          />

          <ActivityItem
            text="12 new student submissions uploaded"
            time="1 hr ago"
            type="upload"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 dark:border-zinc-800/80 mt-4 text-center">
        <button className="text-[11px] font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors cursor-pointer">
          View Full Audit Log
        </button>
      </div>
    </motion.div>
  );
}