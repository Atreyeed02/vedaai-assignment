"use client";

import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AssignmentCardProps = {
  title: string;
  assignedDate: string;
  dueDate: string;
  status: string;
};

export default function AssignmentCard({
  title,
  assignedDate,
  dueDate,
  status,
}: AssignmentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
        
        {/* Top Gradient Border */}
        <div
          className={`absolute top-0 left-0 h-1 w-full ${
            status === "Active"
              ? "bg-green-500"
              : status === "Draft"
              ? "bg-gray-400"
              : "bg-orange-500"
          }`}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>

          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-sm mb-4">
          <p className="text-gray-500 dark:text-gray-400">
            Assigned:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {assignedDate}
            </span>
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            Due:{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {dueDate}
            </span>
          </p>
        </div>

        {/* Status */}
        <Badge
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : status === "Draft"
              ? "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300"
              : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
          }`}
        >
          {status}
        </Badge>
      </Card>
    </motion.div>
  );
}