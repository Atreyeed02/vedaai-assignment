"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SearchFilterProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
};

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: SearchFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-4"
    >
      {/* Filter Dropdown */}
      <Select
        value={filterStatus}
        onValueChange={setFilterStatus}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="AI Generated">
            AI Generated
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />

        <input
          type="text"
          placeholder="Search assignments by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100/80 dark:bg-zinc-900 border border-transparent dark:border-zinc-800/50 outline-none rounded-full text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-orange-500/50 dark:focus:ring-orange-500/30 transition-all duration-200"
        />
      </div>
    </motion.div>
  );
}