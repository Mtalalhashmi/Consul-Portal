import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, Globe, Moon, Sun, Check, Sparkles } from "lucide-react";

// Country object interface
export interface Country {
  name: string;
  isoCode: string;
  dialingCode: string;
  flag: string;
}

// Complete dataset sorted alphabetically
export const COUNTRIES_DATA: Country[] = [
  { name: "Afghanistan", isoCode: "AF", dialingCode: "+93", flag: "🇦🇫" },
  { name: "Albania", isoCode: "AL", dialingCode: "+355", flag: "🇦🇱" },
  { name: "Algeria", isoCode: "DZ", dialingCode: "+213", flag: "🇩🇿" },
  { name: "Andorra", isoCode: "AD", dialingCode: "+376", flag: "🇦🇩" },
  { name: "Angola", isoCode: "AO", dialingCode: "+244", flag: "🇦🇴" },
  { name: "Argentina", isoCode: "AR", dialingCode: "+54", flag: "🇦🇷" },
  { name: "Armenia", isoCode: "AM", dialingCode: "+374", flag: "🇦🇲" },
  { name: "Australia", isoCode: "AU", dialingCode: "+61", flag: "🇦🇺" },
  { name: "Austria", isoCode: "AT", dialingCode: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", isoCode: "AZ", dialingCode: "+994", flag: "🇦🇿" },
  { name: "Bahamas", isoCode: "BS", dialingCode: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", isoCode: "BH", dialingCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", isoCode: "BD", dialingCode: "+880", flag: "🇧🇩" },
  { name: "Barbados", isoCode: "BB", dialingCode: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", isoCode: "BY", dialingCode: "+375", flag: "🇧🇾" },
  { name: "Belgium", isoCode: "BE", dialingCode: "+32", flag: "🇧🇪" },
  { name: "Belize", isoCode: "BZ", dialingCode: "+501", flag: "🇧🇿" },
  { name: "Benin", isoCode: "BJ", dialingCode: "+229", flag: "🇧🇯" },
  { name: "Bhutan", isoCode: "BT", dialingCode: "+975", flag: "🇧🇹" },
  { name: "Bolivia", isoCode: "BO", dialingCode: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", isoCode: "BA", dialingCode: "+387", flag: "🇧🇦" },
  { name: "Botswana", isoCode: "BW", dialingCode: "+267", flag: "🇧🇼" },
  { name: "Brazil", isoCode: "BR", dialingCode: "+55", flag: "🇧🇷" },
  { name: "Brunei", isoCode: "BN", dialingCode: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", isoCode: "BG", dialingCode: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", isoCode: "BF", dialingCode: "+226", flag: "🇧🇫" },
  { name: "Burundi", isoCode: "BI", dialingCode: "+257", flag: "🇧🇮" },
  { name: "Cambodia", isoCode: "KH", dialingCode: "+855", flag: "🇰🇭" },
  { name: "Cameroon", isoCode: "CM", dialingCode: "+237", flag: "🇨🇲" },
  { name: "Canada", isoCode: "CA", dialingCode: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", isoCode: "CV", dialingCode: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", isoCode: "CF", dialingCode: "+236", flag: "🇨🇫" },
  { name: "Chad", isoCode: "TD", dialingCode: "+235", flag: "🇹🇩" },
  { name: "Chile", isoCode: "CL", dialingCode: "+56", flag: "🇨🇱" },
  { name: "China", isoCode: "CN", dialingCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", isoCode: "CO", dialingCode: "+57", flag: "🇨🇴" },
  { name: "Comoros", isoCode: "KM", dialingCode: "+269", flag: "🇰🇲" },
  { name: "Congo", isoCode: "CG", dialingCode: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", isoCode: "CR", dialingCode: "+506", flag: "🇨🇷" },
  { name: "Croatia", isoCode: "HR", dialingCode: "+385", flag: "🇭🇷" },
  { name: "Cuba", isoCode: "CU", dialingCode: "+53", flag: "🇨🇺" },
  { name: "Cyprus", isoCode: "CY", dialingCode: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", isoCode: "CZ", dialingCode: "+420", flag: "🇨🇿" },
  { name: "Denmark", isoCode: "DK", dialingCode: "+45", flag: "🇩🇰" },
  { name: "Djibouti", isoCode: "DJ", dialingCode: "+253", flag: "🇩🇯" },
  { name: "Dominica", isoCode: "DM", dialingCode: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", isoCode: "DO", dialingCode: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", isoCode: "EC", dialingCode: "+593", flag: "🇪🇨" },
  { name: "Egypt", isoCode: "EG", dialingCode: "+20", flag: "🇪🇬" },
  { name: "El Salvador", isoCode: "SV", dialingCode: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", isoCode: "GQ", dialingCode: "+240", flag: "🇬🇶" },
  { name: "Eritrea", isoCode: "ER", dialingCode: "+291", flag: "🇪🇷" },
  { name: "Estonia", isoCode: "EE", dialingCode: "+372", flag: "🇪🇪" },
  { name: "Eswatini", isoCode: "SZ", dialingCode: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", isoCode: "ET", dialingCode: "+251", flag: "🇪🇹" },
  { name: "Fiji", isoCode: "FJ", dialingCode: "+679", flag: "🇫🇯" },
  { name: "Finland", isoCode: "FI", dialingCode: "+358", flag: "🇫🇮" },
  { name: "France", isoCode: "FR", dialingCode: "+33", flag: "🇫🇷" },
  { name: "Gabon", isoCode: "GA", dialingCode: "+241", flag: "🇬🇦" },
  { name: "Gambia", isoCode: "GM", dialingCode: "+220", flag: "🇬🇲" },
  { name: "Georgia", isoCode: "GE", dialingCode: "+995", flag: "🇬🇪" },
  { name: "Germany", isoCode: "DE", dialingCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", isoCode: "GH", dialingCode: "+233", flag: "🇬🇭" },
  { name: "Greece", isoCode: "GR", dialingCode: "+30", flag: "🇬🇷" },
  { name: "Grenada", isoCode: "GD", dialingCode: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", isoCode: "GT", dialingCode: "+502", flag: "🇬🇹" },
  { name: "Guinea", isoCode: "GN", dialingCode: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", isoCode: "GW", dialingCode: "+245", flag: "🇬🇼" },
  { name: "Guyana", isoCode: "GY", dialingCode: "+592", flag: "🇬🇾" },
  { name: "Haiti", isoCode: "HT", dialingCode: "+509", flag: "🇭🇹" },
  { name: "Honduras", isoCode: "HN", dialingCode: "+504", flag: "🇭🇳" },
  { name: "Hungary", isoCode: "HU", dialingCode: "+36", flag: "🇭🇺" },
  { name: "Iceland", isoCode: "IS", dialingCode: "+354", flag: "🇮🇸" },
  { name: "India", isoCode: "IN", dialingCode: "+91", flag: "🇮🇳" },
  { name: "Indonesia", isoCode: "ID", dialingCode: "+62", flag: "🇮🇩" },
  { name: "Iran", isoCode: "IR", dialingCode: "+98", flag: "🇮🇷" },
  { name: "Iraq", isoCode: "IQ", dialingCode: "+964", flag: "🇮🇶" },
  { name: "Ireland", isoCode: "IE", dialingCode: "+353", flag: "🇮🇪" },
  { name: "Israel", isoCode: "IL", dialingCode: "+972", flag: "🇮🇱" },
  { name: "Italy", isoCode: "IT", dialingCode: "+39", flag: "🇮🇹" },
  { name: "Jamaica", isoCode: "JM", dialingCode: "+1-876", flag: "🇯🇲" },
  { name: "Japan", isoCode: "JP", dialingCode: "+81", flag: "🇯🇵" },
  { name: "Jordan", isoCode: "JO", dialingCode: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", isoCode: "KZ", dialingCode: "+7", flag: "🇰🇿" },
  { name: "Kenya", isoCode: "KE", dialingCode: "+254", flag: "🇰🇪" },
  { name: "Kiribati", isoCode: "KI", dialingCode: "+686", flag: "🇰🇮" },
  { name: "Kuwait", isoCode: "KW", dialingCode: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", isoCode: "KG", dialingCode: "+996", flag: "🇰🇬" },
  { name: "Laos", isoCode: "LA", dialingCode: "+856", flag: "🇱🇦" },
  { name: "Latvia", isoCode: "LV", dialingCode: "+371", flag: "🇱🇻" },
  { name: "Lebanon", isoCode: "LB", dialingCode: "+961", flag: "🇱🇧" },
  { name: "Lesotho", isoCode: "LS", dialingCode: "+266", flag: "🇱🇸" },
  { name: "Liberia", isoCode: "LR", dialingCode: "+231", flag: "🇱🇷" },
  { name: "Libya", isoCode: "LY", dialingCode: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", isoCode: "LI", dialingCode: "+423", flag: "🇱🇮" },
  { name: "Lithuania", isoCode: "LT", dialingCode: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", isoCode: "LU", dialingCode: "+352", flag: "🇱🇺" },
  { name: "Madagascar", isoCode: "MG", dialingCode: "+261", flag: "🇲🇬" },
  { name: "Malawi", isoCode: "MW", dialingCode: "+265", flag: "🇲🇼" },
  { name: "Malaysia", isoCode: "MY", dialingCode: "+60", flag: "🇲🇾" },
  { name: "Maldives", isoCode: "MV", dialingCode: "+960", flag: "🇲🇻" },
  { name: "Mali", isoCode: "ML", dialingCode: "+223", flag: "🇲🇱" },
  { name: "Malta", isoCode: "MT", dialingCode: "+356", flag: "🇲🇹" },
  { name: "Mauritania", isoCode: "MR", dialingCode: "+222", flag: "🇲🇷" },
  { name: "Mauritius", isoCode: "MU", dialingCode: "+230", flag: "🇲🇺" },
  { name: "Mexico", isoCode: "MX", dialingCode: "+52", flag: "🇲🇽" },
  { name: "Micronesia", isoCode: "FM", dialingCode: "+691", flag: "🇫🇲" },
  { name: "Moldova", isoCode: "MD", dialingCode: "+373", flag: "🇲🇩" },
  { name: "Monaco", isoCode: "MC", dialingCode: "+377", flag: "🇲🇨" },
  { name: "Mongolia", isoCode: "MN", dialingCode: "+976", flag: "🇲🇳" },
  { name: "Montenegro", isoCode: "ME", dialingCode: "+382", flag: "🇲🇪" },
  { name: "Morocco", isoCode: "MA", dialingCode: "+212", flag: "🇲🇦" },
  { name: "Mozambique", isoCode: "MZ", dialingCode: "+258", flag: "🇲🇿" },
  { name: "Myanmar", isoCode: "MM", dialingCode: "+95", flag: "🇲🇲" },
  { name: "Namibia", isoCode: "NA", dialingCode: "+264", flag: "🇳🇦" },
  { name: "Nepal", isoCode: "NP", dialingCode: "+977", flag: "🇳🇵" },
  { name: "Netherlands", isoCode: "NL", dialingCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", isoCode: "NZ", dialingCode: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", isoCode: "NI", dialingCode: "+505", flag: "🇳🇮" },
  { name: "Niger", isoCode: "NE", dialingCode: "+227", flag: "🇳🇪" },
  { name: "Nigeria", isoCode: "NG", dialingCode: "+234", flag: "🇳🇬" },
  { name: "North Korea", isoCode: "KP", dialingCode: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", isoCode: "MK", dialingCode: "+389", flag: "🇲🇰" },
  { name: "Norway", isoCode: "NO", dialingCode: "+47", flag: "🇳🇴" },
  { name: "Oman", isoCode: "OM", dialingCode: "+968", flag: "🇴🇲" },
  { name: "Pakistan", isoCode: "PK", dialingCode: "+92", flag: "🇵🇰" },
  { name: "Palestine", isoCode: "PS", dialingCode: "+970", flag: "🇵🇸" },
  { name: "Panama", isoCode: "PA", dialingCode: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", isoCode: "PG", dialingCode: "+675", flag: "🇵🇬" },
  { name: "Paraguay", isoCode: "PY", dialingCode: "+595", flag: "🇵🇾" },
  { name: "Peru", isoCode: "PE", dialingCode: "+51", flag: "🇵🇪" },
  { name: "Philippines", isoCode: "PH", dialingCode: "+63", flag: "🇵🇭" },
  { name: "Poland", isoCode: "PL", dialingCode: "+48", flag: "🇵🇱" },
  { name: "Portugal", isoCode: "PT", dialingCode: "+351", flag: "🇵🇹" },
  { name: "Qatar", isoCode: "QA", dialingCode: "+974", flag: "🇶🇦" },
  { name: "Romania", isoCode: "RO", dialingCode: "+40", flag: "🇷🇴" },
  { name: "Russia", isoCode: "RU", dialingCode: "+7", flag: "🇷🇺" },
  { name: "Rwanda", isoCode: "RW", dialingCode: "+250", flag: "🇷🇼" },
  { name: "Saudi Arabia", isoCode: "SA", dialingCode: "+966", flag: "🇸🇦" },
  { name: "Senegal", isoCode: "SN", dialingCode: "+221", flag: "🇸🇳" },
  { name: "Serbia", isoCode: "RS", dialingCode: "+381", flag: "🇷🇸" },
  { name: "Seychelles", isoCode: "SC", dialingCode: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", isoCode: "SL", dialingCode: "+232", flag: "🇸🇱" },
  { name: "Singapore", isoCode: "SG", dialingCode: "+65", flag: "🇸🇬" },
  { name: "Slovakia", isoCode: "SK", dialingCode: "+421", flag: "🇸🇰" },
  { name: "Slovenia", isoCode: "SI", dialingCode: "+386", flag: "🇸🇮" },
  { name: "Somalia", isoCode: "SO", dialingCode: "+252", flag: "🇸🇴" },
  { name: "South Africa", isoCode: "ZA", dialingCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", isoCode: "KR", dialingCode: "+82", flag: "🇰🇷" },
  { name: "Spain", isoCode: "ES", dialingCode: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", isoCode: "LK", dialingCode: "+94", flag: "🇱🇰" },
  { name: "Sudan", isoCode: "SD", dialingCode: "+249", flag: "🇸🇩" },
  { name: "Sweden", isoCode: "SE", dialingCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", isoCode: "CH", dialingCode: "+41", flag: "🇨🇭" },
  { name: "Syria", isoCode: "SY", dialingCode: "+963", flag: "🇸🇾" },
  { name: "Taiwan", isoCode: "TW", dialingCode: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", isoCode: "TJ", dialingCode: "+992", flag: "🇹🇯" },
  { name: "Tanzania", isoCode: "TZ", dialingCode: "+255", flag: "🇹🇿" },
  { name: "Thailand", isoCode: "TH", dialingCode: "+66", flag: "🇹🇭" },
  { name: "Togo", isoCode: "TG", dialingCode: "+228", flag: "🇹🇬" },
  { name: "Trinidad and Tobago", isoCode: "TT", dialingCode: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", isoCode: "TN", dialingCode: "+216", flag: "🇹🇳" },
  { name: "Turkey", isoCode: "TR", dialingCode: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", isoCode: "TM", dialingCode: "+993", flag: "🇹🇲" },
  { name: "Uganda", isoCode: "UG", dialingCode: "+256", flag: "🇺🇬" },
  { name: "Ukraine", isoCode: "UA", dialingCode: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", isoCode: "AE", dialingCode: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", isoCode: "GB", dialingCode: "+44", flag: "🇬🇧" },
  { name: "United States", isoCode: "US", dialingCode: "+1", flag: "🇺🇸" },
  { name: "Uruguay", isoCode: "UY", dialingCode: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", isoCode: "UZ", dialingCode: "+998", flag: "🇺🇿" },
  { name: "Venezuela", isoCode: "VE", dialingCode: "+58", flag: "🇻🇪" },
  { name: "Vietnam", isoCode: "VN", dialingCode: "+84", flag: "🇻🇳" },
  { name: "Yemen", isoCode: "YE", dialingCode: "+967", flag: "🇾🇪" },
  { name: "Zambia", isoCode: "ZM", dialingCode: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", isoCode: "ZW", dialingCode: "+263", flag: "🇿🇼" }
];

interface CountryPickerProps {
  onSelect?: (country: Country) => void;
  selectedCountry?: Country | null;
  defaultDarkMode?: boolean;
}

export default function CountryPicker({ 
  onSelect, 
  selectedCountry, 
  defaultDarkMode = true 
}: CountryPickerProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(defaultDarkMode);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Reference for virtual list container or container scrolling
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Keep track of internal selection to showcase live interaction
  const [internalSelected, setInternalSelected] = useState<Country | null>(selectedCountry || null);

  // Auto scroll to top when search changes
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [searchQuery]);

  // Handle Select click
  const handleCountryClick = (country: Country) => {
    setInternalSelected(country);
    if (onSelect) {
      onSelect(country);
    }
  };

  // Instant filtering memo
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return COUNTRIES_DATA;
    }

    return COUNTRIES_DATA.filter((c) => {
      // 1. Matches Name
      const nameMatch = c.name.toLowerCase().includes(query);
      // 2. Matches Dialing Code (handle both "+92" and "92" formats)
      const sanitizedDialing = c.dialingCode.replace(/[^0-9+]/g, "");
      const searchSanitized = query.replace(/[^0-9+]/g, "");
      const dialingMatch = sanitizedDialing.includes(searchSanitized) || c.dialingCode.toLowerCase().includes(query);
      // 3. Matches ISO code
      const isoMatch = c.isoCode.toLowerCase() === query || c.isoCode.toLowerCase().includes(query);

      return nameMatch || dialingMatch || isoMatch;
    });
  }, [searchQuery]);

  // Helper to highlight matching text in country name
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    
    const parts = text.split(new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <mark 
              key={i} 
              className={`rounded-sm px-0.5 font-bold ${
                isDark 
                  ? "bg-amber-500/30 text-amber-300" 
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Helper to highlight dialing code
  const highlightDialingCode = (code: string, search: string) => {
    if (!search.trim()) return <span className="font-mono">{code}</span>;
    
    const cleanSearch = search.replace(/[^0-9]/g, "");
    const cleanCode = code.replace(/[^0-9]/g, "");
    
    if (cleanSearch && cleanCode.includes(cleanSearch)) {
      return (
        <span className="font-mono text-emerald-500 font-bold">
          {code}
        </span>
      );
    }
    return <span className="font-mono">{code}</span>;
  };

  return (
    <div className={`w-full max-w-md mx-auto rounded-3xl overflow-hidden border transition-all duration-300 ${
      isDark 
        ? "bg-slate-950 border-slate-800/80 text-white shadow-2xl" 
        : "bg-white border-slate-200 text-slate-900 shadow-xl"
    }`}>
      
      {/* Header with Title & Dark Mode Switcher */}
      <div className={`p-5 flex items-center justify-between border-b transition-colors duration-300 ${
        isDark ? "bg-slate-900/60 border-slate-800/60" : "bg-slate-50 border-slate-150"
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500/10 text-emerald-600"
          }`}>
            <Globe className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold tracking-tight">Choose a Country</h3>
            <span className={`text-[10px] font-mono block ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {COUNTRIES_DATA.length} Global Regions Enrolled
            </span>
          </div>
        </div>

        {/* Theme Toggler */}
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-xl transition duration-200 cursor-pointer ${
            isDark 
              ? "bg-slate-800 hover:bg-slate-700 text-amber-400" 
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          }`}
          title={isDark ? "Switch to WhatsApp Light Theme" : "Switch to Sleek Dark Theme"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* STICKY SEARCH CONTAINER */}
      <div className={`p-4 sticky top-0 z-10 transition-colors duration-300 ${
        isDark ? "bg-slate-950/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
      }`}>
        <div className="relative">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or code (e.g. +92, USA, pak)"
            className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-200 ${
              isDark 
                ? "bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-emerald-500/50" 
                : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500/50 focus:bg-white"
            }`}
          />
        </div>
      </div>

      {/* COUNTRY LIST VIEW */}
      <div 
        ref={listContainerRef}
        className={`max-h-[380px] overflow-y-auto divide-y smooth-scroll ${
          isDark ? "divide-slate-900" : "divide-slate-100"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => {
            const isSelected = internalSelected?.isoCode === country.isoCode;
            return (
              <div
                key={country.isoCode}
                onClick={() => handleCountryClick(country)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-all duration-150 select-none ${
                  isSelected 
                    ? isDark ? "bg-emerald-500/10" : "bg-emerald-50/70"
                    : hoveredIndex === index
                      ? isDark ? "bg-slate-900/50" : "bg-slate-50"
                      : ""
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Flag Container */}
                  <span className="text-2xl leading-none select-none shrink-0" role="img" aria-label={country.name}>
                    {country.flag}
                  </span>
                  
                  {/* Country Name & ISO */}
                  <div className="min-w-0">
                    <span className={`text-xs font-semibold block truncate ${
                      isSelected 
                        ? isDark ? "text-emerald-400" : "text-emerald-600" 
                        : isDark ? "text-slate-200" : "text-slate-800"
                    }`}>
                      {highlightText(country.name, searchQuery)}
                    </span>
                    <span className={`text-[9px] font-mono uppercase tracking-wider block ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>
                      {highlightText(country.isoCode, searchQuery)}
                    </span>
                  </div>
                </div>

                {/* Right Area: Dialing code or Check */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] font-mono font-semibold ${
                    isSelected
                      ? isDark ? "text-emerald-400" : "text-emerald-600"
                      : isDark ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {highlightDialingCode(country.dialingCode, searchQuery)}
                  </span>
                  
                  {/* Tick icon */}
                  {isSelected ? (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white"
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={`p-10 text-center space-y-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <Globe className={`w-8 h-8 mx-auto animate-spin ${isDark ? "text-slate-700" : "text-slate-300"}`} style={{ animationDuration: '6s' }} />
            <div className="space-y-1">
              <p className="text-xs font-bold font-mono uppercase tracking-wide">No countries found</p>
              <p className="text-[10px] leading-relaxed max-w-[240px] mx-auto text-slate-500">
                Could not match "{searchQuery}". Check dialing codes, spelling, or ISO codes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SELECTION SHOWCASE FOOTER */}
      <div className={`p-4 border-t text-[11px] transition-colors duration-300 ${
        isDark ? "bg-slate-900/40 border-slate-800/60 text-slate-400" : "bg-slate-50 border-slate-150 text-slate-600"
      }`}>
        {internalSelected ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">{internalSelected.flag}</span>
              <div className="leading-tight">
                <span className={`font-semibold block ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {internalSelected.name}
                </span>
                <span className="text-[9px] font-mono">
                  ISO: {internalSelected.isoCode} • Dial: {internalSelected.dialingCode}
                </span>
              </div>
            </div>
            
            <div className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold flex items-center gap-1 uppercase tracking-wider ${
              isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-100 text-emerald-700"
            }`}>
              <Sparkles className="w-3 h-3" />
              Selected
            </div>
          </div>
        ) : (
          <p className="text-center italic text-[10px] text-slate-500">
            Please tap any country above to register selection.
          </p>
        )}
      </div>

    </div>
  );
}
