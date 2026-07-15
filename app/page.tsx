"use client";

import { useCaseStore } from "@/lib/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Shield,
  FileText,
  AlertTriangle,
  Scale,
  Calendar,
  Download,
  Upload,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { downloadText } from "@/lib/utils";

export default function Dashboard() {
  const { caseData, exportJSON, importJSON, loadDemo } = useCaseStore();

  const sentFilings = caseData.filings.filter((f) => f.status !== "draft").length;
  const totalFilings = caseData.filings.length;
  const upcomingHearings = caseData.hearings.filter(
    (h) => new Date(h.date) >= new Date()
  ).length;

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          importJSON(ev.target?.result as string);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 border border-navy-600 p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Assault Case Companion
            </h1>
          </div>
          <p className="text-navy-200 text-lg max-w-2xl">
            The most advanced victim rights & civil justice toolkit ever built for
            assault survivors. Every template, strategy, and multi-agency pressure
            method is taken directly from the complete 2025 Zorbaz Pelican Lake
            Project.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={loadDemo} variant="gold">
              Load Full 2025 Zorbaz Demo Case
            </Button>
            <Link href="/intake">
              <Button variant="secondary">Start New Case Intake</Button>
            </Link>
            <Button variant="ghost" onClick={() => downloadText("my-case.json", exportJSON(), "application/json")}>
              <Download className="w-4 h-4 mr-2" /> Export Case JSON
            </Button>
            <Button variant="ghost" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" /> Import Case
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/20">
              <FileText className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalFilings}</p>
              <p className="text-xs text-navy-300">Total Filings</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{sentFilings}</p>
              <p className="text-xs text-navy-300">Sent / Active</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{upcomingHearings}</p>
              <p className="text-xs text-navy-300">Upcoming Hearings</p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-navy-800 to-navy-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Scale className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(caseData.demandAmount)}</p>
              <p className="text-xs text-navy-300">Demand Amount</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Case Snapshot */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold-400" />
              Case Snapshot
            </CardTitle>
          </CardHeader>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-navy-300">Title</span>
              <span className="text-white font-medium truncate max-w-[60%]">{caseData.caseTitle || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Victim</span>
              <span className="text-white">{caseData.victimName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Assailant</span>
              <span className="text-white">{caseData.assailantName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Incident</span>
              <span className="text-white">{formatDate(caseData.incidentDate) || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Venue</span>
              <span className="text-white">{caseData.venueName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Victim Case #</span>
              <span className="text-white font-mono text-xs">{caseData.victimCaseNumber || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-300">Assailant Case #</span>
              <span className="text-white font-mono text-xs">{caseData.assailantCaseNumber || "—"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-navy-300">611A Violation</span>
              <span className={caseData.victimRightsViolation ? "text-red-400 font-semibold" : "text-green-400"}>
                {caseData.victimRightsViolation ? "YES – No Notification" : "No"}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-400" />
              Recent / Active Filings
            </CardTitle>
          </CardHeader>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {caseData.filings.length === 0 ? (
              <p className="text-navy-400 text-sm">No filings yet. Generate documents or load the demo.</p>
            ) : (
              caseData.filings.slice(0, 6).map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-navy-800/50 border border-navy-700"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{f.type}</p>
                    <p className="text-xs text-navy-400 truncate">{f.recipient}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      f.status === "sent" || f.status === "acknowledged"
                        ? "bg-green-500/20 text-green-400"
                        : f.status === "investigating"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-navy-600 text-navy-300"
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
              ))
            )}
          </div>
          <Link href="/tracking" className="block mt-4">
            <Button variant="secondary" size="sm" className="w-full">
              View Full Tracking Dashboard
            </Button>
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions – Multi-Front Pressure (2025 Method)</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/documents">
            <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-1">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Generate All Documents</span>
            </Button>
          </Link>
          <Link href="/settlement">
            <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-1">
              <Scale className="w-5 h-5" />
              <span className="text-xs">Settlement Strategy</span>
            </Button>
          </Link>
          <Link href="/evidence">
            <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-1">
              <Shield className="w-5 h-5" />
              <span className="text-xs">Evidence Vault</span>
            </Button>
          </Link>
          <Link href="/intake">
            <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-1">
              <ClipboardIcon />
              <span className="text-xs">Edit Case Details</span>
            </Button>
          </Link>
        </div>
      </Card>

      <p className="text-center text-navy-500 text-xs">
        All data stored locally in your browser. No server. Private by design. Export anytime.
        <br />
        Built with the exact document structures, rebuttal methods, multi-agency strategy, and evidence highlighting techniques of the 2025 Zorbaz Assault Project.
      </p>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
