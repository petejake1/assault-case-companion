"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Scale,
  FolderOpen,
  Calculator,
  Settings,
  Shield,
  Gavel,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCaseStore } from "@/lib/store";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/intake", label: "Case Intake", icon: ClipboardList },
  { href: "/documents", label: "Document Generator", icon: FileText },
  { href: "/tracking", label: "Tracking & Filings", icon: Scale },
  { href: "/evidence", label: "Evidence Vault", icon: FolderOpen },
  { href: "/settlement", label: "Settlement Calculator", icon: Calculator },
  { href: "/resources", label: "Resources & Law", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const { caseData, loadDemo, resetCase } = useCaseStore();

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-700 flex flex-col no-print min-h-screen sticky top-0">
      <div className="p-5 border-b border-navy-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-navy-950" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm leading-tight">Assault Case</h1>
            <p className="text-gold-400 text-xs font-medium">Companion</p>
          </div>
        </div>
        <p className="text-[10px] text-navy-300 mt-2 leading-snug">
          Powered by 2025 Zorbaz Project Methods
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                  : "text-navy-200 hover:bg-navy-800 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-navy-700 space-y-2">
        <div className="text-xs text-navy-300 truncate" title={caseData.caseTitle}>
          {caseData.caseTitle || "No case loaded"}
        </div>
        <button
          onClick={loadDemo}
          className="w-full text-xs py-2 px-3 rounded bg-navy-800 hover:bg-navy-700 text-gold-400 border border-navy-600 transition"
        >
          Load 2025 Zorbaz Demo
        </button>
        <button
          onClick={() => {
            if (confirm("Reset all case data? This cannot be undone.")) resetCase();
          }}
          className="w-full text-xs py-2 px-3 rounded bg-navy-800 hover:bg-red-900/40 text-navy-300 hover:text-red-300 border border-navy-600 transition"
        >
          Reset Case
        </button>
      </div>
    </aside>
  );
}
