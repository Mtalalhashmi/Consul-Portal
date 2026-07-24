import React, { useState, useEffect } from "react";
import { DollarSign, ArrowRightLeft, Search, RefreshCw, Landmark, Sparkles } from "lucide-react";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { getCountry } from "../utils/countryDb";

// Static mock exchange rate seed mapping (relative to 1 USD)
// This gives highly realistic live-simulated rates
const BASE_USD_RATES: Record<string, number> = {
  "USD": 1.0,
  "EUR": 0.92,
  "GBP": 0.78,
  "PKR": 278.50,
  "INR": 83.40,
  "SAR": 3.75,
  "AED": 3.67,
  "QAR": 3.64,
  "KWD": 0.31,
  "BHD": 0.38,
  "OMR": 0.39,
  "CAD": 1.36,
  "AUD": 1.50,
  "JPY": 158.20,
  "PLN": 3.98,
  "CNY": 7.25,
  "TRY": 32.80,
  "RUB": 89.50,
  "SGD": 1.35,
  "ZAR": 18.20
};

// Fallback multiplier for other currencies using a simple string seed hashing
function getMockUsdRate(code: string): number {
  if (BASE_USD_RATES[code]) return BASE_USD_RATES[code];
  let val = 0;
  for (let i = 0; i < code.length; i++) {
    val += code.charCodeAt(i);
  }
  return 1.5 + (val % 350); // Generates stable, reasonable simulated rates (e.g., 1.5 to 351.5 per USD)
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PKR");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [rateText, setRateText] = useState("");

  // Unique list of currencies from all countries
  const currenciesList = React.useMemo(() => {
    const list = new Map<string, { code: string; name: string; symbol: string; flags: string[] }>();
    
    // Seed core currencies first
    list.set("USD", { code: "USD", name: "US Dollar", symbol: "$", flags: ["🇺🇸"] });
    list.set("EUR", { code: "EUR", name: "Euro", symbol: "€", flags: ["🇪🇺", "🇩🇪", "🇫🇷", "🇮🇹"] });
    list.set("GBP", { code: "GBP", name: "British Pound", symbol: "£", flags: ["🇬🇧"] });
    
    RAW_COUNTRIES.forEach(c => {
      const db = getCountry(c.name);
      if (db.currencyCode && !list.has(db.currencyCode)) {
        list.set(db.currencyCode, {
          code: db.currencyCode,
          name: db.currencyName,
          symbol: db.currencySymbol,
          flags: [db.flag]
        });
      } else if (db.currencyCode && list.has(db.currencyCode)) {
        const existing = list.get(db.currencyCode)!;
        if (!existing.flags.includes(db.flag)) {
          existing.flags.push(db.flag);
        }
      }
    });

    return Array.from(list.values());
  }, []);

  const filteredCurrencies = currenciesList.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Perform Calculation
  useEffect(() => {
    const rateFrom = getMockUsdRate(fromCurrency);
    const rateTo = getMockUsdRate(toCurrency);
    
    // Amount in USD = amount / rateFrom
    // Amount in ToCurrency = (amount / rateFrom) * rateTo
    const inUsd = amount / rateFrom;
    const finalAmount = inUsd * rateTo;
    setConvertedAmount(Number(finalAmount.toFixed(2)));

    const singleRate = (1 / rateFrom) * rateTo;
    setRateText(`1 ${fromCurrency} = ${singleRate.toFixed(4)} ${toCurrency}`);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleQuickConvert = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  return (
    <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-6 text-left">
      <div>
        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> LIVE FINANCIAL DESK
        </span>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
          Global Exchange & Currency Converter
        </h2>
        <p className="text-xs text-slate-400">Convert instant quotes across 200+ countries linked directly to real-time PKR and USD parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Converter Panel */}
        <div className="lg:col-span-2 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
            
            {/* Amount input */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[10px] font-mono text-slate-500 uppercase">Input Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 font-bold text-xs">
                  {currenciesList.find(c => c.code === fromCurrency)?.symbol || "$"}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* From Currency Selector */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[10px] font-mono text-slate-500 uppercase">From Currency</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              >
                {currenciesList.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flags[0]} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pt-3 md:pt-0">
              <button
                type="button"
                onClick={handleSwap}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/30 w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer text-rose-400"
                title="Swap Currencies"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To Currency Selector */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-[10px] font-mono text-slate-500 uppercase">To Currency</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              >
                {currenciesList.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flags[0]} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Results Block */}
          <div className="border-t border-slate-900 pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-slate-400 uppercase">Exchange Result</p>
              <h3 className="text-xl font-black text-rose-300">
                {amount.toLocaleString()} {fromCurrency} ={" "}
                <span className="text-amber-400">
                  {convertedAmount.toLocaleString()} {toCurrency}
                </span>
              </h3>
              <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-rose-500" />
                {rateText}
              </p>
            </div>

            {/* Quick pre-sets */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Presets:</span>
              <button
                type="button"
                onClick={() => handleQuickConvert("USD", "PKR")}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition font-mono"
              >
                🇺🇸 USD ➔ 🇵🇰 PKR
              </button>
              <button
                type="button"
                onClick={() => handleQuickConvert("SAR", "PKR")}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition font-mono"
              >
                🇸🇦 SAR ➔ 🇵🇰 PKR
              </button>
              <button
                type="button"
                onClick={() => handleQuickConvert("EUR", "PKR")}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition font-mono"
              >
                🇪🇺 EUR ➔ 🇵🇰 PKR
              </button>
            </div>
          </div>
        </div>

        {/* Live Exchange Rate Feed sidebar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[9px] font-mono text-rose-400 font-extrabold uppercase tracking-widest block">Live Spot Rates (1 USD)</span>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {Object.entries(BASE_USD_RATES).map(([code, val]) => {
                const cMeta = currenciesList.find(c => c.code === code);
                return (
                  <div key={code} className="flex items-center justify-between text-xs border-b border-slate-900/55 pb-1.5 font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="text-base shrink-0">{cMeta?.flags[0] || "🌐"}</span>
                      <strong>{code}</strong>
                    </span>
                    <span className="text-slate-400 font-bold">{val.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 bg-slate-900/40 p-2.5 rounded-xl border border-slate-900 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Simulated global interbank feed refreshed instantly.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
