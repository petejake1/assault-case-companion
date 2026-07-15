"use client";

import { useState } from "react";
import { useCaseStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  generateCivilDemand,
  generateCeaseAndDesistResponse,
  generatePOSTComplaint,
  generateOLPRComplaint,
  generateVictimRightsComplaint,
  generateHumanRightsComplaint,
  generateLetterToJudge,
  generateEvidenceSummary,
  generateSettlementAnalysis,
  generateBoardOversight,
} from "@/lib/generators";
import { downloadText } from "@/lib/utils";
import { FileText, Download, Copy, Printer, Check } from "lucide-react";
import { useRef } from "react";

const docs = [
  { id: "civil", title: "Civil Demand Letter", desc: "$165k joint & several battery + premises + Dram Shop", gen: generateCivilDemand },
  { id: "cnd", title: "Cease-and-Desist Rebuttal", desc: "Point-by-point rejection (protected activity)", gen: generateCeaseAndDesistResponse },
  { id: "post", title: "POST Board Misconduct Complaint", desc: "Deputy – fabrication, collusion, bias, selective enforcement", gen: generatePOSTComplaint },
  { id: "olpr1", title: "OLPR – Prosecutor (Assailant Plea)", desc: "611A violation + tainted investigation", gen: (c: any) => generateOLPRComplaint(c, "oelfke") },
  { id: "olpr2", title: "OLPR – Prosecutor (Victim Case)", desc: "Retaliatory charges on flawed investigation", gen: (c: any) => generateOLPRComplaint(c, "broda") },
  { id: "cvju", title: "Crime Victim Rights Act Complaint", desc: "Minn. Stat. § 611A – no notification of plea", gen: generateVictimRightsComplaint },
  { id: "hr", title: "MN Human Rights Complaint", desc: "Discriminatory LE treatment / equal protection", gen: generateHumanRightsComplaint },
  { id: "judge", title: "Letter to Judge + Affidavit", desc: "Request recognition of 611A violation + vacate plea", gen: generateLetterToJudge },
  { id: "board", title: "Board of Commissioners Oversight", desc: "Request county oversight of Sheriff & CA", gen: generateBoardOversight },
  { id: "evidence", title: "Master Evidence Summary", desc: "Key facts + inventory in 2025 project style", gen: generateEvidenceSummary },
  { id: "settlement", title: "Settlement Value Analysis", desc: "Full damages breakdown + demand strategy", gen: generateSettlementAnalysis },
];

export default function DocumentsPage() {
  const { caseData } = useCaseStore();
  const [selected, setSelected] = useState(docs[0].id);
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const current = docs.find((d) => d.id === selected)!;
  const content = current.gen(caseData);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(`
        <html><head><title>${current.title}</title>
        <style>
          body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; line-height: 1.6; color: #111; }
          h1,h2,h3 { color: #102a43; }
          pre { white-space: pre-wrap; font-family: Georgia, serif; }
        </style></head>
        <body><pre>${content.replace(/</g, "&lt;")}</pre></body></html>
      `);
      w.document.close();
      w.print();
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Document Generator</h1>
      <p className="text-navy-300 mb-8">
        Every document uses the exact structure, language patterns, point-by-point method, multi-agency CC strategy, and legal framing developed in the 2025 Zorbaz Assault Project. Fill your intake first for best results.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-2">
          {docs.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`w-full text-left p-4 rounded-xl border transition ${
                selected === d.id
                  ? "bg-gold-500/10 border-gold-500/50 text-white"
                  : "bg-navy-900 border-navy-700 text-navy-200 hover:border-navy-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${selected === d.id ? "text-gold-400" : "text-navy-400"}`} />
                <div>
                  <p className="font-medium text-sm">{d.title}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{d.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
              <CardTitle>{current.title}</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => downloadText(`${current.id}-${caseData.victimName || "case"}.txt`, content)}>
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
                <Button size="sm" variant="gold" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print / PDF
                </Button>
              </div>
            </CardHeader>
            <div
              ref={printRef}
              className="flex-1 overflow-auto bg-white text-slate-900 rounded-lg p-6 md:p-8 font-serif text-sm leading-relaxed whitespace-pre-wrap max-h-[70vh]"
            >
              {content}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
