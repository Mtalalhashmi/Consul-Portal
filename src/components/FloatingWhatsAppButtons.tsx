import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageCircle, PhoneCall, Sparkles } from "lucide-react";

interface FloatingWhatsAppButtonsProps {
  whatsAppNum: string;
  whatsAppDisplay: string;
  whatsAppNum2: string;
  whatsAppDisplay2: string;
}

export const FloatingWhatsAppButtons: React.FC<FloatingWhatsAppButtonsProps> = ({
  whatsAppNum,
  whatsAppDisplay,
  whatsAppNum2,
  whatsAppDisplay2,
}) => {
  // State to trigger periodic jump effects after initial drop landing
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    // Enable continuous destination jumping after both icons have finished dropping in
    const timer = setTimeout(() => {
      setHasLanded(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="whatsapp-float-container" 
      className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-40 flex flex-col gap-3.5 items-end pointer-events-none"
    >
      {/* 1ST WHATSAPP BUTTON (US / International Helpline) - Drops first */}
      <motion.div
        className="pointer-events-auto relative flex items-center justify-end group"
        initial={{ y: -900, opacity: 0, scale: 0.6, rotate: -25 }}
        animate={
          hasLanded
            ? {
                y: [0, -14, 2, -7, 0],
                scale: [1, 1.08, 0.94, 1.03, 1],
                rotate: [0, -5, 5, -2, 0],
                opacity: 1,
              }
            : {
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }
        }
        transition={
          hasLanded
            ? {
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }
            : {
                type: "spring",
                damping: 12,
                stiffness: 140,
                mass: 1.1,
                delay: 0.3, // Drops from top first
              }
        }
      >
        {/* Pulsing Aura Rings at destination */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping pointer-events-none -z-10" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-[#D4AF37] opacity-60 blur-xs animate-pulse pointer-events-none -z-10" />

        {/* Hover Tooltip Card */}
        <div className="absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 bg-[#0D0D0D] border border-[#D4AF37]/50 text-slate-100 text-xs py-2 px-3.5 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <div>
            <span className="font-bold text-white block leading-tight">US Direct Consular Desk</span>
            <span className="text-[10px] text-[#F5D76E] font-mono">{whatsAppDisplay}</span>
          </div>
        </div>

        {/* Action Anchor Button */}
        <motion.a
          href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-us-btn"
          whileHover={{ scale: 1.18, rotate: [0, -8, 8, 0] }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 text-slate-950 flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.55)] border-2 border-[#D4AF37]/70 cursor-pointer relative"
          title={`Chat with US WhatsApp (${whatsAppDisplay})`}
        >
          {/* WhatsApp Official Vector Path */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
          </svg>

          {/* Region Tag Badge */}
          <span className="absolute -top-1 -right-1 bg-[#141414] text-[#F5D76E] border border-[#D4AF37]/80 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full font-mono shadow-md">
            US
          </span>

          {/* Active Live Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#050505] rounded-full"></span>
        </motion.a>
      </motion.div>

      {/* 2ND WHATSAPP BUTTON (UK / European Desk) - Drops second */}
      <motion.div
        className="pointer-events-auto relative flex items-center justify-end group"
        initial={{ y: -900, opacity: 0, scale: 0.6, rotate: 25 }}
        animate={
          hasLanded
            ? {
                y: [0, -14, 2, -7, 0],
                scale: [1, 1.08, 0.94, 1.03, 1],
                rotate: [0, 5, -5, 2, 0],
                opacity: 1,
              }
            : {
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }
        }
        transition={
          hasLanded
            ? {
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 3.5,
                delay: 0.6, // Alternates jumping rhythm with the 1st button
                ease: "easeInOut",
              }
            : {
                type: "spring",
                damping: 12,
                stiffness: 140,
                mass: 1.1,
                delay: 0.7, // Drops from top second
              }
        }
      >
        {/* Pulsing Aura Rings at destination */}
        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping pointer-events-none -z-10" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 opacity-60 blur-xs animate-pulse pointer-events-none -z-10" />

        {/* Hover Tooltip Card */}
        <div className="absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 bg-[#0D0D0D] border border-blue-500/50 text-slate-100 text-xs py-2 px-3.5 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <div>
            <span className="font-bold text-white block leading-tight">UK & Europe Helpdesk</span>
            <span className="text-[10px] text-blue-300 font-mono">{whatsAppDisplay2}</span>
          </div>
        </div>

        {/* Action Anchor Button */}
        <motion.a
          href={`https://wa.me/${whatsAppNum2}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-uk-btn"
          whileHover={{ scale: 1.18, rotate: [0, 8, -8, 0] }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-slate-950 flex items-center justify-center shadow-[0_8px_25px_rgba(20,184,166,0.55)] border-2 border-blue-400/70 cursor-pointer relative"
          title={`Chat with UK WhatsApp (${whatsAppDisplay2})`}
        >
          {/* WhatsApp Official Vector Path */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
          </svg>

          {/* Region Tag Badge */}
          <span className="absolute -top-1 -right-1 bg-[#141414] text-blue-300 border border-blue-400/80 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full font-mono shadow-md">
            UK
          </span>

          {/* Active Live Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 border-2 border-[#050505] rounded-full"></span>
        </motion.a>
      </motion.div>
    </div>
  );
};
