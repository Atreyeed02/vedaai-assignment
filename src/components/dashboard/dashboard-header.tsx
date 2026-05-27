"use client";

import {
  ArrowLeft,
  Bell,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick: () => void;
};
export default function DashboardHeader({
  darkMode,
  setDarkMode,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="h-17.5 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 px-6 flex items-center justify-between shrink-0">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Back */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Assignments
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        
        {/* Dark Mode */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notification */}
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500" />
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <span className="hidden sm:block text-sm font-medium">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}