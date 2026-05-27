"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottom-nav";
import EmptyState from "@/components/empty-state";
import {
  Sparkles,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import AssignmentCard from "@/components/dashboard/assignment-card";
import StatsGrid from "@/components/dashboard/stats-grid";
import SearchFilter from "@/components/dashboard/search-filter";
import RecentActivity from "@/components/dashboard/recent-activity";

// Mock Assignment Data
const mockAssignments = [
  {
    id: "1",
    title: "Introduction to Photosynthesis",
    assignedDate: "May 20, 2026",
    dueDate: "May 27, 2026",
    status: "Active",
  },
  {
    id: "2",
    title: "Quantum Mechanics Basics",
    assignedDate: "May 22, 2026",
    dueDate: "May 29, 2026",
    status: "Draft",
  },
  {
    id: "3",
    title: "Linear Algebra - Vector Spaces",
    assignedDate: "May 18, 2026",
    dueDate: "May 25, 2026",
    status: "Grading",
  },
  {
    id: "4",
    title: "Organic Chemistry Nomenclature",
    assignedDate: "May 25, 2026",
    dueDate: "June 01, 2026",
    status: "Active",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system setting
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(true);
    }
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  // Filter assignments dynamically based on search query and status filter
  const statusMap: Record<string, string> = {
    Pending: "Draft",
    Completed: "Active",
    "AI Generated": "Grading",
  };

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || assignment.status === statusMap[filterStatus];
    return matchesSearch && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterStatus("All");
  };

  return (
    <main className="flex h-screen overflow-hidden bg-[#f7f9fa] dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - responsive collapsible */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <DashboardHeader
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  onMenuClick={() => setSidebarOpen(true)}
/>
        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto flex flex-col pb-20 md:pb-0">
          {/* Stats Cards Section */}
          <StatsGrid />

          {/* Main Grid for content below stats */}
          <div className="flex-1 p-6 pt-2 gap-6 grid grid-cols-1 lg:grid-cols-3 items-stretch shrink-0">
            {/* Left column: Assignments Grid & Search */}
            <div className="lg:col-span-2 flex flex-col transition-all duration-300">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white tracking-wider uppercase flex items-center gap-2">
                  Active Assignments
                  <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
                    ({filteredAssignments.length})
                  </span>
                </h3>
                <button className="text-xs font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 hover:underline cursor-pointer">
                  View All
                </button>
              </div>

              {/* Search Bar + Filter */}
              <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
/>
              {/* Loading Skeleton */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <AssignmentSkeleton key={i} />
                  ))}
                </div>
              ) : filteredAssignments.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {filteredAssignments.map((assignment) => (
                    <motion.div key={assignment.id} variants={cardVariants}>
                      <AssignmentCard
                        title={assignment.title}
                        assignedDate={assignment.assignedDate}
                        dueDate={assignment.dueDate}
                        status={assignment.status}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyState onReset={handleResetFilters} />
              )}
            </div>

            {/* Right column: Recent Activity Feed */}
           <RecentActivity />
          </div>
        </div>
      </div>

      {/* Floating AI Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-linear-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-medium px-5 py-3 rounded-full shadow-lg shadow-orange-500/25 dark:shadow-violet-600/10 flex items-center gap-2 hover:opacity-95 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <Sparkles className="h-4 w-4 text-amber-200 animate-bounce" />
        <span className="text-sm tracking-wide">Ask VedaAI</span>
      </motion.button>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </main>
  );
}

/* ── Skeleton Card ── */
function AssignmentSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800/80 rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-16 rounded-full" />
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>
      <div className="pt-3 border-t border-gray-100 dark:border-zinc-800/50 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
