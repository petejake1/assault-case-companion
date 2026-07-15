"use client";

import { useCaseStore } from "@/lib/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";
import { generateSettlementAnalysis } from "@/lib/generators";
import { downloadText } from "@/lib/utils";
import { Calculator, Download, TrendingUp } from "lucide-react";

export default function SettlementPage() {
  const { caseData, setCaseData } = useCaseStore();
  const analysis = generateSettlementAnalysis(caseData);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Calculator className="w-8 h-8 text-gold-400" />
          Settlement Value & Demand Strategy
        </h1>
        <p className="text-navy-300 mt-2">
          Exact methodology from the 2025 Civil Settlement Value Summary: medical + legal + pain + emotional + punitive, with aggressive but defensible starting demand.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-gold-500/10 to-navy-900 border-gold-500/30">
          <p className="text-navy-300 text-xs uppercase tracking-wider">Your Starting Demand</p>
          <p className="text-3xl font-bold text-gold-400 mt-1">{formatCurrency(caseData.demandAmount)}</p>
          <Input
            type="number"
            className="mt-3"
            value={caseData.demandAmount}
            onChange={(e) => setCaseData({ demandAmount: Number(e.target.value) })}
          />
        </Card>
        <Card>
          <p className="text-navy-300 text-xs uppercase tracking-wider">Realistic Settlement Range</p>
          <p className="text-2xl font-bold text-white mt-1">$75k – $125k</p>
          <p className="text-xs text-navy-400 mt-2">What insurance typically pays on strong video + injury + bias cases</p>
        </Card>
        <Card>
          <p className="text-navy-300 text-xs uppercase tracking-wider">Negotiation Target</p>
          <p className="text-2xl font-bold text-green-400 mt-1">$80k – $110k</p>
          <p className="text-xs text-navy-400 mt-2">After starting high and applying multi-front pressure</p>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-gold-400" /> Full Analysis</CardTitle>
          <Button size="sm" variant="secondary" onClick={() => downloadText("settlement-analysis.txt", analysis)}>
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
        </CardHeader>
        <pre className="whitespace-pre-wrap text-sm text-navy-100 font-mono bg-navy-950/50 p-6 rounded-lg overflow-auto max-h-[60vh]">
          {analysis}
        </pre>
      </Card>

      <Card className="border-gold-500/20">
        <CardTitle className="mb-3">2025 Project Strategic Notes</CardTitle>
        <ul className="space-y-2 text-sm text-navy-200">
          <li>• Open with ${formatCurrency(caseData.demandAmount)} joint & several – gives negotiating room while remaining credible.</li>
          <li>• Demand written confirmation of insurance tender within 7 days + adjuster contact.</li>
          <li>• Explicit preservation notice for all video, bodycam, POS, and internal comms.</li>
          <li>• If ignored: file suit and attach every POST / OLPR / CVJU / Human Rights complaint as trial exhibits. This multi-front public record is the core pressure method that forces serious evaluation.</li>
          <li>• Emphasize retaliatory charging + 611A violation + documented bias as aggravating factors that justify the upper end of damages.</li>
        </ul>
      </Card>
    </div>
  );
}
