import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, Sparkles, Laptop, Phone, Mail, 
  MessageSquare, Check, CheckCircle2, Zap, ChevronRight, ArrowRight, 
  Settings, Share2, Code2, ShieldCheck, BarChart3, Database, Users, 
  Layers, Volume2, VolumeX, Maximize2, FileCode, RefreshCw, Send
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface WebsitePreset {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  context: string;
  suggestedQuestions: string[];
}

const WEBSITE_PRESETS: WebsitePreset[] = [
  {
    id: "ecommerce",
    name: "SwiftBuy Global Shop",
    url: "https://swiftbuy-global.mock",
    icon: "🛒",
    color: "from-blue-500 to-indigo-600",
    gradient: "bg-blue-500/10 border-blue-500/30",
    description: "Multi-currency consumer retail store with strict 30-day refund rules and localized shipping bands.",
    context: `SwiftBuy Global Shop Business Profile:
- Returns: 100% full money-back guarantee within 30 days of purchase. Return shipping is completely free. Items must be returned in original box, unused and unopened.
- Shipping Rates: Domestic Express is $4.99 (1-2 days). International Saver is $9.99 (5-8 days to Schengen/Europe countries, including Germany and Poland). Free shipping on orders above $150.
- Customer Support: Operating 24/7. High support volumes are fully deflected by our AI, routing complicated custom invoices or disputes to human specialists immediately.`,
    suggestedQuestions: [
      "What is your refund policy?",
      "How much is international shipping to Germany?",
      "Do you ship orders above $150 for free?"
    ]
  },
  {
    id: "saas",
    name: "CloudVortex Systems",
    url: "https://cloudvortex-systems.mock",
    icon: "⚡",
    color: "from-purple-500 to-pink-600",
    gradient: "bg-purple-500/10 border-purple-500/30",
    description: "Developer-first Cloud VPS, orchestration pipeline hosting, and microservices server architecture.",
    context: `CloudVortex Systems SaaS Information:
- Subscriptions & Plans:
  1. Starter Plan ($19/month): Ideal for hobbyists. Includes 10 active server containers, 2 vCPUs, and 5GB storage.
  2. Pro Plan ($49/month): For fast-growing teams. Unlimited containers, 8 vCPUs, 100GB fast SSD, and complete API credentials.
  3. Enterprise (Custom quote): High SLA, dedicated physical nodes, 24/7 phone helpline.
- Free Trial: 14 days full access. Cancel, upgrade or downgrade anytime without charges.
- APIs & SDKs: Supports REST, Webhooks, and gRPC with native packages in TypeScript/Node, Python, and Go.`,
    suggestedQuestions: [
      "What are your subscription plans?",
      "Is there a free trial option available?",
      "Do you support developer API integration?"
    ]
  },
  {
    id: "immigration",
    name: "Bridge Visa Migration",
    url: "https://bridgevisamigration.mock",
    icon: "✈️",
    color: "from-amber-500 to-yellow-600",
    gradient: "bg-amber-500/10 border-amber-500/30",
    description: "Escrow-backed secure visa and international labor recruitment agency for Gulf and Schengen territories.",
    context: `Bridge Visa Migration Support Portal Context:
- European Schengen Visas: Document verification, attestation, biometrics prep, and visa stamping. Takes 3-6 months. Guaranteed direct status updates.
- Gulf GCC Countries: Direct employment placement in Saudi Arabia, UAE, and Qatar. Processing takes 4-6 weeks with zero advance agent fees.
- Milestone Escrow System: Total fee divided into secure milestones. Clients pay via JazzCash, EasyPaisa, NayaPay, or bank transfers.
- VIP Express Premium Upgrade: Guarantees 14-day express stamping bypass and 24/7 personal direct backchannel consul support. Costs PKR 35,000.`,
    suggestedQuestions: [
      "How does the secure milestone payment work?",
      "What is included in the VIP Express Premium upgrade?",
      "How long does the Schengen visa processing take?"
    ]
  },
  {
    id: "medical",
    name: "PrimeCare Health Center",
    url: "https://primecare-health.mock",
    icon: "🏥",
    color: "from-emerald-500 to-teal-600",
    gradient: "bg-emerald-500/10 border-emerald-500/30",
    description: "Multispecialty family medical clinic, pediatric diagnostics, urgent care, and physical therapy networks.",
    context: `PrimeCare Health Center Patient Directory:
- Scheduling: Active patients can book, modify, or cancel check-ups 24/7 via the smart assistant. Immediate SMS confirmation is dispatched.
- Accepted Insurance Networks: BlueCross BlueShield, Aetna, Cigna, Humana, and UnitedHealthcare. Direct co-pay verification.
- Emergency Guidance: In life-threatening emergencies, dial 911 immediately. Urgent care clinic is open daily from 8:00 AM to 10:00 PM.`,
    suggestedQuestions: [
      "How can I book an appointment?",
      "What insurance networks do you accept?",
      "What are the urgent care opening hours?"
    ]
  }
];

interface ShowcaseVideoScene {
  id: number;
  title: string;
  subtitle: string;
  platform: "Web Widget" | "WhatsApp Business" | "Email Auto-Pilot" | "Slack Integration";
  description: string;
  durationMs: number;
  userPrompt: string;
  botReply: string;
  highlightMetric: string;
}

const SHOWCASE_SCENES: ShowcaseVideoScene[] = [
  {
    id: 1,
    title: "1. Seamless Web Support Widget",
    subtitle: "Contextual on-page customer intelligence",
    platform: "Web Widget",
    description: "The AI agent instantly monitors active page elements, reading product inventories and return windows to resolve complex customer questions right in their browser session.",
    durationMs: 7000,
    userPrompt: "I am based in Hamburg, Germany. How much is the shipping cost for an order of $180, and can I return it if it doesn't fit?",
    botReply: "Excellent news! Because your order is over $150, shipping to Germany is completely FREE. If it doesn't fit, you can return it within 30 days for a full refund with free return shipping!",
    highlightMetric: "Deflection Rate: 82% ⚡"
  },
  {
    id: 2,
    title: "2. Instant WhatsApp Business Channel",
    subtitle: "Conversational mobile automation",
    platform: "WhatsApp Business",
    description: "Integrating with the WhatsApp API, the chatbot answers mobile clients on-the-go, querying secure backend APIs to fetch database order statuses or scheduling requests instantaneously.",
    durationMs: 8000,
    userPrompt: "Hi, can you check if my premium upgrade payment is verified for tracking ID PK-78601?",
    botReply: "Hello! Yes, our escrow system has verified your PKR 35,000 premium upgrade payment. Your files are now fast-tracked to the 14-day express embassy channel!",
    highlightMetric: "Response Speed: <1.2s 📱"
  },
  {
    id: 3,
    title: "3. Auto-Pilot Email Response Draft",
    subtitle: "Staff assistance & automated triage",
    platform: "Email Auto-Pilot",
    description: "When complex client requests hit the inbox, the AI automatically analyzes sentiment, queries internal knowledge documents, drafts a precise email reply, and alerts agents for final review.",
    durationMs: 9000,
    userPrompt: "Dear Support, I am an engineer from Lahore and need a Schengen employment sponsor. I have registered my dossier. What is my next milestone step?",
    botReply: "Hi Muhammad, thank you for reaching out. Based on your profile, your Document Verification (Milestone 1) is cleared! Your next step is Embassy Biometrics Booking. Let's schedule it.",
    highlightMetric: "Staff Hours Saved: 15h/wk ✉️"
  },
  {
    id: 4,
    title: "4. Internal Team Slack Notifications",
    subtitle: "Empowering collaborative operations",
    platform: "Slack Integration",
    description: "Keeps internal operations fully synced. When a high-value ticket is registered, an automated VIP upgrade occurs, or human intervention is required, the AI alerts team channels directly with context.",
    durationMs: 6500,
    userPrompt: "Notify sales channel: VIP Stamping upgrade submitted by Adnan (Track: PK-92144).",
    botReply: "🚨 [VIP UPGRADE ALERT] Client Muhammad Adnan has submitted a VIP Consular Upgrade for PK-92144. Secure dispatch courier route pre-allocated. Team lead notified.",
    highlightMetric: "Team Alignment: 100% 👥"
  }
];

export function AiShowcasePortal() {
  // Navigation / Tab state within Showcase
  const [activePreset, setActivePreset] = useState<WebsitePreset>(WEBSITE_PRESETS[0]);
  
  // Custom Playground chat
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! I am the integrated AI support agent for SwiftBuy Global Shop. Ask me anything about our 30-day refund policy, worldwide shipping, or discount tiers!" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  
  // Showcase Simulator (Cinematic Video Player) State
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0); // percentage 0 - 100
  const [simulatedTyping, setSimulatedTyping] = useState("");
  const [simulatedState, setSimulatedState] = useState<"idle" | "typing_prompt" | "thinking" | "typing_reply" | "done">("idle");
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  
  // Custom widget configuration form
  const [widgetBrand, setWidgetBrand] = useState("My Brand Support");
  const [widgetColor, setWidgetColor] = useState("#f59e0b");
  const [widgetGreeting, setWidgetGreeting] = useState("Assalam-o-Alaikum! How can we assist you today?");
  const [customKnowledge, setCustomKnowledge] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Stats Counters (Simulated Increment)
  const [totalQueries, setTotalQueries] = useState(14240);
  const [deflectedCount, setDeflectedCount] = useState(11676);

  // Soundwave bars
  const [soundBars, setSoundBars] = useState<number[]>([12, 24, 8, 30, 15, 28, 6, 20, 10, 25, 14, 28]);

  // Video loop & Scene switching
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      const activeScene = SHOWCASE_SCENES[currentSceneIdx];
      const stepTimeMs = activeScene.durationMs / 100;
      
      // Start scene simulation cycle
      triggerSceneAnimation(activeScene);
      
      progressInterval = setInterval(() => {
        setSceneProgress((prev) => {
          if (prev >= 100) {
            // Move to next scene
            setCurrentSceneIdx((prevIdx) => (prevIdx + 1) % SHOWCASE_SCENES.length);
            return 0;
          }
          return prev + 1;
        });
      }, stepTimeMs);
    }
    
    return () => clearInterval(progressInterval);
  }, [isPlaying, currentSceneIdx]);

  // Handle typing effect for the cinematic video simulator
  const triggerSceneAnimation = (scene: ShowcaseVideoScene) => {
    setSimulatedState("typing_prompt");
    setSimulatedTyping("");
    
    // 1. Type User Prompt
    let pCharIdx = 0;
    const promptText = scene.userPrompt;
    const promptTypingSpeed = 25; // ms per char
    
    const typePrompt = setInterval(() => {
      setSimulatedTyping((prev) => prev + promptText.charAt(pCharIdx));
      pCharIdx++;
      if (pCharIdx >= promptText.length) {
        clearInterval(typePrompt);
        setSimulatedState("thinking");
        
        // 2. Think for 1.2 seconds
        setTimeout(() => {
          setSimulatedState("typing_reply");
          setSimulatedTyping("");
          
          // 3. Type Bot Reply
          let rCharIdx = 0;
          const replyText = scene.botReply;
          const replyTypingSpeed = 15;
          
          const typeReply = setInterval(() => {
            setSimulatedTyping((prev) => prev + replyText.charAt(rCharIdx));
            rCharIdx++;
            if (rCharIdx >= replyText.length) {
              clearInterval(typeReply);
              setSimulatedState("done");
            }
          }, replyTypingSpeed);
          
        }, 1200);
      }
    }, promptTypingSpeed);
  };

  // Soundwave animation
  useEffect(() => {
    if (isPlaying && !isAudioMuted) {
      const waveInterval = setInterval(() => {
        setSoundBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 32) + 4));
      }, 150);
      return () => clearInterval(waveInterval);
    } else {
      setSoundBars([6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]);
    }
  }, [isPlaying, isAudioMuted]);

  // Periodic simulated counter increments
  useEffect(() => {
    const statInterval = setInterval(() => {
      setTotalQueries((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
      setDeflectedCount((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(statInterval);
  }, []);

  // Sync playground chat history on preset website selection
  const handlePresetSelect = (preset: WebsitePreset) => {
    setActivePreset(preset);
    setChatHistory([
      { role: "assistant", content: `Welcome to ${preset.name}! Ask me any questions about our specific profile, or use the interactive suggestion chips below!` }
    ]);
  };

  // Chat request in Playground
  const handleSendMessage = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = directText || userInput;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg: ChatMessage = { role: "user", content: textToSend };
    setChatHistory((prev) => [...prev, userMsg]);
    if (!directText) setUserInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/ai-showcase/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory.slice(-6), // Send last 6 messages
          context: activePreset.context,
          websiteId: activePreset.id
        })
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setChatHistory((prev) => [...prev, { role: "assistant", content: "I encountered a minor network error. However, my pre-loaded local knowledge indicates I am ready to help you with other queries!" }]);
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Connection offline. Please verify you are connected to the dev server or try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Custom widget code generator
  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerationSuccess(true);
    setTimeout(() => {
      setGenerationSuccess(false);
    }, 3000);
  };

  const generatedScriptSnippet = `<!-- AI Studio Support Widget Core -->
<div id="aistudio-chat-container"></div>
<script>
  window.AiStudioChatConfig = {
    brandName: "${widgetBrand}",
    themeColor: "${widgetColor}",
    greetingText: "${widgetGreeting}",
    knowledgeBaseUrl: "${customKnowledge || "Auto-Page-Scraping-Enabled"}",
    clientId: "consul-portal-showcase-1002"
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://cdn.aistudio.build/widgets/support-v3.min.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'aistudio-chat-sdk'));
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScriptSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const activeScene = SHOWCASE_SCENES[currentSceneIdx];

  return (
    <div id="ai-showcase-root" className="max-w-6xl mx-auto space-y-12 animate-fade-in text-slate-100">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 font-mono text-[10px] uppercase font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-spin duration-1000" />
            <span>Interactive Media Showcase & Simulator</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
            Cutting-Edge Chatbot <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Cross-Platform Integration</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience our responsive customer assistant in action. Watch the real-time AI showcase video demonstrating seamless integrations on multiple websites and platforms, enhancing customer satisfaction and boosting conversion with secure automation.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">Autonomous Deflection</span>
              <strong className="text-lg font-black text-white">{((deflectedCount / totalQueries) * 100).toFixed(1)}%</strong>
              <div className="text-[9.5px] text-emerald-400 font-mono">⚡ Clear Tickets Instant</div>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">Simulated Conversations</span>
              <strong className="text-lg font-black text-white">{totalQueries.toLocaleString()}</strong>
              <span className="text-[9px] text-slate-400 block font-mono">Live Counters Up</span>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">Avg. Response Time</span>
              <strong className="text-lg font-black text-amber-400">0.85s</strong>
              <span className="text-[9.5px] text-yellow-500 font-mono">👑 Gemini Flash Speed</span>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-0.5">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">CSAT Satisfaction</span>
              <strong className="text-lg font-black text-emerald-400">98.4%</strong>
              <span className="text-[9.5px] text-emerald-500 font-mono">★★★★★ (2,445+ reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Video Player Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Custom Video Player (7 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
              <span>Simulated AI Showcase Video Tour</span>
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
              Scene {currentSceneIdx + 1} of 4
            </span>
          </div>

          {/* Player Screen Canvas */}
          <div className="relative aspect-video rounded-3xl border-2 border-slate-800 bg-slate-950 overflow-hidden shadow-2xl group flex flex-col justify-between">
            
            {/* Website Mock Up Sandbox inside Player */}
            <div className="absolute inset-0 flex flex-col p-4 z-0 pointer-events-none select-none">
              
              {/* Simulated Browser Header */}
              <div className="w-full bg-slate-900/90 border border-slate-800/80 px-3.5 py-1.5 rounded-xl flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-bold text-slate-300">https://consul-portal.ai/channels/{activeScene.platform.toLowerCase().replace(" ", "-")}</span>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded text-[8px] uppercase font-black">
                  {activeScene.platform}
                </span>
              </div>

              {/* Simulated Screen Content based on scene */}
              <div className="flex-1 flex items-center justify-center p-4 relative">
                
                {/* Visual graphics overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

                <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-4 rounded-2xl space-y-3.5 shadow-xl transition-all duration-500">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        {activeScene.platform} Simulation
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400">{activeScene.highlightMetric}</span>
                  </div>

                  {/* Conversation bubbles inside video screen */}
                  <div className="space-y-3 text-[11px] leading-relaxed">
                    
                    {/* User message block */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Incoming Query:</span>
                      <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-300 flex items-start gap-2">
                        <span className="p-1 bg-slate-900 rounded text-xs leading-none">👤</span>
                        <p className="flex-1 font-mono text-slate-200">
                          {simulatedState === "typing_prompt" ? simulatedTyping : activeScene.userPrompt}
                        </p>
                      </div>
                    </div>

                    {/* Chatbot response block */}
                    {(simulatedState === "thinking" || simulatedState === "typing_reply" || simulatedState === "done") && (
                      <div className="space-y-1 animate-fade-in">
                        <span className="text-[9px] font-mono text-amber-500 uppercase block">AI Intelligent Resolve:</span>
                        <div className="bg-amber-500/5 border border-amber-500/20 p-2.5 rounded-xl text-slate-300 flex items-start gap-2">
                          <span className="p-1 bg-amber-500 text-slate-950 rounded text-[10px] font-bold leading-none">🤖</span>
                          <div className="flex-1 space-y-1">
                            {simulatedState === "thinking" ? (
                              <div className="flex items-center gap-1.5 py-1">
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                <span className="text-[9px] font-mono text-slate-500 ml-1">Analyzing page context...</span>
                              </div>
                            ) : (
                              <p className="text-slate-100 font-sans">
                                {simulatedState === "typing_reply" ? simulatedTyping : activeScene.botReply}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

            {/* Subtitles & Narration bar */}
            <div className="w-full bg-slate-950/95 border-t border-slate-900 p-4 z-10 flex flex-col gap-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-amber-400 text-[12px]">{activeScene.title}</h4>
                  <p className="text-[10px] text-slate-400">{activeScene.subtitle}</p>
                </div>
                
                {/* Voiceover Visualizer */}
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-0.5 h-4 w-16 px-1">
                    {soundBars.map((bar, i) => (
                      <div 
                        key={i} 
                        className="bg-amber-500 w-1 rounded-full transition-all duration-150" 
                        style={{ height: `${(bar / 32) * 100}%` }} 
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsAudioMuted(!isAudioMuted)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg transition"
                    title={isAudioMuted ? "Enable Simulated Narration Voice" : "Mute Simulated Narration"}
                  >
                    {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal italic bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">
                "{activeScene.description}"
              </p>
            </div>

            {/* Video Controller Bar Overlay */}
            <div className="absolute top-4 left-4 z-20 flex gap-1.5">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl border border-slate-800/80 transition flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button 
                onClick={() => {
                  setSceneProgress(0);
                  triggerSceneAnimation(activeScene);
                }}
                className="bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl border border-slate-800/80 transition flex items-center justify-center"
                title="Replay Active Scene"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 z-30">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-100 ease-linear"
                style={{ width: `${sceneProgress}%` }}
              />
            </div>

          </div>
        </div>

        {/* Right Side: Scene Select Info (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-display font-extrabold text-sm text-slate-200 uppercase tracking-wider">
            Video Scene Outline
          </h4>

          <div className="space-y-2.5">
            {SHOWCASE_SCENES.map((scene, index) => (
              <div 
                key={scene.id}
                onClick={() => {
                  setCurrentSceneIdx(index);
                  setSceneProgress(0);
                }}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                  currentSceneIdx === index 
                    ? "bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border-amber-500/40 shadow-md shadow-amber-500/[0.02]" 
                    : "bg-slate-950 border-slate-900 hover:border-slate-800 text-slate-400"
                }`}
              >
                <div className={`p-2 rounded-xl font-bold text-xs ${
                  currentSceneIdx === index ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400"
                }`}>
                  {scene.id}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h5 className={`text-xs font-bold ${currentSceneIdx === index ? "text-white" : "text-slate-300"}`}>
                      {scene.platform}
                    </h5>
                    <span className="text-[8px] font-mono uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {(scene.durationMs / 1000).toFixed(0)}s
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
                    {scene.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-900 p-4 rounded-2xl space-y-3">
            <h5 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Platform Benefits</span>
            </h5>
            <ul className="text-[10.5px] text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span><strong>No code overrides required:</strong> Works alongside existing web infrastructure via lightweight JS snippets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span><strong>Omnichannel state sync:</strong> Tracks customer conversations seamlessly across SMS, WhatsApp, and Web widget.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* 3. Live Contextual Playground Sandbox */}
      <div id="ai-playground" className="space-y-6">
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Interactive Test Area</span>
            <h2 className="text-2xl font-display font-black text-white">
              Seamless Cross-Website Support Simulator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Select one of the mock website platforms below. Observe how the active AI scraper extracts "Contextual Knowledge" on-the-fly and answers questions instantly.
            </p>
          </div>
        </div>

        {/* Website Selector Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {WEBSITE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2.5 relative overflow-hidden ${
                activePreset.id === preset.id 
                  ? "bg-slate-900/60 border-amber-500/40 shadow-lg" 
                  : "bg-slate-950/60 border-slate-900 hover:border-slate-800"
              }`}
            >
              {activePreset.id === preset.id && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 px-2 py-0.5 text-[8px] font-black uppercase rounded-bl-lg font-mono">
                  ACTIVE
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl">{preset.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${activePreset.id === preset.id ? "text-amber-400" : "text-slate-300"}`}>
                  {preset.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
                {preset.description}
              </p>
            </button>
          ))}
        </div>

        {/* Sandbox UI: Side-by-Side Context and Chat Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Active Website Scrape Context (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-500 animate-pulse" />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">AI Scraper Live Extracted Context</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase">System Prompt State</span>
              </div>
              
              <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-2.5 text-[11.5px] font-mono text-slate-300 leading-relaxed overflow-y-auto max-h-60">
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] pb-1 border-b border-slate-850">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Crawled URL: {activePreset.url}</span>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300">
                  {activePreset.context}
                </pre>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-2xl flex items-start gap-2.5 text-[10.5px] text-slate-300 leading-normal">
              <Code2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Scraper Technology:</strong> The AI extracts active page markup and layout policies in milliseconds, establishing a temporary context vector without requiring heavy database syncs.
              </p>
            </div>
          </div>

          {/* Right Panel: Active Chat Widget (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4">
            
            {/* Widget Top header */}
            <div className={`p-4 bg-gradient-to-r ${activePreset.color} rounded-2xl flex items-center justify-between shadow`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-lg shadow-inner">
                  {activePreset.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{activePreset.name}</h4>
                  <span className="text-[10px] text-white/80 font-mono">⚡ Support Agent Live</span>
                </div>
              </div>
              <div className="bg-white/10 text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                ONLINE
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-850 min-h-[180px] max-h-[240px] overflow-y-auto space-y-3 scrollbar-thin">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex gap-2.5 max-w-xl ${msg.role === "user" ? "ml-auto justify-end" : "mr-auto"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      🤖
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-amber-500 text-slate-950 rounded-tr-none font-medium" 
                      : "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex gap-2.5 mr-auto">
                  <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0 animate-pulse mt-0.5">
                    🤖
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-[11.5px] text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                    <span>AI is reading website policy...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Prompt Chips */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Instant Prompt Suggestions:</span>
              <div className="flex flex-wrap gap-2">
                {activePreset.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(undefined, q)}
                    disabled={chatLoading}
                    className="bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-amber-500/30 text-slate-300 hover:text-white rounded-xl px-3 py-1.5 text-[10px] font-mono transition text-left leading-normal block max-w-full truncate"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Ask ${activePreset.name} support something...`}
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={chatLoading || !userInput.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-950 disabled:text-slate-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

          </div>

        </div>
      </div>

      {/* 4. Chatbot Widget Configuration & Embed Generator */}
      <div className="border-t border-slate-900 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-5 space-y-4">
          <div className="pb-2 border-b border-slate-900">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-amber-500" />
              <span>Integrate It on Your Website</span>
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Customize properties and export instant deployment codes.</p>
          </div>

          <form onSubmit={handleGenerateScript} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase block">Widget Branding Name</label>
              <input 
                type="text"
                required
                value={widgetBrand}
                onChange={(e) => setWidgetBrand(e.target.value)}
                className="bg-slate-900 border border-slate-850 rounded-xl px-3.5 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase block">Primary Theme Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-850 cursor-pointer bg-transparent"
                />
                <input 
                  type="text"
                  required
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="bg-slate-900 border border-slate-850 rounded-xl px-3.5 py-1.5 text-xs text-white font-mono flex-1 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase block">Initial Agent Welcome Bubble</label>
              <input 
                type="text"
                required
                value={widgetGreeting}
                onChange={(e) => setWidgetGreeting(e.target.value)}
                className="bg-slate-900 border border-slate-850 rounded-xl px-3.5 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase block">External Knowledge Base URL (Optional)</label>
              <input 
                type="url"
                placeholder="e.g. https://yoursite.com/faq"
                value={customKnowledge}
                onChange={(e) => setCustomKnowledge(e.target.value)}
                className="bg-slate-900 border border-slate-850 rounded-xl px-3.5 py-1.5 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition shadow-md"
            >
              Update Embed Snippet ⚡
            </button>

          </form>
        </div>

        {/* Right Panel: Embed Code output (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Universal Copyable JS Snippet</h4>
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/20 text-[10px] px-3 py-1 rounded-lg font-bold transition flex items-center gap-1"
              >
                <span>{isCopied ? "✓ Copied!" : "Copy Snippet"}</span>
              </button>
            </div>

            <p className="text-[10.5px] text-slate-400">
              Paste this async code right before the closing <code className="text-slate-200 font-mono text-[9.5px] bg-slate-900 px-1 py-0.5 rounded">&lt;/body&gt;</code> tag of your website. No database installations required.
            </p>

            <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-2xl overflow-x-auto max-h-56">
              <pre className="text-[10px] text-slate-300 font-mono leading-normal whitespace-pre">
                {generatedScriptSnippet}
              </pre>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/15 p-3.5 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-[10.5px] leading-normal text-slate-300">
              <strong>Instant Live Update Sync:</strong> Modifying the brand settings or theme color updating the dashboard propagates instantly to active browser sessions without requiring snippet code replacements.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
