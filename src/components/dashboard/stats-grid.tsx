import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Clock3,
  Users,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  subtext: string;
  trend: string;
  icon: React.ReactNode;
  iconBg: string;
};

function StatCard({
  title,
  value,
  subtext,
  trend,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            {subtext}
          </p>
        </div>

        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs font-medium text-emerald-500">
          {trend}
        </span>
      </div>
    </motion.div>
  );
}

export default function StatsGrid() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-6 pb-2"
    >
      <StatCard
        title="Total Assignments"
        value="12"
        subtext="+2 from last week"
        trend="+16%"
        icon={<BookOpen className="h-5 w-5 text-orange-500" />}
        iconBg="bg-orange-50 dark:bg-orange-500/10"
      />

      <StatCard
        title="AI Assist Builds"
        value="8"
        subtext="Generated this week"
        trend="+22%"
        icon={<Sparkles className="h-5 w-5 text-violet-500" />}
        iconBg="bg-violet-50 dark:bg-violet-500/10"
      />

      <StatCard
        title="Pending Reviews"
        value="5"
        subtext="Awaiting grading"
        trend="-3%"
        icon={<Clock3 className="h-5 w-5 text-amber-500" />}
        iconBg="bg-amber-50 dark:bg-amber-500/10"
      />

      <StatCard
        title="Active Students"
        value="148"
        subtext="Across all groups"
        trend="+9%"
        icon={<Users className="h-5 w-5 text-emerald-500" />}
        iconBg="bg-emerald-50 dark:bg-emerald-500/10"
      />
    </motion.section>
  );
}