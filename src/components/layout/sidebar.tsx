import {
  Home,
  Users,
  BookOpen,
  Library,
  Settings,
  Plus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import NavItem from "./nav-item";
import Link from "next/link";
interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <div
      className={cn(
        "w-[304px] h-screen border-r bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800/80 p-4 flex flex-col justify-between transition-all duration-300 z-50 shrink-0",
        "fixed inset-y-0 left-0 md:static md:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Top Section */}
      <div className="space-y-6">
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
              V
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
              VedaAI
            </h1>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Create Button */}
        <Link href="/create-assignment">
  <Button className="w-full rounded-full bg-black hover:bg-black/90 dark:bg-white dark:text-black">
    <Plus className="mr-2 h-4 w-4" />
    Create Assignment
  </Button>
</Link>

        {/* Navigation */}
        <div className="space-y-1.5">
          <NavItem icon={<Home size={18} />} label="Home" />
          <NavItem icon={<Users size={18} />} label="My Groups" />
          <Link href="/">
  <NavItem
    icon={<BookOpen size={18} />}
    label="Assignments"
    active
  />
</Link>
            <Link href="/ai-toolkit">
              <NavItem icon={<Library size={18} />} label="AI Teacher’s Toolkit" />
            </Link>
          <Link href="/my-library">
            <NavItem icon={<Library size={18} />} label="My Library" />
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <NavItem icon={<Settings size={18} />} label="Settings" />

        {/* Bottom School Card */}
        <div className="rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 p-3.5 flex items-center gap-3 shadow-sm">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-xs font-bold">
              DPS
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
              Delhi Public School
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
