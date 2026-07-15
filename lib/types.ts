export interface Party {
  name: string;
  role: string; // assailant, venue_owner, bartender, deputy, prosecutor, etc.
  address?: string;
  email?: string;
  phone?: string;
  notes?: string;
  criminalHistory?: string;
}

export interface Injury {
  description: string;
  date: string;
  treatment: string;
  provider: string;
  meds?: string;
  ongoing?: boolean;
}

export interface EvidenceItem {
  id: string;
  type: "surveillance" | "bodycam" | "medical" | "photo" | "transcript" | "report" | "email" | "other";
  title: string;
  date: string;
  description: string;
  keyQuotes?: string[];
  location?: string;
}

export interface Filing {
  id: string;
  type: string;
  recipient: string;
  dateFiled: string;
  status: "draft" | "sent" | "acknowledged" | "investigating" | "resolved" | "closed";
  trackingNumber?: string;
  nextAction?: string;
  notes?: string;
}

export interface Hearing {
  id: string;
  date: string;
  time: string;
  type: string;
  location: string;
  caseNumber: string;
  notes?: string;
}

export interface CaseData {
  // Victim
  victimName: string;
  victimAddress: string;
  victimPhone: string;
  victimEmail: string;
  
  // Incident
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentAddress: string;
  incidentDescription: string;
  wasSeated: boolean;
  wasPassive: boolean;
  chokehold: boolean;
  lostAir: boolean;
  blackout: boolean;
  lostContact: boolean;
  neckScratch: boolean;
  
  // Assailant
  assailantName: string;
  assailantDOB?: string;
  assailantAddress?: string;
  assailantCriminalHistory: string;
  
  // Venue
  venueName: string;
  venueOwner: string;
  venueAddress: string;
  bartenderName?: string;
  bartenderAdmissions?: string;
  ownerAdmissions?: string;
  overserving?: boolean;
  directedToTable?: boolean;
  retaliatoryBan?: boolean;
  
  // LE
  deputyName: string;
  agency: string;
  bodycamIssues: string;
  fabricatedQuotes: string;
  unrecordedCalls: string;
  witnessCollusion: string;
  selectiveEnforcement: string;
  biasIndicators: string;
  
  // Criminal Cases
  victimCaseNumber: string;
  assailantCaseNumber: string;
  victimCharges: string;
  assailantCharges: string;
  assailantPleaDate?: string;
  assailantPleaResult?: string;
  victimRightsViolation: boolean;
  noNotification: boolean;
  
  // Prosecutors
  prosecutor1Name: string;
  prosecutor1Role: string;
  prosecutor2Name?: string;
  prosecutor2Role?: string;
  
  // Medical
  injuries: Injury[];
  
  // Evidence
  evidence: EvidenceItem[];
  
  // Filings & Hearings
  filings: Filing[];
  hearings: Hearing[];
  
  // Demand
  demandAmount: number;
  demandDate?: string;
  demandStatus: string;
  
  // Meta
  lastUpdated: string;
  caseTitle: string;
}

export const emptyCase = (): CaseData => ({
  victimName: "",
  victimAddress: "",
  victimPhone: "",
  victimEmail: "",
  incidentDate: "",
  incidentTime: "",
  incidentLocation: "",
  incidentAddress: "",
  incidentDescription: "",
  wasSeated: true,
  wasPassive: true,
  chokehold: true,
  lostAir: true,
  blackout: true,
  lostContact: true,
  neckScratch: true,
  assailantName: "",
  assailantCriminalHistory: "",
  venueName: "",
  venueOwner: "",
  venueAddress: "",
  overserving: true,
  directedToTable: true,
  retaliatoryBan: true,
  deputyName: "",
  agency: "",
  bodycamIssues: "",
  fabricatedQuotes: "",
  unrecordedCalls: "",
  witnessCollusion: "",
  selectiveEnforcement: "",
  biasIndicators: "",
  victimCaseNumber: "",
  assailantCaseNumber: "",
  victimCharges: "",
  assailantCharges: "",
  victimRightsViolation: true,
  noNotification: true,
  prosecutor1Name: "",
  prosecutor1Role: "",
  injuries: [],
  evidence: [],
  filings: [],
  hearings: [],
  demandAmount: 165000,
  demandStatus: "draft",
  lastUpdated: new Date().toISOString(),
  caseTitle: "Unprovoked Assault Case",
});
