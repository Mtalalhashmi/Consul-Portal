import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface LuxuryLoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LuxuryLoadingOverlay: React.FC<LuxuryLoadingOverlayProps> = ({
  isLoading,
  message = "Preparing your journey..."
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-4"
        >
          {/* Subtle gold backdrop glow */}
          <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
            {/* Gold Circular Spinner */}
            <div className="gold-circular-spinner shadow-[0_0_20px_rgba(212,175,55,0.4)]" />

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold gold-text-gradient tracking-wide">
                ConsulPortal International
              </h3>
              <p className="text-xs text-[#A7A7A7] font-mono animate-pulse">
                {message}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#F5D76E] bg-[#111111] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Test Theme #1: Luxury Black &amp; Gold</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
