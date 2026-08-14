import React from "react";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

interface LegalPageProps {
  onNavigate: (path: string) => void;
  type: "terms" | "privacy";
}

export const LegalPage: React.FC<LegalPageProps> = ({ onNavigate, type }) => {
  const isTerms = type === "terms";

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D4AF37]">
            Consular Legal Charter • 2026 Revision
          </span>
        </div>

        {/* Header */}
        <div className="glass-gold-card p-8 rounded-3xl space-y-3">
          <FileText className="w-10 h-10 text-[#D4AF37]" />
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
            {isTerms ? "Terms & Conditions" : "Privacy & Data Protection Policy"}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A7]">
            {isTerms 
              ? "Official terms governing use of ConsulPortal employment and consular visa services." 
              : "How we collect, protect, and encrypt applicant passport data and dossier information."}
          </p>
        </div>

        {/* Legal Text */}
        <div className="glass-gold-card p-8 rounded-3xl space-y-6 text-xs text-[#A7A7A7] leading-relaxed font-sans">
          {isTerms ? (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">1. Service Scope &amp; Accreditation</h3>
                <p>ConsulPortal acts as an accredited consular liaison platform facilitating employment matching, MOFA attestations, and visa lodgement with embassy delegates. All job offers are issued by verified overseas employers.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">2. Escrow Deposit Framework</h3>
                <p>Funds submitted for visa processing or flight tickets are strictly safeguarded in regulated Escrow. Rebound refunds are initiated if a visa is refused due to employer quota cancellation.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">3. Candidate Accuracy Guarantee</h3>
                <p>Applicants are obligated to provide authentic passport records, educational credentials, and medical reports. Forged documentation will result in immediate disqualification and blacklisting.</p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">1. Passport Data Encryption</h3>
                <p>All uploaded passport scans, National IDs, and CV documents are encrypted using AES-256 standard and transmitted exclusively through TLS 1.3 secured channels.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">2. Consular Third-Party Sharing</h3>
                <p>Data is shared solely with authorized embassy officers, Ministry of Foreign Affairs attestation portals, and verified hiring employers for work permit issuance.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-white">3. Data Retention &amp; Right to Erasure</h3>
                <p>Candidates can request complete deletion of their passport dossiers at any time after application closure or visa completion by contacting privacy@consulportal.org.</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
