import React, { useState } from "react";
import { 
  ShieldCheck, 
  ExternalLink, 
  Globe, 
  HelpCircle, 
  Search, 
  CheckCircle, 
  Building, 
  ArrowRight, 
  FileText,
  Clock,
  AlertTriangle,
  Fingerprint,
  FileCheck
} from "lucide-react";

interface VerificationPortal {
  id: string;
  name: string;
  agency: string;
  country: string;
  region: "Schengen" | "Gulf" | "Canada" | "Other";
  url: string;
  guideSteps: string[];
  tips: string;
  icon: string;
}

const PORTALS: VerificationPortal[] = [
  {
    id: "canada-ircc",
    name: "IRCC Application Status Tracker",
    agency: "Immigration, Refugees and Citizenship Canada (IRCC)",
    country: "Canada",
    region: "Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html",
    guideSteps: [
      "Navigate to the official IRCC Application Tracker website.",
      "Select your application type (e.g., Work Permit, Study Permit, or Express Entry).",
      "Enter your Application Number (starts with V, W, S, or E) and Unique Client Identifier (UCI).",
      "Confirm your date of birth and place of birth as on your passport.",
      "Review the live progress bar, including Biometrics, Medical, and Eligibility status."
    ],
    tips: "Ensure you are using the genuine Canada.ca domain. Beware of fake email notifications. Real IRCC tracking will always require your UCI (Universal Client ID).",
    icon: "🍁"
  },
  {
    id: "saudi-mofa",
    name: "MOFA Visa Endorsement (Enjaz)",
    agency: "Ministry of Foreign Affairs (Kingdom of Saudi Arabia)",
    country: "Saudi Arabia",
    region: "Gulf",
    url: "https://visa.mofa.gov.sa/",
    guideSteps: [
      "Access the official KSA Unified Visa Platform (MOFA/Enjaz).",
      "Select 'Inquiry' and choose 'Application Number' or 'Visa Number' from the search type.",
      "Enter your visa application number, passport number, and correct captcha code.",
      "The system will display your issued MOFA Visa Number and sponsorship details.",
      "Cross-check your GAMCA Medical Fit certificate status which is linked in real-time."
    ],
    tips: "Saudi employment visas must match your Enjaz registration. Verify that the Sponsor Name matches your employer's commercial registration.",
    icon: "🇸🇦"
  },
  {
    id: "uae-icp",
    name: "ICP Smart Services Visa Validity",
    agency: "Federal Authority for Identity, Citizenship, Customs & Port Security (UAE)",
    country: "United Arab Emirates",
    region: "Gulf",
    url: "https://smartservices.icp.gov.ae/echannels/web/client/default.html#/fileValidity",
    guideSteps: [
      "Open the UAE ICP File Validity official smart page.",
      "Select 'Search by Passport Information' and choose Visa or Residency.",
      "Enter your Passport Number, Passport Expiry Date, and select your Nationality.",
      "Verify the captcha and click 'Search'.",
      "The system will display the active File Number, Visa Issue Date, and Expiry Date."
    ],
    tips: "For visas issued in Dubai, use the GDRFA Dubai portal instead. Ensure your passport expiry date is entered precisely.",
    icon: "🇦🇪"
  },
  {
    id: "germany-videx",
    name: "German Videx Visa Portal",
    agency: "Federal Foreign Office (Auswärtiges Amt)",
    country: "Germany",
    region: "Schengen",
    url: "https://videx.diplo.de/",
    guideSteps: [
      "Launch the German Videx Portal (official .diplo.de domain).",
      "Login or input your Web Reference Number from your application form.",
      "Input your passport number, name, and German consulate branch (Islamabad/Karachi).",
      "Cross-check the status of your national visa application under the 'D-Visa Track' ledger.",
      "Verify that your Verpflichtungserklärung (formal obligation) or blocked account is greenlit."
    ],
    tips: "For German visas, the Embassy in Islamabad takes 8 to 12 weeks for blue card/employment stamping after document submission.",
    icon: "🇩🇪"
  },
  {
    id: "qatar-moi",
    name: "Qatar MoI Visa Inquiry Portal",
    agency: "Ministry of Interior (State of Qatar)",
    country: "Qatar",
    region: "Gulf",
    url: "https://portal.moi.gov.qa/webtour/english/services/servicetool6.html",
    guideSteps: [
      "Visit the Qatar Ministry of Interior (MoI) public services link.",
      "Choose 'Visa Services' then 'Visa Inquiry & Printing'.",
      "Provide either your Visa Number or your Passport Number and Nationality.",
      "Enter the secure security verification code.",
      "Click Submit to check if your visa is 'Approved', 'Printed', or 'Inside the Country'."
    ],
    tips: "Your QVC (Qatar Visa Center) medical test and biometrics must show 'Passed' before your visa can be stamped or printed.",
    icon: "🇶🇦"
  },
  {
    id: "poland-konsulat",
    name: "Poland National D-Visa Inquiry",
    agency: "Ministry of Foreign Affairs (e-Konsulat Poland)",
    country: "Poland",
    region: "Schengen",
    url: "https://secure.e-konsulat.gov.pl/",
    guideSteps: [
      "Select 'e-Konsulat Poland' official visa management page.",
      "Choose 'Embassy of Poland, Islamabad' from the embassy selector list.",
      "Navigate to 'Inquire Visa Application' under National Visa section.",
      "Input your Application Reference Number and Passport Identifier.",
      "Verify if the work permit sponsorship (Zezwolenie) has been stamped on the database."
    ],
    tips: "Ensure your work permit is registered with the Voivodeship office in Poland before submitting documents.",
    icon: "🇵🇱"
  },
  {
    id: "italy-visto",
    name: "Italy Visa Information System",
    agency: "Ministry of Foreign Affairs & International Cooperation",
    country: "Italy",
    region: "Schengen",
    url: "https://vistoperitalia.esteri.it/",
    guideSteps: [
      "Open the 'Il visto per l'Italia' official portal.",
      "Fill out the questionnaire (Nationality, Residence, Duration of stay, Purpose of travel).",
      "Retrieve the exact check-list of documents for visa application.",
      "Click on the 'Verify Appointment & Application Status' link corresponding to Gerry's Group Visa Center.",
      "Enter your passport number and reference code to see active stamping queues."
    ],
    tips: "Ensure your Nulla Osta (Official Security Clearance) is issued by the Italian SUI (Sportello Unico per l'Immigratie) to proceed with embassy stamping.",
    icon: "🇮🇹"
  }
];

export default function OfficialVerificationDesk() {
  const [activeTab, setActiveTab] = useState<"all" | "Schengen" | "Gulf" | "Canada">("all");
  const [selectedPortal, setSelectedPortal] = useState<VerificationPortal>(PORTALS[0]);
  
  // Interactive Verification Sandbox State
  const [sandboxCountry, setSandboxCountry] = useState("Canada");
  const [sandboxPassport, setSandboxPassport] = useState("");
  const [sandboxVisaNum, setSandboxVisaNum] = useState("");
  const [sandboxResult, setSandboxResult] = useState<{
    show: boolean;
    title: string;
    description: string;
    officialUrl: string;
    instructions: string[];
  } | null>(null);

  const filteredPortals = PORTALS.filter(portal => {
    if (activeTab === "all") return true;
    return portal.region === activeTab;
  });

  const handleSandboxVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxPassport) {
      alert("Please enter a valid passport number to generate customized guidelines.");
      return;
    }

    const matchedPortal = PORTALS.find(p => p.country.toLowerCase() === sandboxCountry.toLowerCase()) || PORTALS[0];

    setSandboxResult({
      show: true,
      title: `Official ${sandboxCountry} Verification Plan`,
      description: `We've prepared custom cross-referencing directions for Passport ${sandboxPassport.toUpperCase().trim()} under ${matchedPortal.agency} specifications.`,
      officialUrl: matchedPortal.url,
      instructions: [
        `1. Open the genuine portal: ${matchedPortal.url}`,
        `2. Use Passport Reference ID: ${sandboxPassport.toUpperCase().trim()}`,
        sandboxVisaNum ? `3. Match Visa/Sponsor Reference: ${sandboxVisaNum.toUpperCase().trim()}` : `3. Match the global Visa Reference code sent via ConsulPortal notifications.`,
        `4. Check if the GAMCA, medicals, or biometric checkpoints correspond to the exact parameters listed in ConsulPortal.`,
        `5. Important: Ensure the browser URL starts with a secure HTTPS prefix and matches official government domains (like .gov, .ae, .ca, or .gov.sa) before submitting private data.`
      ]
    });
  };

  return (
    <div id="immigration-verification-desk" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
      
      {/* Header section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Global Escrow Audit & Verification Desk</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            Official Government Immigration & Visa Portals
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            Protect yourself from visa fraud and unauthorized agents. Cross-reference your embassy application records, medical fitness files, biometric codes, and stamping updates directly with official government immigration databases.
          </p>
        </div>
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">100% Audited Links</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Portal List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Select Regional Immigration Centre</h3>
            
            {/* Filter Tabs */}
            <div className="flex gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
              {(["all", "Schengen", "Gulf", "Canada"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold rounded-lg transition-all capitalize ${
                    activeTab === tab 
                      ? "bg-amber-500 text-slate-950" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "all" ? "All" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredPortals.map(portal => (
              <button
                key={portal.id}
                onClick={() => {
                  setSelectedPortal(portal);
                  setSandboxCountry(portal.country);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  selectedPortal.id === portal.id
                    ? "bg-amber-500/5 border-amber-500 text-white shadow-lg shadow-amber-500/5"
                    : "bg-slate-950/40 border-slate-850/60 text-slate-300 hover:bg-slate-950/80 hover:border-slate-800"
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{portal.icon}</span>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-bold text-white truncate font-display">{portal.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-900 border border-slate-800 text-amber-400 shrink-0 uppercase">
                      {portal.region === "Canada" ? "IRCC" : portal.region}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{portal.agency}</p>
                  <p className="text-[9px] text-slate-500 font-mono">Country: <strong className="text-slate-300">{portal.country}</strong></p>
                </div>
              </button>
            ))}
          </div>

          {/* Security Alert Notice */}
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <h4 className="text-xs font-bold">Important Cyber Safety Advisory</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ConsulPortal never asks for your online passwords, OTP, or financial PINs. Real government visa systems do not charge extra verification fees on WhatsApp. Confirm you are on authentic government domain levels prior to checking documents.
            </p>
          </div>
        </div>

        {/* Right Side: Dynamic Guide & Link Details */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border border-slate-850/80 space-y-5">
            
            {/* Selected Portal Heading */}
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-900">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider">{selectedPortal.country} Immigration Service</span>
                <h3 className="text-lg font-display font-extrabold text-white flex items-center gap-1.5">
                  <span>{selectedPortal.name}</span>
                </h3>
                <p className="text-xs text-slate-400">{selectedPortal.agency}</p>
              </div>
              <span className="text-3xl shrink-0 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">{selectedPortal.icon}</span>
            </div>

            {/* Official Link Button */}
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">DIRECT VERIFICATION HYPERLINK</span>
                <span className="text-xs font-mono text-emerald-400 break-all select-all font-bold block">{selectedPortal.url}</span>
              </div>
              <a 
                href={selectedPortal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shrink-0 shadow-lg shadow-emerald-500/10"
              >
                <span>Access Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Verification Step-by-Step Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>How to verify your application status:</span>
              </h4>
              
              <div className="space-y-2">
                {selectedPortal.guideSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs text-slate-400 leading-normal">
                    <span className="text-amber-500 font-mono font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important tips and cautions */}
            <div className="pt-3.5 border-t border-slate-900 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-500 block uppercase">💡 Cross-Reference Tip</span>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "{selectedPortal.tips}"
              </p>
            </div>

          </div>

          {/* Interactive Guidelines Sandbox Planner */}
          <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border border-slate-850/80 space-y-4">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-display font-extrabold text-white">Personalized Verification Planner</h4>
                <p className="text-[11px] text-slate-400">Generate tailor-made instructions to input your info on government servers.</p>
              </div>
            </div>

            <form onSubmit={handleSandboxVerify} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 space-y-1">
                <label className="block text-[9px] font-mono text-slate-500 uppercase">Destination Country</label>
                <select 
                  value={sandboxCountry}
                  onChange={(e) => setSandboxCountry(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                >
                  {PORTALS.map(p => (
                    <option key={p.id} value={p.country}>{p.country}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block text-[9px] font-mono text-slate-500 uppercase">Passport Number</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. DG7432091"
                  value={sandboxPassport}
                  onChange={(e) => setSandboxPassport(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block text-[9px] font-mono text-slate-500 uppercase">Visa Number (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g. MOFA-984021"
                  value={sandboxVisaNum}
                  onChange={(e) => setSandboxVisaNum(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="sm:col-span-12 flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <span>Build Cross-Reference Plan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>

            {/* Sandbox guidelines output */}
            {sandboxResult && (
              <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400">
                  <FileCheck className="w-4 h-4" />
                  <h5 className="text-xs font-bold text-white">{sandboxResult.title}</h5>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{sandboxResult.description}</p>
                <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  {sandboxResult.instructions.map((inst, i) => (
                    <p key={i} className="text-[10px] text-slate-300 font-mono leading-relaxed">{inst}</p>
                  ))}
                </div>
                <div className="flex justify-end pt-1">
                  <a 
                    href={sandboxResult.officialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Launch official portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
