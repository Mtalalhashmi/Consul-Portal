import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  ShieldCheck, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowDown, 
  Play, 
  Pause,
  Globe2,
  MapPin
} from "lucide-react";
import { REVIEWS } from "../data";
import { Review } from "../types";
import AnimatedCounter from "./AnimatedCounter";

interface StackedReviewsSectionProps {
  whatsAppNum?: string;
  onOpenBookingDesk?: () => void;
}

export const StackedReviewsSection: React.FC<StackedReviewsSectionProps> = ({
  whatsAppNum = "16065154971",
  onOpenBookingDesk
}) => {
  const [reviewsList] = useState<Review[]>(REVIEWS);
  const [viewMode, setViewMode] = useState<"deck" | "stack" | "grid">("deck");
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [filterRegion, setFilterRegion] = useState<"all" | "pakistan" | "india" | "bangladesh" | "gulf" | "schengen">("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  // Filter reviews according to selected region or country
  const filteredReviews = reviewsList.filter((r) => {
    const loc = r.location.toLowerCase();
    const country = r.countryGranted.toLowerCase();

    if (filterRegion === "pakistan") {
      return loc.includes("pakistan") || loc.includes("lahore") || loc.includes("karachi") || loc.includes("islamabad") || loc.includes("rawalpindi") || loc.includes("peshawar") || loc.includes("faisalabad");
    }
    if (filterRegion === "india") {
      return loc.includes("india") || loc.includes("delhi") || loc.includes("mumbai") || loc.includes("kolkata") || loc.includes("kerala") || loc.includes("kochi") || loc.includes("ahmedabad") || loc.includes("chandigarh") || loc.includes("hyderabad");
    }
    if (filterRegion === "bangladesh") {
      return loc.includes("bangladesh") || loc.includes("dhaka") || loc.includes("chittagong") || loc.includes("sylhet") || loc.includes("narayanganj") || loc.includes("comilla") || loc.includes("rajshahi");
    }
    if (filterRegion === "gulf") {
      return country.includes("saudi") || country.includes("emirates") || country.includes("qatar") || country.includes("kuwait") || country.includes("oman") || country.includes("gulf") || country.includes("dubai") || country.includes("riyadh") || country.includes("neom");
    }
    if (filterRegion === "schengen") {
      return country.includes("schengen") || country.includes("germany") || country.includes("poland") || country.includes("italy") || country.includes("france") || country.includes("spain") || country.includes("romania") || country.includes("czech") || country.includes("netherlands");
    }
    return true;
  });

  // Clamp activeDeckIndex if filtered list shrinks
  useEffect(() => {
    if (activeDeckIndex >= filteredReviews.length) {
      setActiveDeckIndex(0);
    }
  }, [filteredReviews.length, activeDeckIndex]);

  // AUTO-SLIDE TIMER (smooth transition left-to-right every 3.2 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered || viewMode !== "deck" || filteredReviews.length <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection("right");
      setActiveDeckIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, viewMode, filteredReviews.length]);

  const nextDeckCard = () => {
    setSlideDirection("right");
    setActiveDeckIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevDeckCard = () => {
    setSlideDirection("left");
    setActiveDeckIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  return (
    <section id="reviews-section" className="relative py-8 space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2,445+ VERIFIED CANDIDATE STAMPED PASSPORTS</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
          Candidate Success &amp; Visa Reviews
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Watch candidate reviews flip smoothly from left to right, or toggle nationality filters for Pakistan, India, Bangladesh, Gulf &amp; Schengen Europe.
        </p>

        {/* CONTROLS BAR: NATIONALITY & REGION FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-b border-slate-900 pb-4">
          
          {/* NATIONALITY & REGION FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => { setFilterRegion("all"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "all"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({reviewsList.length})
            </button>
            <button
              onClick={() => { setFilterRegion("pakistan"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "pakistan"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🇵🇰 Pakistan
            </button>
            <button
              onClick={() => { setFilterRegion("india"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "india"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🇮🇳 India
            </button>
            <button
              onClick={() => { setFilterRegion("bangladesh"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "bangladesh"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🇧🇩 Bangladesh
            </button>
            <button
              onClick={() => { setFilterRegion("schengen"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "schengen"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🇪🇺 Schengen
            </button>
            <button
              onClick={() => { setFilterRegion("gulf"); setActiveDeckIndex(0); }}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                filterRegion === "gulf"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🇦🇪 GCC Gulf
            </button>
          </div>

        </div>
      </div>

      {/* MODE 1: INTERACTIVE 3D FLIP DECK (AUTO-SLIDING LEFT TO RIGHT) */}
      {viewMode === "deck" && (
        <div className="py-4 space-y-6">
          
          {/* TOP CONTROLS: PLAY/PAUSE, COUNTER & AUTO-INDICATOR */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-400 max-w-2xl mx-auto px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 px-2.5 py-1 rounded-lg text-amber-400 transition"
                title={isPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Auto Sliding..." : "Paused"}</span>
              </button>
              {isHovered && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Hovered (Paused)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span>Candidate Review</span>
              <span className="text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-amber-400">
                {activeDeckIndex + 1} / {filteredReviews.length}
              </span>
            </div>
          </div>

          {/* CARD DECK CONTAINER WITH LAYERED STACK EFFECT */}
          <div 
            className="relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center px-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* BACKGROUND PREVIEW CARD (LAYERED BEHIND) */}
            {filteredReviews.length > 1 && (
              <div 
                className="absolute inset-x-4 sm:inset-x-12 top-6 bottom-0 bg-slate-950/80 border border-slate-800/60 rounded-2xl opacity-40 scale-95 transform translate-y-3 pointer-events-none z-0 max-w-2xl mx-auto"
              />
            )}

            {/* MAIN ACTIVE SLIDING CARD */}
            <AnimatePresence mode="wait">
              {filteredReviews.map((review, idx) => {
                if (idx !== activeDeckIndex) return null;

                const initialX = slideDirection === "right" ? 70 : -70;
                const exitX = slideDirection === "right" ? -70 : 70;

                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: initialX, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: exitX, scale: 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8
                    }}
                    className="relative z-10 bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black max-w-2xl w-full space-y-5 overflow-hidden transition-all duration-300"
                  >
                    {/* Background Decorative Quote */}
                    <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/20 pointer-events-none" />

                    {/* Top Row: Stars, Verified Tag, & Index */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {Array.from({ length: review.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Stamped &amp; Verified</span>
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-amber-400" />
                        <span>#{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                    </div>

                    {/* Review Comment Body */}
                    <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-sans relative z-10">
                      "{review.comment}"
                    </p>

                    {/* Candidate Details & Granted Country */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/60 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40 shadow-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`;
                            }}
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-slate-900" title="Identity Verified" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                            <span>{review.name}</span>
                          </h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                            <span>{review.location}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-slate-950 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-medium shadow-inner">
                          Approved: <span className="font-bold text-white">{review.countryGranted}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    {/* Animated Progress Bar across bottom */}
                    {isPlaying && !isHovered && (
                      <motion.div
                        key={`bar-${activeDeckIndex}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400"
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* DECK NAVIGATION CONTROLS */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={prevDeckCard}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md group"
              title="Previous Review"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* DOT INDICATORS */}
            <div className="flex items-center gap-1.5 max-w-xs overflow-x-auto py-2 px-1">
              {filteredReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSlideDirection(i > activeDeckIndex ? "right" : "left");
                    setActiveDeckIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all shrink-0 ${
                    i === activeDeckIndex
                      ? "w-7 bg-amber-400"
                      : "w-2 bg-slate-800 hover:bg-slate-700"
                  }`}
                  title={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextDeckCard}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md group"
              title="Next Review"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      )}

      {/* MODE 2: STACKED SCROLL (ONE BEHIND ANOTHER STICKY DECK) */}
      {viewMode === "stack" && (
        <div className="relative pt-2 pb-16 space-y-6">
          <div className="text-center flex items-center justify-center gap-2 text-[11px] font-mono text-amber-400/80 bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 max-w-xs mx-auto">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            <span>Scroll down to stack reviews smoothly</span>
          </div>

          <div className="relative space-y-8 sm:space-y-10 min-h-[600px] pb-12">
            {filteredReviews.map((review, idx) => {
              const topOffset = 80 + idx * 20;
              
              return (
                <div
                  key={review.id}
                  className="sticky transition-all duration-300"
                  style={{
                    top: `${topOffset}px`,
                    zIndex: idx + 10,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                      mass: 0.8
                    }}
                    className="group bg-slate-900/95 border border-slate-800 hover:border-amber-500/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/90 max-w-2xl mx-auto space-y-5 relative overflow-hidden transition-all duration-300"
                  >
                    <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/20 group-hover:text-amber-500/5 transition-colors pointer-events-none" />

                    <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {Array.from({ length: review.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Passport Stamped</span>
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800/80">
                        Card <span className="text-amber-400 font-bold">#{String(idx + 1).padStart(2, "0")}</span> of {filteredReviews.length}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-sans">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/60 relative z-10">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-400 transition-colors shadow-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`;
                          }}
                        />
                        <div>
                          <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                            {review.name}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {review.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-slate-950/90 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-medium text-amber-300 flex items-center gap-1.5 shadow-sm">
                          <span className="text-amber-400 font-bold">Approved:</span>
                          <span>{review.countryGranted}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {review.date}
                        </span>
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: EXPANDED GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Stamped
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`;
                  }}
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{review.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span>{review.location}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-medium">{review.countryGranted}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* VERIFIED COUNT & GUARANTEE CERTIFICATION BAR */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-500/5 to-slate-950 border border-slate-800/80 py-6 px-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Consular Guarantee Certification</span>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">OEP Licensed</span>
            </h4>
            <p className="text-xs text-slate-400">Every candidate file and visa stamp is legally verified and tracked under government labor laws.</p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <div className="text-2xl font-black text-amber-400 font-display">
            <AnimatedCounter target={2445} /> / 2,450
          </div>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Perfect Files Stamped &amp; Dispatched</p>
        </div>
      </div>

    </section>
  );
};

export default StackedReviewsSection;
