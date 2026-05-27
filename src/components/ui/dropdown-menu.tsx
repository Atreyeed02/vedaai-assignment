"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function DropdownMenu({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>;
}

function DropdownMenuTrigger({ children, asChild = true, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & { asChild?: boolean }) {
  return (
    <DropdownMenuPrimitive.Trigger asChild={asChild} {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownMenuContent({ children, className, sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & { className?: string }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] rounded-md border border-border bg-popover p-1 shadow-md outline-none animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ children, className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { className?: string; inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator> & { className?: string }) {
  return (
    <DropdownMenuPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  );
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator };
