"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-gold-500 text-navy-950 hover:bg-gold-400 focus:ring-gold-500": variant === "primary" || variant === "gold",
            "bg-navy-700 text-white hover:bg-navy-600 border border-navy-500 focus:ring-navy-400": variant === "secondary",
            "bg-transparent text-navy-200 hover:bg-navy-800 hover:text-white": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500": variant === "danger",
          },
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
