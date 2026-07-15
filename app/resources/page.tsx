"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, ExternalLink, Scale, Shield, Gavel, Heart } from "lucide-react";

const resources = [
  {
    title: "Minnesota Crime Victim Rights Act",
    desc: "Minn. Stat. § 611A – notification, input, victim impact statements, protection from retaliation.",
    icon: Heart,
    links: [
      { label: "Full Statute", href: "https://www.revisor.mn.gov/statutes/cite/611A" },
      { label: "Crime Victim Justice Unit", href: "https://dps.mn.gov/divisions/ojp/Pages/crime-victim-justice-unit.aspx" },
    ],
  },
  {
    title: "Dram Shop Liability",
    desc: "Minn. Stat. § 340A.801 – liability of liquor licensees for injuries caused by intoxicated persons.",
    icon: Scale,
    links: [{ label: "Statute 340A.801", href: "https://www.revisor.mn.gov/statutes/cite/340A.801" }],
  },
  {
    title: "POST Board Standards",
    desc: "MN Rules 6700.1600 – Standards of Conduct for peace officers. File misconduct complaints here.",
    icon: Shield,
    links: [
      { label: "POST Complaints", href: "https://mn.gov/post/complaints/" },
      { label: "Standards of Conduct", href: "https://www.revisor.mn.gov/rules/6700.1600/" },
    ],
  },
  {
    title: "Office of Lawyers Professional Responsibility",
    desc: "File ethical complaints against prosecutors for 611A violations and reliance on tainted investigations.",
    icon: Gavel,
    links: [{ label: "OLPR File a Complaint", href: "https://lprb.mncourts.gov/LawyerComplaints/Pages/default.aspx" }],
  },
  {
    title: "MN Department of Human Rights",
    desc: "Discriminatory treatment and denial of equal protection in law enforcement response.",
    icon: Scale,
    links: [{ label: "File a Charge", href: "https://mn.gov/mdhr/intake/" }],
  },
  {
    title: "Assault & Disorderly Conduct Statutes",
    desc: "609.224 (5th Degree Assault), 609.72 (Disorderly Conduct).",
    icon: BookOpen,
    links: [
      { label: "609.224 Assault", href: "https://www.revisor.mn.gov/statutes/cite/609.224" },
      { label: "609.72 Disorderly", href: "https://www.revisor.mn.gov/statutes/cite/609.72" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Resources & Legal Authorities</h1>
        <p className="text-navy-300 mt-2">
          The exact statutes, agencies, and complaint portals used throughout the 2025 Assault Project multi-front strategy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {resources.map((r) => (
          <Card key={r.title}>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-gold-500/10">
                <r.icon className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{r.title}</h3>
                <p className="text-navy-300 text-sm mt-1">{r.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {r.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 underline-offset-2 hover:underline"
                    >
                      {l.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-navy-900/60 border-gold-500/20">
        <CardTitle className="mb-3">Core Strategy Recap (2025 Method)</CardTitle>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-navy-200">
          <li>Document everything immediately (bodycam, medical, photos, timelines).</li>
          <li>File simultaneous multi-agency complaints (POST + OLPR + CVJU + Human Rights + Board) to create institutional pressure and a public record.</li>
          <li>Send a high but defensible civil demand with insurance tender deadline and preservation notice.</li>
          <li>Respond point-by-point to any C&D; frame victim communications as protected pre-litigation activity.</li>
          <li>Challenge probable cause aggressively with the video + bodycam contradictions.</li>
          <li>Never accept a plea that leaves a record when the evidence shows you were the passive victim.</li>
          <li>Keep a living Master Evidence Summary and update the tracking dashboard after every action.</li>
        </ol>
      </Card>
    </div>
  );
}
