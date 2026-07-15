"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CaseData, emptyCase } from "./types";
import { zorbazDemoCase } from "./demoData";

interface CaseStore {
  caseData: CaseData;
  setCaseData: (data: Partial<CaseData>) => void;
  resetCase: () => void;
  loadDemo: () => void;
  updateInjury: (index: number, injury: Partial<CaseData["injuries"][0]>) => void;
  addInjury: () => void;
  removeInjury: (index: number) => void;
  addEvidence: (item: CaseData["evidence"][0]) => void;
  updateEvidence: (id: string, updates: Partial<CaseData["evidence"][0]>) => void;
  removeEvidence: (id: string) => void;
  addFiling: (filing: CaseData["filings"][0]) => void;
  updateFiling: (id: string, updates: Partial<CaseData["filings"][0]>) => void;
  addHearing: (hearing: CaseData["hearings"][0]) => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
}

export const useCaseStore = create<CaseStore>()(
  persist(
    (set, get) => ({
      caseData: emptyCase(),
      setCaseData: (data) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            ...data,
            lastUpdated: new Date().toISOString(),
          },
        })),
      resetCase: () => set({ caseData: emptyCase() }),
      loadDemo: () => set({ caseData: { ...zorbazDemoCase, lastUpdated: new Date().toISOString() } }),
      updateInjury: (index, injury) =>
        set((state) => {
          const injuries = [...state.caseData.injuries];
          injuries[index] = { ...injuries[index], ...injury };
          return { caseData: { ...state.caseData, injuries, lastUpdated: new Date().toISOString() } };
        }),
      addInjury: () =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            injuries: [
              ...state.caseData.injuries,
              { description: "", date: "", treatment: "", provider: "" },
            ],
            lastUpdated: new Date().toISOString(),
          },
        })),
      removeInjury: (index) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            injuries: state.caseData.injuries.filter((_, i) => i !== index),
            lastUpdated: new Date().toISOString(),
          },
        })),
      addEvidence: (item) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            evidence: [...state.caseData.evidence, item],
            lastUpdated: new Date().toISOString(),
          },
        })),
      updateEvidence: (id, updates) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            evidence: state.caseData.evidence.map((e) =>
              e.id === id ? { ...e, ...updates } : e
            ),
            lastUpdated: new Date().toISOString(),
          },
        })),
      removeEvidence: (id) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            evidence: state.caseData.evidence.filter((e) => e.id !== id),
            lastUpdated: new Date().toISOString(),
          },
        })),
      addFiling: (filing) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            filings: [...state.caseData.filings, filing],
            lastUpdated: new Date().toISOString(),
          },
        })),
      updateFiling: (id, updates) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            filings: state.caseData.filings.map((f) =>
              f.id === id ? { ...f, ...updates } : f
            ),
            lastUpdated: new Date().toISOString(),
          },
        })),
      addHearing: (hearing) =>
        set((state) => ({
          caseData: {
            ...state.caseData,
            hearings: [...state.caseData.hearings, hearing],
            lastUpdated: new Date().toISOString(),
          },
        })),
      exportJSON: () => JSON.stringify(get().caseData, null, 2),
      importJSON: (json) => {
        try {
          const data = JSON.parse(json);
          set({ caseData: { ...emptyCase(), ...data, lastUpdated: new Date().toISOString() } });
        } catch (e) {
          console.error("Import failed", e);
        }
      },
    }),
    {
      name: "assault-case-companion-v1",
    }
  )
);
