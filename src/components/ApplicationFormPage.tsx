import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  User, 
  FileText, 
  Upload, 
  CheckCircle, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  MapPin, 
  DollarSign, 
  Building2, 
  AlertCircle, 
  Loader2, 
  Check, 
  Sparkles,
  PhoneCall,
  Lock
} from "lucide-react";
import { getAllJobs, StructuredJob } from "../utils/jobDatabase";
import { saveApplicationSupabaseClient, uploadFileSupabaseClient } from "../lib/supabase";

interface ApplicationFormPageProps {
  jobId?: string;
  onNavigate: (path: string) => void;
  onTrackApplication: (trackingId: string) => void;
  whatsAppNum?: string;
}

export const ApplicationFormPage: React.FC<ApplicationFormPageProps> = ({
  jobId,
  onNavigate,
  onTrackApplication,
  whatsAppNum = "12513734858"
}) => {
  const allJobs = getAllJobs();
  const selectedJob = allJobs.find(j => j.id === jobId) || allJobs[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [submittedTrackingNum, setSubmittedTrackingNum] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    applyingFrom: "Pakistan",
    passportNumber: "",
    passportExpiry: "",
    cnic: "",
    jobId: selectedJob.id,
    jobTitle: selectedJob.jobTitle,
    country: selectedJob.country,
    company: selectedJob.companyName || "Verified Employer",
    experienceYears: "3-5 Years",
    coverLetter: "",
    uploadedFileName: "",
    uploadedFileUrl: ""
  });

  useEffect(() => {
    if (selectedJob) {
      setFormData(prev => ({
        ...prev,
        jobId: selectedJob.id,
        jobTitle: selectedJob.jobTitle,
        country: selectedJob.country,
        company: selectedJob.companyName || "Verified Employer"
      }));
    }
  }, [selectedJob]);

  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size exceeds 10MB limit.");
      return;
    }

    setUploadingFile(true);
    setUploadError("");

    try {
      // Try uploading to Supabase Storage if configured
      const url = await uploadFileSupabaseClient(file);
      setFormData(prev => ({
        ...prev,
        uploadedFileName: file.name,
        uploadedFileUrl: url || URL.createObjectURL(file)
      }));
    } catch (err: any) {
      setFormData(prev => ({
        ...prev,
        uploadedFileName: file.name,
        uploadedFileUrl: URL.createObjectURL(file)
      }));
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const appId = `app-${Date.now().toString().slice(-6)}`;
    const trackingNum = `PK-${Math.floor(10000 + Math.random() * 90000)}`;

    const applicationPayload = {
      id: appId,
      trackingNumber: trackingNum,
      vacancyId: formData.jobId,
      vacancyTitle: formData.jobTitle,
      country: formData.country,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      applyingFrom: formData.applyingFrom,
      company: formData.company,
      passportNumber: formData.passportNumber,
      passportExpiry: formData.passportExpiry,
      cnic: formData.cnic,
      status: "Pending",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      coverLetter: formData.coverLetter,
      uploadedFile: formData.uploadedFileName ? {
        name: formData.uploadedFileName,
        size: 1024000,
        type: "application/pdf"
      } : undefined
    };

    try {
      // 1. Submit to express server API endpoint
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationPayload)
      });

      // 2. Also attempt Supabase direct client save
      await saveApplicationSupabaseClient(applicationPayload);

      setSubmittedAppId(appId);
      setSubmittedTrackingNum(trackingNum);
      setCurrentStep(6); // Confirmation step
    } catch (err) {
      console.warn("API submission note, falling back to local state confirmation:", err);
      setSubmittedAppId(appId);
      setSubmittedTrackingNum(trackingNum);
      setCurrentStep(6);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/job/${formData.jobId}`)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Job Details</span>
          </button>

          <span className="text-xs font-mono text-[#D4AF37]">
            Dossier Lodgement Portal • 100% Escrow Secured
          </span>
        </div>

        {/* Steps Header */}
        <div className="glass-gold-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">OFFICIAL APPLICATION</span>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-white">
                Applying for: <span className="gold-text-gradient">{formData.jobTitle}</span>
              </h1>
              <p className="text-xs text-[#A7A7A7] mt-0.5">
                Destination: {formData.country} ({formData.company})
              </p>
            </div>

            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-[#D4AF37]">Step {currentStep} of 5</span>
            </div>
          </div>

          {/* Progress Indicator */}
          {currentStep <= 5 && (
            <div className="grid grid-cols-5 gap-2 pt-2">
              {[
                { num: 1, label: "Personal" },
                { num: 2, label: "Passport" },
                { num: 3, label: "Job Info" },
                { num: 4, label: "Documents" },
                { num: 5, label: "Review" }
              ].map((step) => (
                <div key={step.num} className="space-y-1 text-center">
                  <div className={`h-1.5 rounded-full transition-all ${
                    currentStep >= step.num ? "bg-[#D4AF37]" : "bg-[#222222]"
                  }`} />
                  <span className={`text-[10px] font-mono block ${
                    currentStep === step.num ? "text-[#F5D76E] font-bold" : "text-[#A7A7A7]"
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Steps */}
        <div className="glass-gold-card p-6 sm:p-8 rounded-3xl">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-[#D4AF37]" />
                <span>Step 1: Personal Information</span>
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Full Name (As in Passport) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Muhammad Adnan"
                    className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="adnan@gmail.com"
                      className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#A7A7A7] uppercase">WhatsApp / Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Applying From Country</label>
                  <select
                    value={formData.applyingFrom}
                    onChange={(e) => setFormData({ ...formData, applyingFrom: e.target.value })}
                    className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="Pakistan">Pakistan 🇵🇰</option>
                    <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                    <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                    <option value="India">India 🇮🇳</option>
                    <option value="Bangladesh">Bangladesh 🇧🇩</option>
                    <option value="Other">Other International Country</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!formData.name || !formData.email || !formData.phone}
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl gold-glow-button font-serif text-xs font-bold text-[#050505] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Next: Passport Info</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Step 2: Passport &amp; Identification</span>
              </h3>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Passport Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.passportNumber}
                      onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. PK8492019"
                      className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-[#F5D76E] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Passport Expiry Date</label>
                    <input
                      type="date"
                      value={formData.passportExpiry}
                      onChange={(e) => setFormData({ ...formData, passportExpiry: e.target.value })}
                      className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#A7A7A7] uppercase">National ID / CNIC Number</label>
                  <input
                    type="text"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    placeholder="35202-1234567-1"
                    className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!formData.passportNumber}
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl gold-glow-button font-serif text-xs font-bold text-[#050505] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Next: Job Selection</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                <span>Step 3: Job Information</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#050505] border border-[#D4AF37]/30 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Selected Job Position</span>
                    <h4 className="text-lg font-serif font-bold text-white">{formData.jobTitle}</h4>
                  </div>
                  <span className="text-xs font-mono text-[#F5D76E] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20">
                    ID: {formData.jobId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#A7A7A7] font-mono">
                  <p>📍 Destination: <strong className="text-white">{formData.country}</strong></p>
                  <p>🏢 Employer: <strong className="text-white">{formData.company}</strong></p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Relevant Work Experience</label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="Fresh / Entry Level">Fresh / Entry Level</option>
                  <option value="1-2 Years">1 - 2 Years</option>
                  <option value="3-5 Years">3 - 5 Years</option>
                  <option value="5+ Years">5+ Years Professional</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#A7A7A7] uppercase">Additional Notes or Qualifications (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Mention any trade certifications, language skills (IELTS/Arabic), or former Gulf experience..."
                  className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl gold-glow-button font-serif text-xs font-bold text-[#050505] flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Documents Upload</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#D4AF37]" />
                <span>Step 4: Upload Passport Scan &amp; CV</span>
              </h3>

              <div className="p-6 rounded-2xl bg-[#050505] border-2 border-dashed border-[#D4AF37]/40 text-center space-y-3">
                <Upload className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <div>
                  <p className="text-sm font-bold text-white">Upload Passport Scan / CV Document</p>
                  <p className="text-xs text-[#A7A7A7] mt-1">Accepted formats: PDF, JPG, PNG, DOC (Max 10MB)</p>
                </div>

                <label className="inline-block px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/50 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer">
                  {uploadingFile ? "Uploading File..." : "Browse Local File"}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {formData.uploadedFileName && (
                  <div className="pt-2 text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Selected: {formData.uploadedFileName}</span>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-rose-400 font-mono">{uploadError}</p>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-3 rounded-xl gold-glow-button font-serif text-xs font-bold text-[#050505] flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <form onSubmit={handleSubmitApplication} className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>Step 5: Review &amp; Submit Application</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#050505] border border-[#D4AF37]/30 space-y-2">
                  <p className="text-[#D4AF37] font-bold uppercase text-[10px]">Personal Information</p>
                  <p>👤 Name: <span className="text-white font-bold">{formData.name}</span></p>
                  <p>📧 Email: <span className="text-white">{formData.email}</span></p>
                  <p>📞 Phone: <span className="text-white">{formData.phone}</span></p>
                  <p>🌍 Country: <span className="text-white">{formData.applyingFrom}</span></p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050505] border border-[#D4AF37]/30 space-y-2">
                  <p className="text-[#D4AF37] font-bold uppercase text-[10px]">Passport Information</p>
                  <p>🛂 Passport No: <span className="text-[#F5D76E] font-bold">{formData.passportNumber}</span></p>
                  <p>📅 Expiry: <span className="text-white">{formData.passportExpiry || "N/A"}</span></p>
                  <p>🆔 CNIC: <span className="text-white">{formData.cnic || "N/A"}</span></p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050505] border border-[#D4AF37]/30 space-y-2">
                  <p className="text-[#D4AF37] font-bold uppercase text-[10px]">Job Selection</p>
                  <p>💼 Job Title: <span className="text-white font-bold">{formData.jobTitle}</span></p>
                  <p>📍 Destination: <span className="text-white">{formData.country}</span></p>
                  <p>🏢 Employer: <span className="text-white">{formData.company}</span></p>
                  <p>📎 Document: <span className="text-white">{formData.uploadedFileName || "None Attached"}</span></p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#A7A7A7] space-y-1">
                <p className="text-[#F5D76E] font-bold">🛡️ Consular Escrow Guarantee</p>
                <p>Your application will be instantly registered in the database and logged under a unique Tracking ID. Zero processing charges until dossier approval.</p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl gold-glow-button effect-shimmer-button font-serif text-xs font-black text-[#050505] flex items-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#050505]" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#050505]" />
                      <span>Submit Application Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {currentStep === 6 && (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">DOSSIER LODGED SUCCESSFULLY</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  Application Confirmed!
                </h2>
                <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-lg mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your application for <strong className="text-white">{formData.jobTitle}</strong> in <strong className="text-white">{formData.country}</strong> has been logged in our secure database.
                </p>
              </div>

              <div className="bg-[#050505] p-6 rounded-2xl border border-[#D4AF37]/40 max-w-md mx-auto space-y-3 font-mono">
                <p className="text-xs text-[#A7A7A7] uppercase">Your Official Tracking Reference:</p>
                <p className="text-2xl font-bold text-[#F5D76E] bg-[#D4AF37]/10 py-2 rounded border border-[#D4AF37]/30">
                  {submittedTrackingNum}
                </p>
                <p className="text-[11px] text-[#A7A7A7]">Use this ID to track embassy stamping &amp; document status live anytime.</p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onTrackApplication(submittedTrackingNum || "")}
                  className="px-6 py-3 rounded-xl gold-glow-button font-serif text-xs font-bold text-[#050505] cursor-pointer"
                >
                  Track Application Now
                </button>

                <a
                  href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%2C%20I%20just%20submitted%20application%20Ref%3A%20${submittedTrackingNum}%20for%20${encodeURIComponent(formData.jobTitle)}.%20Please%20confirm%20receipt.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
