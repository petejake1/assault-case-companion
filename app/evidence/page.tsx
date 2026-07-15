"use client";

import { useCaseStore } from "@/lib/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";
import { FolderOpen, Plus, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EvidencePage() {
  const { caseData, addEvidence, removeEvidence } = useCaseStore();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    type: "bodycam" as const,
    title: "",
    date: "",
    description: "",
    keyQuotes: "",
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Evidence Vault</h1>
          <p className="text-navy-300 mt-1">Inventory every piece exactly as catalogued in the 2025 Master Evidence Summary method.</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Add Evidence</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {caseData.evidence.map((e) => (
          <Card key={e.id} className="relative">
            <button
              onClick={() => removeEvidence(e.id)}
              className="absolute top-3 right-3 p-1.5 rounded hover:bg-red-500/20 text-navy-400 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-navy-800">
                <FolderOpen className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-navy-700 text-navy-300">{e.type}</span>
                  <span className="text-xs text-navy-400">{formatDate(e.date)}</span>
                </div>
                <h3 className="text-white font-medium text-sm">{e.title}</h3>
                <p className="text-navy-300 text-xs mt-2 leading-relaxed">{e.description}</p>
                {e.keyQuotes && e.keyQuotes.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {e.keyQuotes.map((q, i) => (
                      <p key={i} className="text-xs text-gold-400/90 italic border-l-2 border-gold-500/40 pl-2">“{q}”</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {caseData.evidence.length === 0 && (
        <Card className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-navy-600 mx-auto mb-4" />
          <p className="text-navy-400">No evidence items yet. Load the 2025 demo or add your own.</p>
        </Card>
      )}

      {showAdd && (
        <Card className="border-gold-500/30">
          <CardHeader><CardTitle>Add Evidence Item</CardTitle></CardHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-navy-200 mb-1.5">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {"surveillance bodycam medical photo transcript report email other".split(" ").map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input label="Key Quotes (comma separated)" value={form.keyQuotes} onChange={(e) => setForm({ ...form, keyQuotes: e.target.value })} placeholder="I lost air, might have blacked out a little bit" />
            <div className="flex gap-2">
              <Button onClick={() => {
                addEvidence({
                  id: `ev${Date.now()}`,
                  type: form.type,
                  title: form.title,
                  date: form.date,
                  description: form.description,
                  keyQuotes: form.keyQuotes ? form.keyQuotes.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
                });
                setShowAdd(false);
                setForm({ type: "bodycam", title: "", date: "", description: "", keyQuotes: "" });
              }}>Add to Vault</Button>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
