import React, { useState } from "react";
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Users, 
  Globe2, 
  Award, 
  Clock, 
  Send, 
  Download, 
  Briefcase, 
  Check, 
  Landmark, 
  PhoneCall, 
  FileCheck, 
  Sparkles,
  MessageSquare
} from "lucide-react";

interface AgencyB2BPortalProps {
  whatsAppNum?: string;
  whatsAppDisplay?: string;
}

export default function AgencyB2BPortal({
  whatsAppNum = "923001234567",
  whatsAppDisplay = "+92 300 1234567"
}: AgencyB2BPortalProps) {
  // Requisition Form State
  const [companyName, setCompanyName] = useState<string>("");
  const [country, setCountry] = useState<string>("Saudi Arabia");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [tradeCategory, setTradeCategory] = useState<string>("Skilled Construction & Engineering");
  const [requiredQuantity, setRequiredQuantity] = useState<number>(25);
  const [salaryOffered, setSalaryOffered] = useState<string>("SAR 3,500 + Housing");
  const [accommodationProvided, setAccommodationProvided] = useState<boolean>(true);
  const [flightIncluded, setFlightIncluded] = useState<boolean>(true);
  const [targetTimeline, setTargetTimeline] = useState<string>("45_days");

  // Submitted Requisition Dossier
  const [submittedRequisition, setSubmittedRequisition] = useState<any>(null);

  const handleSubmitRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    const refNo = "B2B-REQ-" + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRequisition({
      refNo,
      companyName,
      country,
      contactPerson,
      tradeCategory,
      requiredQuantity,
      salaryOffered,
      accommodationProvided,
      flightIncluded,
      targetTimeline,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      {/* HERO AGENCY BADGE BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-4 h-4" />
              <span>Licensed Overseas Employment Promoter & B2B Partner Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Corporate Overseas Manpower Sourcing & Demand Letter Verification
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We empower foreign corporate employers across Gulf (Saudi Aramco, UAE, Qatar, Kuwait) and European Schengen zones to recruit pre-vetted skilled technical, engineering, medical, and hospitality workforces.
            </p>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 text-left space-y-2 shrink-0">
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Govt Credentials</div>
            <div className="text-sm font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OEC License #4892/ISB</span>
            </div>
            <div className="text-xs text-slate-400">Ministry of Overseas Pakistanis Verified</div>
            <div className="text-[11px] text-slate-500 font-mono">ISO 9001:2025 Global Standard</div>
          </div>
        </div>
      </div>

      {/* AGENCY CREDENTIALS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "OEC Govt Registration",
            desc: "Fully licensed by Bureau of Emigration & Overseas Employment.",
            icon: ShieldCheck,
            badge: "License #4892",
            color: "text-emerald-400"
          },
          {
            title: "Saudi Wakaalah & MOFA",
            desc: "Direct electronic synchronization with Saudi MOFA wakaalah portals.",
            icon: FileCheck,
            badge: "Direct Agency Link",
            color: "text-amber-400"
          },
          {
            title: "GAMCA Medical Fitting",
            desc: "Certified medical testing & biometric clearances within 72 hours.",
            icon: CheckCircle2,
            badge: "100% Fit Guarantee",
            color: "text-blue-400"
          },
          {
            title: "ISO 9001:2025 Standard",
            desc: "Rigorous trade-testing centers and skill verification protocols.",
            icon: Award,
            badge: "Global Standard",
            color: "text-purple-400"
          }
        ].map((cred, i) => (
          <div key={i} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <cred.icon className={`w-6 h-6 ${cred.color}`} />
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">{cred.badge}</span>
            </div>
            <h3 className="font-bold text-white text-sm">{cred.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{cred.desc}</p>
          </div>
        ))}
      </div>

      {/* REQUISITION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* REQUISITION FORM */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Submit Overseas Manpower Requisition</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Issue a formal workforce demand for skilled trades or executive placements.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitRequisition} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Company / Employer Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Al-Majid Contracting LLC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Registration Country *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                  <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                  <option value="Qatar">🇶🇦 Qatar</option>
                  <option value="Kuwait">🇰🇼 Kuwait</option>
                  <option value="Oman">🇴🇲 Oman</option>
                  <option value="Germany">🇩🇪 Germany (Schengen)</option>
                  <option value="United Kingdom">🇬🇧 United Kingdom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Contact Representative / Title</label>
                <input 
                  type="text"
                  placeholder="e.g. HR Director / Tariq Mansoor"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Worker Trade Category</label>
                <select
                  value={tradeCategory}
                  onChange={(e) => setTradeCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Skilled Construction & Engineering">Civil, Structural & Electrical Engineers / Welders</option>
                  <option value="Healthcare & Nursing">Registered ICU Nurses & Clinical Care Staff</option>
                  <option value="Technical & HVAC Trades">HVAC Technicians, Electricians, Plant Operators</option>
                  <option value="Logistics & Warehousing">Warehouse Managers, Forklift Drivers, Cargo Leads</option>
                  <option value="Hospitality & Retail">5-Star Hotel Guest Relations & Boutique Store Managers</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Required Quantity (Workers)</label>
                <input 
                  type="number"
                  min={1}
                  max={500}
                  value={requiredQuantity}
                  onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Offered Monthly Salary & Currency</label>
                <input 
                  type="text"
                  placeholder="e.g. SAR 4,200 / Month"
                  value={salaryOffered}
                  onChange={(e) => setSalaryOffered(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={accommodationProvided}
                  onChange={(e) => setAccommodationProvided(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-xs text-slate-300 font-medium">Free Housing Included</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={flightIncluded}
                  onChange={(e) => setFlightIncluded(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-xs text-slate-300 font-medium">Air Ticket Provided</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official B2B Requisition & Demand Letter</span>
            </button>
          </form>
        </div>

        {/* DEMAND LETTER & SLA DISPLAY */}
        <div className="lg:col-span-6 space-y-6">
          {!submittedRequisition ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-white">Direct Employer Demand Letter Generator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fill out the workforce requisition form on the left to generate a formal Demand Letter & Agency Power of Attorney ready for Ministry attestation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 max-w-md mx-auto text-xs text-slate-300">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>5-Stage Overseas Sourcing SLA Guarantee:</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-400 font-mono">
                  <div>1. Candidate Trade Test & Vetting: <strong>5 Days</strong></div>
                  <div>2. GAMCA / Panel Medical Fitment: <strong>3 Days</strong></div>
                  <div>3. Wakaalah & Visa Stamping: <strong>7 Days</strong></div>
                  <div>4. Protectorate Clearance & Departure: <strong>5 Days</strong></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-mono text-amber-400 font-bold">REQUISITION DOSSIER: {submittedRequisition.refNo}</div>
                  <h3 className="text-xl font-bold text-white mt-1">{submittedRequisition.companyName}</h3>
                  <div className="text-xs text-slate-400">{submittedRequisition.country} • {submittedRequisition.date}</div>
                </div>
                <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Attestation
                </span>
              </div>

              {/* MOCK DEMAND LETTER PREVIEW */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
                <div className="text-center font-bold text-amber-400 border-b border-slate-800 pb-2 uppercase tracking-wider">
                  OFFICIAL DEMAND LETTER & POWER OF ATTORNEY TEMPLATE
                </div>
                <p>To: Overseas Employment Promoter (OEC Lic #4892)</p>
                <p>We, <strong>{submittedRequisition.companyName}</strong> ({submittedRequisition.country}), hereby authorize your agency to recruit <strong>{submittedRequisition.requiredQuantity}</strong> candidate(s) for the role of <strong>{submittedRequisition.tradeCategory}</strong> at a salary rate of <strong>{submittedRequisition.salaryOffered}</strong>.</p>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div>• Accommodation: {submittedRequisition.accommodationProvided ? "Employer Provided" : "Self Allowance"}</div>
                  <div>• Return Flight: {submittedRequisition.flightIncluded ? "Employer Provided" : "Contract Terms"}</div>
                  <div>• Contract Period: 2 Years Renewable under Labor Law</div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                <a
                  href={`https://wa.me/${whatsAppNum}?text=${encodeURIComponent(`Hello Agency B2B Desk, We wish to submit a B2B Manpower Requisition (${submittedRequisition.refNo}) for ${submittedRequisition.requiredQuantity} ${submittedRequisition.tradeCategory} candidates in ${submittedRequisition.country} on behalf of ${submittedRequisition.companyName}. Please contact us!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Agency Managing Director via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
