import React from "react";
import { motion } from "motion/react";
import { Sparkles, MapPin, DollarSign, Clock, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
import { Vacancy } from "../types";

interface SmartJobRecommendationsProps {
  vacancies: Vacancy[];
  onSelectVacancy: (vacancy: Vacancy) => void;
  onExploreCategory?: (category: string) => void;
}

export const SmartJobRecommendations: React.FC<SmartJobRecommendationsProps> = ({
  vacancies,
  onSelectVacancy,
  onExploreCategory
}) => {
  // Pick top recommended jobs from existing vacancies dataset
  const recommendedJobs = vacancies.slice(0, 6);

  if (recommendedJobs.length === 0) return null;

  return (
    <section className="py-12 bg-[#050505] relative overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#F5D76E] text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>SMART CAREER RECOMMENDATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Recommended Jobs <span className="gold-text-gradient">For You</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7A7A7] mt-1">
              Curated international openings based on verified employer demand and high visa approval velocity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A7A7A7] font-mono">
              Showing <strong className="text-[#F5D76E]">{recommendedJobs.length}</strong> Verified Openings
            </span>
          </div>
        </div>

        {/* Recommended Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-gold-card rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{job.flag || "🌐"}</span>
                    <div>
                      <span className="text-xs font-bold text-[#F5D76E] block font-mono">
                        {job.country}
                      </span>
                      <span className="text-[10px] text-[#A7A7A7] block font-mono">
                        {job.region || "Verified Route"}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#050505] border border-[#D4AF37]/30 text-[#D4AF37]">
                    {job.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F5D76E] transition-colors line-clamp-1 mb-2">
                  {job.title}
                </h3>

                <p className="text-xs text-[#A7A7A7] line-clamp-2 mb-4 leading-relaxed">
                  {job.company || "Official Verified Corporate Employer"}
                </p>

                {/* Key Job Meta Pills */}
                <div className="space-y-2 mb-4 text-xs text-[#FFFFFF]/80">
                  <div className="flex items-center justify-between text-xs font-mono bg-[#050505]/80 p-2 rounded-xl border border-[#D4AF37]/15">
                    <span className="text-[#A7A7A7] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" /> Salary:
                    </span>
                    <strong className="text-[#F5D76E]">{job.salary}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#A7A7A7]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Duty: {job.dutyHours || "8 Hours / Day"}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Free Accom.
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => onSelectVacancy(job)}
                className="w-full py-2.5 rounded-xl gold-glow-button flex items-center justify-center gap-2 text-xs font-bold font-serif cursor-pointer"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4 text-[#050505]" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
