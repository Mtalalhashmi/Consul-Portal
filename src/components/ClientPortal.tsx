import React, { useState, useEffect } from "react";
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  LogOut, 
  FileText, 
  Activity, 
  RefreshCw, 
  UserCheck, 
  CreditCard, 
  DollarSign, 
  Key, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle,
  Clock,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Home,
  KeyRound,
  Trash2,
  Settings,
  ShieldAlert,
  Edit3,
  Camera,
  Check
} from "lucide-react";
import { PassportTrack } from "../types";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  profile_photo?: string;
  email_verified: boolean;
  role: string;
  status: string;
  passportNum?: string;
  trackId?: string;
}

interface ClientPortalProps {
  whatsAppNum: string;
  paymentMethods: any[];
}

export default function ClientPortal({ whatsAppNum, paymentMethods }: ClientPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Auth Form State
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passportNum, setPassportNum] = useState("");
  const [trackId, setTrackId] = useState("");

  // Forgot Password flow state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState<"request" | "verify">("request");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotConfirmPass, setForgotConfirmPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // Email Verification code state
  const [emailVerifyCode, setEmailVerifyCode] = useState("");
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);
  
  // Dashboard Status States
  const [dashboardTab, setDashboardTab] = useState<"overview" | "tracker" | "applications" | "emails" | "profile">("overview");
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [linkedPassport, setLinkedPassport] = useState<PassportTrack | null>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  // Profile management state
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Change password under profile tab state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassLoading, setChangePassLoading] = useState(false);
  
  // Local States for Operations
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Link Passport form state inside dashboard
  const [inputTrackId, setInputTrackId] = useState("");
  const [linkingLoading, setLinkingLoading] = useState(false);

  // Pay Step index & info
  const [payStepIdx, setPayStepIdx] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [walletName, setWalletName] = useState("");
  const [payingState, setPayingState] = useState(false);

  // Premium/VIP Upgrade state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMethod, setUpgradeMethod] = useState("");
  const [upgradeNumber, setUpgradeNumber] = useState("");
  const [upgradeName, setUpgradeName] = useState("");
  const [upgradingState, setUpgradingState] = useState(false);

  // Load user session from localStorage if it exists
  useEffect(() => {
    const savedUser = localStorage.getItem("consul_client_session");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse client session");
      }
    }
  }, []);

  // Whenever user changes or logs in, fetch their live applications, linked passport and virtual mailbox
  useEffect(() => {
    if (user && isLoggedIn) {
      fetchApplications();
      fetchEmails();
      if (user.trackId) {
        fetchPassportDetails(user.trackId);
      } else {
        setLinkedPassport(null);
      }
    }
  }, [user, isLoggedIn]);

  // Synchronize profile details when user loads
  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
      setProfilePhone(user.phone || "");
      setProfileAddress(user.address || "");
      setProfilePhoto(user.profile_photo || "");
    }
  }, [user]);

  // Auto-select the first email when loaded
  useEffect(() => {
    if (emails.length > 0) {
      setSelectedEmail(emails[0]);
    } else {
      setSelectedEmail(null);
    }
  }, [emails]);

  const fetchEmails = async () => {
    if (!user) return;
    setEmailsLoading(true);
    try {
      const res = await fetch(`/api/emails?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setEmails(data);
      }
    } catch (err) {
      console.error("Failed to load virtual emails:", err);
    } finally {
      setEmailsLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/auth/applications?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setUserApplications(data);
      }
    } catch (err) {
      console.error("Could not fetch user applications:", err);
    }
  };

  const fetchPassportDetails = async (trackCode: string) => {
    try {
      const res = await fetch(`/api/passport/track?trackId=${encodeURIComponent(trackCode)}`);
      if (res.ok) {
        const data = await res.json();
        setLinkedPassport(data);
      }
    } catch (err) {
      console.error("Failed to fetch passport details:", err);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (authTab === "signup") {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match!");
        setLoading(false);
        return;
      }
      
      // Validate password strength client-side to guide user
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      
      if (password.length < 8 || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
        setErrorMsg("Password must be at least 8 characters and contain uppercase, lowercase, numeric, and special characters.");
        setLoading(false);
        return;
      }
    }

    const endpoint = authTab === "login" ? "/api/auth/login" : "/api/auth/signup";
    const bodyObj = authTab === "login" 
      ? { email, password } 
      : { name, email, phone, password, passportNum, trackId };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj)
      });
      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem("consul_client_session", JSON.stringify(data.user));
          localStorage.setItem("consul_remember_me", "true");
        } else {
          localStorage.setItem("consul_client_session", JSON.stringify(data.user));
          localStorage.removeItem("consul_remember_me");
        }
        setUser(data.user);
        setIsLoggedIn(true);
        
        if (authTab === "signup") {
          setSuccessMsg("Congratulations! Your account has been registered. Please check your inbox (Virtual Mail Inbox) for the verification code.");
        } else {
          setSuccessMsg("Welcome back! Login successful.");
        }
        
        // Reset secret password inputs
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMsg(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err) {
      setErrorMsg("Connection error to server gateway.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !emailVerifyCode) return;
    setEmailVerifyLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, code: emailVerifyCode })
      });
      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, email_verified: true };
        localStorage.setItem("consul_client_session", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMsg("Your email address has been successfully verified! All features are unlocked.");
        setEmailVerifyCode("");
      } else {
        setErrorMsg(data.error || "Verification failed. Please check the code.");
      }
    } catch (err) {
      setErrorMsg("Connection error while verifying email.");
    } finally {
      setEmailVerifyLoading(false);
    }
  };

  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await response.json();

      if (response.ok) {
        setForgotStep("verify");
        setSuccessMsg("Reset OTP has been sent. Please check your inbox (Virtual Mail Inbox) and enter the code below.");
      } else {
        setErrorMsg(data.error || "Failed to trigger password reset process.");
      }
    } catch (err) {
      setErrorMsg("Connection error while initiating reset.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotOtp || !forgotNewPass) return;
    if (forgotNewPass !== forgotConfirmPass) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setForgotLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, code: forgotOtp, password: forgotNewPass })
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Your password has been successfully reset! You can now log in with your new password.");
        setShowForgotPassword(false);
        setForgotStep("request");
        setForgotEmail("");
        setForgotOtp("");
        setForgotNewPass("");
        setForgotConfirmPass("");
        setAuthTab("login");
      } else {
        setErrorMsg(data.error || "Failed to reset password. Please verify the OTP code.");
      }
    } catch (err) {
      setErrorMsg("Connection error during password reset.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: profileName,
          phone: profilePhone,
          address: profileAddress,
          profile_photo: profilePhoto
        })
      });
      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem("consul_client_session", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMsg("Profile information updated successfully!");
      } else {
        setErrorMsg(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setErrorMsg("Connection error while updating profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("New passwords do not match!");
      return;
    }

    setChangePassLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          oldPassword,
          newPassword
        })
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setErrorMsg(data.error || "Failed to change password.");
      }
    } catch (err) {
      setErrorMsg("Connection error while changing password.");
    } finally {
      setChangePassLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (!window.confirm("Are you absolutely sure you want to permanently delete your candidate account? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/auth/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email })
      });

      if (response.ok) {
        alert("Your account has been deleted successfully.");
        handleLogout();
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Failed to delete account.");
      }
    } catch (err) {
      setErrorMsg("Connection error while deleting account.");
    }
  };

  const handleLinkPassport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !inputTrackId) return;
    setLinkingLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/auth/link-passport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          trackId: inputTrackId
        })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("consul_client_session", JSON.stringify(data.user));
        setUser(data.user);
        setLinkedPassport(data.passport);
        setSuccessMsg(`Successfully linked Tracking ID: ${inputTrackId.toUpperCase()} to your account!`);
        setInputTrackId("");
      } else {
        setErrorMsg(data.error || "Could not link this Tracking ID. Please ensure it is valid.");
      }
    } catch (err) {
      setErrorMsg("Gateway connection error.");
    } finally {
      setLinkingLoading(false);
    }
  };

  const handleStepPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.trackId || payStepIdx === null || !selectedMethod) return;
    setPayingState(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/passport/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: user.trackId,
          stepIndex: payStepIdx,
          method: selectedMethod,
          accountNumber: walletNumber,
          accountName: walletName,
          email: user.email
        })
      });
      const data = await response.json();

      if (response.ok) {
        setLinkedPassport(data.passport);
        fetchEmails();
        setSuccessMsg(data.message || "Payment processed successfully!");
        setPayStepIdx(null);
        setSelectedMethod("");
        setWalletNumber("");
        setWalletName("");
      } else {
        setErrorMsg(data.error || "Payment processing failed.");
      }
    } catch (err) {
      setErrorMsg("Server transaction error.");
    } finally {
      setPayingState(false);
    }
  };

  const handleUpgradePremium = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.trackId || !upgradeMethod) return;
    setUpgradingState(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/passport/upgrade-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: user.trackId,
          method: upgradeMethod,
          accountNumber: upgradeNumber,
          accountName: upgradeName,
          email: user.email
        })
      });
      const data = await response.json();

      if (response.ok) {
        setLinkedPassport(data.passport);
        fetchEmails();
        setSuccessMsg(data.message || "Upgraded to VIP Express Stamping successfully!");
        setShowUpgradeModal(false);
        setUpgradeMethod("");
        setUpgradeNumber("");
        setUpgradeName("");
      } else {
        setErrorMsg(data.error || "Upgrade transaction failed.");
      }
    } catch (err) {
      setErrorMsg("Server transaction error.");
    } finally {
      setUpgradingState(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("consul_client_session");
    setUser(null);
    setIsLoggedIn(false);
    setLinkedPassport(null);
    setUserApplications([]);
    setSuccessMsg("Logged out successfully. Security session cleared.");
    setErrorMsg("");
  };

  return (
    <div id="client-auth-portal" className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Alert Banner for Actions */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs sm:text-sm animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="font-semibold">{successMsg}</span>
          <button onClick={() => setSuccessMsg("")} className="ml-auto text-emerald-500 hover:text-emerald-300">✕</button>
        </div>
      )}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-rose-400 text-xs sm:text-sm animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span className="font-semibold">{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="ml-auto text-rose-500 hover:text-rose-300">✕</button>
        </div>
      )}

      {/* ----------------- GUEST / LOGIN & REGISTER STATE ----------------- */}
      {!isLoggedIn ? (
        <div className="grid md:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
          
          {/* Promo Infographic Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider block">Candidate Access Gateway</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                Track and Manage Your Overseas Dream Process
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Welcome to the premium escrow-backed immigration and labor gateway. Create a secure client account to unlock real-time status updates, check review comments, and pay verified milestone fees directly.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-850">
                <span className="text-lg bg-amber-500/10 p-2 rounded-xl text-amber-500 h-10 w-10 flex items-center justify-center font-bold">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Pre-seeded Test Profiles Available</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Enter email <strong className="text-amber-400 font-mono">adnan@gmail.com</strong> or <strong className="text-amber-400 font-mono">ali@yahoo.com</strong> with password <strong className="text-amber-400 font-mono">password123</strong> to experience fully pre-populated dashboards!
                  </p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-850">
                <span className="text-lg bg-emerald-500/10 p-2 rounded-xl text-emerald-400 h-10 w-10 flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Linked Tracking Codes</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Link physical passports directly so you don't have to look up the ID manually on every session.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-850">
                <span className="text-lg bg-blue-500/10 p-2 rounded-xl text-blue-400 h-10 w-10 flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Secure Escrow Milestone Slips</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Settle medical checkup, bio-metrics, or document legalization charges locally using standard e-wallets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Interactive Card */}
          {showForgotPassword ? (
            <div className="md:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider block">Security Desk</span>
                <h3 className="text-xl font-display font-extrabold text-white">Reset Account Password</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Recover your account security credentials securely using your virtual SMTP mailbox verification code.
                </p>
              </div>

              {forgotStep === "request" ? (
                <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required 
                        placeholder="e.g. test@gmail.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setShowForgotPassword(false); setErrorMsg(""); setSuccessMsg(""); }}
                      className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 py-3 rounded-xl text-xs font-bold border border-slate-800 transition"
                    >
                      Back to Sign In
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                    >
                      {forgotLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                      <span>Send Verification Code</span>
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleForgotPasswordReset} className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 text-slate-300 space-y-1 shadow-md shadow-amber-500/2">
                    <p className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      📧 RESET OTP TRANSMITTED
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      Check your <strong className="text-amber-400">Virtual Mail Inbox</strong> tab or your external inbox if SMTP credentials are configured to fetch the 6-digit verification code.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">6-Digit Verification OTP Code</label>
                    <input 
                      type="text" 
                      required 
                      maxLength={6}
                      placeholder="e.g. 123456"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-center text-sm font-bold tracking-widest text-amber-400 w-full focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">New Secure Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="Min 8 characters"
                        value={forgotNewPass}
                        onChange={(e) => setForgotNewPass(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Confirm New Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="Re-enter to confirm"
                        value={forgotConfirmPass}
                        onChange={(e) => setForgotConfirmPass(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotStep("request")}
                      className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-300 py-3 rounded-xl text-xs font-bold border border-slate-800 transition"
                    >
                      Resend OTP Code
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                    >
                      {forgotLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                      <span>Save New Password</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="md:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-6">
              
              {/* Form tab selector */}
              <div className="flex gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setAuthTab("login")}
                  className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition ${
                    authTab === "login"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/5 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sign In to Account
                </button>
                <button
                  onClick={() => setAuthTab("signup")}
                  className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition ${
                    authTab === "signup"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/5 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Register Candidate Profile
                </button>
              </div>

              {/* Main Form element */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                
                {authTab === "login" && (
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 text-slate-300 space-y-1.5 shadow-lg shadow-amber-500/2">
                    <p className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                      💡 Connected ConsulPortal Mailbox
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      Sign in with <strong className="font-mono text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">bridgevisaimigration@gmail.com</strong> and password <strong className="font-mono text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">password123</strong> to access the linked candidate tracker, virtual inbox, and milestone escrow system.
                    </p>
                  </div>
                )}
                
                {authTab === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Full Applicant Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Muhammad Adnan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required 
                        placeholder="e.g. test@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Phone / Mobile No</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required={authTab === "signup"}
                        placeholder="e.g. 0345-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {authTab === "signup" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Choose Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="password" 
                          required 
                          placeholder="Min 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="password" 
                          required 
                          placeholder="Confirm Choose Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Secret Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="password" 
                        required 
                        placeholder="Enter account password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                {authTab === "signup" && password && (
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-850 text-[11px] space-y-1.5">
                    <p className="font-bold text-slate-400 uppercase font-mono tracking-wider text-[9px]">Password Strength Requirements</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={password.length >= 8 ? "text-emerald-400 font-bold" : "text-slate-600"}>
                          {password.length >= 8 ? "✓" : "○"}
                        </span>
                        <span className={password.length >= 8 ? "text-slate-300" : "text-slate-500"}>Min 8 characters</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={/[A-Z]/.test(password) ? "text-emerald-400 font-bold" : "text-slate-600"}>
                          {/[A-Z]/.test(password) ? "✓" : "○"}
                        </span>
                        <span className={/[A-Z]/.test(password) ? "text-slate-300" : "text-slate-500"}>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={/[a-z]/.test(password) ? "text-emerald-400 font-bold" : "text-slate-600"}>
                          {/[a-z]/.test(password) ? "✓" : "○"}
                        </span>
                        <span className={/[a-z]/.test(password) ? "text-slate-300" : "text-slate-500"}>One lowercase letter</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={/[0-9]/.test(password) ? "text-emerald-400 font-bold" : "text-slate-600"}>
                          {/[0-9]/.test(password) ? "✓" : "○"}
                        </span>
                        <span className={/[0-9]/.test(password) ? "text-slate-300" : "text-slate-500"}>One numeric digit</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-400 font-bold" : "text-slate-600"}>
                          {/[^A-Za-z0-9]/.test(password) ? "✓" : "○"}
                        </span>
                        <span className={/[^A-Za-z0-9]/.test(password) ? "text-slate-300" : "text-slate-500"}>One special character</span>
                      </div>
                    </div>
                  </div>
                )}

                {authTab === "signup" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Passport Number (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. EJ8421094"
                        value={passportNum}
                        onChange={(e) => setPassportNum(e.target.value.toUpperCase())}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Active Tracking ID (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. PK-78601"
                        value={trackId}
                        onChange={(e) => setTrackId(e.target.value.toUpperCase())}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500 focus:ring-opacity-50 h-4 w-4"
                    />
                    <span>Remember Me on this device</span>
                  </label>

                  {authTab === "login" && (
                    <button
                      type="button"
                      onClick={() => { setShowForgotPassword(true); setErrorMsg(""); setSuccessMsg(""); }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                  <span>{authTab === "login" ? "Verify Session & Access Portal" : "Establish Secure Account Profile"}</span>
                </button>

              </form>

              <div className="pt-4 border-t border-slate-900/60 text-center text-[11px] text-slate-500">
                <p>All sessions are secured via standard cryptographic hashing equivalence. By proceeding, you agree to the verified escrow framework rules.</p>
              </div>

            </div>
          )}

        </div>
      ) : (
        
        // ----------------- AUTHORIZED / LOGGED IN CLIENT DASHBOARD -----------------
        <div className="space-y-6">
          
          {/* Dashboard Header Bar */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {user?.profile_photo ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                  <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl font-bold font-display shadow-inner">
                  {user?.name.substring(0, 2).toUpperCase() || "CP"}
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-display font-extrabold text-white">{user?.name}</h3>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">Verified Profile</span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-3">
                  <span>📧 {user?.email}</span>
                  <span>•</span>
                  <span>📞 {user?.phone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={fetchApplications}
                className="bg-slate-950/80 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all w-full justify-center md:w-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/10 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all w-full justify-center md:w-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Secure Log Out</span>
              </button>
            </div>
          </div>

          {/* Quick tab controls */}
          <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setDashboardTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                dashboardTab === "overview" 
                  ? "bg-amber-500 text-slate-950 font-bold" 
                  : "bg-slate-950/50 text-slate-400 hover:text-white border border-slate-850/40"
              }`}
            >
              💼 Client Account Overview
            </button>
            <button
              onClick={() => setDashboardTab("tracker")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                dashboardTab === "tracker" 
                  ? "bg-amber-500 text-slate-950 font-bold" 
                  : "bg-slate-950/50 text-slate-400 hover:text-white border border-slate-850/40"
              }`}
            >
              🍁 Linked Passport Milestones
              {linkedPassport && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </button>
            <button
              onClick={() => setDashboardTab("applications")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                dashboardTab === "applications" 
                  ? "bg-amber-500 text-slate-950 font-bold" 
                  : "bg-slate-950/50 text-slate-400 hover:text-white border border-slate-850/40"
              }`}
            >
              📑 Application Log history
              <span className="bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.5 rounded-lg text-amber-400 font-mono">
                {userApplications.length}
              </span>
            </button>
            <button
              onClick={() => setDashboardTab("emails")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                dashboardTab === "emails" 
                  ? "bg-amber-500 text-slate-950 font-bold" 
                  : "bg-slate-950/50 text-slate-400 hover:text-white border border-slate-850/40"
              }`}
            >
              📬 Virtual Mail Inbox
              <span className="bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.5 rounded-lg text-amber-400 font-mono">
                {emails.length}
              </span>
            </button>
            <button
              onClick={() => setDashboardTab("profile")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                dashboardTab === "profile" 
                  ? "bg-amber-500 text-slate-950 font-bold" 
                  : "bg-slate-950/50 text-slate-400 hover:text-white border border-slate-850/40"
              }`}
            >
              👤 Profile & Security
            </button>
          </div>

          {/* Email Verification Guard */}
          {user?.email_verified === false && dashboardTab !== "emails" ? (
            <div className="bg-slate-950/60 border border-slate-850 p-6 sm:p-10 rounded-3xl space-y-6 text-center max-w-xl mx-auto my-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mx-auto">
                ✉
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-display font-extrabold text-white">Email Address Verification Required</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your candidate profile is currently locked. To access overview, payments, and document tracking, please verify your email address <strong>{user.email}</strong>.
                </p>
                <div className="text-[11px] text-slate-500 bg-slate-900/60 border border-slate-850 p-3 rounded-2xl max-w-sm mx-auto text-left space-y-1">
                  <p className="font-bold text-amber-400">💡 Local Sandbox Email Simulator:</p>
                  <p>1. Click the <button onClick={() => setDashboardTab("emails")} className="text-amber-400 font-bold hover:underline">Virtual Mail Inbox</button> tab at the top of this dashboard.</p>
                  <p>2. Locate and copy the 6-digit verification code from your registration email.</p>
                  <p>3. Return here or any other tab to type the code and unlock your portal!</p>
                </div>
              </div>

              <form onSubmit={handleVerifyEmailCode} className="space-y-4 max-w-xs mx-auto">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] text-slate-400 uppercase font-mono block text-center">6-Digit Verification Code</label>
                  <input 
                    type="text" 
                    required 
                    maxLength={6}
                    placeholder="e.g. 123456"
                    value={emailVerifyCode}
                    onChange={(e) => setEmailVerifyCode(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-center text-sm font-bold tracking-widest text-amber-400 w-full focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={emailVerifyLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                >
                  {emailVerifyLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  <span>Verify Email Address</span>
                </button>
              </form>
            </div>
          ) : (
            <>

          {/* TAB 1: OVERVIEW PANEL */}
          {dashboardTab === "overview" && (
            <div className="grid md:grid-cols-12 gap-6 items-start">
              
              {/* Left summary column */}
              <div className="md:col-span-7 space-y-6">
                
                <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-900">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h4 className="font-display font-extrabold text-sm text-white">ConsulPortal Escrow Safeguards</h4>
                  </div>
                  
                  <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
                    <p>
                      Your account represents a legally audited portal with immediate escrow processing. Any payments you initiate will go to verified escrow-backed partner bank accounts to safeguard against visa scams.
                    </p>
                    <p>
                      If you've submitted a passport physical dossier in our offices, you can link the generated Tracking ID code to have live 24/7 access to physical transit steps and biometric schedules.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-850/60">
                      <span className="text-[10px] text-slate-500 font-mono block">LINKED PASSPORT</span>
                      <strong className="text-white text-xs font-mono">{user?.passportNum || "None Registered"}</strong>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-850/60">
                      <span className="text-[10px] text-slate-500 font-mono block">ACTIVE TRACKING ID</span>
                      <strong className="text-amber-400 text-xs font-mono">{user?.trackId || "Unlinked"}</strong>
                    </div>
                  </div>
                </div>

                {/* Direct links to Government verification portals */}
                <div className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border border-amber-500/10 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-white">Government Portal Integrations</h4>
                      <p className="text-[10px] text-slate-400">Audit your visa parameters directly on foreign government systems below.</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Once our status states that the visa has been submitted, you can use our built-in <a href="#immigration-verification-desk" className="text-amber-400 hover:underline font-bold">Immigration Verification Desk</a> tool at the bottom of the page to launch genuine MoFA KSA, GDRFA Dubai, or Canada IRCC tracking links.
                  </p>
                </div>

              </div>

              {/* Right column: Linking tracker if not linked */}
              <div className="md:col-span-5 space-y-6">
                
                {!user?.trackId ? (
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-sm text-white">Link Your Passport Tracking Code</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Have a slip with tracking ID starting with PK? (e.g., PK-78601, PK-92144, PK-44289). Enter it here to synchronize database files instantly.
                      </p>
                    </div>

                    <form onSubmit={handleLinkPassport} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-mono uppercase block">Enter tracking ID code</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. PK-78601"
                          value={inputTrackId}
                          onChange={(e) => setInputTrackId(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono uppercase"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={linkingLoading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        {linkingLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
                        <span>Synchronize File</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-slate-950/80 p-6 rounded-3xl border border-slate-850/80 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> 
                        <span>Passport File Linked</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{user.trackId}</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Destination:</span>
                        <strong className="text-white">{linkedPassport?.country || "Processing"}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Visa Class:</span>
                        <strong className="text-slate-300">{linkedPassport?.category || "Processing"}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Steps Status:</span>
                        <strong className="text-amber-400">
                          {linkedPassport?.steps.filter(s => s.status === "completed").length} of 3 Milestones Cleared
                        </strong>
                      </div>
                    </div>

                    <button 
                      onClick={() => setDashboardTab("tracker")}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white py-2.5 rounded-xl border border-slate-800 text-xs font-semibold transition flex items-center justify-center gap-1"
                    >
                      <span>View Live Milestones Ledger</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Helpful quick guide */}
                <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 text-slate-400 text-[11px] leading-relaxed space-y-2">
                  <h5 className="font-bold text-white text-xs flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>How Escrow Payments Work?</span>
                  </h5>
                  <p>
                    All overseas processing fees are split into 3 clear milestone steps. You never pay the full amount upfront. Only pay when a step is verified and current.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MILESTONES TRACKER */}
          {dashboardTab === "tracker" && (
            <div className="space-y-6">
              {!user.trackId ? (
                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-4">
                  <Activity className="w-12 h-12 text-slate-600 mx-auto" />
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="text-base font-bold text-white">No Tracking ID Linked</h3>
                    <p className="text-xs text-slate-400">
                      To view live passport milestones, you need to register and link your file code in the 'Client Account Overview' tab or link a mock profile!
                    </p>
                  </div>
                  <button 
                    onClick={() => setDashboardTab("overview")}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition"
                  >
                    Link Passport Code
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-850 space-y-6">
                  
                  {/* Ledger header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">OFFICIAL DOSSIER RECORD</span>
                      <h4 className="text-lg font-display font-extrabold text-white">
                        Milestones Status Ledger ({user.trackId})
                      </h4>
                      <p className="text-xs text-slate-400">
                        Belongs to: <strong className="text-slate-300">{linkedPassport?.name}</strong> • Passport: <strong className="text-slate-300 font-mono">{linkedPassport?.passportNum}</strong>
                      </p>
                    </div>

                    <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-right">
                      <span className="text-[9px] text-slate-500 font-mono uppercase block">TOTAL ESCROW COMMITTED</span>
                      <strong className="text-amber-400 text-sm font-mono">
                        PKR {linkedPassport?.totalPaid.toLocaleString()} / {linkedPassport?.totalFee.toLocaleString()} Paid
                      </strong>
                    </div>
                  </div>

                  {/* VIP Premium Options Display */}
                  {linkedPassport?.isPremium ? (
                    <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-600/10 border border-amber-500/40 p-5 rounded-2xl space-y-3 shadow-lg shadow-amber-500/[0.02]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold text-xs leading-none shrink-0 animate-pulse">👑 VIP PREMIUM</span>
                          <div>
                            <h5 className="font-display font-extrabold text-amber-400 text-xs sm:text-sm tracking-wide uppercase">Express Consular Channel Engaged</h5>
                            <p className="text-[11px] text-slate-300">File upgraded to 14-Day Priority Stamp & Secure Dispatch Routing</p>
                          </div>
                        </div>
                        <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-3 py-1 rounded-full border border-amber-500/30 font-bold uppercase tracking-wide shrink-0 text-center sm:self-auto self-start">
                          Active VIP Client
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-amber-500/20 text-[11px]">
                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 space-y-0.5">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase">Consular Agent Hotline</span>
                          <strong className="text-slate-200">Priority 24/7 Backchannel</strong>
                        </div>
                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 space-y-0.5">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase">Visa Stamp Priority</span>
                          <strong className="text-emerald-400">Embassy Bypass Enabled</strong>
                        </div>
                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 space-y-0.5">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase">Premium Courier Link</span>
                          <strong className="text-slate-200">Secure Hand-to-Hand Delivery</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-extrabold uppercase">Optional Upgrade</span>
                            <h5 className="font-bold text-white text-xs sm:text-sm">👑 VIP Express Fast-Track Consular Stamping</h5>
                          </div>
                          <p className="text-[11px] text-slate-400 max-w-xl">
                            Accelerate your immigration stamp dispatch. Skip the standard embassy visa queue and lock in personal backchannel concierge support.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowUpgradeModal(true)}
                          className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-[11px] uppercase tracking-wider transition shrink-0 shadow-lg shadow-amber-500/10 text-center"
                        >
                          Upgrade to VIP
                        </button>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10.5px] text-slate-300">
                        <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> 14-Day Express Stamp Guarantee</li>
                        <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> Direct personal concierge hotline</li>
                        <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> Priority secure courier transit</li>
                      </ul>
                    </div>
                  )}

                  {/* Milestones Flow */}
                  <div className="space-y-6">
                    {linkedPassport?.steps.map((step, idx) => {
                      const isCompleted = step.status === "completed";
                      const isCurrent = step.status === "current";
                      const isPending = step.status === "pending";

                      return (
                        <div 
                          key={idx} 
                          className={`p-5 rounded-2xl border transition-all ${
                            isCompleted 
                              ? "bg-emerald-500/[0.02] border-emerald-500/20" 
                              : isCurrent 
                                ? "bg-amber-500/[0.03] border-amber-500/40 shadow-lg shadow-amber-500/[0.01]" 
                                : "bg-slate-900/[0.1] border-slate-850/40 opacity-60"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            
                            {/* Step Description details */}
                            <div className="flex gap-4 items-start">
                              <div className={`w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                isCompleted 
                                  ? "bg-emerald-500 text-slate-950" 
                                  : isCurrent 
                                    ? "bg-amber-500 text-slate-950 animate-pulse" 
                                    : "bg-slate-800 text-slate-400"
                              }`}>
                                {isCompleted ? "✓" : idx + 1}
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-bold text-white text-xs sm:text-sm">{step.title}</h5>
                                  
                                  {isCompleted && (
                                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold">Completed</span>
                                  )}
                                  {isCurrent && (
                                    <span className="bg-amber-500/10 text-amber-400 text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold animate-pulse">Active Now</span>
                                  )}
                                  {isPending && (
                                    <span className="bg-slate-900 text-slate-500 text-[8px] font-mono px-2 py-0.5 rounded uppercase">In Queue</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{step.desc}</p>
                              </div>
                            </div>

                            {/* Cost and Payment Button */}
                            <div className="sm:text-right shrink-0 w-full sm:w-auto pt-2 sm:pt-0 pl-12 sm:pl-0 border-t sm:border-t-0 border-slate-900 flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2">
                              <div className="space-y-0.5">
                                <span className="text-[9px] text-slate-500 font-mono uppercase block">MILESTONE FEE</span>
                                <strong className="text-slate-300 text-xs font-mono">PKR {step.fee.toLocaleString()}</strong>
                              </div>

                              {step.feePaid ? (
                                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Paid / Settled</span>
                                </div>
                              ) : isCurrent ? (
                                <button 
                                  onClick={() => {
                                    setPayStepIdx(idx);
                                    // Prepopulate some default helper payment details
                                    setSelectedMethod("easypaisa");
                                  }}
                                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-all"
                                >
                                  Settle Milestone
                                </button>
                              ) : (
                                <span className="text-[10px] font-mono text-slate-500 italic block">Locked (Awaiting Steps)</span>
                              )}
                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Overlay Form */}
                  {payStepIdx !== null && (
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                        <div>
                          <h5 className="font-bold text-white text-xs">Escrow Gateway Instant Deposit</h5>
                          <p className="text-[10px] text-slate-400">Step: {linkedPassport?.steps[payStepIdx].title}</p>
                        </div>
                        <button onClick={() => setPayStepIdx(null)} className="text-slate-400 hover:text-white text-xs">✕ Close</button>
                      </div>

                      <form onSubmit={handleStepPayment} className="space-y-4">
                        
                        {/* Select method */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase block">Select local escrow partner account:</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {paymentMethods.map((method) => (
                              <div 
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                                  selectedMethod === method.id 
                                    ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold scale-102" 
                                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <span className="text-base block mb-0.5">{method.logo}</span>
                                <span className="text-[9px] block font-bold leading-none">{method.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment Credentials display */}
                        {selectedMethod && (
                          (() => {
                            const activeMethod = paymentMethods.find(m => m.id === selectedMethod);
                            return activeMethod ? (
                              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60 text-xs space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                  <span>{activeMethod.logo}</span>
                                  <strong className="text-slate-200 font-bold text-xs">Official Partner Details:</strong>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 leading-normal">
                                  <p>Account Holder: <strong className="text-slate-200">{activeMethod.accountHolder}</strong></p>
                                  <p>Account Number: <strong className="text-amber-400 select-all font-bold">{activeMethod.accountNum}</strong></p>
                                </div>
                                <p className="text-[9px] text-slate-500 leading-normal pt-1 italic">
                                  *Transfer exactly PKR {linkedPassport?.steps[payStepIdx].fee.toLocaleString()} to this account and complete the validation below.
                                </p>
                              </div>
                            ) : null;
                          })()
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">My Account / Wallet Number</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 0345-XXXXXXX"
                              value={walletNumber}
                              onChange={(e) => setWalletNumber(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">Account Holder Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Muhammad Adnan"
                              value={walletName}
                              onChange={(e) => setWalletName(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-1 gap-2">
                          <button 
                            type="button" 
                            onClick={() => setPayStepIdx(null)}
                            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={payingState}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
                          >
                            {payingState && <RefreshCw className="w-3 h-3 animate-spin" />}
                            <span>Certify Milestone Settle</span>
                          </button>
                        </div>

                      </form>
                    </div>
                  )}

                  {/* VIP Upgrade Overlay Form */}
                  {showUpgradeModal && (
                    <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/20 space-y-4 animate-fade-in mt-4">
                      <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                        <div>
                          <h5 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                            <span>👑 VIP Fast-Track Consular Registration</span>
                          </h5>
                          <p className="text-[10px] text-slate-400">Upgrade file: {user.trackId} • Immediate Processing</p>
                        </div>
                        <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-white text-xs">✕ Close</button>
                      </div>

                      <form onSubmit={handleUpgradePremium} className="space-y-4">
                        
                        {/* Select method */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-500 uppercase block">Select local escrow partner account for VIP payment:</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {paymentMethods.map((method) => (
                              <div 
                                key={method.id}
                                onClick={() => setUpgradeMethod(method.id)}
                                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                                  upgradeMethod === method.id 
                                    ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold scale-102" 
                                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <span className="text-base block mb-0.5">{method.logo}</span>
                                <span className="text-[9px] block font-bold leading-none">{method.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment Credentials display */}
                        {upgradeMethod && (
                          (() => {
                            const activeMethod = paymentMethods.find(m => m.id === upgradeMethod);
                            return activeMethod ? (
                              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 text-xs space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                  <span>{activeMethod.logo}</span>
                                  <strong className="text-slate-200 font-bold text-xs">Official Partner Details:</strong>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 leading-normal">
                                  <p>Account Holder: <strong className="text-slate-200">{activeMethod.accountHolder}</strong></p>
                                  <p>Account Number: <strong className="text-amber-400 select-all font-bold">{activeMethod.accountNum}</strong></p>
                                </div>
                                <p className="text-[9px] text-slate-500 leading-normal pt-1 italic">
                                  *Transfer exactly PKR 35,000 as the VIP upgrade fee to this account and fill out validation below.
                                </p>
                              </div>
                            ) : null;
                          })()
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">My Account / Wallet Number</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 0345-XXXXXXX"
                              value={upgradeNumber}
                              onChange={(e) => setUpgradeNumber(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">Account Holder Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Muhammad Adnan"
                              value={upgradeName}
                              onChange={(e) => setUpgradeName(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-1 gap-2">
                          <button 
                            type="button" 
                            onClick={() => setShowUpgradeModal(false)}
                            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={upgradingState}
                            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
                          >
                            {upgradingState && <RefreshCw className="w-3 h-3 animate-spin" />}
                            <span>Submit VIP Upgrade Settle</span>
                          </button>
                        </div>

                      </form>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* TAB 4: VIRTUAL EMAIL INBOX */}
          {dashboardTab === "emails" && (
            <div id="virtual-email-inbox" className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-850 space-y-6">
              <div className="pb-3 border-b border-slate-900 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h4 className="font-display font-extrabold text-sm text-white">ConsulPortal Secure Mailbox</h4>
                  <p className="text-xs text-slate-400">View real-time email notifications, payment receipts, and visa dossiers sent to <strong className="text-slate-300 font-mono">{user?.email}</strong></p>
                </div>
                <button
                  type="button"
                  onClick={fetchEmails}
                  disabled={emailsLoading}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-mono font-bold px-3.5 py-2 rounded-xl text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${emailsLoading ? "animate-spin" : ""}`} />
                  <span>Refresh Mailbox</span>
                </button>
              </div>

              {emailsLoading && emails.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">Synchronizing live mailbox server...</p>
                </div>
              ) : emails.length === 0 ? (
                <div className="text-center py-16 space-y-4 bg-slate-900/10 border border-dashed border-slate-850 rounded-2xl">
                  <Mail className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                  <p className="text-xs text-slate-400 font-bold">Your secure mailbox is empty</p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Once you submit a job application or make an escrow payment, you will receive real-time, automated verification emails here from support@consulportal.com.
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left Mail list panel */}
                  <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {emails.map((mail) => (
                      <button
                        key={mail.id}
                        type="button"
                        onClick={() => setSelectedEmail(mail)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex flex-col gap-1.5 focus:outline-none ${
                          selectedEmail?.id === mail.id
                            ? "bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-500/5"
                            : "bg-slate-900/40 hover:bg-slate-900/80 border-slate-850 text-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 w-full">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                            mail.type === "payment" 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}>
                            {mail.type === "payment" ? "💳 Payment Receipt" : "📑 Job Submission"}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(mail.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold truncate text-white w-full">{mail.subject}</h5>
                        <div className="text-[10px] text-slate-400 font-mono">
                          <span>From: </span>
                          <span className="text-amber-500 font-semibold">{mail.from}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed w-full">
                          {mail.body.startsWith("<") ? mail.body.replace(/<[^>]*>/g, "").trim().slice(0, 150) : mail.body}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Right Active Mail Reader panel */}
                  <div className="lg:col-span-7 bg-slate-900/25 border border-slate-850 rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
                    {selectedEmail ? (
                      <div className="space-y-4">
                        <div className="pb-3 border-b border-slate-850 space-y-3">
                          <div className="flex justify-between items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-mono border text-amber-500 px-3 py-1 rounded-xl uppercase font-black ${
                              selectedEmail.type === "payment"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            }`}>
                              Verified {selectedEmail.type}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {new Date(selectedEmail.date).toLocaleString()}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug font-display tracking-tight">
                            {selectedEmail.subject}
                          </h3>
                          <div className="flex flex-col gap-1 text-xs text-slate-400 font-mono bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
                            <div className="flex justify-between">
                              <span>From: <strong className="text-amber-500">{selectedEmail.from}</strong></span>
                              <span className="text-slate-600 text-[10px]">SMTP: TLS Secure</span>
                            </div>
                            <span>To: <strong className="text-slate-300">{selectedEmail.to}</strong></span>
                          </div>
                        </div>

                        {/* Beautifully stylized email body */}
                        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950 p-5 rounded-2xl border border-slate-900 max-h-[450px] overflow-y-auto shadow-inner">
                          {selectedEmail.body.startsWith("<") ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
                          ) : (
                            <div className="whitespace-pre-wrap">{selectedEmail.body}</div>
                          )}
                        </div>

                        <div className="pt-3 flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900/60">
                          <span className="flex items-center gap-1">🔒 End-to-End Cryptographic Escrow Dispatch</span>
                          <span>REF: {selectedEmail.id}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center py-20 text-center space-y-3">
                        <Mail className="w-12 h-12 text-slate-800 animate-pulse" />
                        <p className="text-xs text-slate-400 max-w-xs">Select an email notification from the left list to review the full verified message.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: APPLICATIONS LOG HISTORY */}
          {dashboardTab === "applications" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-850 space-y-6">
              <div className="pb-3 border-b border-slate-900">
                <h4 className="font-display font-extrabold text-sm text-white">Your Job Applications Archive</h4>
                <p className="text-xs text-slate-400">Manage, review, and monitor active applications matching email: <strong className="text-slate-300 font-mono">{user?.email}</strong></p>
              </div>

              {userApplications.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">You haven't submitted any job vacancy applications under this account yet.</p>
                  <p className="text-[10px] text-slate-500">Go to 'Overseas Vacancies' tab to browse open roles and click 'Apply Now' using email: <strong className="text-slate-400 font-mono">{user?.email}</strong>!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userApplications.map((app) => (
                    <div key={app.id} className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-800 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-mono text-[10px] font-bold">[{app.id}]</span>
                          <h5 className="font-bold text-white text-xs sm:text-sm">{app.vacancyTitle}</h5>
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-3">
                          <span>📍 Country: <strong className="text-slate-300">{app.country}</strong></span>
                          <span>•</span>
                          <span>📅 Applied on: <strong className="text-slate-300">{app.date}</strong></span>
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {app.status === "Approved" && (
                          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Approved / Stamped
                          </span>
                        )}
                        {app.status === "Rejected" && (
                          <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                            ✕ Rejected / Closed
                          </span>
                        )}
                        {app.status === "Pending" && (
                          <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1 animate-pulse">
                            <Clock className="w-3.5 h-3.5 animate-spin" /> In Review
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 5: PROFILE & SECURITY SETTINGS */}
          {dashboardTab === "profile" && (
            <div className="grid md:grid-cols-12 gap-6 items-start animate-fade-in">
              
              {/* Profile Details Card */}
              <div className="md:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-850 space-y-6">
                <div className="pb-3 border-b border-slate-900 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-white">Candidate Profile Settings</h4>
                    <p className="text-xs text-slate-400">Update your applicant metadata, mobile details and contact address.</p>
                  </div>
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                    {user?.role || "Applicant"}
                  </span>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  {/* Avatar Picker */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Choose Modern Profile Avatar</label>
                    <div className="flex flex-wrap gap-3 items-center">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                      ].map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setProfilePhoto(url)}
                          className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all relative group ${
                            profilePhoto === url ? "border-amber-500 scale-105" : "border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <img src={url} alt="Avatar option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {profilePhoto === url && (
                            <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white font-bold bg-amber-500 rounded-full p-0.5" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Applicant Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block">Mobile Phone Number</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Mobile No"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Physical Mailing Address</label>
                    <textarea 
                      rows={2}
                      placeholder="e.g. Apartment 4B, Sector F-11, Islamabad"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white w-full focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                  >
                    {profileLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              </div>

              {/* Security Controls (Password & Delete) */}
              <div className="md:col-span-5 space-y-6">
                
                {/* Change Password Card */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-850 space-y-4">
                  <div className="pb-2 border-b border-slate-900">
                    <h4 className="font-display font-extrabold text-sm text-white">Change Account Password</h4>
                    <p className="text-[10px] text-slate-400">Regularly cycle your keys to keep secure access logs.</p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-mono uppercase block">Old Secret Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="Current secret password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-mono uppercase block">New Secure Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="Min 8 characters, uppercase"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-mono uppercase block">Confirm New Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="Confirm choose password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={changePassLoading}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 py-2.5 rounded-xl border border-slate-800 text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      {changePassLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                      <span>Update Secret Key</span>
                    </button>
                  </form>
                </div>

                {/* Account Deletion Area */}
                <div className="bg-rose-500/5 p-6 rounded-3xl border border-rose-500/10 space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-xs text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      Danger Zone Operations
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Once you request account deletion, all application milestones, local caches and verification keys are instantly wiped from servers.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="w-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 font-bold py-2.5 rounded-xl border border-rose-500/20 text-xs transition"
                  >
                    Permanently Delete Account
                  </button>
                </div>

              </div>

            </div>
          )}
          </>
          )}

        </div>
      )}

    </div>
  );
}
