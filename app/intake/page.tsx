"use client";

import { useCaseStore } from "@/lib/store";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";

const sections = [
  "Victim",
  "Incident",
  "Assailant",
  "Venue",
  "Law Enforcement",
  "Criminal Cases",
  "Prosecutors",
  "Medical",
];

export default function IntakePage() {
  const { caseData, setCaseData, addInjury, updateInjury, removeInjury } = useCaseStore();
  const [active, setActive] = useState(0);

  const update = (field: string, value: any) => setCaseData({ [field]: value });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Case Intake Wizard</h1>
      <p className="text-navy-300 mb-8">
        Capture every detail exactly as done in the 2025 project. This data powers every generated document, tracking table, and settlement analysis.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              active === i
                ? "bg-gold-500 text-navy-950"
                : "bg-navy-800 text-navy-200 hover:bg-navy-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="space-y-6">
        {active === 0 && (
          <>
            <CardHeader><CardTitle>Victim Information</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Legal Name" value={caseData.victimName} onChange={(e) => update("victimName", e.target.value)} />
              <Input label="Phone" value={caseData.victimPhone} onChange={(e) => update("victimPhone", e.target.value)} />
              <Input label="Email" value={caseData.victimEmail} onChange={(e) => update("victimEmail", e.target.value)} />
              <Input label="Case Title / Nickname" value={caseData.caseTitle} onChange={(e) => update("caseTitle", e.target.value)} />
            </div>
            <Textarea label="Full Address" value={caseData.victimAddress} onChange={(e) => update("victimAddress", e.target.value)} />
          </>
        )}

        {active === 1 && (
          <>
            <CardHeader><CardTitle>Incident Details</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Date" type="date" value={caseData.incidentDate} onChange={(e) => update("incidentDate", e.target.value)} />
              <Input label="Time" value={caseData.incidentTime} onChange={(e) => update("incidentTime", e.target.value)} />
              <Input label="Location Name" value={caseData.incidentLocation} onChange={(e) => update("incidentLocation", e.target.value)} />
              <Input label="Full Address" value={caseData.incidentAddress} onChange={(e) => update("incidentAddress", e.target.value)} />
            </div>
            <Textarea label="Detailed Description (use the passive seated + chokehold language)" value={caseData.incidentDescription} onChange={(e) => update("incidentDescription", e.target.value)} rows={5} />
            <div className="flex flex-wrap gap-4">
              {[
                ["wasSeated", "Was seated calmly"],
                ["wasPassive", "Was passive / no aggression"],
                ["chokehold", "Chokehold from behind"],
                ["lostAir", "Lost air"],
                ["blackout", "Possible blackout"],
                ["lostContact", "Lost contact lens"],
                ["neckScratch", "Neck scratch"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-navy-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(caseData as any)[key]}
                    onChange={(e) => update(key, e.target.checked)}
                    className="rounded border-navy-500 text-gold-500 focus:ring-gold-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </>
        )}

        {active === 2 && (
          <>
            <CardHeader><CardTitle>Assailant</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name" value={caseData.assailantName} onChange={(e) => update("assailantName", e.target.value)} />
              <Input label="DOB" value={caseData.assailantDOB || ""} onChange={(e) => update("assailantDOB", e.target.value)} />
              <Input label="Address" value={caseData.assailantAddress || ""} onChange={(e) => update("assailantAddress", e.target.value)} />
            </div>
            <Textarea label="Criminal History Summary (list prior assaults, disorderly, alcohol, etc.)" value={caseData.assailantCriminalHistory} onChange={(e) => update("assailantCriminalHistory", e.target.value)} rows={4} />
          </>
        )}

        {active === 3 && (
          <>
            <CardHeader><CardTitle>Venue / Premises / Dram Shop</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Venue Name" value={caseData.venueName} onChange={(e) => update("venueName", e.target.value)} />
              <Input label="Operating Partner / Owner" value={caseData.venueOwner} onChange={(e) => update("venueOwner", e.target.value)} />
              <Input label="Venue Address" value={caseData.venueAddress} onChange={(e) => update("venueAddress", e.target.value)} />
              <Input label="Bartender Name" value={caseData.bartenderName || ""} onChange={(e) => update("bartenderName", e.target.value)} />
            </div>
            <Textarea label="Bartender Admissions (exact quotes)" value={caseData.bartenderAdmissions || ""} onChange={(e) => update("bartenderAdmissions", e.target.value)} />
            <Textarea label="Owner / Manager Admissions (exact quotes)" value={caseData.ownerAdmissions || ""} onChange={(e) => update("ownerAdmissions", e.target.value)} />
            <div className="flex flex-wrap gap-4">
              {[
                ["overserving", "Overserving / obviously intoxicated"],
                ["directedToTable", "Directed intoxicated patron to table"],
                ["retaliatoryBan", "Retaliatory ban on victim"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-navy-200 cursor-pointer">
                  <input type="checkbox" checked={(caseData as any)[key]} onChange={(e) => update(key, e.target.checked)} className="rounded border-navy-500 text-gold-500" />
                  {label}
                </label>
              ))}
            </div>
          </>
        )}

        {active === 4 && (
          <>
            <CardHeader><CardTitle>Law Enforcement Misconduct</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Deputy / Officer Name" value={caseData.deputyName} onChange={(e) => update("deputyName", e.target.value)} />
              <Input label="Agency" value={caseData.agency} onChange={(e) => update("agency", e.target.value)} />
            </div>
            <Textarea label="Bodycam Issues (unrecorded calls, early stop, label reverses)" value={caseData.bodycamIssues} onChange={(e) => update("bodycamIssues", e.target.value)} />
            <Textarea label="Fabricated Quotes in Report" value={caseData.fabricatedQuotes} onChange={(e) => update("fabricatedQuotes", e.target.value)} />
            <Textarea label="Unrecorded Critical Calls" value={caseData.unrecordedCalls} onChange={(e) => update("unrecordedCalls", e.target.value)} />
            <Textarea label="Witness Collusion / Failure to Separate" value={caseData.witnessCollusion} onChange={(e) => update("witnessCollusion", e.target.value)} />
            <Textarea label="Selective Enforcement (PBT only from victim, charging disparity)" value={caseData.selectiveEnforcement} onChange={(e) => update("selectiveEnforcement", e.target.value)} />
            <Textarea label="Bias Indicators (bro-hug, 'I gotcha bro', protection framing, etc.)" value={caseData.biasIndicators} onChange={(e) => update("biasIndicators", e.target.value)} />
          </>
        )}

        {active === 5 && (
          <>
            <CardHeader><CardTitle>Criminal Cases</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Victim Case Number" value={caseData.victimCaseNumber} onChange={(e) => update("victimCaseNumber", e.target.value)} />
              <Input label="Assailant Case Number" value={caseData.assailantCaseNumber} onChange={(e) => update("assailantCaseNumber", e.target.value)} />
              <Input label="Victim Charges" value={caseData.victimCharges} onChange={(e) => update("victimCharges", e.target.value)} />
              <Input label="Assailant Charges" value={caseData.assailantCharges} onChange={(e) => update("assailantCharges", e.target.value)} />
              <Input label="Assailant Plea Date" type="date" value={caseData.assailantPleaDate || ""} onChange={(e) => update("assailantPleaDate", e.target.value)} />
              <Input label="Assailant Plea Result" value={caseData.assailantPleaResult || ""} onChange={(e) => update("assailantPleaResult", e.target.value)} />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-navy-200">
                <input type="checkbox" checked={caseData.victimRightsViolation} onChange={(e) => update("victimRightsViolation", e.target.checked)} className="rounded text-gold-500" />
                Victim Rights (§ 611A) Violation Occurred
              </label>
              <label className="flex items-center gap-2 text-sm text-navy-200">
                <input type="checkbox" checked={caseData.noNotification} onChange={(e) => update("noNotification", e.target.checked)} className="rounded text-gold-500" />
                No Notification of Plea / Hearing
              </label>
            </div>
          </>
        )}

        {active === 6 && (
          <>
            <CardHeader><CardTitle>Prosecutors</CardTitle></CardHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Prosecutor 1 Name (plea / assailant case)" value={caseData.prosecutor1Name} onChange={(e) => update("prosecutor1Name", e.target.value)} />
              <Input label="Prosecutor 1 Role" value={caseData.prosecutor1Role} onChange={(e) => update("prosecutor1Role", e.target.value)} />
              <Input label="Prosecutor 2 Name (victim case)" value={caseData.prosecutor2Name || ""} onChange={(e) => update("prosecutor2Name", e.target.value)} />
              <Input label="Prosecutor 2 Role" value={caseData.prosecutor2Role || ""} onChange={(e) => update("prosecutor2Role", e.target.value)} />
            </div>
          </>
        )}

        {active === 7 && (
          <>
            <CardHeader>
              <CardTitle>Medical / Injuries</CardTitle>
              <Button size="sm" onClick={addInjury} className="mt-2">+ Add Injury</Button>
            </CardHeader>
            {caseData.injuries.map((inj, i) => (
              <div key={i} className="p-4 rounded-lg bg-navy-800/50 border border-navy-700 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gold-400">Injury #{i + 1}</span>
                  <Button size="sm" variant="danger" onClick={() => removeInjury(i)}>Remove</Button>
                </div>
                <Textarea label="Description" value={inj.description} onChange={(e) => updateInjury(i, { description: e.target.value })} />
                <div className="grid md:grid-cols-3 gap-3">
                  <Input label="Date" type="date" value={inj.date} onChange={(e) => updateInjury(i, { date: e.target.value })} />
                  <Input label="Provider" value={inj.provider} onChange={(e) => updateInjury(i, { provider: e.target.value })} />
                  <Input label="Meds" value={inj.meds || ""} onChange={(e) => updateInjury(i, { meds: e.target.value })} />
                </div>
                <Textarea label="Treatment" value={inj.treatment} onChange={(e) => updateInjury(i, { treatment: e.target.value })} />
              </div>
            ))}
            {caseData.injuries.length === 0 && (
              <p className="text-navy-400 text-sm">No injuries added yet. Click “+ Add Injury”.</p>
            )}
          </>
        )}

        <div className="flex justify-between pt-4 border-t border-navy-700">
          <Button variant="secondary" disabled={active === 0} onClick={() => setActive((a) => a - 1)}>
            ← Previous
          </Button>
          <Button
            variant="gold"
            onClick={() => {
              if (active < sections.length - 1) setActive((a) => a + 1);
            }}
          >
            {active === sections.length - 1 ? "Done – Go Generate Docs" : "Next →"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
