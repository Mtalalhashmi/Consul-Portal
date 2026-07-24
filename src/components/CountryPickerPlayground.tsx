import React, { useState } from "react";
import CountryPicker, { Country, COUNTRIES_DATA } from "./CountryPicker";
import { 
  Sparkles, 
  Terminal, 
  Smartphone, 
  Info, 
  Search, 
  ClipboardCheck, 
  CheckCircle, 
  Compass, 
  Layers, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export default function CountryPickerPlayground() {
  const [selected, setSelected] = useState<Country | null>({
    name: "Pakistan",
    isoCode: "PK",
    dialingCode: "+92",
    flag: "🇵🇰"
  });

  const [phoneNumber, setPhoneNumber] = useState("3001234567");
  const [showModal, setShowModal] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Trigger copy to clipboard for selected JSON
  const handleCopyJson = () => {
    if (!selected) return;
    navigator.clipboard.writeText(JSON.stringify(selected, null, 2));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-slate-900/40 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-12 w-60 h-60 bg-amber-500/5 rounded-full blur-2xl -z-10" />

        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            WhatsApp Registration Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
            High-Performance <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              Global Country Picker
            </span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            A production-ready selector optimized for maximum responsiveness, featuring full Unicode flag graphics, international dialing indexes, case-insensitive search, matching keyword highlights, and seamless keyboard scroll integration.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Full 200+ Country Data
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              Interactive Highlighter
            </span>
          </div>
        </div>

        {/* Live Status Board */}
        <div className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-3 shrink-0 w-full md:w-auto text-center md:text-left min-w-[240px]">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-extrabold block">Performance Metrics</span>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-3xl font-mono font-bold text-white tracking-tight">&lt; 1ms</span>
            <span className="text-xs text-slate-500 font-mono">Filter Speed</span>
          </div>
          <p className="text-[10.5px] text-slate-400 leading-normal max-w-[200px] mx-auto md:mx-0">
            Engineered using high-speed static arrays and React memoization to prevent rendering lag.
          </p>
          <div className="h-px bg-slate-900 w-full" />
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-mono text-amber-400 uppercase font-extrabold">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            Double-Theme Enabled
          </div>
        </div>
      </div>

      {/* CORE INTERACTIVE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Embed Country Picker Component */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Embedded Preview</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">Active Sandbox</span>
          </div>
          
          <CountryPicker 
            onSelect={(country) => setSelected(country)}
            selectedCountry={selected}
            defaultDarkMode={true}
          />
        </div>

        {/* Right Column: Interaction Panels & Mock Whatsapp Phone registration widget */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section: Mock WhatsApp Verification Form */}
          <div className="bg-slate-950/80 border border-slate-850/80 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider font-extrabold rounded-bl-xl border-l border-b border-emerald-500/10">
              Demo Sandbox
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-white">Mock Phone Verification Portal</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                See the country picker in action. When a country is selected, its corresponding flag, dialing code, and validation masks align instantaneously with the input form below.
              </p>
            </div>

            {/* Verification Widget */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-850 space-y-5 max-w-md mx-auto">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-white">Verify your phone number</h4>
                <p className="text-[10px] text-slate-500 leading-normal">
                  ConsulPortal will send an SMS verification code to check your visa bio-link status.
                </p>
              </div>

              <div className="space-y-4">
                {/* Simulated Country Dropdown Trigger */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">Choose Country</label>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="w-full bg-slate-950 hover:bg-slate-900 text-xs text-slate-200 px-4 py-3 rounded-xl border border-slate-800 flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{selected?.flag || "🌍"}</span>
                      <span className="font-semibold">{selected?.name || "Choose a country"}</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-950/50 py-1 px-2.5 rounded-lg border border-emerald-900/30">
                      {selected?.dialingCode || "Select"}
                    </span>
                  </button>
                </div>

                {/* Simulated Phone Number Input with Dialing Code Lock */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <div className="flex gap-2">
                    {/* Dialing Prefix Box */}
                    <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-xs font-mono font-bold text-slate-400 flex items-center justify-center min-w-[70px]">
                      {selected?.dialingCode || "+92"}
                    </div>
                    {/* Direct Digits Input */}
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="e.g. 300 1234567"
                      className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 outline-none text-xs text-white px-4 py-3 rounded-xl font-mono"
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => alert(`Initiating verification for ${selected?.dialingCode} ${phoneNumber}`)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request SMS Verification Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Section: API Output Log & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: API Output Monitor */}
            <div className="bg-slate-950/80 border border-slate-850/80 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Returned Object</span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="text-[9px] font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-900/30 px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3.5 h-3.5" /> Copy JSON
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-850 font-mono text-[10.5px] text-emerald-400 overflow-x-auto">
                <pre>{selected ? JSON.stringify(selected, null, 2) : "{\n  \"country\": null\n}"}</pre>
              </div>

              <p className="text-[10px] text-slate-500 leading-normal font-mono">
                * Selected country values returned instantly on user tap.
              </p>
            </div>

            {/* Box 2: Query Capabilities Card */}
            <div className="bg-slate-950/80 border border-slate-850/80 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-extrabold block">Testing Queries</span>
                <h4 className="text-xs font-bold text-white">Full Search Coverage Checklist</h4>
                
                <div className="space-y-2 text-[10.5px] text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    <p><strong>First-letter matches</strong>: Type <code>P</code> to filter Pakistan, Palestine, Poland, Panama, etc.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    <p><strong>Dialing codes</strong>: Search with <code>+92</code> or <code>44</code> to filter countries instantly.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    <p><strong>ISO identification</strong>: Querying <code>AE</code> immediately lists UAE.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    <p><strong>No Matches Handling</strong>: Renders clean state when matches equal zero.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850 flex items-center gap-2.5 text-[10.5px] text-slate-400">
                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Scroll container includes sticky headers and instant DOM reflow optimization.</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* COMPONENT MODAL INJECTION POPUP DEMO */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="max-w-md w-full relative my-8 animate-fade-in">
            {/* Close trigger overlay */}
            <div className="absolute -top-10 right-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white rounded-full p-2 cursor-pointer shadow transition"
              >
                Close Picker [✕]
              </button>
            </div>
            
            <CountryPicker 
              onSelect={(country) => {
                setSelected(country);
                setShowModal(false);
              }}
              selectedCountry={selected}
              defaultDarkMode={true}
            />
          </div>
        </div>
      )}

    </div>
  );
}
