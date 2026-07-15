"use client";

import { useCaseStore } from "@/lib/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { Plus, Scale, Calendar } from "lucide-react";

export default function TrackingPage() {
  const { caseData, addFiling, updateFiling, addHearing } = useCaseStore();
  const [showAddFiling, setShowAddFiling] = useState(false);
  const [showAddHearing, setShowAddHearing] = useState(false);
  const [newFiling, setNewFiling] = useState({ type: "", recipient: "", dateFiled: "", status: "draft" as const, notes: "" });
  const [newHearing, setNewHearing] = useState({ date: "", time: "", type: "", location: "", caseNumber: "", notes: "" });

  const statusColor = (s: string) => {
    switch (s) {
      case "sent": return "bg-blue-500/20 text-blue-300";
      case "acknowledged": return "bg-green-500/20 text-green-300";
      case "investigating": return "bg-purple-500/20 text-purple-300";
      case "resolved": return "bg-emerald-500/20 text-emerald-300";
      case "closed": return "bg-navy-600 text-navy-300";
      default: return "bg-navy-700 text-navy-300";
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Tracking & Filings Dashboard</h1>
          <p className="text-navy-300 mt-1">Multi-agency pressure tracker – the 2025 project method of simultaneous fronts.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowAddFiling(true)}><Plus className="w-4 h-4 mr-1" /> Add Filing</Button>
          <Button size="sm" variant="secondary" onClick={() => setShowAddHearing(true)}><Calendar className="w-4 h-4 mr-1" /> Add Hearing</Button>
        </div>
      </div>

      {/* Filings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5 text-gold-400" /> All Filings & Complaints</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-navy-300 text-left">
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">Recipient</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Next Action / Notes</th>
              </tr>
            </thead>
            <tbody>
              {caseData.filings.map((f) => (
                <tr key={f.id} className="border-b border-navy-800 hover:bg-navy-800/40">
                  <td className="py-3 pr-4 text-white font-medium">{f.type}</td>
                  <td className="py-3 pr-4 text-navy-200">{f.recipient}</td>
                  <td className="py-3 pr-4 text-navy-300">{formatDate(f.dateFiled)}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={f.status}
                      onChange={(e) => updateFiling(f.id, { status: e.target.value as any })}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${statusColor(f.status)} bg-opacity-100`}
                    >
                      {"draft sent acknowledged investigating resolved closed".split(" ").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4 text-navy-300 text-xs max-w-xs">{f.nextAction || f.notes || "—"}</td>
                </tr>
              ))}
              {caseData.filings.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-navy-400">No filings yet. Load the demo or add manually.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Hearings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-gold-400" /> Hearings & Court Dates</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {caseData.hearings.map((h) => (
            <div key={h.id} className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-navy-800/50 border border-navy-700">
              <div className="text-center min-w-[80px]">
                <p className="text-lg font-bold text-gold-400">{new Date(h.date).getDate()}</p>
                <p className="text-xs text-navy-300">{new Date(h.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{h.type}</p>
                <p className="text-sm text-navy-300">{h.time} · {h.location}</p>
                <p className="text-xs text-navy-400 font-mono">{h.caseNumber}</p>
              </div>
              {h.notes && <p className="text-xs text-navy-400 max-w-md">{h.notes}</p>}
            </div>
          ))}
          {caseData.hearings.length === 0 && <p className="text-navy-400 text-sm py-4 text-center">No hearings scheduled.</p>}
        </div>
      </Card>

      {/* Add Filing Modal-ish */}
      {showAddFiling && (
        <Card className="border-gold-500/30">
          <CardHeader><CardTitle>Add New Filing</CardTitle></CardHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Type" value={newFiling.type} onChange={(e) => setNewFiling({ ...newFiling, type: e.target.value })} placeholder="e.g. Civil Demand Letter" />
            <Input label="Recipient" value={newFiling.recipient} onChange={(e) => setNewFiling({ ...newFiling, recipient: e.target.value })} />
            <Input label="Date Filed" type="date" value={newFiling.dateFiled} onChange={(e) => setNewFiling({ ...newFiling, dateFiled: e.target.value })} />
            <Input label="Notes / Next Action" value={newFiling.notes} onChange={(e) => setNewFiling({ ...newFiling, notes: e.target.value })} />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => {
              addFiling({ ...newFiling, id: `f${Date.now()}`, status: "draft" });
              setShowAddFiling(false);
              setNewFiling({ type: "", recipient: "", dateFiled: "", status: "draft", notes: "" });
            }}>Save Filing</Button>
            <Button variant="ghost" onClick={() => setShowAddFiling(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {showAddHearing && (
        <Card className="border-gold-500/30">
          <CardHeader><CardTitle>Add Hearing</CardTitle></CardHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Date" type="date" value={newHearing.date} onChange={(e) => setNewHearing({ ...newHearing, date: e.target.value })} />
            <Input label="Time" value={newHearing.time} onChange={(e) => setNewHearing({ ...newHearing, time: e.target.value })} />
            <Input label="Type" value={newHearing.type} onChange={(e) => setNewHearing({ ...newHearing, type: e.target.value })} />
            <Input label="Location" value={newHearing.location} onChange={(e) => setNewHearing({ ...newHearing, location: e.target.value })} />
            <Input label="Case Number" value={newHearing.caseNumber} onChange={(e) => setNewHearing({ ...newHearing, caseNumber: e.target.value })} />
            <Input label="Notes" value={newHearing.notes} onChange={(e) => setNewHearing({ ...newHearing, notes: e.target.value })} />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => {
              addHearing({ ...newHearing, id: `h${Date.now()}` });
              setShowAddHearing(false);
              setNewHearing({ date: "", time: "", type: "", location: "", caseNumber: "", notes: "" });
            }}>Save Hearing</Button>
            <Button variant="ghost" onClick={() => setShowAddHearing(false)}>Cancel</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
