import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Building2, 
  CheckCircle, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  FileText, 
  Award, 
  Users, 
  Check, 
  Sparkles,
  PhoneCall,
  ChevronRight,
  Send,
  AlertCircle
} from "lucide-react";
import { getAllJobs, ISO_MAP, StructuredJob } from "../utils/jobDatabase";
import { getJobImageByTitle } from "../utils/jobImages";

interface JobDetailsPageProps {
  jobId: string;
  onNavigate: (path: string) => void;
  onApply: (jobId: string) => void;
  whatsAppNum?: string;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({
  jobId,
  onNavigate,
  onApply,
  whatsAppNum = "12513734858"
}) => {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const allJobs = getAllJobs();
  const job = allJobs.find(j => j.id === jobId) || allJobs[0];

  const jobImage = getJobImageByTitle(job?.jobTitle || "") || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.jobTitle} in ${job.country}`,
        text: `Check out this position for ${job.jobTitle} in ${job.country} on ConsulPortal!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const relatedJobs = allJobs
    .filter(j => (j.country === job.country || j.category === job.category) && j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("/jobs")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to All Vacancies</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isBookmarked 
                  ? "bg-[#D4AF37] text-[#050505] border-[#D4AF37]" 
                  : "bg-[#111111] border-[#D4AF37]/30 text-[#F5D76E] hover:border-[#D4AF37]"
              }`}
              title={isBookmarked ? "Saved" : "Save Job"}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] hover:border-[#D4AF37] transition cursor-pointer relative"
              title="Share Job"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-[#D4AF37] text-[#050505] px-2 py-0.5 rounded font-bold whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Header Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 glass-gold-card p-6 sm:p-8">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src={jobImage} 
              alt={job.jobTitle}
              className="w-full h-full object-cover filter brightness-50 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/80" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#111111] border border-[#D4AF37]/50 text-[#F5D76E] text-xs font-mono font-bold flex items-center gap-1.5">
                  <span className="text-base">{job.flag}</span>
                  <span>{job.country}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  Verified Employer
                </span>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono">
                  {job.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight">
                {job.jobTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-[#A7A7A7] font-mono">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white font-bold">{job.companyName || `${job.country} Enterprise`}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{job.city}, {job.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Posted: {job.postedDate || "Recently"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-emerald-400 font-bold">{job.vacancies || 12} Open Positions</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="bg-[#050505]/80 px-4 py-2.5 rounded-2xl border border-[#D4AF37]/40 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-[10px] text-[#A7A7A7] uppercase font-mono">Monthly Salary</p>
                    <p className="text-lg font-serif font-black gold-text-gradient">{job.salaryString}</p>
                  </div>
                </div>

                <div className="bg-[#050505]/80 px-4 py-2.5 rounded-2xl border border-[#D4AF37]/40 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-[10px] text-[#A7A7A7] uppercase font-mono">Duty Hours</p>
                    <p className="text-sm font-bold text-white">{job.dutyHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Sidebar Box */}
            <div className="lg:col-span-4 bg-[#0a0a0a]/90 p-6 rounded-2xl border border-[#D4AF37]/50 space-y-4 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">Official Sourcing</span>
                <p className="text-xs text-[#A7A7A7]">Job ID: <strong className="text-white font-mono">{job.id}</strong></p>
              </div>

              <button
                onClick={() => onApply(job.id)}
                className="w-full py-4 rounded-xl gold-glow-button effect-shimmer-button font-serif text-sm font-extrabold text-[#050505] flex items-center justify-center gap-2 cursor-pointer shadow-xl uppercase tracking-wider"
              >
                <Send className="w-4 h-4 text-[#050505]" />
                <span>Apply Now for This Job</span>
              </button>

              <a
                href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%2C%20I%20am%20interested%20in%20applying%20for%20Job%20ID%3A%20${job.id}%20(${encodeURIComponent(job.jobTitle)}%20in%20${encodeURIComponent(job.country)}).%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="text-[11px] text-[#A7A7A7] font-mono text-center pt-1 border-t border-[#D4AF37]/20">
                🛡️ 100% Escrow Protected &amp; Verified Visa Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview / Description */}
            <div className="glass-gold-card p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>Job Description &amp; Scope</span>
              </h3>
              <p className="text-sm text-[#A7A7A7] leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Key Benefits & Accommodation Package */}
            <div className="glass-gold-card p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span>Employer Provided Benefits Package</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-[#050505] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[#A7A7A7] text-[10px] uppercase">Accommodation</p>
                    <p className="text-white font-bold">Free Provided by Employer</p>
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[#A7A7A7] text-[10px] uppercase">Medical &amp; Insurance</p>
                    <p className="text-white font-bold">Full Coverage Insurance</p>
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[#A7A7A7] text-[10px] uppercase">Transportation</p>
                    <p className="text-white font-bold">Site Allowance / Transport Provided</p>
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[#A7A7A7] text-[10px] uppercase">Air Ticket</p>
                    <p className="text-white font-bold">Free Return Ticket (2 Year Contract)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements & Required Documents */}
            <div className="glass-gold-card p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Candidate Eligibility &amp; Requirements</span>
              </h3>

              <div className="space-y-3 text-xs text-[#A7A7A7]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Experience Level:</strong> {job.experience} minimum relevant work history.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Age Bracket:</strong> 18 to 48 years old.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Passport Validity:</strong> Minimum 6 months validity from date of application.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Required Documents:</strong> Valid Passport Scan, Educational Certificates (Attested), Updated CV, Medical Fitness Record, Passport Size Photos (White background).</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Country & Sourcing Details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Country Card Widget */}
            <div className="glass-gold-card p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{job.flag}</span>
                <div>
                  <h4 className="font-serif font-bold text-white text-base">{job.country}</h4>
                  <p className="text-xs text-[#A7A7A7] font-mono">Consular Destination Hub</p>
                </div>
              </div>

              <div className="text-xs space-y-2 text-[#A7A7A7] pt-2 border-t border-[#D4AF37]/20">
                <p>📍 <strong>Primary City:</strong> {job.city}</p>
                <p>🛂 <strong>Visa Type:</strong> Work Permit / Employment Sponsorship</p>
                <p>⏱️ <strong>Processing Time:</strong> 15 to 45 Days average</p>
                <p>🏛️ <strong>Legal Clearance:</strong> MOFA &amp; Embassy Approved</p>
              </div>

              <button
                onClick={() => onNavigate(`/country/${job.country.toLowerCase().replace(/\s+/g, '-')}`)}
                className="w-full py-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/40 text-[#F5D76E] text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View All {job.country} Jobs</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="glass-gold-card p-6 rounded-3xl space-y-4">
                <h4 className="font-serif font-bold text-white text-sm">Similar Job Vacancies</h4>
                <div className="space-y-3">
                  {relatedJobs.map((rj) => (
                    <div
                      key={rj.id}
                      onClick={() => onNavigate(`/job/${rj.id}`)}
                      className="p-3 rounded-2xl bg-[#050505] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white hover:text-[#F5D76E] transition">{rj.jobTitle}</span>
                        <span className="text-sm">{rj.flag}</span>
                      </div>
                      <p className="text-[10px] text-[#A7A7A7] font-mono">{rj.city}, {rj.country} • {rj.salaryString}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
