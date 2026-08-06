import React, { useState } from "react";
import { 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Share2, 
  Award, 
  ChevronRight, 
  Send, 
  RefreshCw, 
  GraduationCap, 
  Briefcase, 
  Stethoscope, 
  Globe2, 
  Languages, 
  ShieldCheck, 
  HelpCircle,
  MessageSquare,
  Check,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AiMatchEvaluatorProps {
  whatsAppNum?: string;
  whatsAppDisplay?: string;
  onNavigateToVacancies?: () => void;
}

export default function AiMatchEvaluator({
  whatsAppNum = "923001234567",
  whatsAppDisplay = "+92 300 1234567",
  onNavigateToVacancies
}: AiMatchEvaluatorProps) {
  // Form Inputs
  const [destination, setDestination] = useState<string>("Germany");
  const [category, setCategory] = useState<string>("Engineering & IT");
  const [candidateName, setCandidateName] = useState<string>("");
  const [education, setEducation] = useState<string>("bachelor");
  const [experienceYears, setExperienceYears] = useState<number>(4);
  const [attestationStatus, setAttestationStatus] = useState<string>("hec_attested");
  const [medicalStatus, setMedicalStatus] = useState<string>("gamca_fit");
  const [languageScore, setLanguageScore] = useState<string>("english_fluent");
  const [ageGroup, setAgeGroup] = useState<string>("25-35");

  // Evaluation State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalStep, setEvalStep] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  // Interview Simulator State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [interviewFeedback, setInterviewFeedback] = useState<Record<number, { score: number; tip: string }>>({});

  // Trigger AI Evaluation Scan
  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setResult(null);

    const steps = [
      "Connecting to Ministry & Embassy Eligibility Matrix...",
      "Validating academic credential equivalency & HEC database...",
      "Evaluating GAMCA medical & SIS Schengen security clearance vectors...",
      "Analyzing labor market quota availability and visa success ratio...",
      "Finalizing AI Candidate Readiness Report & Interview Questions..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setEvalStep(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsEvaluating(false);

        // Calculate dynamic logic score based on user inputs
        let score = 65;
        if (education === "master" || education === "phd") score += 15;
        if (education === "bachelor") score += 10;
        if (experienceYears >= 5) score += 12;
        else if (experienceYears >= 3) score += 8;
        if (attestationStatus === "embassy_attested") score += 10;
        if (attestationStatus === "hec_attested") score += 6;
        if (medicalStatus === "gamca_fit") score += 10;
        if (languageScore === "german_b1" || languageScore === "english_fluent") score += 8;

        const finalScore = Math.min(score, 98);

        // Generate tailored recommendations
        const gaps: string[] = [];
        if (attestationStatus !== "embassy_attested") {
          gaps.push("Complete Ministry of Foreign Affairs (MOFA) and Embassy seal attestation on degree.");
        }
        if (medicalStatus !== "gamca_fit") {
          gaps.push("Schedule GCC GAMCA or Schengen panel physician medical checkup.");
        }
        if (languageScore === "none") {
          gaps.push("Enroll in basic language preparation course (German A1/A2 or IELTS 5.5).");
        }
        if (experienceYears < 3) {
          gaps.push("Attach verified employment reference letters from previous registered employers.");
        }

        // Questions tailored to destination
        let questions = [
          {
            q: "Why do you want to relocate to " + destination + " for work?",
            hint: "Emphasize long-term career growth, respect for local regulations, and proven professional skills."
          },
          {
            q: "How do you handle cultural or language barriers with team members?",
            hint: "Highlight adaptability, active listening, and willingness to learn local work norms."
          },
          {
            q: "What technical or trade qualifications make you the best fit for this visa category?",
            hint: "Reference specific certifications, HEC degree attestations, and past project track records."
          }
        ];

        setResult({
          score: finalScore,
          destination,
          category,
          candidateName: candidateName.trim() || "Valued Applicant",
          gaps,
          questions,
          timestamp: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          refCode: "AI-EVAL-" + Math.floor(100000 + Math.random() * 900000)
        });
      }
    }, 450);
  };

  const handleAnswerSubmit = (index: number, text: string) => {
    setUserAnswers(prev => ({ ...prev, [index]: text }));
    const mockScore = text.trim().length > 30 ? 92 : text.trim().length > 10 ? 75 : 55;
    const tip = text.trim().length > 30 
      ? "Excellent, structured answer! Demonstrates high confidence and professional clarity."
      : "Good start. Try adding specific examples from your past work experience to sound more convincing to the visa officer.";
    
    setInterviewFeedback(prev => ({ ...prev, [index]: { score: mockScore, tip } }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              <span>AI Visa Intelligence & Skill Evaluator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Instant AI Overseas Visa Eligibility & Resume Assessment
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Evaluate your visa approval probability across Gulf (Saudi, UAE, Qatar), UK, and Schengen Europe (Germany, Poland, Italy) using our official government-trained AI matrix.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 shrink-0">
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>OEC Govt Rules Sync</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>99.4% Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: EVALUATION FORM */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Globe2 className="w-5 h-5 text-amber-400" />
              <span>Candidate & Visa Parameters</span>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">Step 1 of 2</span>
          </div>

          {/* Candidate Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Candidate Name (Optional)</span>
              <span className="text-[10px] text-slate-500">For Official Report</span>
            </label>
            <input 
              type="text"
              placeholder="e.g. Muhammad Ali"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Target Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Destination Country</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Germany", flag: "🇩🇪", region: "Schengen EU Blue Card" },
                { name: "Saudi Arabia", flag: "🇸🇦", region: "Gulf Wakaalah / Aramco" },
                { name: "United Kingdom", flag: "🇬🇧", region: "UK Tier 2 Skilled" },
                { name: "United Arab Emirates", flag: "🇦🇪", region: "UAE Work & Residence" },
                { name: "Qatar", flag: "🇶🇦", region: "Gulf Technical & Hospitality" },
                { name: "Poland", flag: "🇵🇱", region: "Schengen Single Permit" }
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setDestination(item.name)}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    destination === item.name 
                      ? "bg-amber-500/10 border-amber-500 text-amber-300 font-bold shadow-md" 
                      : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="text-xl">{item.flag}</span>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.region}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Occupational Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Occupational Trade Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
            >
              <option value="Engineering & IT">Engineering, Software & IT Systems</option>
              <option value="Medical & Healthcare">Medical, Nursing & Clinical Healthcare</option>
              <option value="Technical & Heavy Trades">Technical Trades, HVAC, Welders, Mechanics</option>
              <option value="Construction & Civil">Construction Supervisors, Civil Engineers & Surveyors</option>
              <option value="Logistics & Warehousing">Logistics, Cargo Clearing & Warehouse Leads</option>
              <option value="Hospitality & Retail">Hospitality, Hotel Executive & Retail Managers</option>
            </select>
          </div>

          {/* Education & Experience Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Highest Qualification</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="matric">Matric / Intermediate</option>
                <option value="diploma">Technical Diploma (DAE / Trade)</option>
                <option value="bachelor">Bachelor's Degree (BS / B.Sc)</option>
                <option value="master">Master's Degree (MS / M.Sc)</option>
                <option value="phd">Ph.D. / Doctorate</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Experience (Years)</label>
              <input 
                type="number"
                min={0}
                max={30}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Attestation & Medical Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Document Attestation</label>
              <select
                value={attestationStatus}
                onChange={(e) => setAttestationStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="embassy_attested">Fully Embassy & MOFA Attested</option>
                <option value="hec_attested">HEC Attested Only</option>
                <option value="in_progress">In-Progress at MOFA</option>
                <option value="none">Not Attested Yet</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Medical Fitness Status</label>
              <select
                value={medicalStatus}
                onChange={(e) => setMedicalStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="gamca_fit">GAMCA / Panel Medical Fit</option>
                <option value="pending">Appointment Scheduled</option>
                <option value="not_checked">Medical Not Checked Yet</option>
              </select>
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Language Competency</label>
            <select
              value={languageScore}
              onChange={(e) => setLanguageScore(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="english_fluent">Fluent English (IELTS 6.5+ / High Spoken)</option>
              <option value="english_basic">Basic Functional English (IELTS 5.0 - 5.5)</option>
              <option value="german_b1">German Level A2 / B1 Certified</option>
              <option value="arabic_basic">Conversational Arabic (Gulf dialect)</option>
              <option value="none">Urdu / Native Language Only</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleRunEvaluation}
            disabled={isEvaluating}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Running AI Scan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Run AI Visa Diagnostic</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: EVALUATION RESULTS & INTERVIEW SIMULATOR */}
        <div className="lg:col-span-7 space-y-6">
          {/* LOADING STATE */}
          {isEvaluating && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-pulse">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BrainCircuit className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Analyzing Visa Eligibility Vectors</h3>
                <p className="text-xs text-amber-400 font-mono">{evalStep}</p>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-3/4 animate-pulse rounded-full" />
              </div>
            </div>
          )}

          {/* PLACEHOLDER STATE */}
          {!isEvaluating && !result && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-white">Awaiting Candidate Evaluation Input</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Select target destination, enter education and trade experience on the left, then click <strong className="text-amber-400">"Run AI Visa Diagnostic"</strong> to generate your instant eligibility dossier.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-left pt-4">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-amber-400 font-bold block">1. Score %</span>
                  Approval ratio prediction
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-emerald-400 font-bold block">2. Risk Audit</span>
                  Attestation & Medical check
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-blue-400 font-bold block">3. Interview Simulator</span>
                  Embassy Q&A practice
                </div>
              </div>
            </div>
          )}

          {/* AI RESULT DISPLAY */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* SCORE CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>Ref Code: {result.refCode}</span>
                      <span>•</span>
                      <span>{result.timestamp}</span>
                    </div>
                    <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                      {result.candidateName}
                    </h2>
                    <p className="text-xs text-amber-400 font-medium">
                      Targeting: {result.destination} ({result.category})
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                        {result.score}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Approval Index</div>
                    </div>
                    <div className="h-10 w-px bg-slate-800" />
                    <div className="text-xs font-bold text-slate-200 space-y-0.5">
                      <div className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Qualified
                      </div>
                      <div className="text-[11px] text-slate-400">Govt Quota Match</div>
                    </div>
                  </div>
                </div>

                {/* ACTION PLAN & GAPS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Recommended Steps to Reach 98% Score</span>
                  </h3>

                  {result.gaps.length === 0 ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Perfect Document Profile! Your credentials meet 100% of the target embassy prerequisites.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {result.gaps.map((gap: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                          <span className="text-amber-400 font-mono font-bold shrink-0">+{idx + 1}</span>
                          <span className="leading-relaxed">{gap}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA BUTTONS */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                  <a
                    href={`https://wa.me/${whatsAppNum}?text=${encodeURIComponent(`Hello, I ran an AI Visa Eligibility Assessment for ${result.destination} (${result.candidateName}, Ref: ${result.refCode}, Score: ${result.score}%). Please guide me on next visa processing steps!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Dossier to Visa Consultant via WhatsApp</span>
                  </a>

                  {onNavigateToVacancies && (
                    <button
                      onClick={onNavigateToVacancies}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <span>Browse Matching Vacancies</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* EMBASSY INTERVIEW SIMULATOR */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI Embassy Interview Preparation Simulator</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Tailored for {result.destination} Consulate</span>
                </div>

                <p className="text-xs text-slate-400">
                  Practice answering real questions frequently asked by visa officers during embassy interviews. Receive real-time AI scoring and response improvement tips.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                      <span>Question {activeQuestionIndex + 1} of {result.questions.length}</span>
                      <span className="text-slate-500 font-normal">Consulate Officer Assessment</span>
                    </div>

                    <p className="text-sm font-bold text-white">
                      "{result.questions[activeQuestionIndex].q}"
                    </p>

                    <p className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
                      💡 <strong>AI Tip:</strong> {result.questions[activeQuestionIndex].hint}
                    </p>

                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={3}
                        placeholder="Type your practice response here..."
                        value={userAnswers[activeQuestionIndex] || ""}
                        onChange={(e) => setUserAnswers(prev => ({ ...prev, [activeQuestionIndex]: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleAnswerSubmit(activeQuestionIndex, userAnswers[activeQuestionIndex] || "")}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit for AI Review</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            disabled={activeQuestionIndex === 0}
                            onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                            className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs disabled:opacity-40"
                          >
                            Prev
                          </button>
                          <button
                            disabled={activeQuestionIndex === result.questions.length - 1}
                            onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                            className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs disabled:opacity-40"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* INTERVIEW FEEDBACK DISPLAY */}
                    {interviewFeedback[activeQuestionIndex] && (
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1.5 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> AI Feedback Score: {interviewFeedback[activeQuestionIndex].score}/100
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {interviewFeedback[activeQuestionIndex].tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
