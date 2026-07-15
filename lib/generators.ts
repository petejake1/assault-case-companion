import { CaseData } from "./types";
import { formatCurrency, formatDate } from "./utils";

export function generateCivilDemand(c: CaseData): string {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `SENT VIA CERTIFIED MAIL

To:
${c.venueName}
Attn: Corporate Leadership / Legal Department
${c.venueAddress}
and
${c.venueOwner}
${c.venueAddress}
and
${c.assailantName}
${c.assailantAddress || "[Assailant Address]"}

Date: ${today}

RE: NOTICE OF INTENT TO SUE / FORMAL SETTLEMENT DEMAND
Claimant: ${c.victimName}
Incident Date: ${formatDate(c.incidentDate)}
Location: ${c.incidentLocation}, ${c.incidentAddress}

This letter serves as formal notice of civil claims against ${c.venueName}, its operating entities, and ${c.assailantName} jointly and severally for battery, premises liability, Dram Shop liability (Minn. Stat. § 340A.801), gross negligence, and related damages.

I. THE UNPROVOKED ASSAULT AND SERIOUS INJURIES

Surveillance footage shows ${c.victimName} seated calmly at a table engaged in a peaceful conversation. Without any provocation, fighting words, or physical instigation, ${c.assailantName} approached from behind, placed ${c.victimName} in a chokehold, dragged him to the ground, and inflicted a fingernail scratch to the neck. During the assault, ${c.victimName} ${c.lostContact ? "lost a contact lens, " : ""}${c.lostAir ? "lost air, " : ""}${c.blackout ? "and told the responding deputy on bodycam that he “might have blacked out a little bit.”" : "."} The next day a severe full-body systemic rash developed from the neck scratch. ${c.victimName} sought treatment at urgent care and was prescribed Prednisone. He continues to suffer significant emotional distress, anxiety, and dignitary harm from the public ban and community humiliation.

II. ${c.venueName.toUpperCase()}'S DIRECT LIABILITY – ACTIVE FACILITATION AND DRAM SHOP VIOLATIONS

${c.bartenderName || "The bartender"} admitted that ${c.assailantName} had been at the bar “the whole time” watching a game and that she directed the visibly intoxicated ${c.assailantName} toward ${c.victimName}'s table. These acts establish active facilitation, negligent supervision, and Dram Shop liability for serving an obviously intoxicated patron whose intoxication contributed to the assault. ${c.bartenderAdmissions || ""}

III. ${c.venueName.toUpperCase()}'S BIAS, WILLFUL INDIFFERENCE, AND RETALIATION

${c.venueOwner} stated on bodycam that he was “definitely on ${c.assailantName.split(" ")[0]}'s side” despite not witnessing the incident and admitted he could “understand why someone would want to hit [${c.victimName}] in the head.” ${c.venueName} imposed a retaliatory ban on the victim while shielding the assailant and relied on unverified rumors — which the deputy himself relayed to staff on bodycam — to justify the ban.

IV. PATTERN OF BIAS COMPOUNDED BY SYSTEMIC FAILURE

The investigation by ${c.deputyName} of ${c.agency} was deeply flawed:
• Bodycam recordings contradict key portions of the written report (fabricated quotes that never occurred).
• Intentional non-recording of critical calls in which the deputy repeatedly called the incident “just a dumb bar fight” and claimed the victim’s words provoked the assault.
• Failure to separate witnesses allowing real-time collusion and biased input.
• Selective enforcement: PBT requested only from the victim while ignoring the assailant’s visible intoxication.
• Explicit acknowledgment on bodycam that the assailant had committed an assault, yet the victim was charged with two counts of Disorderly Conduct while the assailant received a lenient plea without victim notification — a clear violation of the Minnesota Crime Victim Rights Act (Minn. Stat. § 611A).

${c.bodycamIssues}

DEMAND

To avoid the expense and publicity of litigation, settle all claims jointly and severally for ${formatCurrency(c.demandAmount)}. This offer remains open for 21 days from the date of receipt.

Please immediately forward this demand letter to all applicable insurance carriers (including general liability, Dram Shop, and excess/umbrella carriers) and provide written confirmation within 7 days that the letter has been forwarded along with the name and contact information of the insurance adjuster assigned to this matter.

You are on notice to immediately preserve all surveillance footage, bodycam recordings, POS/sales records, internal communications, and witness statements.

If unresolved, suit will be filed in District Court, at which time all video evidence, the biased investigation report, the State’s Response to the Motion to Dismiss, and the formal complaints filed with the Minnesota POST Board, Office of Lawyers Professional Responsibility, Crime Victim Justice Unit, County Board of Commissioners, and Minnesota Department of Human Rights will become public trial exhibits.

Sincerely,

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}

CC:
• MN POST Board
• MN Office of Lawyers Professional Responsibility
• MN Crime Victim Justice Unit
• County Board of Commissioners
• MN Department of Human Rights
`;
}

export function generateCeaseAndDesistResponse(c: CaseData): string {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `${today}

[Attorney Name / Law Firm for Assailant]
[Address]

Re: Your Baseless Cease-and-Desist Letter – Immediate Rejection and Point-by-Point Rebuttal

Incident: ${formatDate(c.incidentDate)} Unprovoked Chokehold Assault at ${c.incidentLocation}

Cases: State v. ${c.assailantName} (${c.assailantCaseNumber}) & State v. ${c.victimName} (${c.victimCaseNumber})

[Counsel],

I am in receipt of your letter. It is rejected in its entirety. Every factual assertion, legal premise, and personal attack in it is either demonstrably false, deliberately misleading, or a transparent attempt to silence a crime victim who refuses to be intimidated. I will address each point you raised with the precision your client’s conduct demands.

1. Your demand that I “immediately cease and desist from communicating with [Assailant] or his family, including via mail” and route everything through you.

Rejected. My communications have been good-faith, pre-litigation civil demands and formal complaints documenting battery, premises liability, Dram Shop liability (Minn. Stat. § 340A.801), gross negligence, and the violation of my rights under the Minnesota Crime Victim Rights Act (Minn. Stat. § 611A). These are protected activities, not harassment. Your client committed an unprovoked, violent chokehold captured on surveillance video while I sat calmly and passively at a table. I will continue to pursue accountability through every lawful channel until those claims are resolved. Your attempt to gag a victim is noted and will be introduced in any future proceeding as evidence of consciousness of liability.

2. Your statement that the scope of [Defense Counsel]’s representation is limited to the pending criminal proceeding.

Correct on that narrow point. For the civil claims against your client, ${c.assailantName}, and the ${c.venueName} entities, I am being represented as needed. Any further correspondence from you regarding civil liability should be directed to counsel. Do not contact me directly again.

3. Your invitation that if I retain counsel for claims against [Assailant], that counsel should communicate with you.

Acknowledged. Once civil counsel is retained for claims against your client, they will communicate with you.

[Continue with additional point-by-point rebuttals of any personal attacks, characterizations of statements, or claims about “pride” or “lost contact lens” – each rejected with reference to the surveillance video, bodycam, medical records, and victim rights statutes.]

I remain available through proper channels for any good-faith settlement discussions regarding the civil claims. I will not be intimidated into silence.

Sincerely,

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}
`;
}

export function generatePOSTComplaint(c: CaseData): string {
  return `FORMAL MISCONDUCT COMPLAINT – ${c.deputyName.toUpperCase()}

Agency: ${c.agency}
Complainant: ${c.victimName}
${c.victimAddress}
${c.victimPhone} | ${c.victimEmail}
Incident Date: ${formatDate(c.incidentDate)}
Location: ${c.incidentLocation}
Case Numbers: ${c.victimCaseNumber} & ${c.assailantCaseNumber}

Detailed Statement of Misconduct:

1. Fabrication of Admissions and Suppression of Evidence
${c.deputyName}’s report falsely attributes quotes to me that I never made. ${c.fabricatedQuotes} ${c.deputyName} intentionally failed to record three critical phone calls with me while recording mundane interactions. In those three unrecorded calls, ${c.deputyName} repeatedly downplayed the violent chokehold as “just a dumb bar fight” and asserted multiple times that my words had provoked the assault — statements that directly contradict the surveillance video showing I remained seated and calm.

2. Facilitation of Witness Collusion
${c.witnessCollusion}

3. Discriminatory / Selective Enforcement
${c.selectiveEnforcement}

4. Failure to Investigate Active Facilitation / Overserving
${c.bartenderAdmissions || "Bartender admissions of directing intoxicated patron ignored."}

5. Disregard for Life-Threatening Physical Trauma
I informed ${c.deputyName} on bodycam that I “lost air” and “might have blacked out a little bit” during the chokehold. The next day a severe full-body systemic rash appeared from the neck scratch; I went to urgent care and was prescribed Prednisone. ${c.deputyName} noted the possible blackout but disregarded this evidence of great bodily harm in favor of unverified hearsay.

6. Character Assassination and Dissemination of Fabricated Lies
On bodycam, ${c.deputyName} actively relayed the fabricated rumor (originally made up by the assailant) to multiple venue staff members as if it were fact, despite knowing the surveillance video had no audio to verify any such claim. This act of character assassination directly contributed to my public humiliation and retaliatory business ban.

7. Premature Termination of Bodycam Recording
${c.bodycamIssues}

8. Professional Impropriety and Cronyism / Bias Indicators
${c.biasIndicators}

Additionally, despite being removed from the premises, ${c.assailantName} re-entered the building and continued ranting at staff and at me, yet he was not charged with the second count of Disorderly Conduct – Offensive, Abusive, or Obscene Conduct (Minn. Stat. § 609.72, subd. 1(3)) — the exact charge that was filed against me.

I request a full investigation into these violations of POST standards of conduct, impartiality, and proper investigative procedure under MN Rules 6700.1600 and related statutes.

${c.victimName}
${c.victimAddress}
${c.victimEmail}

CC:
• MN POST Board
• MN Office of Lawyers Professional Responsibility
• MN Crime Victim Justice Unit
• County Board of Commissioners
• MN Department of Human Rights
`;
}

export function generateOLPRComplaint(c: CaseData, which: "oelfke" | "broda" = "oelfke"): string {
  const isOelfke = which === "oelfke";
  const name = isOelfke ? c.prosecutor1Name : (c.prosecutor2Name || c.prosecutor1Name);
  const role = isOelfke ? c.prosecutor1Role : (c.prosecutor2Role || c.prosecutor1Role);
  const caseNum = isOelfke ? c.assailantCaseNumber : c.victimCaseNumber;

  return `RE: ETHICAL COMPLAINT – ASSISTANT COUNTY ATTORNEY ${name.toUpperCase()}

Case: ${caseNum} (State v. ${isOelfke ? c.assailantName : c.victimName})

Statement of Facts:

1. Violation of Minnesota Crime Victim Rights Act (Minn. Stat. § 611A)
${isOelfke ? `${name} resolved the assailant’s case via a plea agreement that dismissed the 5th Degree Assault charge and granted unsupervised probation, without any notification to or input from the victim. This statutory violation was formally protested by my counsel. ${name} later sent an email apologizing for my not receiving the agreement and confirming the plea deal.` : `${name} was the lead attorney on the victim’s retaliatory Disorderly Conduct case and opposed dismissal despite clear exculpatory video evidence and a tainted investigation.`}

2. Reliance on a Tainted and Fraudulent Investigation
${name} handled the matter while relying on ${c.deputyName}’s flawed investigation, which contained fabricated quotes, intentional non-recording of critical calls, failure to separate witnesses, and other documented deficiencies. This same tainted investigation supported the retaliatory Disorderly Conduct charges filed against the victim.

3. Failure to Review Exculpatory Evidence
The office ignored clear surveillance video showing ${c.victimName} as a passive, seated victim of an unprovoked chokehold from behind, while relying instead on hearsay from biased, colluding witnesses and a tainted police report.

By authorizing a lenient resolution for a violent strangulation-style assault while silencing the victim and pursuing selective charges against the victim, ${name} has breached his/her ethical duties and the public trust under the Minnesota Rules of Professional Conduct.

I request a full investigation by the Office of Lawyers Professional Responsibility.

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}

CC:
• MN POST Board
• MN Office of Lawyers Professional Responsibility
• MN Crime Victim Justice Unit
• County Board of Commissioners
• MN Department of Human Rights
`;
}

export function generateVictimRightsComplaint(c: CaseData): string {
  return `Re: Formal Complaint – Violation of Minnesota Crime Victim Rights Act

Case No.: ${c.assailantCaseNumber} (State of Minnesota v. ${c.assailantName})

Dear Crime Victim Justice Unit:

I am writing to file a formal complaint regarding a clear violation of my rights as a crime victim under the Minnesota Crime Victim Rights Act, Minn. Stat. § 611A.

On ${formatDate(c.assailantPleaDate || "")} the County Attorney’s Office resolved the ${c.assailantName} case through a plea agreement in which the 5th Degree Assault charge was dismissed and ${c.assailantName} pleaded guilty only to Disorderly Conduct with unsupervised probation.

At no time was I notified of the plea offer, the hearing, or the proposed resolution. I was given no opportunity to provide a victim impact statement or to object to the dismissal of the assault charge. This complete lack of notification and consultation constitutes a direct violation of my rights under Minn. Stat. § 611A.

My criminal defense attorney formally protested this violation in writing. The prosecutor later sent an email apologizing for my not receiving the agreement.

I respectfully request that the Crime Victim Justice Unit conduct a full investigation into this violation of my statutory rights and take appropriate action to hold the County Attorney’s Office accountable.

Sincerely,

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}

Enclosures:
• Email from counsel protesting the plea deal
• Email from prosecutor apologizing for no notification
• Copy of investigation report (available upon request)
• Urgent care records and Prednisone prescription (available upon request)

CC:
• MN POST Board
• MN Office of Lawyers Professional Responsibility
• MN Crime Victim Justice Unit
• County Board of Commissioners
• MN Department of Human Rights
`;
}

export function generateHumanRightsComplaint(c: CaseData): string {
  return `Re: Formal Civil Rights Complaint – Discriminatory Treatment and Denial of Equal Protection in Law Enforcement Response

Case Nos.: ${c.assailantCaseNumber} (State v. ${c.assailantName}) and ${c.victimCaseNumber} (State v. ${c.victimName})

Dear Minnesota Department of Human Rights:

I am filing this formal complaint alleging discriminatory treatment and denial of equal protection under the law by the ${c.agency} and County Attorney’s Office in their handling of an unprovoked violent assault committed against me on ${formatDate(c.incidentDate)} at ${c.incidentLocation}.

As a victim of a serious assault (chokehold resulting in loss of air, momentary blackout, neck scratch, lost contact lens, and a subsequent full-body systemic rash requiring Prednisone), I was subjected to unequal and biased treatment that favored the assailant, ${c.assailantName}. Specific acts include:

• ${c.deputyName} failed to separate witnesses (allowing real-time collusion and story-shifting) and allowed biased venue staff to provide input while reviewing the surveillance video;
• ${c.deputyName} turned off or stopped his bodycam recording at critical moments;
• ${c.deputyName} requested a Preliminary Breath Test only from me (the victim, who approached with hands raised and reported losing air and possibly blacking out), while ignoring the assailant’s visible intoxication, and disregarded my documented physical trauma;
• Despite acknowledging on bodycam that the assailant had committed an assault and that a mutual altercation would result in disorderly conduct charges for both parties, ${c.deputyName} charged me with two counts of Disorderly Conduct while the assailant received a lenient plea; and
• Despite being removed from the premises, the assailant re-entered the building and continued ranting, yet faced no additional charges — including the second count of Disorderly Conduct that was filed against me.

The County Attorney’s Office dismissed the 5th Degree Assault charge against the assailant via plea without any notification to or input from me as the victim, violating my rights under Minn. Stat. § 611A.

I respectfully request that the Department of Human Rights investigate this matter for violations of Minnesota’s Human Rights Act, including discriminatory practices in law enforcement and the denial of equal protection in the administration of justice.

Thank you for your assistance.

Sincerely,

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}

Enclosures:
• POST Board Complaint
• OLPR Complaints
• Attorney probable cause dismissal memorandum
• Urgent care records (available upon request)
`;
}

export function generateLetterToJudge(c: CaseData): string {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `STATE OF MINNESOTA
COUNTY OF [COUNTY]
DISTRICT COURT
[JUDICIAL DISTRICT]

State of Minnesota,
Plaintiff,
vs.
${c.assailantName},
Defendant.
Case No. ${c.assailantCaseNumber}

State of Minnesota,
Plaintiff,
vs.
${c.victimName},
Defendant.
Case No. ${c.victimCaseNumber}

LETTER TO THE COURT
For the Honorable Judge [Name]
${today}

Honorable Judge [Name]
[Court Address]

RE: Serious Violation of Minnesota Crime Victim Rights Act
State v. ${c.assailantName} (File No. ${c.assailantCaseNumber})
State v. ${c.victimName} (File No. ${c.victimCaseNumber})

Dear Judge [Name]:

I am ${c.victimName}, the victim in the above-referenced assault case. I am writing to formally alert the Court to a serious and inexcusable violation of my rights under the Minnesota Crime Victim Rights Act (Minn. Stat. § 611A) in the handling and resolution of Mr. ${c.assailantName.split(" ").pop()}'s case.

I received no notification whatsoever of the plea negotiations, the change-of-plea hearing, or the resolution that dismissed the 5th Degree Assault charge against my assailant. This fundamental denial of my statutory rights occurred despite my attorney sending a formal written protest to the prosecutor. The prosecutor has since admitted in writing that I was never notified.

This was not a mere technicality. The surveillance video clearly shows ${c.assailantName} initiating a vicious, unprovoked chokehold on me while I was seated calmly and passively at a table. The investigation was also compromised by serious misconduct by ${c.deputyName}, including fabricated statements, intentional failure to record key calls, witness collusion, and clear bias.

In light of these facts, I respectfully but firmly request that the Court:

1. Formally recognize on the record this clear violation of my statutory rights as a crime victim; and

2. Direct the County Attorney’s Office to immediately move to vacate the plea in Case ${c.assailantCaseNumber} so that this serious assault can receive proper judicial review and I can exercise my rights under the Crime Victim Rights Act.

I am prepared to provide a detailed victim impact statement at the earliest opportunity.

This matter warrants the Court’s prompt and serious attention.

Sincerely,

${c.victimName}
${c.victimAddress}
Phone: ${c.victimPhone}
Email: ${c.victimEmail}

AFFIDAVIT OF SERVICE
I, ${c.victimName}, being first duly sworn, hereby certify and state as follows:
1. That on ${today}, I served a true and correct copy of the foregoing Letter upon the following parties: Court Administration (by U.S. Mail), Assistant County Attorneys (by electronic mail).
2. That service was made as required under the Minnesota Rules of Court.
I declare under penalty of perjury that everything I have stated in this document is true and correct.

${c.victimName}
Date: ${today}
`;
}

export function generateEvidenceSummary(c: CaseData): string {
  return `Jacob Wagner Assault Case – Master Evidence Summary & Key Facts
(Generated from 2025 Assault Project Methodology)

Case Title: ${c.caseTitle}
Incident: ${formatDate(c.incidentDate)} at ${c.incidentLocation}

CORE FACTS
• Surveillance video shows ${c.victimName} seated calmly when ${c.assailantName} attacked him from behind with a chokehold.
• Victim suffered loss of air, momentary blackout, neck scratch, and severe full-body rash requiring Prednisone.
• ${c.wasSeated ? "Victim was seated and passive." : ""} ${c.chokehold ? "Unprovoked chokehold from behind." : ""}

KEY EVIDENCE OF BIAS & MISCONDUCT
• ${c.venueOwner}: “definitely on ${c.assailantName.split(" ")[0]}’s side” and could “understand why someone would want to hit [victim] in the head.”
• ${c.bartenderName || "Bartender"}: directed the intoxicated assailant to the table; “definitely closer with that family.”
• ${c.deputyName}: asked leading “Provoked, right?”; called it “just a dumb bar fight”; failed to separate witnesses; selective PBT; “I gotcha, bro” / bro-hug / fist bumps; stopped bodycam early; fabricated quotes in report.
• Assailant re-entered after removal and continued ranting yet faced no second Disorderly Conduct charge that was filed against the victim.
• 5th Degree Assault dismissed via plea without any victim notification or input (Minn. Stat. § 611A violation admitted by prosecutor).

EVIDENCE INVENTORY
${c.evidence.map((e, i) => `${i + 1}. [${e.type.toUpperCase()}] ${e.title} (${e.date})\n   ${e.description}${e.keyQuotes?.length ? "\n   Key: " + e.keyQuotes.join(" | ") : ""}`).join("\n\n")}

This summary strongly supports claims of unprovoked violent assault, premises liability, Dram Shop liability, and serious law enforcement / prosecutorial bias and victim rights violations.

Prepared: ${new Date().toLocaleDateString()}
${c.victimName}
`;
}

export function generateSettlementAnalysis(c: CaseData): string {
  const med = 2000;
  const legal = 5000;
  const pain = 25000;
  const emotional = 60000;
  const punitive = 35000;
  const totalMid = med + legal + pain + emotional + punitive;
  return `Settlement Value Analysis – ${c.caseTitle}
(Based on 2025 Assault Project Settlement Strategy Methodology)

Your claim is against ${c.assailantName} (battery) and ${c.venueName} (premises liability + Dram Shop liability under Minn. Stat. § 340A.801).

Strong supporting evidence includes:
• Clear surveillance video showing an unprovoked chokehold from behind while you were seated calmly with no physical aggression or fighting words.
• Documented injuries: loss of air, momentary blackout, lost contact lens, neck scratch, and severe full-body systemic rash requiring urgent care and Prednisone.
• Retaliatory criminal charges against you while the assailant received only a light plea with no victim input or notification.
• Strong bodycam evidence of police bias: repeated “provoked” comments, failure to separate witnesses, selective PBT testing, premature termination of recording, and fabricated quotes.
• Clear venue bias and facilitation: bartender directed the intoxicated assailant; owner admitted he was “definitely on [assailant]’s side” and could “understand why someone would want to hit [you].”
• Ongoing harm: months of extreme stress, insomnia, public humiliation, retaliatory ban, and legal defense fees.

Reasonable Damages Breakdown (Minnesota courts / insurance carriers):

Category                          Estimated Range
Medical bills & future care       $1,000 – $3,000
Legal defense costs               $3,000 – $8,000+
Pain & suffering (physical)       $15,000 – $35,000
Emotional distress / humiliation  $40,000 – $80,000
Punitive / aggravated damages     $20,000 – $50,000
----------------------------------------------------
Total realistic settlement range  $75,000 – $125,000

Recommended Starting Demand: ${formatCurrency(c.demandAmount)}

Why this range?
• Provides ample room to negotiate down to a strong settlement ($80k–$110k) while remaining defensible.
• Accounts for aggravating factors: retaliatory charging, victim rights violation, documented police/venue bias, and ongoing emotional/physical harm.
• Insurance carriers in Minnesota frequently settle premises liability/Dram Shop cases involving chokeholds + documented injury + strong video/bodycam evidence in the $75k–$120k+ range.

Strategic Notes from the 2025 Project:
• Open with ${formatCurrency(c.demandAmount)} joint & several.
• Demand insurance tender confirmation within 7 days.
• Preserve all evidence notice is critical.
• If ignored, file suit and attach every complaint (POST, OLPR, CVJU, Human Rights) as exhibits – this multi-front pressure is a core method that forces serious evaluation.

Generated: ${new Date().toLocaleString()}
`;
}

export function generateBoardOversight(c: CaseData): string {
  return `Re: Formal Request for Board Oversight – Misconduct in Cases ${c.assailantCaseNumber} and ${c.victimCaseNumber}

Dear Commissioners:

I am writing to request that the County Board of Commissioners exercise its oversight authority over the Sheriff’s Office and the County Attorney’s Office regarding serious misconduct in the investigation and prosecution of an unprovoked assault committed against me on ${formatDate(c.incidentDate)} at ${c.incidentLocation}.

${c.deputyName} engaged in multiple acts of investigative misconduct, including:

• Fabricating victim quotes and intentionally failing to record three critical phone calls (in which he repeatedly downplayed the violent chokehold as “just a dumb bar fight” and asserted that the victim’s words had provoked the assault);
• Failing to separate witnesses (allowing real-time collusion and story-shifting) and allowing biased venue staff to provide input while reviewing the surveillance video;
• Turning off or stopping his bodycam recording at critical moments;
• Requesting a Preliminary Breath Test only from the victim while ignoring the assailant’s visible intoxication;
• Disregarding the victim’s documented physical trauma (loss of air, possible blackout, neck scratch, and resulting systemic rash requiring Prednisone); and
• Explicitly acknowledging on bodycam that the assailant had committed an assault (“since you assaulted him”) and that a mutual altercation would result in disorderly conduct charges for both parties, yet charging the victim with two counts of Disorderly Conduct while the assailant received a lenient plea with no additional charging despite re-entering the premises and ranting.

Additionally, the 5th Degree Assault charge against the assailant was dismissed via plea without any notification to or input from the victim — a clear violation of Minn. Stat. § 611A.

I request that the Board exercise its oversight authority, demand a full internal investigation, and ensure that the rights of crime victims are protected in this county.

Sincerely,

${c.victimName}
${c.victimAddress}
${c.victimEmail}
${c.victimPhone}
`;
}
