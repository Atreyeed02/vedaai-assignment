import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
};

export default function NavItem({
  icon,
  label,
  active = false,
}: NavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200 hover:scale-[1.02]",
        active
          ? "bg-orange-50/80 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium border-l-2 border-orange-500"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      <span
        className={cn(
          "transition-colors",
          active ? "text-orange-500" : "text-gray-400 dark:text-gray-500"
        )}
      >
        {icon}
      </span>

      <span className="text-sm">{label}</span>
    </div>
  );
}