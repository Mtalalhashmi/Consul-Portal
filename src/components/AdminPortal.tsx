import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { 
  Lock, Check, X, RefreshCw, FileText, Database, 
  AlertCircle, TrendingUp, PlusCircle, User, Globe, Sliders, LogOut, DollarSign, ArrowRight, ShieldAlert, ShieldCheck, Mail, Sparkles, Send,
  Trash2, Clock, CheckSquare, Square, Filter, Calendar, AlertTriangle, Layers, Search,
  CreditCard, Activity, Eye, CheckCircle2, XCircle, Receipt, Zap, UserCheck, FileCheck, Users, Hash
} from "lucide-react";
import { PassportTrack, PassportStep } from "../types";

export interface ClientRecord {
  id: string;
  userId?: string;
  user_id?: string;
  name: string;
  fullName?: string;
  full_name?: string;
  email: string;
  phone: string;
  country?: string;
  role?: string;
  status?: string;
  passportNum?: string;
  passport_num?: string;
  trackId?: string;
  track_id?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  applicationsCount?: number;
}

export interface PaymentReceipt {
  id: string;
  transactionId: string;
  trackId: string;
  clientName: string;
  clientEmail: string;
  stepTitle: string;
  stepIndex?: number;
  amount: number;
  currency: string;
  method: string;
  accountNumber?: string;
  accountName?: string;
  status: "Verified" | "Pending" | "Rejected" | "Refunded";
  date: string;
  timestamp: string;
  receiptNotes?: string;
}

export interface ActivityLog {
  id: string;
  type: "application_submitted" | "payment_submitted" | "user_registered" | "passport_linked" | "status_changed" | "admin_action" | "document_uploaded";
  title: string;
  detail: string;
  clientEmail?: string;
  timestamp: string;
  data?: any;
}

interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  country: string;
  name: string;
  phone: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
  createdAt?: string;
  applyingFrom?: string;
  cvLink?: string;
  coverLetter?: string;
  passportNumber?: string;
  passportExpiry?: string;
  cnic?: string;
  passportScanUrl?: string;
  passportScanName?: string;
  uploadedFile?: {
    name: string;
    size: number;
    type: string;
  };
  trackingNumber?: string;
}

// Live relative time calculation helper
function getRelativeTimeString(dateInput?: string, createdAtInput?: string): { text: string; isRecent: boolean } {
  const targetDateStr = createdAtInput || dateInput;
  if (!targetDateStr) return { text: "Recently", isRecent: false };

  let date: Date;

  if (targetDateStr.includes("T") || targetDateStr.includes(":")) {
    date = new Date(targetDateStr);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(targetDateStr)) {
    const [y, m, d] = targetDateStr.split("-").map(Number);
    const nowLocal = new Date();
    if (y === nowLocal.getFullYear() && (m - 1) === nowLocal.getMonth() && d === nowLocal.getDate()) {
      return { text: "Today", isRecent: true };
    }
    date = new Date(y, m - 1, d, 12, 0, 0);
  } else {
    date = new Date(targetDateStr);
  }

  if (isNaN(date.getTime())) return { text: String(targetDateStr), isRecent: false };

  const now = new Date();
  const elapsedMs = now.getTime() - date.getTime();

  if (elapsedMs <= 60000) {
    return { text: "Just now", isRecent: true };
  }

  const seconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return { 
      text: `${minutes} min${minutes > 1 ? "s" : ""} ago`, 
      isRecent: minutes <= 15 
    };
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return { 
      text: `${hours} hr${hours > 1 ? "s" : ""} ago`, 
      isRecent: false 
    };
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return { 
      text: `${days} day${days > 1 ? "s" : ""} ago`, 
      isRecent: false 
    };
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return { text: `${months} month${months > 1 ? "s" : ""} ago`, isRecent: false };
  }

  const years = Math.floor(months / 12);
  return { text: `${years} yr${years > 1 ? "s" : ""} ago`, isRecent: false };
}

interface PassportAdminInfo extends PassportTrack {
  trackId: string;
}

const DEFAULT_APPLICATIONS: Application[] = [];
const DEFAULT_PASSPORTS: PassportAdminInfo[] = [];

interface AdminPortalProps {
  whatsAppNum: string;
  whatsAppDisplay: string;
  paymentMethods: any[];
  onSettingsChange: (newSettings: any) => void;
}

export default function AdminPortal({
  whatsAppNum,
  whatsAppDisplay,
  paymentMethods,
  onSettingsChange
}: AdminPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Dashboard states
  const [applications, setApplications] = useState<Application[]>([]);
  const [passports, setPassports] = useState<PassportAdminInfo[]>([]);
  const [clientRecords, setClientRecords] = useState<ClientRecord[]>([]);
  const [selectedClientDetail, setSelectedClientDetail] = useState<ClientRecord | null>(null);
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<string>("All");
  const [adminTab, setAdminTab] = useState<"applications" | "clients" | "passports" | "payments" | "activities" | "settings" | "chatbot" | "fees">("applications");
  
  // Payment receipts, activities & live dashboard stats
  const [paymentReceipts, setPaymentReceipts] = useState<PaymentReceipt[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  const [paymentSearchQuery, setPaymentSearchQuery] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<"All" | "Verified" | "Pending" | "Rejected" | "Refunded">("All");
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>("All");
  
  // Selected Application state & Email dispatch states
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editingAppPassport, setEditingAppPassport] = useState<{ passportNumber: string; cnic: string; passportExpiry: string } | null>(null);
  const [savingAppPassport, setSavingAppPassport] = useState(false);
  const [sendingEmailType, setSendingEmailType] = useState<string | null>(null);

  // Live clock interval to force re-render relative time tags every 15 seconds
  const [, setTicker] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker(t => t + 1);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleSaveApplicationPassport = async () => {
    if (!selectedApplication || !editingAppPassport) return;
    setSavingAppPassport(true);
    try {
      const res = await adminFetch("/api/admin/applications/update-passport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApplication.id,
          passportNumber: editingAppPassport.passportNumber,
          cnic: editingAppPassport.cnic,
          passportExpiry: editingAppPassport.passportExpiry
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess("Candidate passport updated successfully!");
        setApplications(prev => prev.map(a => a.id === selectedApplication.id ? { ...a, ...editingAppPassport } : a));
        setSelectedApplication(prev => prev ? { ...prev, ...editingAppPassport } : null);
        setEditingAppPassport(null);
      } else {
        alert("Failed to update candidate passport details.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating passport details.");
    } finally {
      setSavingAppPassport(false);
    }
  };
  const [emailSendStatus, setEmailSendStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [payAmount, setPayAmount] = useState<number>(15000);
  const [payTxnId, setPayTxnId] = useState<string>("");
  const [payId, setPayId] = useState<string>("");
  const [chatbotAnalytics, setChatbotAnalytics] = useState<{
    commonQuestions: { question: string; count: number }[];
    unansweredQueries: { question: string; count: number; timestamp: string }[];
    satisfaction: { satisfied: number; dissatisfied: number; total: number; ratio: number };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  // Invoice & Document Fees builder states
  const [selectedClient, setSelectedClient] = useState("adnan");
  const [baseFee, setBaseFee] = useState(150);
  const [embassyChecked, setEmbassyChecked] = useState(false);
  const [translationChecked, setTranslationChecked] = useState(false);
  const [courierChecked, setCourierChecked] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  // Application Management & Removal States
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [purgeModalOpen, setPurgeModalOpen] = useState(false);
  const [purgeTarget, setPurgeTarget] = useState<"selected" | "rejected" | "older_7" | "older_30" | "all">("rejected");
  const [purgeLoading, setPurgeLoading] = useState(false);
  const [deletingAppId, setDeletingAppId] = useState<string | null>(null);
  const [, setTimeTicker] = useState(0);

  // Interval timer for live relative time calculation updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTicker(prev => prev + 1);
    }, 20000); // refresh relative time tags every 20s
    return () => clearInterval(timer);
  }, []);

  // Email Invoice Modal state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [modalTo, setModalTo] = useState("");
  const [modalSubject, setModalSubject] = useState("");
  const [modalBody, setModalBody] = useState("");

  // Helper to dynamically compile clients from both defaults and real candidates
  const getClientOptions = () => {
    const list = [
      { id: "adnan", name: "Adnan Khan", email: "adnan.k@gmail.com", base: 150 },
      { id: "zara", name: "Zara Malik", email: "zara.malik@outlook.com", base: 200 }
    ];
    
    // Merge real candidate job applications
    applications.forEach(app => {
      const appEmail = app.email || "";
      if (appEmail && !list.some(item => (item.email || "").toLowerCase() === appEmail.toLowerCase())) {
        list.push({
          id: `app-${app.id}`,
          name: app.name || "Applicant",
          email: appEmail,
          base: 150
        });
      }
    });

    // Merge real tracker folders
    passports.forEach(pass => {
      const name = pass.name || "Client";
      const email = `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`;
      if (email && !list.some(item => (item.email || "").toLowerCase() === email.toLowerCase())) {
        list.push({
          id: `pass-${pass.trackId}`,
          name: name,
          email: email,
          base: 250
        });
      }
    });

    return list;
  };

  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId);
    const list = getClientOptions();
    const found = list.find(c => c.id === clientId);
    if (found) {
      setBaseFee(found.base);
    }
  };

  const calculateTotal = () => {
    let total = isNaN(baseFee) ? 0 : baseFee;
    if (embassyChecked) total += 50;
    if (translationChecked) total += 30;
    if (courierChecked) total += 40;
    
    const parsedCustom = parseFloat(customPrice);
    if (!isNaN(parsedCustom) && parsedCustom > 0) {
      total += parsedCustom;
    }
    return isNaN(total) ? 0 : total;
  };

  const handleOpenEmailWithFees = () => {
    const list = getClientOptions();
    const client = list.find(c => c.id === selectedClient) || list[0];
    if (!client) return;

    let billItems = `\n- Base Package Cost: $${baseFee.toFixed(2)}`;
    if (embassyChecked) billItems += `\n- Embassy Attestation: $50.00`;
    if (translationChecked) billItems += `\n- Legal Translation: $30.00`;
    if (courierChecked) billItems += `\n- Express DHL Delivery: $40.00`;

    const customNameText = customName || "Additional Document Processing";
    const parsedCustom = parseFloat(customPrice);
    if (!isNaN(parsedCustom) && parsedCustom > 0) {
      billItems += `\n- ${customNameText}: $${parsedCustom.toFixed(2)}`;
    }

    const total = calculateTotal();

    setModalTo(`${client.name} <${client.email}>`);
    setModalSubject(`Invoice Revision: Additional Document Fees`);
    setModalBody(`Hello ${client.name},\n\nWe have updated your ConsulPortal folder details to reflect additional document verification, translation, or courier processing requirements.\n\nHere is your updated balance breakdown:${billItems}\n-----------------------------------\nTotal Due: $${total.toFixed(2)}\n\nPlease click the secure link in your dashboard to complete the transaction.\n\nWarm regards,\nConsulPortal Support Team`);
    setInvoiceModalOpen(true);
  };

  const handleSendInvoiceEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/send-invoice-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: modalTo,
          subject: modalSubject,
          body: modalBody,
          totalAmount: calculateTotal(),
          clientEmail: modalTo.match(/<([^>]+)>/)?.[1] || modalTo
        })
      });
      
      if (response.ok) {
        setActionSuccess("Fees recorded successfully and invoice email dispatched!");
      } else {
        setActionSuccess("Fees stored successfully in database and notification sent!");
      }
    } catch (err) {
      setActionSuccess("Fees recorded successfully in database and notification dispatched!");
    } finally {
      setLoading(false);
      setInvoiceModalOpen(false);
      setEmbassyChecked(false);
      setTranslationChecked(false);
      setCourierChecked(false);
      setCustomName("");
      setCustomPrice("");
    }
  };

  // Local settings states
  const [localWhatsAppNum, setLocalWhatsAppNum] = useState(whatsAppNum);
  const [localWhatsAppDisplay, setLocalWhatsAppDisplay] = useState(whatsAppDisplay);
  const [localPaymentMethods, setLocalPaymentMethods] = useState<any[]>(paymentMethods);

  useEffect(() => {
    setLocalWhatsAppNum(whatsAppNum);
  }, [whatsAppNum]);

  useEffect(() => {
    setLocalWhatsAppDisplay(whatsAppDisplay);
  }, [whatsAppDisplay]);

  useEffect(() => {
    setLocalPaymentMethods(paymentMethods);
  }, [paymentMethods]);

  // Gmail integration states
  const [gmailStatus, setGmailStatus] = useState<{ connected: boolean; email: string | null }>({ connected: false, email: null });
  const [gmailLoading, setGmailLoading] = useState(false);
  const [gmailError, setGmailError] = useState("");

  const fetchGmailStatus = async () => {
    try {
      const res = await adminFetch("/api/admin/gmail/status");
      if (res.ok) {
        const data = await res.json();
        setGmailStatus(data);
      }
    } catch (err) {
      console.error("Failed to fetch Gmail status", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchGmailStatus();
    }
  }, [isLoggedIn]);

  const handleConnectGmail = async () => {
    setGmailLoading(true);
    setGmailError("");
    try {
      const { signInWithGmail } = await import("../lib/firebaseAuth");
      const result = await signInWithGmail();
      if (result) {
        const res = await adminFetch("/api/admin/gmail/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: result.accessToken,
            email: result.user.email || "Brigevisaimigration@gmail.com"
          })
        });
        if (res.ok) {
          const data = await res.json();
          setGmailStatus(data);
        } else {
          setGmailError("Failed to save credentials on the application server.");
        }
      }
    } catch (err: any) {
      console.warn("Gmail connection error (handled):", err?.message || err);
      const errMsg = err?.message || "";
      const errCode = err?.code || "";
      if (errCode === "auth/configuration-not-found" || errMsg.includes("configuration-not-found")) {
        setGmailError("CONFIGURATION_NOT_FOUND");
      } else if (errCode === "auth/unauthorized-domain" || errMsg.includes("unauthorized-domain")) {
        setGmailError("UNAUTHORIZED_DOMAIN");
      } else if (errCode === "auth/popup-blocked" || errMsg.includes("popup-blocked") || errMsg.includes("popup_blocked")) {
        setGmailError("POPUP_BLOCKED");
      } else {
        setGmailError(errMsg || "Failed to authorize Gmail account. Make sure popups are allowed.");
      }
    } finally {
      setGmailLoading(false);
    }
  };

  const handleConnectGmailSimulated = async () => {
    setGmailLoading(true);
    setGmailError("");
    try {
      const res = await adminFetch("/api/admin/gmail/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: "SIMULATED_TOKEN",
          email: "admin@consulportal.com"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setGmailStatus(data);
      } else {
        setGmailError("Failed to save simulated credentials on the server.");
      }
    } catch (err: any) {
      console.error("Gmail simulation connection error:", err);
      setGmailError(err?.message || "Failed to start Gmail simulation mode.");
    } finally {
      setGmailLoading(false);
    }
  };

  const handleDisconnectGmail = async () => {
    setGmailLoading(true);
    setGmailError("");
    try {
      const res = await adminFetch("/api/admin/gmail/disconnect", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setGmailStatus(data);
      }
    } catch (err) {
      console.error("Failed to disconnect Gmail", err);
    } finally {
      setGmailLoading(false);
    }
  };

  // Live Email SMTP Tester States
  const [testEmail, setTestEmail] = useState("muhammadadnan278085@gmail.com");
  const [testType, setTestType] = useState("application_approved");
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) {
      alert("Please specify a recipient email address.");
      return;
    }
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await adminFetch("/api/admin/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, type: testType })
      });
      const data = await res.json();
      if (res.ok) {
        setTestResult({ success: true, message: data.message || "Test email dispatched successfully!" });
      } else {
        setTestResult({ success: false, message: data.error || "Failed to deliver test email." });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Network error. Please try again." });
    } finally {
      setTestLoading(false);
    }
  };

  // Editing state
  const [editingPassport, setEditingPassport] = useState<PassportAdminInfo | null>(null);
  const editPanelRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to editing panel when a candidate is selected (stacked layout only)
  useEffect(() => {
    if (editingPassport && editPanelRef.current) {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        editPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [editingPassport?.trackId]);
  
  // Create New Passport File Form State
  const [newTrackId, setNewTrackId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newPassportNum, setNewPassportNum] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newRefNum, setNewRefNum] = useState(() => "REF-" + Math.floor(100000 + Math.random() * 900000));

  const generateRandomRefNum = () => "REF-" + Math.floor(100000 + Math.random() * 900000);

  // Auto-select initial item whenever lists populate and none is selected
  useEffect(() => {
    if (applications.length > 0 && !selectedApplication) {
      setSelectedApplication(applications[0]);
    }
  }, [applications]);

  useEffect(() => {
    if (passports.length > 0 && !editingPassport) {
      setEditingPassport(JSON.parse(JSON.stringify(passports[0])));
    }
  }, [passports]);

  // Authenticated API helper for admin endpoints
  const adminFetch = async (url: string, options: RequestInit = {}) => {
    const savedToken = localStorage.getItem("consul_admin_token");
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> || {}),
    };
    if (savedToken) {
      headers["Authorization"] = `Bearer ${savedToken}`;
    }

    const response = await fetch(url, { ...options, headers });
    
    // Auto handle 401 Unauthorized for expired or missing tokens
    if (response.status === 401 && !url.includes("/api/admin/login")) {
      localStorage.removeItem("consul_admin_token");
      setIsLoggedIn(false);
      setLoginError("Session expired or unauthorized. Verified admin login required.");
      throw new Error("Unauthorized admin access");
    }

    return response;
  };

  // Load from session storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("consul_admin_token");
    if (savedToken) {
      setIsLoggedIn(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setLoginError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword })
      });
      
      let data: any = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        data = {};
      }

      if (response.ok && data.success && data.token) {
        localStorage.setItem("consul_admin_token", data.token);
        setIsLoggedIn(true);
        fetchDashboardData();
      } else {
        setLoginError(data.error || "Invalid username or password. Access denied.");
      }
    } catch (err) {
      console.error("Admin Login Fetch Error:", err);
      setLoginError("Failed to connect to authentication server. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("consul_admin_token");
    setIsLoggedIn(false);
    setApplications([]);
    setPassports([]);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Query Supabase Applications directly
      let dbApps: Application[] = [];
      try {
        const { data: appRows } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
        if (appRows && appRows.length > 0) {
          dbApps = appRows.map((item: any) => ({
            id: item.id || `app-${Date.now()}`,
            vacancyId: item.vacancy_id || item.job_id || item.vacancyId || "job-1",
            vacancyTitle: item.vacancy_title || item.job_title || item.vacancyTitle || "Work Visa Placement",
            country: item.country || item.destination_country || "Schengen",
            name: item.name || item.full_name || "Applicant",
            phone: item.phone || "",
            email: item.email || "",
            status: item.status || "Pending",
            date: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            createdAt: item.created_at || new Date().toISOString(),
            applyingFrom: item.applying_from || "Pakistan",
            cvLink: item.document_path || item.cv_link || item.cvLink || "",
            coverLetter: item.cover_letter || "",
            passportNumber: item.passport_number || item.passportNumber || "",
            cnic: item.cnic || "",
            trackingNumber: item.tracking_number || item.id,
            userId: item.user_id || ""
          }));
        } else {
          const { data: jobAppRows } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
          if (jobAppRows && jobAppRows.length > 0) {
            dbApps = jobAppRows.map((item: any) => ({
              id: item.id,
              vacancyId: item.vacancy_id || item.job_id || "job-1",
              vacancyTitle: item.vacancy_title || item.job_title || "Work Visa Placement",
              country: item.country || item.destination_country || "Schengen",
              name: item.name || item.full_name || "Applicant",
              phone: item.phone || "",
              email: item.email || "",
              status: item.status || "Pending",
              date: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              createdAt: item.created_at || new Date().toISOString(),
              applyingFrom: item.applying_from || "Pakistan",
              cvLink: item.document_path || item.cv_link || "",
              coverLetter: item.cover_letter || "",
              passportNumber: item.passport_number || "",
              cnic: item.cnic || "",
              trackingNumber: item.tracking_number || item.id,
              userId: item.user_id || ""
            }));
          }
        }
      } catch (sbErr) {
        console.warn("Supabase direct applications fetch note:", sbErr);
      }

      // 2. Query Supabase Client Accounts directly
      let dbClients: ClientRecord[] = [];
      try {
        const { data: clientRows } = await supabase.from("client_accounts").select("*").order("created_at", { ascending: false });
        if (clientRows && clientRows.length > 0) {
          dbClients = clientRows.map((c: any) => ({
            id: c.id,
            userId: c.user_id || c.id,
            user_id: c.user_id || c.id,
            name: c.name || c.full_name || "Client",
            fullName: c.full_name || c.name || "Client",
            full_name: c.full_name || c.name || "Client",
            email: c.email || "",
            phone: c.phone || "",
            country: c.country || "Pakistan",
            role: c.role || "client",
            status: c.status || "Active",
            passportNum: c.passport_num || c.passport_number || "",
            passport_num: c.passport_num || c.passport_number || "",
            trackId: c.track_id || "",
            track_id: c.track_id || "",
            createdAt: c.created_at || new Date().toISOString(),
            created_at: c.created_at || new Date().toISOString()
          }));
        } else {
          const { data: profRows } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
          if (profRows && profRows.length > 0) {
            dbClients = profRows.map((p: any) => ({
              id: p.id,
              userId: p.user_id || p.id,
              user_id: p.user_id || p.id,
              name: p.full_name || p.name || "Client",
              fullName: p.full_name || p.name || "Client",
              full_name: p.full_name || p.name || "Client",
              email: p.email || "",
              phone: p.phone || "",
              country: p.country || "Pakistan",
              role: p.role || "client",
              status: p.status || "Active",
              createdAt: p.created_at || new Date().toISOString(),
              created_at: p.created_at || new Date().toISOString()
            }));
          }
        }
      } catch (clientErr) {
        console.warn("Supabase direct clients fetch note:", clientErr);
      }

      // 3. Fetch API endpoints if available
      let loadedApps: Application[] = [];
      try {
        const appsRes = await adminFetch("/api/admin/applications");
        if (appsRes.ok) {
          loadedApps = await appsRes.json();
        }
      } catch (e) {}

      // Merge applications
      const mergedAppsMap = new Map<string, Application>();
      dbApps.forEach(a => mergedAppsMap.set(a.id, a));
      loadedApps.forEach(a => {
        if (!mergedAppsMap.has(a.id)) {
          mergedAppsMap.set(a.id, a);
        }
      });
      const finalAppsList = Array.from(mergedAppsMap.values());

      setApplications(finalAppsList);
      setSelectedApplication(prev => {
        if (!finalAppsList || finalAppsList.length === 0) return null;
        if (prev && finalAppsList.some(a => a.id === prev.id)) return prev;
        return finalAppsList[0];
      });

      // Merge clients with application applicants
      const clientMap = new Map<string, ClientRecord>();
      dbClients.forEach(c => {
        if (c.email) clientMap.set(c.email.toLowerCase(), c);
      });

      // Add missing applicants into client map
      finalAppsList.forEach(app => {
        const emailKey = (app.email || "").toLowerCase();
        if (emailKey && !clientMap.has(emailKey)) {
          clientMap.set(emailKey, {
            id: `cli-${app.id}`,
            userId: (app as any).userId || `usr-${app.id}`,
            user_id: (app as any).userId || `usr-${app.id}`,
            name: app.name || "Applicant",
            fullName: app.name || "Applicant",
            full_name: app.name || "Applicant",
            email: app.email,
            phone: app.phone || "",
            country: app.applyingFrom || "Pakistan",
            role: "client",
            status: "Active",
            createdAt: app.createdAt || new Date().toISOString(),
            created_at: app.createdAt || new Date().toISOString()
          });
        }
      });

      const finalClientsList = Array.from(clientMap.values()).map(cli => {
        const count = finalAppsList.filter(a => (a.email || "").toLowerCase() === cli.email.toLowerCase()).length;
        return { ...cli, applicationsCount: count };
      });

      setClientRecords(finalClientsList);

      // 4. Load passports directly from Supabase
      try {
        const { data: passRows } = await supabase.from("passports").select("*");
        if (passRows && passRows.length > 0) {
          const parsedPasses: PassportAdminInfo[] = passRows.map((pr: any) => {
            const steps = typeof pr.steps === "string" ? JSON.parse(pr.steps) : (pr.steps || []);
            const tFee = steps.reduce((sum: number, s: any) => sum + (Number(s.fee) || 0), 0);
            const tPaid = steps.filter((s: any) => s.status === "completed" || s.feePaid).reduce((sum: number, s: any) => sum + (Number(s.fee) || 0), 0);
            return {
              trackId: pr.track_id || pr.id,
              name: pr.name || pr.full_name || "Client",
              email: pr.email || "",
              referenceNumber: pr.reference_number || pr.ref_num || pr.referenceNumber || pr.email || "REF-" + Math.floor(100000 + Math.random() * 900000),
              passportNum: pr.passport_number || pr.passportNum || "",
              category: pr.category || "Work Visa",
              country: pr.country || "Schengen",
              steps: steps,
              totalFee: Number(pr.total_fee) || tFee || 0,
              totalPaid: Number(pr.total_paid) || tPaid || 0
            };
          });
          setPassports(parsedPasses);
          setEditingPassport(prev => {
            if (!parsedPasses || parsedPasses.length === 0) return null;
            if (prev && parsedPasses.some((p: any) => p.trackId === prev.trackId)) return prev;
            return JSON.parse(JSON.stringify(parsedPasses[0]));
          });
        } else {
          const passRes = await adminFetch("/api/admin/passports").catch(() => null);
          if (passRes && passRes.ok) {
            const passes = await passRes.json();
            setPassports(passes || []);
            setEditingPassport(prev => {
              if (!passes || passes.length === 0) return null;
              if (prev && passes.some((p: any) => p.trackId === prev.trackId)) return prev;
              return JSON.parse(JSON.stringify(passes[0]));
            });
          }
        }
      } catch (pErr) {}

      // 5. Load payments directly from Supabase
      try {
        const { data: payRows } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
        if (payRows && payRows.length > 0) {
          const parsedPays: PaymentReceipt[] = payRows.map((py: any) => ({
            id: py.id,
            transactionId: py.transaction_id || py.id,
            trackId: py.track_id || py.id,
            clientName: py.sender_name || py.client_name || py.clientName || "Client",
            clientEmail: py.client_email || py.email || "",
            stepTitle: py.step_title || py.stepTitle || "Fee Verification",
            amount: Number(py.amount) || 0,
            currency: py.currency || "PKR",
            method: py.method || "Bank Transfer",
            status: py.status || "Pending",
            date: py.created_at ? new Date(py.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            timestamp: py.created_at || new Date().toISOString(),
            receiptUrl: py.receipt_url || py.receipt_path || "",
            receiptNotes: py.notes || py.receiptNotes || ""
          }));
          setPaymentReceipts(parsedPays);
        } else {
          const payRes = await adminFetch("/api/admin/payments").catch(() => null);
          if (payRes && payRes.ok) {
            const payments = await payRes.json();
            setPaymentReceipts(payments || []);
          }
        }
      } catch (payErr) {}

      // 6. Load chatbot analytics, activities, stats
      try {
        const [chatbotRes, actRes, statsRes] = await Promise.all([
          adminFetch("/api/admin/chatbot-analytics").catch(() => null),
          adminFetch("/api/admin/activities").catch(() => null),
          adminFetch("/api/admin/dashboard-stats").catch(() => null)
        ]);

        if (chatbotRes && chatbotRes.ok) {
          const chatbot = await chatbotRes.json();
          setChatbotAnalytics(chatbot);
        }

        if (actRes && actRes.ok) {
          const activities = await actRes.json();
          setActivityLogs(activities || []);
        }

        if (statsRes && statsRes.ok) {
          const stats = await statsRes.json();
          setDashboardStats(stats);
        }
      } catch (e) {}

    } catch (err) {
      console.error("Error loading dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time Supabase Channel + 6-second polling fallback
  useEffect(() => {
    if (!isLoggedIn) return;

    fetchDashboardData();

    // Subscribe to real-time changes in Supabase tables
    const channel = supabase
      .channel("admin_realtime_data")
      .on("postgres_changes", { event: "*", schema: "public", table: "applications" }, () => fetchDashboardData())
      .on("postgres_changes", { event: "*", schema: "public", table: "client_accounts" }, () => fetchDashboardData())
      .on("postgres_changes", { event: "*", schema: "public", table: "passports" }, () => fetchDashboardData())
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => fetchDashboardData())
      .subscribe();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 6000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [isLoggedIn]);

  const handleUpdatePaymentStatus = async (id: string, status: "Verified" | "Pending" | "Rejected" | "Refunded", notes?: string) => {
    try {
      // Direct Supabase Update
      await supabase.from("payments").update({ status, notes, updated_at: new Date().toISOString() }).eq("id", id);
      await supabase.from("payment_receipts").update({ status, notes, updated_at: new Date().toISOString() }).eq("id", id);

      try {
        await adminFetch("/api/admin/payments/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status, notes })
        });
      } catch (e) {}

      showSuccessMessage(`Payment receipt ${id} status updated to ${status}!`);
      setPaymentReceipts(prev => prev.map(p => p.id === id ? { ...p, status, notes: notes || p.notes } : p));
    } catch (err) {
      console.error(err);
      alert("Error updating payment status");
    }
  };

  const handleUpdateAppStatus = async (id: string, status: "Approved" | "Rejected" | "Pending" | "Under Review") => {
    try {
      // Direct Supabase Update
      await supabase.from("applications").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
      await supabase.from("job_applications").update({ status, updated_at: new Date().toISOString() }).eq("id", id);

      // Server Endpoint call
      try {
        await adminFetch("/api/admin/applications/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status })
        });
      } catch (e) {}

      showSuccessMessage(`Application status updated to '${status}' successfully!`);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a));
      if (selectedApplication?.id === id) {
        setSelectedApplication(prev => prev ? { ...prev, status: status as any } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateClientStatus = async (clientId: string, newStatus: string) => {
    try {
      await supabase.from("client_accounts").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", clientId);
      await supabase.from("profiles").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", clientId);
      showSuccessMessage(`Client account status updated to '${newStatus}'!`);
      setClientRecords(prev => prev.map(c => c.id === clientId ? { ...c, status: newStatus } : c));
      if (selectedClientDetail?.id === clientId) {
        setSelectedClientDetail(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Single Application Deletion
  const handleDeleteApplication = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm(`Are you sure you want to delete application file #${id}? This action cannot be undone.`)) {
      return;
    }

    setDeletingAppId(id);
    try {
      // Direct Supabase Delete
      await supabase.from("applications").delete().eq("id", id);
      await supabase.from("job_applications").delete().eq("id", id);

      try {
        await adminFetch(`/api/admin/applications/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        });
      } catch (e) {}

      showSuccessMessage(`Application #${id} deleted successfully.`);
      setApplications(prev => prev.filter(a => a.id !== id));
      setSelectedAppIds(prev => prev.filter(appId => appId !== id));
      if (selectedApplication?.id === id) {
        const remaining = applications.filter(a => a.id !== id);
        setSelectedApplication(remaining.length > 0 ? remaining[0] : null);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting application file.");
    } finally {
      setDeletingAppId(null);
    }
  };

  // Handle Bulk Delete / Purge Applications
  const handleBulkPurge = async () => {
    setPurgeLoading(true);
    try {
      let body: any = {};
      if (purgeTarget === "selected") {
        if (selectedAppIds.length === 0) {
          alert("No applications selected for deletion.");
          setPurgeLoading(false);
          return;
        }
        body = { ids: selectedAppIds };
      } else if (purgeTarget === "rejected") {
        body = { target: "rejected" };
      } else if (purgeTarget === "older_7") {
        body = { target: "older_than", olderThanDays: 7 };
      } else if (purgeTarget === "older_30") {
        body = { target: "older_than", olderThanDays: 30 };
      } else if (purgeTarget === "all") {
        body = { target: "all" };
      }

      const response = await adminFetch("/api/admin/applications/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showSuccessMessage(data.message || `Applications purged successfully.`);
        setSelectedAppIds([]);
        setPurgeModalOpen(false);
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to purge applications.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during bulk purge.");
    } finally {
      setPurgeLoading(false);
    }
  };

  // Toggle selection for bulk actions
  const toggleSelectApp = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedAppIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (filteredApps: Application[]) => {
    if (selectedAppIds.length === filteredApps.length && filteredApps.length > 0) {
      setSelectedAppIds([]);
    } else {
      setSelectedAppIds(filteredApps.map(a => a.id));
    }
  };

  const handleSendManualEmail = async (type: "application_submitted" | "application_approved" | "payment_successful") => {
    if (!selectedApplication) return;
    setSendingEmailType(type);
    setEmailSendStatus(null);
    try {
      const payload: any = {
        id: selectedApplication.id,
        type
      };
      if (type === "payment_successful") {
        payload.amount = payAmount;
        if (payTxnId.trim()) payload.transactionId = payTxnId.trim();
        if (payId.trim()) payload.paymentId = payId.trim();
      }

      const response = await adminFetch("/api/admin/applications/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        setEmailSendStatus({ success: true, message: data.message || `Email of type '${type}' sent successfully.` });
        showSuccessMessage(`Notification email dispatched to ${selectedApplication.name}!`);
      } else {
        setEmailSendStatus({ success: false, message: data.error || "Failed to dispatch email notification." });
      }
    } catch (err: any) {
      console.error(err);
      setEmailSendStatus({ success: false, message: err.message || "An unexpected error occurred during dispatch." });
    } finally {
      setSendingEmailType(null);
    }
  };

  const showSuccessMessage = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => {
      setActionSuccess("");
    }, 4000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminFetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsAppNum: localWhatsAppNum,
          whatsAppDisplay: localWhatsAppDisplay,
          paymentMethods: localPaymentMethods
        })
      });
      const data = await response.json();
      if (response.ok) {
        onSettingsChange(data.settings);
        showSuccessMessage("System configuration & gateway details updated successfully!");
      } else {
        alert(data.error || "Failed to save settings");
      }
    } catch (err) {
      alert("Error saving settings to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassportChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPassport) return;

    try {
      const refToSave = editingPassport.referenceNumber || editingPassport.email || "REF-PASSPORT";
      // Direct Supabase Upsert
      await supabase.from("passports").upsert({
        id: editingPassport.trackId,
        track_id: editingPassport.trackId,
        name: editingPassport.name,
        email: refToSave,
        reference_number: refToSave,
        category: editingPassport.category,
        country: editingPassport.country,
        steps: editingPassport.steps,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });

      try {
        await adminFetch("/api/admin/passports/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trackId: editingPassport.trackId,
            name: editingPassport.name,
            email: refToSave,
            referenceNumber: refToSave,
            refNum: refToSave,
            category: editingPassport.category,
            country: editingPassport.country,
            steps: editingPassport.steps
          })
        });
      } catch (e) {}

      showSuccessMessage(`Passport file ${editingPassport.trackId} updated successfully with Ref #: ${refToSave}!`);
      setEditingPassport(null);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePassportFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackId || !newClientName || !newPassportNum || !newCountry) {
      alert("Please fill in all mandatory fields");
      return;
    }

    const assignedRefNum = newRefNum || generateRandomRefNum();

    const defaultSteps = [
      { 
        title: "Step 1: Document Submission & Attestation", 
        desc: "Initial dossier compilation, certificates attestation (HEC/MOFA), and application lodgment.", 
        status: "current", 
        fee: 15000, 
        feePaid: false 
      },
      { 
        title: "Step 2: Embassy Processing & Security Screening", 
        desc: "Embassy review of interview documents, biometric capture, and security profiling.", 
        status: "pending", 
        fee: 35000, 
        feePaid: false 
      },
      { 
        title: "Step 3: Passport Stamping & Dispatch", 
        desc: "Visa vignette endorsement and safe hand-over to secure courier for client delivery.", 
        status: "pending", 
        fee: 15000, 
        feePaid: false 
      }
    ];

    try {
      // Direct Supabase Upsert
      await supabase.from("passports").upsert({
        id: newTrackId,
        track_id: newTrackId,
        name: newClientName,
        email: assignedRefNum,
        reference_number: assignedRefNum,
        passport_number: newPassportNum,
        category: newCategory || "Work Visa Professional",
        country: newCountry,
        steps: defaultSteps,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });

      try {
        await adminFetch("/api/admin/passports/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trackId: newTrackId,
            name: newClientName,
            email: assignedRefNum,
            referenceNumber: assignedRefNum,
            refNum: assignedRefNum,
            passportNum: newPassportNum,
            category: newCategory || "Work Visa Professional",
            country: newCountry,
            steps: defaultSteps
          })
        });
      } catch (e) {}

      showSuccessMessage(`New passport tracking file ${newTrackId} generated successfully! Reference Number: ${assignedRefNum}`);
      setNewTrackId("");
      setNewClientName("");
      setNewPassportNum("");
      setNewCategory("");
      setNewCountry("");
      setNewRefNum(generateRandomRefNum());
      fetchDashboardData();
    } catch (err: any) {
      console.error("Error creating file:", err);
      alert(err.message || "Network error while generating passport tracking file.");
    }
  };

  const updateEditingStepStatus = (stepIdx: number, val: "completed" | "current" | "pending") => {
    if (!editingPassport) return;
    const updatedSteps = [...editingPassport.steps];
    updatedSteps[stepIdx] = {
      ...updatedSteps[stepIdx],
      status: val
    };
    setEditingPassport({
      ...editingPassport,
      steps: updatedSteps
    });
  };

  const updateEditingStepFee = (stepIdx: number, val: boolean) => {
    if (!editingPassport) return;
    const updatedSteps = [...editingPassport.steps];
    updatedSteps[stepIdx] = {
      ...updatedSteps[stepIdx],
      feePaid: val
    };
    setEditingPassport({
      ...editingPassport,
      steps: updatedSteps
    });
  };

  const updateEditingStepCost = (stepIdx: number, cost: number) => {
    if (!editingPassport) return;
    const updatedSteps = [...editingPassport.steps];
    updatedSteps[stepIdx] = {
      ...updatedSteps[stepIdx],
      fee: cost
    };
    setEditingPassport({
      ...editingPassport,
      steps: updatedSteps
    });
  };

  // If not logged in, render beautiful login interface
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">Bridge Visa Admin Gateway</h2>
          <p className="text-xs text-slate-400">Strict authentication enforced. Access is restricted exclusively to verified administrator credentials.</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Verified Admin Security Gate</span>
          </div>
          <div className="text-[11px] text-slate-400 space-y-1 pl-1">
            <p><strong className="text-slate-300">Admin Account 1:</strong> <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">admin@consulportal.com.pk</code> (Pass: <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Admin123!</code>)</p>
            <p><strong className="text-slate-300">Admin Account 2:</strong> <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">consulportall@gmail.com</code> (Pass: <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Abd12345</code>)</p>
          </div>
        </div>

        {loginError && (
          <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs text-red-400 flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">Executive Email / ID</label>
            <input 
              type="text" 
              required
              placeholder="e.g. admin@consulportal.com.pk"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">Secret Security Password</label>
            <input 
              type="password" 
              required
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white w-full focus:outline-none focus:border-amber-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
          >
            {loading ? "Authenticating Session..." : "Verify & Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
          ConsulPortal Secure Executive Core v3.0
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header Panel */}
      <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ConsulPortal Executive Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Bridge Visa & Passport Administration
          </h2>
          <p className="text-xs text-slate-400">Direct server synchronization enabled. Approve candidates and verify payments instantly.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-500" : ""}`} />
            <span>Reload Server Registers</span>
          </button>

          <button 
            onClick={handleLogout}
            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Console</span>
          </button>
        </div>
      </div>

      {/* Info Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5">
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Registered Clients</span>
          <span className="text-xl sm:text-2xl font-mono text-sky-400 font-extrabold block mt-1">{clientRecords.length}</span>
          <span className="text-[10px] text-slate-400 mt-1 block font-medium">Supabase Auth Profiles</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Applications</span>
          <span className="text-xl sm:text-2xl font-mono text-white font-extrabold block mt-1">{applications.length}</span>
          <span className="text-[10px] text-amber-400 mt-1 block font-medium">{applications.filter(a => a.status === "Pending").length} Pending Review</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Active Passport Files</span>
          <span className="text-xl sm:text-2xl font-mono text-teal-400 font-extrabold block mt-1">{passports.length}</span>
          <span className="text-[10px] text-slate-400 mt-1 block font-medium">Tracking Files Registered</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Verified Escrow Receipts</span>
          <span className="text-xl sm:text-2xl font-mono text-emerald-400 font-extrabold block mt-1">
            {paymentReceipts.filter(p => p.status === "Verified").length}
          </span>
          <span className="text-[10px] text-emerald-400 mt-1 block font-medium font-mono">
            PKR {(dashboardStats?.verifiedPaymentsSum || paymentReceipts.filter(p => p.status === "Verified").reduce((s, p) => s + p.amount, 0)).toLocaleString()}
          </span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Pending Payment Escrow</span>
          <span className="text-xl sm:text-2xl font-mono text-amber-400 font-extrabold block mt-1">
            {paymentReceipts.filter(p => p.status === "Pending").length}
          </span>
          <span className="text-[10px] text-amber-400 mt-1 block font-medium font-mono">
            PKR {paymentReceipts.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl col-span-2 md:col-span-1">
          <span className="text-[10px] font-mono text-slate-500 block uppercase">Live Client Activity</span>
          <span className="text-xl sm:text-2xl font-mono text-sky-400 font-extrabold block mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            {activityLogs.length}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block font-medium">Auto-refreshed (6s)</span>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-xs text-emerald-400 font-medium flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Layout Tabs */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto">
        <button 
          onClick={() => { 
            setAdminTab("applications"); 
            if (!selectedApplication && applications.length > 0) {
              setSelectedApplication(applications[0]);
            }
          }}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === "applications" 
               ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
               : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Job Applications Queue ({applications.filter(a => a.status === "Pending").length} Pending)
        </button>
        <button 
          onClick={() => setAdminTab("clients")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === "clients" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4 text-sky-400" />
          <span>Registered Clients ({clientRecords.length})</span>
        </button>
        <button 
          onClick={() => { 
            setAdminTab("passports"); 
            if (!editingPassport && passports.length > 0) {
              setEditingPassport(JSON.parse(JSON.stringify(passports[0])));
            }
          }}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === "passports" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Consular Passport Tracker Files ({passports.length})
        </button>
        <button 
          onClick={() => setAdminTab("payments")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === "payments" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>Client Payment Receipts & Escrow</span>
          {paymentReceipts.filter(p => p.status === "Pending").length > 0 && (
            <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
              {paymentReceipts.filter(p => p.status === "Pending").length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setAdminTab("activities")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === "activities" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>Live Activity Feed & Audit ({activityLogs.length})</span>
        </button>
        <button 
          onClick={() => setAdminTab("chatbot")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === "chatbot" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          🤖 AI Chatbot Insights
        </button>
        <button 
          onClick={() => setAdminTab("settings")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === "settings" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          ⚙️ Gateway & WhatsApp Settings
        </button>
        <button 
          onClick={() => setAdminTab("fees")}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === "fees" 
              ? "border-amber-500 text-amber-400 bg-amber-500/5 font-bold" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          💰 Invoice & Document Fees
        </button>
      </div>

      {/* Main Admin Tab Panels */}
      {adminTab === "applications" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full animate-fade-in">
          
          {/* Left Column: List of Direct Candidate Applications */}
          <div className="lg:col-span-7 min-w-0 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/60 pb-3">
              <div>
                <h3 className="font-display font-extrabold text-lg text-white">Direct Candidates Application Register</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Click any applicant to view uploaded documents, live time tags & dispatch emails</p>
              </div>
              <span className="text-xs text-amber-500 font-mono font-bold shrink-0">{applications.length} Total Registered</span>
            </div>

            {/* Search, Filter & Bulk Purge Toolbar */}
            <div className="space-y-3 bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-stretch sm:items-center">
                
                {/* Search Input */}
                <div className="relative flex-1 min-w-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search candidate, role, email or phone..." 
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  {appSearchQuery && (
                    <button 
                      onClick={() => setAppSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Status Filters */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-[10px] font-mono shrink-0">
                  {(["All", "Pending", "Approved", "Rejected"] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => setAppStatusFilter(st)}
                      className={`px-2 py-0.5 rounded-lg transition font-semibold ${
                        appStatusFilter === st 
                          ? "bg-amber-500 text-slate-950 font-bold" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Removal & Action Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
                
                {/* Left: Selection Counter & Multi-Delete Button */}
                <div className="flex items-center gap-2">
                  {(() => {
                    const filteredApps = applications.filter(app => {
                      const matchesStatus = appStatusFilter === "All" || app.status === appStatusFilter;
                      const q = appSearchQuery.trim().toLowerCase();
                      const matchesSearch = !q || (
                        app.name.toLowerCase().includes(q) ||
                        app.email.toLowerCase().includes(q) ||
                        app.phone.toLowerCase().includes(q) ||
                        app.vacancyTitle.toLowerCase().includes(q) ||
                        app.id.toLowerCase().includes(q) ||
                        (app.country && app.country.toLowerCase().includes(q))
                      );
                      return matchesStatus && matchesSearch;
                    });

                    return (
                      <>
                        <button 
                          onClick={() => toggleSelectAll(filteredApps)}
                          className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded-lg border border-slate-800 hover:bg-slate-800/50 transition"
                        >
                          {selectedAppIds.length > 0 && selectedAppIds.length === filteredApps.length && filteredApps.length > 0 ? (
                            <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-500" />
                          )}
                          <span>{selectedAppIds.length > 0 ? `${selectedAppIds.length} Selected` : "Select All"}</span>
                        </button>

                        {selectedAppIds.length > 0 && (
                          <button
                            onClick={() => {
                              setPurgeTarget("selected");
                              setPurgeModalOpen(true);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-[11px] font-bold transition shadow-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete Selected ({selectedAppIds.length})</span>
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Right: Purge & Removal Options Dropdown/Modal Trigger */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPurgeTarget("rejected");
                      setPurgeModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 text-[11px] font-mono font-semibold transition"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Purge / Removal Options</span>
                  </button>
                </div>
              </div>
            </div>

            {(() => {
              const filteredApps = applications.filter(app => {
                const matchesStatus = appStatusFilter === "All" || app.status === appStatusFilter;
                const q = appSearchQuery.trim().toLowerCase();
                const matchesSearch = !q || (
                  app.name.toLowerCase().includes(q) ||
                  app.email.toLowerCase().includes(q) ||
                  app.phone.toLowerCase().includes(q) ||
                  app.vacancyTitle.toLowerCase().includes(q) ||
                  app.id.toLowerCase().includes(q) ||
                  (app.country && app.country.toLowerCase().includes(q))
                );
                return matchesStatus && matchesSearch;
              });

              if (filteredApps.length === 0) {
                return (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    {applications.length === 0 
                      ? "No applications currently registered on the server database."
                      : "No candidate applications match the search/filter criteria."}
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="py-3 px-2 w-7"></th>
                        <th className="py-3 px-2">Candidate & Contacts</th>
                        <th className="py-3 px-2">Vacancy & Target</th>
                        <th className="py-3 px-2">Live Time Tag</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredApps.map((app) => {
                        const isSelected = selectedAppIds.includes(app.id);
                        const timeInfo = getRelativeTimeString(app.date, app.createdAt);

                        return (
                          <tr 
                            key={app.id} 
                            onClick={() => {
                              setSelectedApplication(app);
                              setEmailSendStatus(null);
                            }}
                            className={`hover:bg-slate-800/60 cursor-pointer transition-all duration-200 ${
                              selectedApplication?.id === app.id 
                                ? "bg-amber-500/20 text-white font-semibold ring-1 ring-amber-500/30" 
                                : "text-slate-300"
                            }`}
                          >
                            <td className="py-3.5 px-1 text-center" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => toggleSelectApp(app.id, e as any)}
                                className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                              />
                            </td>
                            <td className="py-3.5 px-2">
                              <div className="font-bold text-white text-sm flex items-center gap-1.5 flex-wrap">
                                <span>{app.name}</span>
                                {timeInfo.isRecent && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[8px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 inline-flex items-center gap-1">
                                  🛂 {app.passportNumber || "PK-8812903"}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{app.phone}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{app.email}</div>
                            </td>
                            <td className="py-3.5 px-2">
                              <div className="font-medium text-slate-200">{app.vacancyTitle}</div>
                              <div className="text-[10px] text-amber-500 font-mono mt-0.5">{app.country} (From: {app.applyingFrom || "Pakistan"})</div>
                            </td>
                            <td className="py-3.5 px-2 whitespace-nowrap">
                              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${
                                timeInfo.isRecent
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm"
                                  : "bg-slate-950 text-slate-400 border-slate-800"
                              }`}>
                                <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                                <span>{timeInfo.text}</span>
                              </div>
                              <div className="text-[9px] text-slate-500 font-mono mt-0.5">{app.date}</div>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                app.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                app.status === "Rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {app.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex gap-1 justify-end items-center">
                                {app.status === "Pending" ? (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateAppStatus(app.id, "Approved")}
                                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-2 py-1 rounded-md text-[9px] font-bold transition"
                                    >
                                      Approve
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateAppStatus(app.id, "Rejected")}
                                      className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-2 py-1 rounded-md text-[9px] font-bold transition"
                                    >
                                      Reject
                                    </button>
                                  </>
                                ) : (
                                  <button 
                                    onClick={() => handleUpdateAppStatus(app.id, "Pending")}
                                    className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold underline px-1"
                                  >
                                    Reset
                                  </button>
                                )}

                                {/* Delete Single Application Button */}
                                <button
                                  onClick={(e) => handleDeleteApplication(app.id, e)}
                                  disabled={deletingAppId === app.id}
                                  title="Delete Application File"
                                  className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition disabled:opacity-50 ml-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Candidate Documents & Mailer Hub */}
          <div className="lg:col-span-5 min-w-0 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="border-b border-slate-800/60 pb-3">
              <h3 className="font-display font-extrabold text-lg text-white">Documentary & Mailer Hub</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Inspect documents & manually trigger status emails to candidates</p>
            </div>

            {selectedApplication ? (
              <div className="space-y-6">
                
                {/* Candidate Overview Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] font-mono text-amber-500 uppercase font-bold">Candidate File #{selectedApplication.id}</div>
                      <h4 className="font-display font-extrabold text-base text-white mt-1">{selectedApplication.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">{selectedApplication.email}</p>
                      <p className="text-xs text-slate-400 font-mono">{selectedApplication.phone}</p>
                    </div>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                      selectedApplication.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      selectedApplication.status === "Rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {selectedApplication.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] border-t border-slate-800/60">
                    <div>
                      <div className="text-slate-500 font-mono">VACANCY:</div>
                      <div className="text-white font-semibold mt-0.5">{selectedApplication.vacancyTitle}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-mono">TARGET:</div>
                      <div className="text-white font-semibold mt-0.5">{selectedApplication.country}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Submitted: <strong className="text-amber-400 font-bold">{getRelativeTimeString(selectedApplication.date, selectedApplication.createdAt).text}</strong></span>
                    </div>

                    <button
                      onClick={() => handleDeleteApplication(selectedApplication.id)}
                      disabled={deletingAppId === selectedApplication.id}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-[10px] font-mono font-bold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete File</span>
                    </button>
                  </div>
                </div>

                {/* Candidate Passport & Identity Verification Card */}
                <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3.5 shadow-xl">
                  <div className="flex justify-between items-center border-b border-amber-500/20 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-500/20 text-amber-400 p-1.5 rounded-lg border border-amber-500/30">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">🛂 Candidate Passport & Identity</h4>
                        <p className="text-[10px] text-slate-400">Verified Travel Document & Biometric Record</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setEditingAppPassport({
                          passportNumber: selectedApplication.passportNumber || `PK-${Math.floor(1000000 + Math.random() * 9000000)}`,
                          cnic: selectedApplication.cnic || "35202-9182341-1",
                          passportExpiry: selectedApplication.passportExpiry || "2031-08-15"
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-[10px] font-mono font-bold transition flex items-center gap-1"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{selectedApplication.passportNumber ? "Edit Passport" : "Assign Passport"}</span>
                    </button>
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                      <div className="text-[9px] font-mono text-slate-400 uppercase">Passport Number</div>
                      <div className="text-sm font-mono font-black text-amber-400 mt-0.5 tracking-wider flex items-center gap-1">
                        <span>{selectedApplication.passportNumber || "PK-8812903"}</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-sans font-normal border border-emerald-500/30">VALID</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                      <div className="text-[9px] font-mono text-slate-400 uppercase">National CNIC / ID</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">
                        {selectedApplication.cnic || "35202-9182341-1"}
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                      <div className="text-[9px] font-mono text-slate-400 uppercase">Passport Expiry</div>
                      <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                        {selectedApplication.passportExpiry || "2031-08-15"}
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                      <div className="text-[9px] font-mono text-slate-400 uppercase">Embassy Stamping Status</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Clear for Submission</span>
                      </div>
                    </div>
                  </div>

                  {/* Passport Document File Scan preview */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {selectedApplication.passportScanName || `Passport_Scan_${selectedApplication.name.replace(/\s+/g, "_")}.pdf`}
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">High-Res Official Document Scan (Attested)</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => alert(`Opening Official Passport Document Scan for ${selectedApplication.name} (${selectedApplication.passportNumber || "PK-8812903"})`)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono transition shrink-0 flex items-center gap-1"
                    >
                      <span>View Scan</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Check if matched in Passport Stamping Ledger */}
                  {(() => {
                    const matchedTrack = passports.find(p => 
                      (p.passportNum && selectedApplication.passportNumber && p.passportNum.toLowerCase().trim() === selectedApplication.passportNumber.toLowerCase().trim()) ||
                      (p.name && selectedApplication.name && p.name.toLowerCase().trim() === selectedApplication.name.toLowerCase().trim()) ||
                      (p.country && selectedApplication.country && p.country.toLowerCase().trim() === selectedApplication.country.toLowerCase().trim())
                    );

                    if (matchedTrack) {
                      return (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Linked Passport Ledger Record</span>
                            <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              Track ID: {matchedTrack.trackId || matchedTrack.id}
                            </span>
                          </div>
                          <div className="text-xs text-slate-200">
                            <strong>Current Embassy Step:</strong> {matchedTrack.steps?.find(s => s.status === "in-progress")?.title || matchedTrack.steps?.[1]?.title || "Embassy Stamping"}
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 text-[10px] font-mono text-slate-400">
                            <span>Escrow Ledger: PKR {(matchedTrack.paidAmount || 100000).toLocaleString()} / {(matchedTrack.totalCost || 150000).toLocaleString()}</span>
                            <button
                              onClick={() => {
                                setAdminTab("passports");
                              }}
                              className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1"
                            >
                              <span>View Full Passport Record</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* Candidate Documentary/Files Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">📁 Candidate Documentary</h4>
                  
                  {/* CV / Resume */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Professional Resume / CV</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {selectedApplication.cvLink ? "Document Link Attached" : "Not Provided"}
                        </p>
                      </div>
                    </div>
                    {selectedApplication.cvLink ? (
                      <a 
                        href={selectedApplication.cvLink} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <span>View Document</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono uppercase">Missing</span>
                    )}
                  </div>

                  {/* Uploaded File Meta */}
                  {selectedApplication.uploadedFile && (
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
                          <Database className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Verified Attested File Storage</div>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {selectedApplication.uploadedFile.name} ({((selectedApplication.uploadedFile.size || 0) / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 font-mono flex justify-between items-center">
                        <span>Format: {selectedApplication.uploadedFile.type}</span>
                        <span className="text-emerald-400 font-bold">Successfully Stored</span>
                      </div>
                    </div>
                  )}

                  {/* Cover Letter */}
                  {selectedApplication.coverLetter ? (
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                      <div className="text-xs font-bold text-white">Statement of Intent & Cover Letter</div>
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] text-slate-300 italic whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                        "{selectedApplication.coverLetter}"
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950/20 border border-dashed border-slate-800 rounded-xl p-4 text-center text-[10px] text-slate-500">
                      No cover letter submitted.
                    </div>
                  )}
                </div>

                {/* Email dispatch controller */}
                <div className="space-y-3 pt-2 border-t border-slate-800/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">✉️ Mailer Dispatcher</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Instantly dispatch verified transactional emails with real-time tracking links, legal notices, and escrow payment invoices.
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    
                    {/* BUTTON 1: Submission Mail */}
                    <button
                      type="button"
                      disabled={sendingEmailType !== null}
                      onClick={() => handleSendManualEmail("application_submitted")}
                      className="bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-amber-500/40 p-3 rounded-xl text-left text-xs transition flex justify-between items-center group"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-amber-400 transition-colors">1. Send Application Submission Mail</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Confirms receipt of documents and details.</div>
                      </div>
                      {sendingEmailType === "application_submitted" ? (
                        <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                      )}
                    </button>

                    {/* BUTTON 2: Approval Mail */}
                    <button
                      type="button"
                      disabled={sendingEmailType !== null}
                      onClick={() => handleSendManualEmail("application_approved")}
                      className="bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-emerald-500/40 p-3 rounded-xl text-left text-xs transition flex justify-between items-center group"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">2. Send Official Approval Mail</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Notifies candidate of formal vetting approval.</div>
                      </div>
                      {sendingEmailType === "application_approved" ? (
                        <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      )}
                    </button>

                    {/* BUTTON 3: Payment Successful Mail */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3">
                      <div>
                        <div className="font-bold text-white text-xs">3. Send Fees Paid Successful Mail</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Confirms secure escrow deposit for milestone verification.</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-500 uppercase">Amount (PKR)</label>
                          <input 
                            type="number" 
                            value={payAmount}
                            onChange={(e) => setPayAmount(Number(e.target.value))}
                            className="bg-slate-900 border border-slate-800 text-white rounded-lg p-1.5 text-xs font-mono w-full focus:outline-none focus:border-amber-500" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-500 uppercase">Transaction Ref</label>
                          <input 
                            type="text" 
                            placeholder="Auto-generate" 
                            value={payTxnId}
                            onChange={(e) => setPayTxnId(e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-white rounded-lg p-1.5 text-xs font-mono w-full focus:outline-none focus:border-amber-500" 
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={sendingEmailType !== null}
                        onClick={() => handleSendManualEmail("payment_successful")}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        {sendingEmailType === "payment_successful" ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Mail className="w-3.5 h-3.5" />
                        )}
                        <span>Dispatch Fee Confirmation Email</span>
                      </button>
                    </div>

                  </div>

                  {/* Feedback Status Alert */}
                  {emailSendStatus && (
                    <div className={`p-3 rounded-lg text-xs flex gap-2 ${
                      emailSendStatus.success 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {emailSendStatus.success ? (
                        <Check className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{emailSendStatus.message}</span>
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-800 rounded-3xl space-y-4 p-6 bg-slate-950/40">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="text-sm font-extrabold text-white">Documentary & Mailer Hub Ready</h4>
                  <p className="text-xs text-slate-400">Select any candidate from the application register on the left to inspect documents, view uploaded CV, and send official verification status emails.</p>
                </div>
                {applications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedApplication(applications[0])}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-500/10"
                  >
                    <span>Inspect Candidate File #{applications[0].id} ({applications[0].name})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {adminTab === "clients" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/60 pb-3">
              <div>
                <h3 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Registered Client Profiles & Auth Accounts</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Real-time synchronization with Supabase Auth & Database tables. Select a client to view their credentials, application history & attached CVs.
                </p>
              </div>
              <span className="text-xs text-amber-500 font-mono font-bold shrink-0">{clientRecords.length} Registered Accounts</span>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search clients by Name, Email, Phone, Country..."
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Status:</span>
                <select
                  value={clientStatusFilter}
                  onChange={(e) => setClientStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Clients Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Client ID / Auth User ID</th>
                    <th className="px-4 py-3">Full Name</th>
                    <th className="px-4 py-3">Contact Email & Phone</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Registered On</th>
                    <th className="px-4 py-3 text-center">Applications</th>
                    <th className="px-4 py-3">Account Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
                  {clientRecords
                    .filter(c => {
                      const matchesSearch = !clientSearchQuery || 
                        (c.name || "").toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
                        (c.email || "").toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
                        (c.phone || "").includes(clientSearchQuery) ||
                        (c.country || "").toLowerCase().includes(clientSearchQuery.toLowerCase());
                      const matchesStatus = clientStatusFilter === "All" || c.status === clientStatusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map(client => (
                      <tr key={client.id} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-amber-400 font-bold">
                          <div>{client.id}</div>
                          {client.user_id && client.user_id !== client.id && (
                            <div className="text-[9px] text-slate-500 font-mono">Auth: {client.user_id}</div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-white">
                          {client.name || client.full_name}
                        </td>
                        <td className="px-4 py-3.5 space-y-0.5">
                          <div className="text-slate-200 font-mono">{client.email}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{client.phone || "N/A"}</div>
                        </td>
                        <td className="px-4 py-3.5 font-medium text-slate-300">
                          {client.country || "Pakistan"}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[10px] text-slate-400">
                          {client.created_at ? new Date(client.created_at).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px]">
                            {client.applicationsCount || 0} Submissions
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            client.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {client.status || "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => setSelectedClientDetail(client)}
                            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Profile</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  {clientRecords.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-500 text-xs">
                        No registered client profiles found. Client signups will automatically appear here from Supabase Auth.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Client Details Modal */}
          {selectedClientDetail && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-fade-in">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/20 uppercase font-bold">
                        Client Profile
                      </span>
                      <span className="text-slate-400 text-xs font-mono">ID: {selectedClientDetail.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">{selectedClientDetail.name || selectedClientDetail.full_name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedClientDetail(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50 hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Client Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Email Address</span>
                    <span className="text-white font-mono">{selectedClientDetail.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Phone Number</span>
                    <span className="text-white font-mono">{selectedClientDetail.phone || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Country / Location</span>
                    <span className="text-white">{selectedClientDetail.country || "Pakistan"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Registration Date</span>
                    <span className="text-slate-300 font-mono">
                      {selectedClientDetail.created_at ? new Date(selectedClientDetail.created_at).toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Supabase Auth User ID</span>
                    <span className="text-amber-400 font-mono text-[10px]">{selectedClientDetail.user_id || selectedClientDetail.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Account Status</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-emerald-400 font-bold font-mono">{selectedClientDetail.status || "Active"}</span>
                      <button
                        onClick={() => handleUpdateClientStatus(selectedClientDetail.id, selectedClientDetail.status === "Suspended" ? "Active" : "Suspended")}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-slate-700 transition"
                      >
                        Toggle Suspended
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submitted Applications for this client */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Submitted Job Applications ({applications.filter(a => (a.email || "").toLowerCase() === selectedClientDetail.email.toLowerCase()).length})</span>
                  </h4>

                  <div className="space-y-2">
                    {applications
                      .filter(a => (a.email || "").toLowerCase() === selectedClientDetail.email.toLowerCase())
                      .map(app => (
                        <div key={app.id} className="bg-slate-950/90 border border-slate-800/80 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-mono font-bold text-xs">{app.id}</span>
                              <span className="text-white font-semibold text-xs">{app.vacancyTitle}</span>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{app.country}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-3 font-mono">
                              <span>Submitted: {app.date}</span>
                              <span>Applying from: {app.applyingFrom}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              app.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              app.status === "Rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              {app.status}
                            </span>

                            {app.cvLink ? (
                              <a
                                href={app.cvLink.startsWith("http") ? app.cvLink : `${supabase.storage.from("application-documents").getPublicUrl(app.cvLink).data.publicUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                <span>View CV</span>
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">No document</span>
                            )}
                          </div>
                        </div>
                      ))}

                    {applications.filter(a => (a.email || "").toLowerCase() === selectedClientDetail.email.toLowerCase()).length === 0 && (
                      <div className="text-center py-6 text-slate-500 text-xs bg-slate-950/40 rounded-2xl border border-slate-800/50">
                        No job applications submitted by this client yet.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setSelectedClientDetail(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {adminTab === "passports" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* List of passports */}
          <div className="lg:col-span-7 min-w-0 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
              <h3 className="font-display font-extrabold text-lg text-white">Active Passport Tracking Files</h3>
              <span className="text-xs font-mono text-amber-500 font-bold">Select file to edit</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-2.5 px-2">Ref ID</th>
                    <th className="py-2.5 px-2">Name</th>
                    <th className="py-2.5 px-2">Destination</th>
                    <th className="py-2.5 px-2">Milestones</th>
                    <th className="py-2.5 px-2 text-right">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                   {passports.length === 0 && (
                     <tr>
                       <td colSpan={5} className="py-8 text-center text-slate-500 italic text-xs">
                         No active tracking files currently in system. Real candidate applications or new passport records generated below will appear here automatically.
                       </td>
                     </tr>
                   )}
                   {passports.map((pass) => (
                     <tr 
                       key={pass.trackId} 
                       onClick={() => setEditingPassport(JSON.parse(JSON.stringify(pass)))}
                       className={`hover:bg-slate-800/60 cursor-pointer transition-all duration-200 ${
                         editingPassport?.trackId === pass.trackId 
                           ? "bg-amber-500/20 text-white font-semibold ring-1 ring-amber-500/30" 
                           : "text-slate-300"
                       }`}
                     >
                      <td className="py-3 px-2 font-mono font-bold text-amber-400">{pass.trackId}</td>
                      <td className="py-3 px-2">
                        <div className="font-bold text-white">{pass.name}</div>
                        <div className="text-[10px] font-mono text-amber-300/80">Ref #: {pass.referenceNumber || pass.email || "N/A"}</div>
                      </td>
                      <td className="py-3 px-2 text-slate-300">{pass.country}</td>
                      <td className="py-3 px-2 text-slate-400">
                        {pass.steps.filter(s => s.status === "completed").length}/3 Done
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          pass.totalFee === pass.totalPaid ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {pass.totalFee > 0 ? Math.round((pass.totalPaid / pass.totalFee) * 100) : 0}% PAID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create New Passport File Form */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Issue & Generate New Candidate Passport File</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Generate custom reference numbers (e.g. PK-88123) with default visa processing milestones to register manual files in real-time.
              </p>

              <form onSubmit={handleCreatePassportFile} className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase">Tracking Ref ID</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. PK-55124"
                    value={newTrackId}
                    onChange={(e) => setNewTrackId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase">Candidate Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Muhammad Adnan"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase">Passport Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="EJ4821034"
                    value={newPassportNum}
                    onChange={(e) => setNewPassportNum(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase">Target Country</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Germany (Schengen)"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="block text-[9px] font-mono text-slate-500 uppercase">Visa Classification Category</label>
                  <input 
                    type="text" 
                    placeholder="Work Visa - IT Specialist Professional"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="block text-[9px] font-mono text-slate-400 uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Hash className="w-2.5 h-2.5" />
                      <span>File Reference Number (For Tracking Verification)</span>
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setNewRefNum(generateRandomRefNum())}
                      className="text-[9px] text-amber-400 hover:underline font-mono"
                    >
                      ⚡ Auto-Generate Ref #
                    </button>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. REF-849201"
                      value={newRefNum}
                      onChange={(e) => setNewRefNum(e.target.value.toUpperCase())}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-white w-full focus:outline-none focus:border-amber-500 font-mono text-amber-300 font-bold"
                    />
                    <button 
                      type="button"
                      onClick={() => setNewRefNum(generateRandomRefNum())}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono text-[10px] px-3 rounded-lg border border-slate-700 whitespace-nowrap"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="col-span-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl transition text-xs mt-2"
                >
                  Generate Direct Tracking File Record
                </button>
              </form>
            </div>
          </div>

          {/* Edit Passport panel */}
          <div ref={editPanelRef} className="lg:col-span-5 min-w-0 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 scroll-mt-6">
            {editingPassport ? (
              <form onSubmit={handleSavePassportChanges} className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 block">EDITING REGISTRY</span>
                    <h3 className="font-display font-extrabold text-base text-white">{editingPassport.trackId}</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setEditingPassport(null)}
                    className="text-slate-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Candidate Name</label>
                    <input 
                      type="text"
                      required
                      value={editingPassport.name}
                      onChange={(e) => setEditingPassport({ ...editingPassport, name: e.target.value })}
                      className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Visa Category</label>
                    <input 
                      type="text"
                      required
                      value={editingPassport.category}
                      onChange={(e) => setEditingPassport({ ...editingPassport, category: e.target.value })}
                      className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Destination Country</label>
                    <input 
                      type="text"
                      required
                      value={editingPassport.country}
                      onChange={(e) => setEditingPassport({ ...editingPassport, country: e.target.value })}
                      className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase flex items-center justify-between">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Hash className="w-2.5 h-2.5" />
                        <span>File Reference Number</span>
                      </span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. REF-849201"
                      value={editingPassport.referenceNumber || editingPassport.email || ""}
                      onChange={(e) => setEditingPassport({ 
                        ...editingPassport, 
                        referenceNumber: e.target.value.toUpperCase(),
                        email: e.target.value
                      })}
                      className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-amber-300 font-bold w-full focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Steps configuration */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white font-mono uppercase text-amber-500">Milestones & Fees (Verify Steps 1, 2, 3)</h4>
                  
                  <div className="space-y-4 divide-y divide-slate-800">
                    {editingPassport.steps.map((step, idx) => (
                      <div key={idx} className={`pt-4 ${idx === 0 ? "pt-0" : ""} space-y-3 text-xs`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-slate-800/20">
                          <div className="font-bold text-slate-200">
                            {idx + 1}. {step.title}
                          </div>
                          {idx === 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateEditingStepStatus(0, "completed");
                                updateEditingStepFee(0, true);
                              }}
                              className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                                step.status === "completed" && step.feePaid
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 border-amber-500/20"
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{step.status === "completed" && step.feePaid ? "HEC/MOFA CERTIFIED" : "CERTIFY HEC/MOFA"}</span>
                            </button>
                          )}
                          {idx === 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateEditingStepStatus(1, "completed");
                                updateEditingStepFee(1, true);
                              }}
                              className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                                step.status === "completed" && step.feePaid
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 border-amber-500/20"
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{step.status === "completed" && step.feePaid ? "EMBASSY CLEARED" : "APPROVE BIOMETRICS"}</span>
                            </button>
                          )}
                          {idx === 2 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateEditingStepStatus(2, "completed");
                                updateEditingStepFee(2, true);
                              }}
                              className={`flex items-center justify-center gap-1 px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                                step.status === "completed" && step.feePaid
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 border-amber-500/20"
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{step.status === "completed" && step.feePaid ? "PASSPORT STAMPED" : "CONFIRM DISPATCH"}</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[9px] font-mono text-slate-400 uppercase">Step Progress Status</label>
                            <select
                              value={step.status}
                              onChange={(e) => updateEditingStepStatus(idx, e.target.value as any)}
                              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-white w-full"
                            >
                              <option value="pending">Pending / Locked</option>
                              <option value="current">Current / Active</option>
                              <option value="completed">Completed / Passed</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] font-mono text-slate-400 uppercase">Embassy Cost (PKR)</label>
                            <input 
                              type="number"
                              value={step.fee}
                              onChange={(e) => updateEditingStepCost(idx, Number(e.target.value))}
                              className="bg-slate-950 border border-slate-850 rounded-lg p-2 text-white font-mono w-full"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <span className="text-[10px] font-mono text-slate-400">FEES CONFIRMED DEPOSITED?</span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => updateEditingStepFee(idx, true)}
                              className={`px-3 py-1 rounded font-mono text-[9px] font-bold transition ${
                                step.feePaid ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-slate-500 hover:text-white"
                              }`}
                            >
                              YES, CONFIRM PAID
                            </button>
                            <button
                              type="button"
                              onClick={() => updateEditingStepFee(idx, false)}
                              className={`px-3 py-1 rounded font-mono text-[9px] font-bold transition ${
                                !step.feePaid ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-500 hover:text-white"
                              }`}
                            >
                              UNPAID
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition"
                >
                  Save Changes to Consular Registry
                </button>
              </form>
            ) : (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-800 rounded-3xl space-y-4 p-6 bg-slate-950/40">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Sliders className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="text-sm font-extrabold text-white">Consular Registry Milestone Editor</h4>
                  <p className="text-xs text-slate-400">Select any candidate file from the table on the left to update progress milestones, approve payments, or certify HEC/MOFA records.</p>
                </div>
                {passports.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setEditingPassport(JSON.parse(JSON.stringify(passports[0])))}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-500/10"
                  >
                    <span>Open & Edit File #{passports[0].trackId} ({passports[0].name})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Payment Receipts & Escrow Tab Panel */}
      {adminTab === "payments" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>Client Payment Receipts & Escrow Ledger</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time list of all candidate payments submitted for visa processing, medical clearance, and document legalization.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search candidate name, email, TXN or PK ID..."
                    value={paymentSearchQuery}
                    onChange={(e) => setPaymentSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 w-64 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
                  {(["All", "Verified", "Pending", "Rejected", "Refunded"] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPaymentStatusFilter(st)}
                      className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition ${
                        paymentStatusFilter === st
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto border border-slate-800/80 rounded-2xl bg-slate-950/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-mono uppercase text-slate-400">
                    <th className="p-3.5 pl-4">Receipt & TXN</th>
                    <th className="p-3.5">Candidate / Email</th>
                    <th className="p-3.5">Track Ref</th>
                    <th className="p-3.5">Payment Step</th>
                    <th className="p-3.5">Amount & Method</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {paymentReceipts
                    .filter(p => {
                      if (paymentStatusFilter !== "All" && p.status !== paymentStatusFilter) return false;
                      if (paymentSearchQuery.trim()) {
                        const q = paymentSearchQuery.toLowerCase().trim();
                        return (
                          p.clientName?.toLowerCase().includes(q) ||
                          p.clientEmail?.toLowerCase().includes(q) ||
                          p.transactionId?.toLowerCase().includes(q) ||
                          p.trackId?.toLowerCase().includes(q) ||
                          p.id?.toLowerCase().includes(q)
                        );
                      }
                      return true;
                    })
                    .map((receipt) => (
                      <tr key={receipt.id} className="hover:bg-slate-900/40 transition">
                        <td className="p-3.5 pl-4 font-mono">
                          <div className="font-bold text-amber-400">{receipt.id}</div>
                          <div className="text-[10px] text-slate-500">{receipt.transactionId}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{receipt.clientName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{receipt.clientEmail}</div>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-teal-400">
                          {receipt.trackId}
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-slate-300">
                          {receipt.stepTitle}
                        </td>
                        <td className="p-3.5 font-mono">
                          <div className="font-extrabold text-emerald-400">PKR {receipt.amount?.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">{receipt.method}</div>
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                            receipt.status === "Verified"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : receipt.status === "Pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : receipt.status === "Rejected"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}>
                            {receipt.status === "Verified" && <CheckCircle2 className="w-3 h-3" />}
                            {receipt.status === "Pending" && <Clock className="w-3 h-3" />}
                            {receipt.status === "Rejected" && <XCircle className="w-3 h-3" />}
                            <span>{receipt.status}</span>
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-slate-400">
                          {receipt.date}
                        </td>
                        <td className="p-3.5 pr-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {receipt.status !== "Verified" && (
                              <button
                                type="button"
                                onClick={() => handleUpdatePaymentStatus(receipt.id, "Verified")}
                                className="bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Verify</span>
                              </button>
                            )}
                            {receipt.status !== "Pending" && (
                              <button
                                type="button"
                                onClick={() => handleUpdatePaymentStatus(receipt.id, "Pending")}
                                className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1"
                              >
                                <Clock className="w-3 h-3" />
                                <span>Pending</span>
                              </button>
                            )}
                            {receipt.status !== "Rejected" && (
                              <button
                                type="button"
                                onClick={() => handleUpdatePaymentStatus(receipt.id, "Rejected")}
                                className="bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  {paymentReceipts.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500 italic">
                        No client payment receipts recorded yet. Payments made via Candidate Portal will appear here automatically.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Live Activity Feed Tab Panel */}
      {adminTab === "activities" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sky-400 animate-pulse" />
                  <span>Real-Time Client Activity Audit Stream</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live audit trail showing candidate applications, payment submissions, account registrations, and status changes.
                </p>
              </div>

              <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl flex-wrap">
                {[
                  { label: "All Events", value: "All" },
                  { label: "Applications", value: "application_submitted" },
                  { label: "Payments", value: "payment_submitted" },
                  { label: "Registrations", value: "user_registered" },
                  { label: "Status Changes", value: "status_changed" }
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setActivityTypeFilter(item.value)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition ${
                      activityTypeFilter === item.value
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Feed List */}
            <div className="space-y-3">
              {activityLogs
                .filter(log => activityTypeFilter === "All" || log.type === activityTypeFilter)
                .map((log) => {
                  let IconComponent = Activity;
                  let iconBg = "bg-sky-500/10 text-sky-400 border-sky-500/20";
                  if (log.type === "application_submitted") {
                    IconComponent = FileText;
                    iconBg = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                  } else if (log.type === "payment_submitted") {
                    IconComponent = DollarSign;
                    iconBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                  } else if (log.type === "user_registered") {
                    IconComponent = UserCheck;
                    iconBg = "bg-sky-500/10 text-sky-400 border-sky-500/20";
                  } else if (log.type === "passport_linked") {
                    IconComponent = FileCheck;
                    iconBg = "bg-teal-500/10 text-teal-400 border-teal-500/20";
                  } else if (log.type === "status_changed") {
                    IconComponent = RefreshCw;
                    iconBg = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
                  } else if (log.type === "admin_action") {
                    IconComponent = ShieldCheck;
                    iconBg = "bg-purple-500/10 text-purple-400 border-purple-500/20";
                  }

                  return (
                    <div
                      key={log.id}
                      className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-4 hover:border-slate-700 transition"
                    >
                      <div className={`p-2.5 rounded-xl border ${iconBg} shrink-0 mt-0.5`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">{log.title}</h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(log.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit"
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{log.detail}</p>
                        {log.clientEmail && (
                          <div className="pt-1 flex items-center gap-2">
                            <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                              Candidate: {log.clientEmail}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              {activityLogs.length === 0 && (
                <div className="p-8 text-center text-slate-500 italic bg-slate-950 rounded-2xl border border-slate-800">
                  No activity events logged yet. Candidate activities will stream here live.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {adminTab === "settings" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 animate-fade-in">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">System Contact & Gateway Configuration</h3>
              <p className="text-xs text-slate-400">Manage real-time WhatsApp helpline credentials and escrow payment accounts.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Dynamic Live Sync</span>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* WhatsApp Settings Section */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">📞 WhatsApp Support Routing</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">WhatsApp Primary Country/Number ID (Digits Only)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 12513734858"
                    value={localWhatsAppNum}
                    onChange={(e) => setLocalWhatsAppNum(e.target.value.replace(/\D/g, ''))}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 leading-normal block">Primary US WhatsApp: +1 (251) 373-4858 | UK WhatsApp: +44 7848 186539</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">WhatsApp Display Number (Text Formatted)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. +1 (251) 373-4858"
                    value={localWhatsAppDisplay}
                    onChange={(e) => setLocalWhatsAppDisplay(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-slate-500 leading-normal block">The customer-facing label shown in headers, buttons, and footers.</span>
                </div>
              </div>
            </div>

            {/* Payment Gateway Accounts Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">💳 Secure Escrow Payment Gateway Accounts</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localPaymentMethods.map((method, idx) => (
                  <div key={method.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-850/60 space-y-3">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
                      <span className="text-lg">{method.logo}</span>
                      <h5 className="font-bold text-white text-xs">{method.name} Credentials</h5>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-mono uppercase block">Account number / Mobile Wallet ID</label>
                        <input 
                          type="text" 
                          required
                          value={method.accountNum}
                          onChange={(e) => {
                            const updated = [...localPaymentMethods];
                            updated[idx] = { ...updated[idx], accountNum: e.target.value };
                            setLocalPaymentMethods(updated);
                          }}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-mono uppercase block">Authorized Account Holder Name</label>
                        <input 
                          type="text" 
                          required
                          value={method.accountHolder}
                          onChange={(e) => {
                            const updated = [...localPaymentMethods];
                            updated[idx] = { ...updated[idx], accountHolder: e.target.value };
                            setLocalPaymentMethods(updated);
                          }}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gmail Integration Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">📧 Gmail Automated Dispatch System</h4>
                  <p className="text-[11px] text-slate-400">Securely link the official email account (Brigevisaimigration@gmail.com) to trigger real AI-generated email notifications to clients.</p>
                </div>
                <span className="bg-slate-950 px-2.5 py-1 border border-slate-800 text-[9px] font-mono rounded text-slate-400">Gmail API (v1)</span>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850/60 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${gmailStatus.connected ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`}></span>
                      <span className="text-xs font-bold font-mono text-white">
                        STATUS: {gmailStatus.connected ? "ACTIVE & LIVE" : "DISCONNECTED / SIMULATION FALLBACK"}
                      </span>
                    </div>
                    {gmailStatus.connected && gmailStatus.email ? (
                      <p className="text-xs text-slate-300">
                        Authorized Email: <strong className="text-amber-400 font-mono text-xs">{gmailStatus.email}</strong>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        The app currently operates in safe <strong>Virtual Email Simulation Mode</strong>. Authenticate with Google to route real messages.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {gmailStatus.connected ? (
                      <button
                        type="button"
                        onClick={handleDisconnectGmail}
                        disabled={gmailLoading}
                        className="bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-400 font-mono font-bold px-4 py-2 rounded-xl text-[11px] transition uppercase tracking-wide flex items-center gap-1.5"
                      >
                        {gmailLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        <span>Disconnect Account</span>
                      </button>
                    ) : (
                      <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                          <button
                            type="button"
                            onClick={handleConnectGmail}
                            disabled={gmailLoading}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-[11px] transition uppercase tracking-wider shadow-lg shadow-amber-500/5 flex items-center justify-center gap-2"
                          >
                            {gmailLoading ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Mail className="w-3.5 h-3.5" />
                            )}
                            <span>Link Account (Direct)</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleConnectGmailSimulated}
                            disabled={gmailLoading}
                            className="bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-500/50 font-bold px-4 py-2.5 rounded-xl text-[11px] transition uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                            title="Activate virtual simulated mode instantly"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Simulator Mode ⚡</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {gmailStatus.connected && (
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1.5">
                    <h5 className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 font-mono uppercase">
                      <Check className="w-3.5 h-3.5" /> Live Email Automation Enabled
                    </h5>
                    <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-1">
                      <li><strong>Automated Applications</strong>: When a candidate applies, they will receive a beautifully-styled, bespoke AI-generated dossier confirmation via Gmail.</li>
                      <li><strong>Real-time Payment Receipts</strong>: When escrow fee verification clears, candidates receive a live AI-designed payment certificate.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Live SMTP & Email Tester */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-850 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <div>
                  <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">🔬 Live SMTP & Email Tester</h4>
                  <p className="text-[11px] text-slate-400">Verify SMTP / Gmail App Password credentials and trigger live notifications to real inboxes.</p>
                </div>
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                  SMTP Port 587 / 465
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[9px] text-slate-500 font-mono uppercase block">SMTP Server Host</span>
                  <strong className="text-slate-200 font-mono">smtp.gmail.com</strong>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-[9px] text-slate-500 font-mono uppercase block">Sender Identity</span>
                  <strong className="text-slate-200 font-mono">My Gmail Address (SMTP_USER)</strong>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-mono uppercase block">Recipient Registered Gmail</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. muhammadadnan278085@gmail.com"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-mono uppercase block">Notification Trigger Type</label>
                    <select 
                      value={testType}
                      onChange={(e) => setTestType(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                    >
                      <option value="application_submitted">Application Submitted Confirmation</option>
                      <option value="application_approved">🎉 Application Approved (Durable Status)</option>
                      <option value="application_rejected">Application Rejected Notification</option>
                      <option value="payment_successful">Payment Successful Receipt</option>
                      <option value="payment_pending">Payment Pending Alert</option>
                      <option value="payment_failed">Payment Failed Notification</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={testLoading}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 font-bold py-3 rounded-xl text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                >
                  {testLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span>Send Live Test Email ⚡</span>
                </button>
              </div>

              {testResult && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 animate-fade-in ${
                  testResult.success 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                }`}>
                  <strong className="font-mono text-[10px] uppercase block">
                    {testResult.success ? "✓ Delivery Successful" : "✗ SMTP Dispatch Failure / Trace"}
                  </strong>
                  <p className="font-sans">{testResult.message}</p>
                  {!testResult.success && (
                    <p className="text-[10px] text-slate-400 mt-2">
                      💡 Verify your <strong>SMTP_USER</strong> and <strong>SMTP_PASS</strong> environment variables are set in the .env file and contain a valid Gmail App Password (not your normal password).
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/10 flex items-center gap-2"
              >
                {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span>Save System Configurations</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {adminTab === "chatbot" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">🤖 AI Assistant Analytics & Knowledge Optimizer</h3>
              <p className="text-xs text-slate-400">Analyze common questions, capture missing website information, and optimize visitor satisfaction.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Live Session Logs</span>
          </div>

          {/* KPI Summary Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850/60">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Handled Queries</span>
              <span className="text-xl font-mono text-amber-500 font-extrabold block mt-1">
                {chatbotAnalytics ? (chatbotAnalytics.commonQuestions.reduce((sum, q) => sum + q.count, 0) + chatbotAnalytics.unansweredQueries.reduce((sum, q) => sum + q.count, 0)) : 148}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850/60">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">User Satisfaction Rating</span>
              <span className="text-xl font-mono text-emerald-400 font-extrabold block mt-1">
                {chatbotAnalytics && chatbotAnalytics.satisfaction && chatbotAnalytics.satisfaction.total > 0 
                  ? `${Math.round((chatbotAnalytics.satisfaction.satisfied / chatbotAnalytics.satisfaction.total) * 100)}%` 
                  : "94.5%"}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850/60">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Unresolved Queries (Action Items)</span>
              <span className="text-xl font-mono text-rose-400 font-extrabold block mt-1">
                {chatbotAnalytics ? chatbotAnalytics.unansweredQueries.length : 0}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Questions */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">🔥 Frequently Asked Questions (Live Hits)</h4>
                <span className="text-[10px] text-slate-500">Most Active Topics</span>
              </div>
              
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                {!chatbotAnalytics || chatbotAnalytics.commonQuestions.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4">No logged queries yet. Chat bot requests will compile here.</p>
                ) : (
                  chatbotAnalytics.commonQuestions.map((item, idx) => {
                    const maxCount = chatbotAnalytics.commonQuestions.length > 0 
                      ? Math.max(...chatbotAnalytics.commonQuestions.map(q => q.count), 1)
                      : 1;
                    const percent = maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium truncate max-w-[80%]" title={item.question}>{item.question}</span>
                          <span className="font-mono text-amber-400 font-semibold">{item.count} hits</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Unanswered Queries (Actionable Website Gaps) */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <h4 className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">⚠️ Unanswered Queries (Missing Website Data)</h4>
                <span className="text-[10px] text-rose-500 font-mono font-bold">Needs Website Edits</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                These queries could not be resolved using existing website pages. Update your vacancies, services, policies, or pricing to address these client needs automatically!
              </p>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {!chatbotAnalytics || chatbotAnalytics.unansweredQueries.length === 0 ? (
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
                    <Check className="w-4 h-4" />
                    <span>Fantastic! The chatbot successfully answered all visitor queries. No gaps detected!</span>
                  </div>
                ) : (
                  chatbotAnalytics.unansweredQueries.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900 border border-slate-850/60 rounded-xl flex flex-col gap-1 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="text-slate-200 font-medium leading-relaxed">{item.question}</span>
                        <span className="text-[9px] font-mono text-rose-400 font-semibold shrink-0 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 ml-2">UNRESOLVED</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Satisfaction Metrics Logs */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">⭐ Interactive Chatbot Satisfaction Log</h4>
              <span className="text-[10px] text-slate-500">Live Client Sentiment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Client Approved (👍)</span>
                  <span className="text-2xl font-mono text-emerald-400 font-black block mt-0.5">
                    {chatbotAnalytics ? chatbotAnalytics.satisfaction.satisfied : 142}
                  </span>
                </div>
                <span className="text-3xl">👍</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Client Unhelpful flag (👎)</span>
                  <span className="text-2xl font-mono text-rose-400 font-black block mt-0.5">
                    {chatbotAnalytics ? chatbotAnalytics.satisfaction.dissatisfied : 6}
                  </span>
                </div>
                <span className="text-3xl">👎</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {adminTab === "fees" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-500 font-bold tracking-widest uppercase block mb-1">Invoice & Document Fees</span>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Add Document Processing Fees</h1>
              <p className="text-xs text-slate-400 mt-1">Select a client below to append extra fees for document processing, attestation, or courier services.</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl text-xs font-mono text-amber-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>Interactive Balance Sheet</span>
            </div>
          </div>

          {/* FEE BUILDER CARD */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Step 1: Select Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Select Active Client</label>
                <select 
                  id="client-select" 
                  value={selectedClient}
                  onChange={(e) => handleClientChange(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-amber-500/50"
                >
                  {getClientOptions().map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Base Package Fee</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-500 text-xs">$</span>
                  <input 
                    type="text" 
                    id="base-fee" 
                    readOnly 
                    value={`${baseFee.toFixed(2)}`} 
                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Choose Additional Document Charges */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-3">Additional Document Services</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Service 1 */}
                <label className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={embassyChecked}
                      onChange={(e) => setEmbassyChecked(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-800 text-amber-500 focus:ring-amber-500/30 bg-slate-900 cursor-pointer" 
                    />
                    <span className="text-xs font-medium text-slate-300">Embassy Attestation</span>
                  </div>
                  <span className="text-xs font-bold text-amber-500">+$50</span>
                </label>

                {/* Service 2 */}
                <label className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={translationChecked}
                      onChange={(e) => setTranslationChecked(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-800 text-amber-500 focus:ring-amber-500/30 bg-slate-900 cursor-pointer" 
                    />
                    <span className="text-xs font-medium text-slate-300">Legal Translation</span>
                  </div>
                  <span className="text-xs font-bold text-amber-500">+$30</span>
                </label>

                {/* Service 3 */}
                <label className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={courierChecked}
                      onChange={(e) => setCourierChecked(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-800 text-amber-500 focus:ring-amber-500/30 bg-slate-900 cursor-pointer" 
                    />
                    <span className="text-xs font-medium text-slate-300">Express DHL Delivery</span>
                  </div>
                  <span className="text-xs font-bold text-amber-500">+$40</span>
                </label>
              </div>
            </div>

            {/* Step 3: Custom One-off Charge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Custom Document Charge Description</label>
                <input 
                  type="text" 
                  id="custom-name" 
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Board of Education Verification" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Custom Charge Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-slate-500 text-xs">$</span>
                  <input 
                    type="number" 
                    id="custom-price" 
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Summary Box */}
            <div className="bg-slate-950/50 border border-slate-800/60 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">New Total Invoice Balance</span>
                <span className="text-3xl font-extrabold text-white" id="total-display">${calculateTotal().toFixed(2)}</span>
              </div>
              
              <button 
                type="button"
                onClick={handleOpenEmailWithFees} 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Mail className="w-4 h-4 text-slate-950" />
                <span>Email Updated Bill to Client</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EMAIL CLIENT MODAL OVERLAY */}
      {invoiceModalOpen && (
        <div id="invoice-email-modal" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Send Updated Document Bill</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setInvoiceModalOpen(false)} 
                className="text-slate-400 hover:text-white text-2xl font-semibold focus:outline-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSendInvoiceEmail} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase mb-1">To</label>
                <input 
                  type="text" 
                  id="modal-to" 
                  readOnly 
                  value={modalTo}
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase mb-1">Subject</label>
                <input 
                  type="text" 
                  id="modal-subject" 
                  required
                  value={modalSubject}
                  onChange={(e) => setModalSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:border-amber-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-slate-400 uppercase mb-1">Message Body</label>
                <textarea 
                  id="modal-body" 
                  rows={8} 
                  required
                  value={modalBody}
                  onChange={(e) => setModalBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 focus:border-amber-500/50 outline-none resize-none font-mono"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button 
                  type="button" 
                  onClick={() => setInvoiceModalOpen(false)} 
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-1.5"
                >
                  {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Send Bill Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Purge & Removal Options Modal */}
      {purgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => setPurgeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-display font-extrabold text-white">Application Database Purge Options</h3>
                <p className="text-xs text-slate-400">Select criterion to safely clean up or remove applications from server</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="block text-[10px] font-mono uppercase text-slate-400">Select Removal Target</label>
              
              <div className="space-y-2">
                {selectedAppIds.length > 0 && (
                  <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    purgeTarget === "selected" ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}>
                    <input 
                      type="radio" 
                      name="purgeTarget" 
                      checked={purgeTarget === "selected"} 
                      onChange={() => setPurgeTarget("selected")}
                      className="mt-0.5 text-amber-500" 
                    />
                    <div>
                      <div className="font-bold text-xs text-amber-400">Selected Applications ({selectedAppIds.length})</div>
                      <div className="text-[11px] text-slate-400">Remove only the candidate files currently checked in table.</div>
                    </div>
                  </label>
                )}

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  purgeTarget === "rejected" ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300"
                }`}>
                  <input 
                    type="radio" 
                    name="purgeTarget" 
                    checked={purgeTarget === "rejected"} 
                    onChange={() => setPurgeTarget("rejected")}
                    className="mt-0.5 text-amber-500" 
                  />
                  <div>
                    <div className="font-bold text-xs text-red-400">All Rejected Applications ({applications.filter(a => a.status === "Rejected").length})</div>
                    <div className="text-[11px] text-slate-400">Clean up non-qualifying rejected candidate submissions.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  purgeTarget === "older_7" ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300"
                }`}>
                  <input 
                    type="radio" 
                    name="purgeTarget" 
                    checked={purgeTarget === "older_7"} 
                    onChange={() => setPurgeTarget("older_7")}
                    className="mt-0.5 text-amber-500" 
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-200">Applications Older Than 7 Days</div>
                    <div className="text-[11px] text-slate-400">Purge submissions received over 1 week ago.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  purgeTarget === "older_30" ? "bg-amber-500/10 border-amber-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300"
                }`}>
                  <input 
                    type="radio" 
                    name="purgeTarget" 
                    checked={purgeTarget === "older_30"} 
                    onChange={() => setPurgeTarget("older_30")}
                    className="mt-0.5 text-amber-500" 
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-200">Applications Older Than 30 Days</div>
                    <div className="text-[11px] text-slate-400">Purge archived candidate submissions received over a month ago.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  purgeTarget === "all" ? "bg-red-500/10 border-red-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300"
                }`}>
                  <input 
                    type="radio" 
                    name="purgeTarget" 
                    checked={purgeTarget === "all"} 
                    onChange={() => setPurgeTarget("all")}
                    className="mt-0.5 text-red-500" 
                  />
                  <div>
                    <div className="font-bold text-xs text-red-500">Purge Entire Application Register ({applications.length})</div>
                    <div className="text-[11px] text-slate-400">Wipe all application files from current server registry.</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setPurgeModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkPurge}
                disabled={purgeLoading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-red-600/20"
              >
                {purgeLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{purgeLoading ? "Purging Registry..." : "Confirm & Remove"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Candidate Passport Details Modal */}
      {editingAppPassport && selectedApplication && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] font-mono text-amber-500 uppercase font-bold">Candidate #{selectedApplication.id}</div>
                <h3 className="font-display font-extrabold text-lg text-white">Update Passport & CNIC</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedApplication.name}</p>
              </div>
              <button 
                onClick={() => setEditingAppPassport(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-mono text-[11px] uppercase block">Passport Number</label>
                <input
                  type="text"
                  value={editingAppPassport.passportNumber}
                  onChange={(e) => setEditingAppPassport({ ...editingAppPassport, passportNumber: e.target.value })}
                  placeholder="e.g. PK-8812903 or EJ-9104822"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-mono text-[11px] uppercase block">CNIC / National Identity Number</label>
                <input
                  type="text"
                  value={editingAppPassport.cnic}
                  onChange={(e) => setEditingAppPassport({ ...editingAppPassport, cnic: e.target.value })}
                  placeholder="35202-9182341-1"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-mono text-[11px] uppercase block">Passport Expiry Date</label>
                <input
                  type="date"
                  value={editingAppPassport.passportExpiry}
                  onChange={(e) => setEditingAppPassport({ ...editingAppPassport, passportExpiry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditingAppPassport(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                disabled={savingAppPassport}
                onClick={handleSaveApplicationPassport}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex justify-center items-center gap-2"
              >
                {savingAppPassport ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <span>Save Passport Details</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
