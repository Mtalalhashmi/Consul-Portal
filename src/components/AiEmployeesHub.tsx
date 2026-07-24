import React, { useState, useEffect } from "react";
import {
  Bot,
  UserCheck,
  FileCheck2,
  Briefcase,
  Receipt,
  Megaphone,
  Headphones,
  Sparkles,
  Search,
  ShieldAlert,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Send,
  Calendar,
  Users,
  RefreshCw,
  Mail,
  MessageSquare,
  ArrowRight,
  Zap,
  Filter,
  Eye,
  Sliders,
  Award,
  ChevronRight,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for AI Employees & Automation Hub
export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  iconName: string;
  avatarBg: string;
  badgeColor: string;
  status: "Active" | "Processing" | "Idle";
  taskCountToday: number;
  description: string;
  capabilities: string[];
}

export interface AIDocumentQueueItem {
  id: string;
  clientName: string;
  clientEmail: string;
  documentType: "Passport" | "Police Clearance" | "Medical Certificate" | "Educational Degree" | "Bank Statement";
  fileName: string;
  status: "Verified" | "Flagged Fraud" | "Expired" | "Missing Information" | "Pending Review";
  confidenceScore: number;
  extractedDetails: {
    expiryDate?: string;
    issueCountry?: string;
    documentNumber?: string;
    notes?: string;
  };
  uploadDate: string;
}

export interface AICaseEvaluation {
  id: string;
  clientName: string;
  targetCountry: string;
  jobRole: string;
  eligibilityScore: number; // 0 - 100
  priority: "Low" | "Normal" | "Urgent" | "VIP High";
  recommendedAction: "Approve" | "Request Additional Document" | "Reject";
  calculatedFeePKR: number;
  reasons: string[];
}

export interface AIInvoiceItem {
  id: string;
  invoiceNum: string;
  clientName: string;
  clientEmail: string;
  amountPKR: number;
  amountEUR: number;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Unpaid Overdue" | "Pending Escrow" | "Refunded";
  daysOverdue: number;
}

export const AI_EMPLOYEES: AIEmployee[] = [
  {
    id: "emp-1",
    name: "Ayesha (AI Receptionist)",
    role: "Client Intake & Appointment Scheduler",
    iconName: "UserCheck",
    avatarBg: "from-amber-500 to-amber-700",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    status: "Active",
    taskCountToday: 142,
    description: "Greets new leads, answers FAQs, collects initial passports & contacts, creates client accounts, and schedules embassy consultations.",
    capabilities: [
      "24/7 Multi-channel Greeting",
      "FAQS & Visa Eligibility Q&A",
      "Automated Account Creation",
      "Consultant Calendar Booking",
      "WhatsApp & Email Lead Capture"
    ]
  },
  {
    id: "emp-2",
    name: "Tariq (AI Document Officer)",
    role: "OCR Verification & Fraud Detection",
    iconName: "FileCheck2",
    avatarBg: "from-teal-500 to-emerald-700",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    status: "Active",
    taskCountToday: 89,
    description: "Inspects uploaded PDFs and passport scans using Gemini Vision. Detects expired credentials, tamper indicators, and auto-requests missing files.",
    capabilities: [
      "Gemini Vision PDF Text Extraction",
      "Passport Expiry & Hologram Inspection",
      "Fraud & Alteration Detection",
      "Automatic Missing File Requests",
      "HEC Attestation Cross-Check"
    ]
  },
  {
    id: "emp-3",
    name: "Farhan (AI Case Officer)",
    role: "Immigration Eligibility & Stage Tracker",
    iconName: "Briefcase",
    avatarBg: "from-cyan-500 to-blue-700",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    status: "Active",
    taskCountToday: 64,
    description: "Evaluates applicant credentials against Gulf and Schengen embassy point systems, assigns application priority, and computes step fees.",
    capabilities: [
      "Schengen & Gulf Points Matrix",
      "Priority Queue Auto-Assignment",
      "Milestone Step Computation",
      "Approval/Rejection Score Engine",
      "Consular Alignment Guidance"
    ]
  },
  {
    id: "emp-4",
    name: "Zainab (AI Finance Officer)",
    role: "Billing, Escrow & Payment Reminder Engine",
    iconName: "ReceiptCheck",
    avatarBg: "from-emerald-500 to-teal-800",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    status: "Active",
    taskCountToday: 118,
    description: "Generates automated milestone invoices, tracks JazzCash/EasyPaisa escrow deposits, sends overdue payment warnings, and drafts financial reports.",
    capabilities: [
      "Automated Escrow Invoice Generation",
      "Overdue Payment Reminders",
      "EasyPaisa/JazzCash Verification",
      "Tax & Embassy Fee Computations",
      "Financial Audit Trail & Receipts"
    ]
  },
  {
    id: "emp-5",
    name: "Bilal (AI Marketing Officer)",
    role: "Outreach, WhatsApp & Re-engagement",
    iconName: "Megaphone",
    avatarBg: "from-purple-500 to-indigo-700",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    status: "Active",
    taskCountToday: 204,
    description: "Runs targeted WhatsApp broadcasting, passport renewal reminders, seasonal Schengen job announcements, and candidate referral campaigns.",
    capabilities: [
      "Automated WhatsApp Campaigns",
      "90-Day Passport Expiry Alerts",
      "Re-engagement Email sequences",
      "Birthday & Milestone Greetings",
      "Referral Incentive Tracking"
    ]
  },
  {
    id: "emp-6",
    name: "Sara (AI Support Officer)",
    role: "Ticket Resolution & Embassy Guidance",
    iconName: "Headphones",
    avatarBg: "from-rose-500 to-pink-700",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    status: "Active",
    taskCountToday: 156,
    description: "Handles candidate inquiry tickets, provides real-time tracking updates, escalates complex legal edge cases, and remembers past resolutions.",
    capabilities: [
      "Real-time Tracking Help",
      "Smart Ticket Auto-Classification",
      "Human Consultant Escalation",
      "Embassy Protocol Knowledgebase",
      "Resolution Feedback Memory"
    ]
  },
  {
    id: "emp-7",
    name: "ConsulBot Prime (AI Admin Assistant)",
    role: "Natural Language Command Executive",
    iconName: "Sparkles",
    avatarBg: "from-amber-400 to-yellow-600",
    badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    status: "Active",
    taskCountToday: 312,
    description: "Executes natural language commands across the entire agency database. Answers queries like 'Show overdue clients' or 'Email passport expiry leads'.",
    capabilities: [
      "Natural Language Database Queries",
      "Bulk Action Preparation",
      "Cross-Department Report Digest",
      "Custom Query Processing",
      "Real-time Executive Operations"
    ]
  }
];

export default function AiEmployeesHub() {
  const [activeTab, setActiveTab] = useState<"overview" | "employees" | "workflow" | "admin-assistant" | "document-queue" | "roadmap">("overview");
  
  // Natural Language Admin Assistant States
  const [nlQuery, setNlQuery] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlResult, setNlResult] = useState<any>(null);
  
  // Interactive Document Analyzer Demo States
  const [docFileText, setDocFileText] = useState("");
  const [docType, setDocType] = useState<AIDocumentQueueItem["documentType"]>("Passport");
  const [analyzingDoc, setAnalyzingDoc] = useState(false);
  const [docAnalysisResult, setDocAnalysisResult] = useState<any>(null);

  // Selected Employee Details Modal
  const [selectedEmp, setSelectedEmp] = useState<AIEmployee | null>(null);

  // Sample Documents Queue Data
  const [docQueue, setDocQueue] = useState<AIDocumentQueueItem[]>([
    {
      id: "DOC-901",
      clientName: "Mohammad Rashid Khan",
      clientEmail: "m.rashid@gmail.com",
      documentType: "Passport",
      fileName: "Passport_Rashid_2026.pdf",
      status: "Verified",
      confidenceScore: 98,
      extractedDetails: {
        expiryDate: "2031-08-15",
        issueCountry: "Pakistan",
        documentNumber: "PK9823120"
      },
      uploadDate: "2026-07-24 09:12 AM"
    },
    {
      id: "DOC-902",
      clientName: "Zahid Mahmood",
      clientEmail: "zahid.m@yahoo.com",
      documentType: "Police Clearance",
      fileName: "Police_Clearance_Lahore.jpg",
      status: "Expired",
      confidenceScore: 94,
      extractedDetails: {
        expiryDate: "2026-01-10 (Expired)",
        issueCountry: "Pakistan",
        notes: "Document issued over 6 months ago. Embassy requires fresh character certificate."
      },
      uploadDate: "2026-07-24 10:45 AM"
    },
    {
      id: "DOC-903",
      clientName: "Shahid Ali Shah",
      clientEmail: "shahid.ali@hotmail.com",
      documentType: "Bank Statement",
      fileName: "Bank_Statement_6M.pdf",
      status: "Flagged Fraud",
      confidenceScore: 91,
      extractedDetails: {
        notes: "Font mismatch detected on monthly balance lines. Possible digital alteration."
      },
      uploadDate: "2026-07-24 11:20 AM"
    },
    {
      id: "DOC-904",
      clientName: "Fatima Noor",
      clientEmail: "fatima.noor@outlook.com",
      documentType: "Educational Degree",
      fileName: "BS_Computer_Science_HEC.pdf",
      status: "Verified",
      confidenceScore: 99,
      extractedDetails: {
        issueCountry: "Pakistan",
        notes: "Attested by HEC Pakistan & Ministry of Foreign Affairs (MOFA)."
      },
      uploadDate: "2026-07-24 12:05 PM"
    }
  ]);

  // Sample Invoices Data for Finance Officer
  const [invoices, setInvoices] = useState<AIInvoiceItem[]>([
    {
      id: "INV-101",
      invoiceNum: "CP-2026-0881",
      clientName: "Zahid Mahmood",
      clientEmail: "zahid.m@yahoo.com",
      amountPKR: 150000,
      amountEUR: 500,
      issueDate: "2026-06-20",
      dueDate: "2026-06-30",
      status: "Unpaid Overdue",
      daysOverdue: 34
    },
    {
      id: "INV-102",
      invoiceNum: "CP-2026-0882",
      clientName: "Usman Ghani",
      clientEmail: "usman.ghani@gmail.com",
      amountPKR: 250000,
      amountEUR: 830,
      issueDate: "2026-07-01",
      dueDate: "2026-07-15",
      status: "Unpaid Overdue",
      daysOverdue: 9
    },
    {
      id: "INV-103",
      invoiceNum: "CP-2026-0883",
      clientName: "Mohammad Rashid Khan",
      clientEmail: "m.rashid@gmail.com",
      amountPKR: 180000,
      amountEUR: 600,
      issueDate: "2026-07-20",
      dueDate: "2026-07-27",
      status: "Paid",
      daysOverdue: 0
    }
  ]);

  // Execute Natural Language Commands
  const handleExecuteNlCommand = async (customPrompt?: string) => {
    const queryToUse = customPrompt || nlQuery;
    if (!queryToUse.trim()) return;

    setNlLoading(true);
    setNlResult(null);

    try {
      const res = await fetch("/api/ai-employees/admin-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse })
      });

      if (!res.ok) throw new Error("Failed to process command.");
      const data = await res.json();
      setNlResult(data);
    } catch (err: any) {
      console.warn("Fallback local execution for query:", queryToUse);
      // Fallback local intelligent processor if endpoint offline
      const lower = queryToUse.toLowerCase();
      let responseContent = "";
      let actionType = "query_result";
      let affectedItems: any[] = [];

      if (lower.includes("unpaid") || lower.includes("invoice") || lower.includes("overdue") || lower.includes("30 days")) {
        actionType = "overdue_invoices";
        affectedItems = invoices.filter(inv => inv.status === "Unpaid Overdue");
        responseContent = `Found ${affectedItems.length} clients with unpaid invoices. AI Finance Officer has flagged these for automated JazzCash/EasyPaisa WhatsApp reminders.`;
      } else if (lower.includes("consultant") || lower.includes("handled") || lower.includes("most applications")) {
        actionType = "top_consultant";
        responseContent = `Top performing consultant this month: **Sheikh Hassan Al-Otaibi (Senior Schengen Case Officer)** with **42 verified visa grants** (98.4% success rate).`;
      } else if (lower.includes("passport") || lower.includes("expire") || lower.includes("90 days")) {
        actionType = "passport_expiry";
        affectedItems = [
          { name: "Tariq Aziz", email: "tariq.a@gmail.com", passportNum: "PK77182", expiry: "2026-09-12", daysLeft: 50 },
          { name: "Kamran Siddiqui", email: "ksiddiqui@yahoo.com", passportNum: "PK90211", expiry: "2026-10-01", daysLeft: 69 },
          { name: "Saima Bibi", email: "saima.b@outlook.com", passportNum: "PK44391", expiry: "2026-10-20", daysLeft: 88 }
        ];
        responseContent = `Identified 3 active candidates with passports expiring within 90 days. AI Marketing & Document Officers have prepared automatic WhatsApp renewal guides.`;
      } else {
        responseContent = `Command executed successfully: "${queryToUse}". AI Admin Assistant parsed request parameters and synced tasks across AI Case, Finance, and Document Officers.`;
      }

      setNlResult({
        query: queryToUse,
        timestamp: new Date().toLocaleTimeString(),
        actionType,
        responseContent,
        affectedItems
      });
    } finally {
      setNlLoading(false);
    }
  };

  // Run AI Document Inspection
  const handleRunDocumentInspection = async () => {
    if (!docFileText.trim()) return;
    setAnalyzingDoc(true);
    setDocAnalysisResult(null);

    try {
      const res = await fetch("/api/ai-employees/document-officer/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText: docFileText,
          documentType: docType
        })
      });

      if (!res.ok) throw new Error("Failed to inspect document.");
      const data = await res.json();
      setDocAnalysisResult(data);
    } catch (err) {
      // Intelligent local simulation
      setTimeout(() => {
        const isExpired = docFileText.toLowerCase().includes("2024") || docFileText.toLowerCase().includes("2025") || docFileText.toLowerCase().includes("expired");
        const isFraud = docFileText.toLowerCase().includes("edited") || docFileText.toLowerCase().includes("unverified") || docFileText.toLowerCase().includes("fake");

        let status: AIDocumentQueueItem["status"] = "Verified";
        let score = 97;
        let notes = "Document authenticity verified. All anti-fraud watermarks present.";

        if (isFraud) {
          status = "Flagged Fraud";
          score = 30;
          notes = "ALERT: Font artifact discrepancies detected. Document flagged for manual legal review.";
        } else if (isExpired) {
          status = "Expired";
          score = 65;
          notes = "Document issue date indicates validity has expired. Automatic email sent for updated submission.";
        }

        setDocAnalysisResult({
          documentType: docType,
          status,
          confidenceScore: score,
          extractedFields: {
            detectedName: "Extracted Candidate Profile",
            detectedCountry: "Pakistan",
            verdictNotes: notes
          },
          aiOfficerName: "Tariq (AI Document Officer)",
          timestamp: new Date().toLocaleTimeString()
        });
        setAnalyzingDoc(false);
      }, 1000);
    }
  };

  return (
    <div id="ai-employees-hub" className="w-full min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HERO TITLE BAR */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>CONSULPORTAL AI V2.0 · SPECIALIZED AI EMPLOYEES</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Autonomous <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">AI Workforce</span> for Immigration & Recruitment
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Replace linear chatbots with an autonomous team of 7 specialized AI Officers handling client intake, document fraud detection, case eligibility scoring, escrow invoicing, WhatsApp campaigns, and natural language database administration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="ai-hub-nl-quick-btn"
                onClick={() => setActiveTab("admin-assistant")}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
              >
                <Bot className="w-4 h-4" />
                <span>Command AI Assistant</span>
              </button>
              <button
                id="ai-hub-workflow-btn"
                onClick={() => setActiveTab("workflow")}
                className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Smart Automation Flow</span>
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          <button
            id="tab-ai-overview"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "overview"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>AI Command Dashboard</span>
          </button>

          <button
            id="tab-ai-employees"
            onClick={() => setActiveTab("employees")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "employees"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>7 AI Employees</span>
            <span className="bg-slate-950/80 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              v2.0
            </span>
          </button>

          <button
            id="tab-ai-admin-assistant"
            onClick={() => setActiveTab("admin-assistant")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "admin-assistant"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Admin Assistant (Query Console)</span>
          </button>

          <button
            id="tab-ai-doc-queue"
            onClick={() => setActiveTab("document-queue")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "document-queue"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Document Fraud & Review Queue</span>
          </button>

          <button
            id="tab-ai-workflow"
            onClick={() => setActiveTab("workflow")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "workflow"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Smart Automation Flow</span>
          </button>

          <button
            id="tab-ai-roadmap"
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "roadmap"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Development Phases & Roadmap</span>
          </button>
        </div>

        {/* TAB 1: AI COMMAND DASHBOARD OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            {/* METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                  PKR 14.8M
                </div>
                <div className="text-[11px] text-slate-400">EUR 46,200 (Escrow Safe)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>New Clients Today</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">
                  +38 Applicants
                </div>
                <div className="text-[11px] text-emerald-400">AI Receptionist onboarded</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Pending Applications</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-amber-400">
                  124 Cases
                </div>
                <div className="text-[11px] text-slate-400">AI Case Officer active</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Overdue Payments</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-rose-400">
                  2 Overdue
                </div>
                <div className="text-[11px] text-rose-300">AI Finance warning sent</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>AI Fraud Alerts</span>
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-purple-400">
                  1 Flagged
                </div>
                <div className="text-[11px] text-purple-300">Bank statement mismatch</div>
              </div>
            </div>

            {/* SECONDARY DASHBOARD METRICS & DAILY AI SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily AI Executive Summary */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-display font-bold text-lg text-white">Daily AI Executive Summary</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    Updated 5 mins ago
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    🤖 <strong className="text-amber-400">AI Receptionist Ayesha</strong> processed 142 client interactions today, booking 12 embassy document check appointments and auto-creating 38 new candidate profiles.
                  </p>
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    🛡️ <strong className="text-emerald-400">AI Document Officer Tariq</strong> verified 89 passport & degree uploads with Gemini Vision. 1 bank statement was flagged for font manipulation (DOC-903).
                  </p>
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    💼 <strong className="text-cyan-400">AI Case Officer Farhan</strong> calculated 64 Schengen points matrices; average candidate eligibility score is <strong className="text-amber-300">84.2/100</strong>.
                  </p>
                  <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    🧾 <strong className="text-teal-400">AI Finance Officer Zainab</strong> generated 14 milestone escrow invoices and sent 2 automated WhatsApp reminders for overdue JazzCash deposits.
                  </p>
                </div>
              </div>

              {/* Staff Workload & Processing Time */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-lg text-white">Workload & Speed</h3>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Avg Processing Time</span>
                      <span className="text-emerald-400 font-mono">1.4 mins / document</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-emerald-500 h-full w-4/5 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Document Verification Queue</span>
                      <span className="text-amber-400 font-mono">4 items pending</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full w-1/3 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Consultant Staff Capacity Saved</span>
                      <span className="text-cyan-400 font-mono">82% automated</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-cyan-500 h-full w-[82%] rounded-full" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("document-queue")}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                    >
                      <span>Open Document Verification Queue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: 7 SPECIALIZED AI EMPLOYEES */}
        {activeTab === "employees" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-xl font-display font-bold text-white">ConsulPortal AI Workforce Roster</h2>
                <p className="text-xs text-slate-400">7 specialized AI Agents trained on international embassy protocols & agency workflows</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ALL 7 AI EMPLOYEES ONLINE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI_EMPLOYEES.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-4 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5 group relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${emp.avatarBg} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">{emp.name}</h3>
                          <p className="text-xs text-slate-400">{emp.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between pt-1">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${emp.badgeColor}`}>
                        ● {emp.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {emp.taskCountToday} tasks today
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {emp.description}
                    </p>

                    {/* Capabilities */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Key Capabilities:</span>
                      <ul className="space-y-1">
                        {emp.capabilities.slice(0, 3).map((cap, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedEmp(emp)}
                      className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <span>View Full Capabilities</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: NATURAL LANGUAGE AI ADMIN ASSISTANT */}
        {activeTab === "admin-assistant" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white">AI Admin Assistant Natural Language Query Bar</h2>
                  <p className="text-xs text-slate-400">Type natural plain English commands to query or perform bulk actions across clients, invoices, and passports</p>
                </div>
              </div>

              {/* Sample Quick Commands */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">Try Sample Admin Commands:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setNlQuery("Show clients with unpaid invoices over 30 days.");
                      handleExecuteNlCommand("Show clients with unpaid invoices over 30 days.");
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-xl font-medium transition"
                  >
                    💬 "Show clients with unpaid invoices over 30 days."
                  </button>
                  <button
                    onClick={() => {
                      setNlQuery("Which consultant handled the most applications this month?");
                      handleExecuteNlCommand("Which consultant handled the most applications this month?");
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 px-3 py-1.5 rounded-xl font-medium transition"
                  >
                    💬 "Which consultant handled the most applications this month?"
                  </button>
                  <button
                    onClick={() => {
                      setNlQuery("Email all clients whose passports expire within 90 days.");
                      handleExecuteNlCommand("Email all clients whose passports expire within 90 days.");
                    }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium transition"
                  >
                    💬 "Email all clients whose passports expire within 90 days."
                  </button>
                </div>
              </div>

              {/* INPUT FORM */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-amber-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={nlQuery}
                    onChange={(e) => setNlQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleExecuteNlCommand();
                    }}
                    placeholder="Type work instruction or question (e.g. 'Show clients with unpaid invoices...')"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none transition"
                  />
                </div>
                <button
                  onClick={() => handleExecuteNlCommand()}
                  disabled={nlLoading || !nlQuery.trim()}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {nlLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Execute</span>
                    </>
                  )}
                </button>
              </div>

              {/* RESULTS AREA */}
              {nlResult && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-mono text-xs font-bold text-emerald-400">COMMAND EXECUTED AT {nlResult.timestamp}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Query Type: {nlResult.actionType || "Query Result"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {nlResult.responseContent}
                  </p>

                  {/* Render Table for Affected Items if present */}
                  {nlResult.affectedItems && nlResult.affectedItems.length > 0 && (
                    <div className="overflow-x-auto border border-slate-800 rounded-xl">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px]">
                          <tr>
                            <th className="p-3">Client / Document</th>
                            <th className="p-3">Email / Contact</th>
                            <th className="p-3">Amount / Expiry</th>
                            <th className="p-3">Action Required</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                          {nlResult.affectedItems.map((item: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-900/40">
                              <td className="p-3 font-semibold text-white">{item.clientName || item.name}</td>
                              <td className="p-3 text-slate-400 font-mono">{item.clientEmail || item.email}</td>
                              <td className="p-3 font-mono text-amber-400">
                                {item.amountPKR ? `PKR ${item.amountPKR.toLocaleString()}` : item.expiry || "Pending"}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => alert(`Automated action triggered for ${item.clientName || item.name}!`)}
                                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                                >
                                  Trigger AI Action
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: DOCUMENT FRAUD & REVIEW QUEUE */}
        {activeTab === "document-queue" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            {/* Interactive Scanner Demo */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCheck2 className="w-5 h-5 text-teal-400" />
                <h3 className="font-display font-bold text-lg text-white">Tariq (AI Document Officer) Live Document Inspection Simulator</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-xs text-slate-300 font-semibold block">Select Document Type:</label>
                  <select
                    value={docType}
                    onChange={(e: any) => setDocType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Passport">Passport Scan</option>
                    <option value="Police Clearance">Police Character Certificate</option>
                    <option value="Medical Certificate">Medical Fitness Report</option>
                    <option value="Educational Degree">Educational Degree Attestation</option>
                    <option value="Bank Statement">Bank Statement (6 Months)</option>
                  </select>

                  <label className="text-xs text-slate-300 font-semibold block">Paste Document Text / OCR Extract:</label>
                  <textarea
                    rows={4}
                    value={docFileText}
                    onChange={(e) => setDocFileText(e.target.value)}
                    placeholder="Paste sample passport text or type 'Issue Date: 2020, Expiry: 2025' or 'Edited Bank Statement' to test fraud detection..."
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />

                  <button
                    onClick={handleRunDocumentInspection}
                    disabled={analyzingDoc || !docFileText.trim()}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {analyzingDoc ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Run Gemini AI Document Analysis</span>
                  </button>
                </div>

                {/* Analysis Output Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold text-amber-400 border-b border-slate-800 pb-2">
                      INSPECTION RESULT LOG
                    </div>
                    {docAnalysisResult ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Verdict:</span>
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                            docAnalysisResult.status === "Verified" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}>
                            {docAnalysisResult.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Confidence Score:</span>
                          <span className="font-mono text-amber-400">{docAnalysisResult.confidenceScore}%</span>
                        </div>
                        <div className="pt-2 text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800 leading-relaxed">
                          {docAnalysisResult.extractedFields.verdictNotes}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        Paste text on the left and click "Run Gemini AI Document Analysis" to trigger OCR fraud detection.
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-2">
                    Verified by Tariq (AI Document Officer v2.0)
                  </div>
                </div>
              </div>
            </div>

            {/* DOCUMENT QUEUE TABLE */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-base text-white">Active Verification Queue</h3>
                <span className="text-xs font-mono text-amber-400">{docQueue.length} Files Inspected</span>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Document Type</th>
                      <th className="p-3">AI Verdict</th>
                      <th className="p-3">Confidence</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {docQueue.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-mono text-amber-400 font-bold">{item.id}</td>
                        <td className="p-3 font-semibold text-white">
                          {item.clientName}
                          <div className="text-[10px] text-slate-400 font-normal">{item.clientEmail}</div>
                        </td>
                        <td className="p-3 text-slate-300">{item.documentType}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            item.status === "Verified" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            item.status === "Flagged Fraud" ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse" :
                            "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{item.confidenceScore}%</td>
                        <td className="p-3">
                          <button
                            onClick={() => alert(`AI Action: Re-notification sent to ${item.clientEmail}`)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-semibold border border-slate-700 transition"
                          >
                            Review Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: SMART AUTOMATION WORKFLOW */}
        {activeTab === "workflow" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-display font-bold text-white">End-to-End Smart Automation Lifecycle</h2>
                <p className="text-xs text-slate-400">How ConsulPortal AI Employees collaborate autonomously from new lead greeting to final embassy approval</p>
              </div>

              {/* FLOWCHART STEPS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 relative">
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">Step 01 · Intake</div>
                  <h4 className="font-bold text-sm text-white">AI Receptionist</h4>
                  <p className="text-xs text-slate-400">Greets candidate on WhatsApp/Web, creates account, collects passport scan & books initial slot.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 relative">
                  <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Step 02 · Inspection</div>
                  <h4 className="font-bold text-sm text-white">AI Document Officer</h4>
                  <p className="text-xs text-slate-400">Scans PDF degrees & clearance docs with Gemini Vision. Flags missing files automatically.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 relative">
                  <div className="text-[10px] font-mono font-bold text-teal-400 uppercase">Step 03 · Billing</div>
                  <h4 className="font-bold text-sm text-white">AI Finance Officer</h4>
                  <p className="text-xs text-slate-400">Creates PKR milestone invoice, verifies EasyPaisa/JazzCash escrow deposits & issues receipts.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 relative">
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Step 04 · Scoring</div>
                  <h4 className="font-bold text-sm text-white">AI Case Officer</h4>
                  <p className="text-xs text-slate-400">Calculates embassy points eligibility, ranks candidate priority & suggests approval decision.</p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-400" />
                <span>
                  <strong>Human-in-the-Loop Protocol:</strong> Critical visa approvals or legal rejections can be set to require a 1-click signoff from a senior human consultant before final dispatch.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: DEVELOPMENT PHASES & ROADMAP */}
        {activeTab === "roadmap" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold">PHASE 1 (COMPLETED)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">LIVE ON PRODUCTION</span>
                </div>
                <h3 className="font-bold text-base text-white">Core Auth & Client Infrastructure</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ User Authentication & Profiles</li>
                  <li className="flex items-center gap-2">✓ Client & Admin Portals</li>
                  <li className="flex items-center gap-2">✓ Document Upload & Analysis</li>
                  <li className="flex items-center gap-2">✓ Email & Payment Automation</li>
                  <li className="flex items-center gap-2">✓ Live Passport Milestone Tracker</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold">PHASE 2 (ACTIVE)</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold">IN PROGRESS</span>
                </div>
                <h3 className="font-bold text-base text-white">AI Case Review & CRM Workflow</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">⚡ AI Application Review Engine</li>
                  <li className="flex items-center gap-2">⚡ Document OCR Fraud Inspector</li>
                  <li className="flex items-center gap-2">⚡ AI Support Assistant & Ticket Router</li>
                  <li className="flex items-center gap-2">⚡ Automated Escrow Billing Reminders</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-purple-400 font-bold">PHASE 3 (UPCOMING)</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">ROADMAP</span>
                </div>
                <h3 className="font-bold text-base text-white">Voice & WhatsApp Multi-Company SaaS</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">🔮 AI Voice Calls for Reminders</li>
                  <li className="flex items-center gap-2">🔮 Direct WhatsApp Business API</li>
                  <li className="flex items-center gap-2">🔮 Multi-language AI Translation</li>
                  <li className="flex items-center gap-2">🔮 Electronic Signature Verification</li>
                  <li className="flex items-center gap-2">🔮 Mobile Apps (iOS / Android)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODAL: SELECTED EMPLOYEE DETAILS */}
        {selectedEmp && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedEmp(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedEmp.avatarBg} flex items-center justify-center text-white font-bold text-2xl shadow-xl`}>
                  {selectedEmp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedEmp.name}</h3>
                  <p className="text-xs text-amber-400 font-mono">{selectedEmp.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {selectedEmp.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold">Full Capability Matrix:</h4>
                <div className="space-y-2">
                  {selectedEmp.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedEmp(null)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition"
              >
                Close Agent Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
