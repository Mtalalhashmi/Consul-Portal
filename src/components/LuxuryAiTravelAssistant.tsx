import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Bot, User, Briefcase, Globe, Compass, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

interface LuxuryAiTravelAssistantProps {
  onNavigateTab: (tabName: string) => void;
}

export const LuxuryAiTravelAssistant: React.FC<LuxuryAiTravelAssistantProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string; quickActions?: string[] }[]>([
    {
      role: "assistant",
      content: "Hello! I am your Luxury Travel & Career Assistant. I can help you find jobs, explore 200+ countries, understand visa services and navigate our website using verified database records.",
      quickActions: ["Find a Job", "Search Country", "Visa Services", "Tour Packages", "Contact Support"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Find a Job":
        onNavigateTab("vacancies");
        addAssistantReply("Navigating to our Overseas Job Directory with verified vacancies across Gulf, Europe, and Schengen zones.");
        break;
      case "Search Country":
        onNavigateTab("country-picker");
        addAssistantReply("Opening our 200+ Country Explorer database. Select any country to view visa rules, capital, currency, and emergency info.");
        break;
      case "Visa Services":
        onNavigateTab("consultants");
        addAssistantReply("Directing you to our Accredited Visa Consultants desk for work permit, escrow tracking, and embassy documentation.");
        break;
      case "Tour Packages":
        onNavigateTab("flights");
        addAssistantReply("Opening Flight & Tour Reservations with exclusive Qatar Airways and Emirates flight discounts.");
        break;
      case "Contact Support":
        onNavigateTab("tracker");
        addAssistantReply("You can track your passport file status or contact our 24/7 helpdesk directly from the Passport Tracker portal.");
        break;
      default:
        handleSend(action);
        break;
    }
  };

  const addAssistantReply = (text: string) => {
    setMessages(prev => [...prev, { role: "assistant", content: text }]);
  };

  const handleSend = async (customQuery?: string) => {
    const text = (customQuery || input).trim();
    if (!text) return;

    const userMsg = { role: "user" as const, content: text };
    setMessages(prev => [...prev, userMsg]);
    if (!customQuery) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/global-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "I couldn't find verified information for that request in our live database. Please explore our main vacancies or contact our support team." }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "I couldn't find verified information for that request. Please try selecting one of the quick actions below." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-[90vw] sm:w-[420px] h-[540px] bg-[#0B0B0B] border border-[#D4AF37]/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#111111] via-[#1a170e] to-[#0B0B0B] border-b border-[#D4AF37]/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#F5D76E]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif gold-text-gradient tracking-wide">
                    AI Travel Assistant
                  </h3>
                  <p className="text-[10px] text-[#A7A7A7] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Database Guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/30 text-[#A7A7A7] hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#050505]/60">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] font-semibold rounded-br-none shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                      : "bg-[#111111] border border-[#D4AF37]/25 text-[#FFFFFF] rounded-bl-none shadow-md"
                  }`}>
                    {msg.content}
                  </div>

                  {msg.quickActions && (
                    <div className="mt-3 flex flex-wrap gap-1.5 max-w-full">
                      {msg.quickActions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleQuickAction(act)}
                          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] text-[#F5D76E] font-medium transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <span>{act}</span>
                          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/20 p-3 rounded-2xl w-max">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
                  Analyzing database information...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Toolbar */}
            <div className="p-2 bg-[#0B0B0B] border-t border-[#D4AF37]/15 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-[#A7A7A7]">
              <button onClick={() => handleQuickAction("Find a Job")} className="px-2.5 py-1 rounded-lg bg-[#111111] hover:text-[#F5D76E] border border-[#D4AF37]/20 cursor-pointer whitespace-nowrap">
                💼 Find Jobs
              </button>
              <button onClick={() => handleQuickAction("Search Country")} className="px-2.5 py-1 rounded-lg bg-[#111111] hover:text-[#F5D76E] border border-[#D4AF37]/20 cursor-pointer whitespace-nowrap">
                🌐 Countries
              </button>
              <button onClick={() => handleQuickAction("Visa Services")} className="px-2.5 py-1 rounded-lg bg-[#111111] hover:text-[#F5D76E] border border-[#D4AF37]/20 cursor-pointer whitespace-nowrap">
                🛡️ Visas
              </button>
              <button onClick={() => handleQuickAction("Tour Packages")} className="px-2.5 py-1 rounded-lg bg-[#111111] hover:text-[#F5D76E] border border-[#D4AF37]/20 cursor-pointer whitespace-nowrap">
                ✈️ Tours
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-[#111111] border-t border-[#D4AF37]/25 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about jobs, visas, or countries..."
                className="flex-1 bg-[#050505] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-[#A7A7A7] focus:outline-none focus:border-[#F5D76E]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] hover:from-[#F5D76E] hover:to-[#D4AF37] font-bold transition cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="px-4 py-3 rounded-full bg-gradient-to-r from-[#0B0B0B] via-[#1a170e] to-[#050505] border border-[#D4AF37]/60 text-white font-semibold text-xs flex items-center gap-2.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(245,215,110,0.6)] transition cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5D76E] to-[#D4AF37] p-0.5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#050505]" />
            </div>
            <span className="gold-text-gradient font-serif font-bold text-sm tracking-wide">
              AI Travel Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
