import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 1. EasyPaisa - Pakistan's #1 digital wallet (Green & Light Green)
export function EasyPaisaLogo({ className = "", size = 32, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 120 40" 
      width={size * 3} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="120" height="40" rx="8" fill="#0c1d12" />
      <rect x="1" y="1" width="118" height="38" rx="7" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
      {/* Icon portion */}
      <circle cx="24" cy="20" r="10" fill="#10b981" />
      <path d="M19 20h10M24 15v10" stroke="#042f1a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 17l4-2a1 1 0 011 1v8a1 1 0 01-1 1" stroke="#042f1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Brand text */}
      <text x="44" y="22" fill="#ffffff" fontFamily="sans-serif" fontSize="13" fontWeight="900" letterSpacing="0.5">easy</text>
      <text x="44" y="32" fill="#10b981" fontFamily="sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.2">paisa</text>
    </svg>
  );
}

// 2. JazzCash - Pakistan's popular wallet (Black, Red & Yellow)
export function JazzCashLogo({ className = "", size = 32, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 120 40" 
      width={size * 3} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="120" height="40" rx="8" fill="#1a0b0b" />
      <rect x="1" y="1" width="118" height="38" rx="7" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" />
      {/* Dynamic flame/star logo */}
      <path d="M18 26c0-6 4-9 7-12-2 4-1 8 1 10s4 2 4-2c0 5-2 8-5 9s-7-1-7-5z" fill="#ef4444" />
      <path d="M22 27c0-4 2-6 4-8-1 3 0 5 1 6s2 1 2-1c0 3-1 5-3 6s-4-1-4-3z" fill="#f59e0b" />
      {/* Text */}
      <text x="44" y="21" fill="#f59e0b" fontFamily="sans-serif" fontSize="14" fontWeight="900" letterSpacing="0.5">Jazz</text>
      <text x="44" y="32" fill="#ffffff" fontFamily="sans-serif" fontSize="11" fontWeight="800" letterSpacing="0.5">Cash</text>
    </svg>
  );
}

// 3. NayaPay - Fintech pioneer (Orange/Blue gradient/lines)
export function NayaPayLogo({ className = "", size = 32, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 120 40" 
      width={size * 3} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="120" height="40" rx="8" fill="#0b132b" />
      <rect x="1" y="1" width="118" height="38" rx="7" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" />
      {/* Abstract NayaPay logo */}
      <rect x="16" y="14" width="12" height="12" rx="2" fill="#3b82f6" />
      <path d="M20 18l4 4M24 18l-4 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="18" r="3" fill="#f97316" />
      {/* Text */}
      <text x="44" y="25" fill="#ffffff" fontFamily="sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.3">Naya</text>
      <text x="75" y="25" fill="#f97316" fontFamily="sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.3">Pay</text>
      <text x="44" y="33" fill="#64748b" fontFamily="sans-serif" fontSize="7" fontWeight="bold" letterSpacing="1">FINTECH PLATFORM</text>
    </svg>
  );
}

// 4. Habib Bank Limited (HBL) - Green diamond insignia
export function HBLLogo({ className = "", size = 32, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 120 40" 
      width={size * 3} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="120" height="40" rx="8" fill="#022c22" />
      <rect x="1" y="1" width="118" height="38" rx="7" stroke="#059669" strokeWidth="1" strokeOpacity="0.3" />
      {/* Islamic architectural block / diamond green flag */}
      <rect x="16" y="11" width="16" height="16" rx="3" fill="#00a88f" transform="rotate(45 24 19)" />
      <path d="M24 14l3 3v4l-3 3-3-3v-4z" fill="#ffffff" />
      {/* HBL text */}
      <text x="48" y="23" fill="#ffffff" fontFamily="sans-serif" fontSize="15" fontWeight="900" letterSpacing="1">HBL</text>
      <text x="48" y="32" fill="#00a88f" fontFamily="sans-serif" fontSize="7" fontWeight="700" letterSpacing="0.5">HABIB BANK LTD</text>
    </svg>
  );
}

// 5. Overseas Employment Corporation (OEC) - Government of Pakistan Crest-based
export function OECLogo({ className = "", size = 36, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="#064e3b" stroke="#f59e0b" strokeWidth="1" />
      {/* Pakistan Crescent and Star inside golden circle */}
      <circle cx="24" cy="24" r="16" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M28 20a7 7 0 10-9 8 5 5 0 119-8z" fill="#ffffff" />
      <path d="M28.5 15l1.5 1.5L31.5 15l-1 2.5 2.5 1H30l-1.5 1.5v-2l-2.5-1H28z" fill="#f59e0b" />
      {/* Wheat strands / green crescent decoration */}
      <path d="M12 28c3 5 8 7 12 7s9-2 12-7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 6. Fauji Foundation - Defense Service-linked Strategic HR Partners (Navy Blue & Gold)
export function FaujiLogo({ className = "", size = 36, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Laurel wreath and stars */}
      <path d="M14 26A10 10 0 0124 16A10 10 0 0134 26" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      {/* Laurel leaves branches */}
      <path d="M12 28c2-4 5-6 12-6s10 2 12 6" stroke="#10b981" strokeWidth="1" />
      {/* Golden crown or star emblem inside */}
      <path d="M24 18l2 4.5 4.5.5-3.5 3 1.5 4.5-4.5-2.5-4.5 2.5 1.5-4.5-3.5-3 4.5-.5z" fill="#fbbf24" />
    </svg>
  );
}

// 7. POEPA - Pakistan Overseas Employment Promoters Association (Red, Gold & Shield)
export function POEPALogo({ className = "", size = 36, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#311010" stroke="#b91c1c" strokeWidth="1.5" />
      {/* Shield shape */}
      <path d="M16 14h16v12c0 5-3.5 9-8 10-4.5-1-8-5-8-10V14z" fill="#b91c1c" />
      {/* Global globe longitude lines */}
      <circle cx="24" cy="23" r="6" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M18 23h12M24 17v12" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M24 20a3 3 0 010 6" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  );
}

// 8. Saudi BinLadin Group - Strategic Arab Builder Corporation (Corporate Gold & Tower)
export function BinLadinLogo({ className = "", size = 36, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="#18181b" stroke="#d97706" strokeWidth="1.5" />
      {/* Abstract structural crane / skyscraper tower */}
      <path d="M20 34V18l8 16M28 34V18l-8 16" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 34h16M24 14l4 4H20l4-4z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="24" cy="21" r="2" fill="#ffffff" />
    </svg>
  );
}

// 9. Deutsche EU Job Connection - European Job Linker (German flag shield & EU Star crown)
export function DeutscheEULogo({ className = "", size = 36, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      className={`inline-block ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="22" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="1" />
      {/* German flag stripes in a circular clipping */}
      <path d="M12 20h24v-4H12z" fill="#000000" />
      <path d="M12 24h24v-4H12z" fill="#dd0000" />
      <path d="M12 28h24v-4H12z" fill="#ffcf00" />
      {/* Ring of 12 EU stars */}
      <circle cx="24" cy="22" r="11" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Interlinked chain */}
      <path d="M20 22a4 4 0 018 0M28 22a4 4 0 01-8 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Helper component to render an original image with a smooth fallback to SVGs or placeholders
function ImageWithFallback({ 
  src, 
  alt, 
  fallback, 
  size, 
  className 
}: { 
  src: string; 
  alt: string; 
  fallback: React.ReactNode; 
  size: number; 
  className?: string 
}) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ height: size }}
      onError={() => {
        console.warn(`Original logo failed to load: ${src}. Falling back smoothly to premium vector insignia.`);
        setHasError(true);
      }}
      referrerPolicy="no-referrer"
    />
  );
}

// Main logo routing dispatcher helper
export function BrandLogoDispatcher({ id, name, size = 36, className = "" }: { id?: string; name: string; size?: number; className?: string }) {
  const normName = name.toLowerCase();
  
  if (normName.includes("easypaisa")) {
    return <EasyPaisaLogo size={size} className={className} />;
  }
  if (normName.includes("jazzcash")) {
    return <JazzCashLogo size={size} className={className} />;
  }
  if (normName.includes("nayapay")) {
    return <NayaPayLogo size={size} className={className} />;
  }
  
  // HBL - Habib Bank Limited
  if (normName.includes("habib bank") || normName.includes("hbl")) {
    return (
      <ImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/HBL_logo.svg"
        alt="Habib Bank Limited Logo"
        fallback={<HBLLogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  
  // Partner checks
  if (normName.includes("overseas employment") || normName.includes("oec")) {
    return (
      <ImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/commons/e/ef/State_emblem_of_Pakistan.svg"
        alt="Overseas Employment Corporation Logo"
        fallback={<OECLogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  if (normName.includes("fauji")) {
    return (
      <ImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Fauji_Foundation_logo.png/220px-Fauji_Foundation_logo.png"
        alt="Fauji Foundation Logo"
        fallback={<FaujiLogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  if (normName.includes("poepa")) {
    return (
      <ImageWithFallback
        src="https://poepa.com.pk/wp-content/uploads/2021/04/poepa-logo.png"
        alt="POEPA Logo"
        fallback={<POEPALogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  if (normName.includes("binladin") || normName.includes("saudi bin")) {
    return (
      <ImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Saudi_Binladin_Group_Logo.svg/250px-Saudi_Binladin_Group_Logo.svg.png"
        alt="Saudi Binladin Group Logo"
        fallback={<BinLadinLogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  if (normName.includes("deutsche") || normName.includes("german")) {
    return (
      <ImageWithFallback
        src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
        alt="Deutsche EU Job Connection Logo"
        fallback={<DeutscheEULogo size={size} className={className} />}
        size={size}
        className={className}
      />
    );
  }
  
  // Default placeholder if none matched
  return (
    <div className={`w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm ${className}`}>
      {name.charAt(0)}
    </div>
  );
}
