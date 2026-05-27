"use client";

import { useState } from "react";
import { Home, BookOpen, Activity, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", id: "home", special: false },
  { icon: BookOpen, label: "Assignments", id: "assignments", special: false },
  { icon: Plus, label: "Create", id: "create", special: true },
  { icon: Activity, label: "Activity", id: "activity", special: false },
  { icon: User, label: "Profile", id: "profile", special: false },
] as const;

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-gray-200/80 dark:border-zinc-800/60 md:hidden z-50 pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-end justify-around px-2 pt-1.5 pb-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.special) {
            return (
              <li key={item.id} className="flex flex-col items-center -mt-4">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
                <span className="text-[9px] font-medium text-gray-400 dark:text-gray-500 mt-1">
                  {item.label}
                </span>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-orange-500 dark:text-orange-400"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                )}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-200",
                      isActive && "scale-110"
                    )}
                  />
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-orange-500" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] transition-all duration-200",
                    isActive ? "font-semibold" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
