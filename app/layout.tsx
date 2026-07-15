import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Assault Case Companion | Victim Rights & Civil Justice Toolkit",
  description: "Generate professional demand letters, misconduct complaints, victim rights filings, tracking dashboards and full evidence packages from your assault case details. Built on the 2025 Zorbaz Project methods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
