import React, { useState, useEffect } from "react";
import { 
  Monitor, 
  Wrench, 
  Package, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  HeartPulse, 
  Coffee, 
  ChevronLeft, 
  ChevronRight,
  Pause,
  Play
} from "lucide-react";

interface WorkforceSector {
  id: string;
  title: string;
  subtitle: string;
  searchTerm: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  tags: string[];
  stats: string;
  avgSalary: string;
  features: string[];
}

interface WorkforceSectorsProps {
  onSelectSector: (searchTerm: string) => void;
}

export default function WorkforceSectors({ onSelectSector }: WorkforceSectorsProps) {
  const sectors: WorkforceSector[] = [
    {
      id: "computer-operator",
      title: "Computer Operator & Office Admin",
      subtitle: "Bridge Visa Tech & Corporate Placements",
      searchTerm: "Computer",
      description: "Providing certified office coordinators, data entry specialists, computer operators, and technical support agents to multinational firms in Riyadh, Dubai, and Warsaw.",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600",
      icon: <Monitor className="w-5 h-5 text-amber-400" />,
      tags: ["Data Entry", "Office Assistant", "IT Operator", "Schengen & Gulf Core"],
      stats: "240+ Placements",
      avgSalary: "SAR 3,500 - 6,000 / Month",
      features: [
        "Sponsorship for HEC diploma holders",
        "Free company computer & workstation",
        "Air-conditioned office setups"
      ]
    },
    {
      id: "labour-worker",
      title: "Skilled Labor & Technical Trades",
      subtitle: "Heavy Machinery, HVAC & Construction Trades",
      searchTerm: "Technician",
      description: "Direct legal placement of high-demand industrial technicians, solar field workers, HVAC professionals, CNC operators, and civil tradesmen under Vision 2030 and EU infrastructure projects.",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
      icon: <Wrench className="w-5 h-5 text-amber-400" />,
      tags: ["Solar Installer", "HVAC Tech", "CNC Operator", "Machinery Pilot"],
      stats: "1,150+ Candidates Joined",
      avgSalary: "SAR 3,000 - 8,000 / Month",
      features: [
        "Free employer-provided standard housing",
        "Full medical coverage and yearly tickets",
        "Overtime bonuses legally guaranteed"
      ]
    },
    {
      id: "store-keeper",
      title: "Store Keeper & Warehouse Officer",
      subtitle: "Inventory, Logistics & Depot Managers",
      searchTerm: "Stores",
      description: "Supplying warehouse keepers, stock supervisors, retail logistics controllers, and inventory dispatch specialists to major logistics parks and e-commerce distribution chains.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
      icon: <Package className="w-5 h-5 text-amber-400" />,
      tags: ["Stock Supervisor", "Warehouse Pilot", "Inventory Checker", "Retail Stores"],
      stats: "650+ Active Files",
      avgSalary: "AED 3,500 - 7,500 / Month",
      features: [
        "Subsidized company meals",
        "High-tech digital handheld scanners training",
        "Direct track to store supervisor promotions"
      ]
    },
    {
      id: "healthcare-nurse",
      title: "Registered Nurse & Medical Specialist",
      subtitle: "Direct Medical Recruitment Pathways",
      searchTerm: "Nurse",
      description: "Certified placements for registered nurses, laboratory technicians, and physical care specialists in modern hospitals and clinics across Germany, Ireland, and KSA.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
      icon: <HeartPulse className="w-5 h-5 text-amber-400" />,
      tags: ["Registered Nurse", "First Aid", "ICU Tech", "Irish NHS & Germany"],
      stats: "320+ Qualified Joiners",
      avgSalary: "€2,500 - 5,500 / Month",
      features: [
        "Assistance in licensing examinations",
        "German language training integration",
        "Sponsorship visa fully managed"
      ]
    },
    {
      id: "hospitality-hotel",
      title: "Hotel Staff & Hospitality Executive",
      subtitle: "VIP Guest Care & Culinary Trades",
      searchTerm: "Hotel",
      description: "Placing front-office receptionists, professional chefs, baristas, and customer relations officers in premium international hotel chains in Dubai, Riyadh, and Sweden.",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      tags: ["Guest Relations", "Chef de Partie", "Barista Art", "Gulf & Schengen"],
      stats: "480+ Placements Completed",
      avgSalary: "AED 3,500 - 8,000 / Month",
      features: [
        "Free luxury staff accommodations",
        "On-duty premium meals provided",
        "Performance incentive bonuses"
      ]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Auto-detection of columns per screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = sectors.length - itemsPerView;

  // Fix index bounds if resized
  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, maxIndex, activeIndex]);

  // Automatic transition
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= maxIndex) {
          return 0; // go back to start
        }
        return prev + 1;
      });
    }, 2000); // cycle every 2 seconds
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section 
      id="workforce-sectors-section" 
      className="bg-[#050505] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-8 scroll-mt-24 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-6 effect-ambient-glow"
    >
      {/* Header and title matching premium brand styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-sparkle-flash" />
            Primary Placement Sectors
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-1 tracking-tight">
            Global Talent &amp; <span className="effect-shimmer-text font-serif">Workforce Segments</span>
          </h2>
          <p className="text-[#A7A7A7] text-xs sm:text-sm mt-1 font-sans">
            Check live visa placements, salaries, and welfare packages tailored for specific professional tracks.
          </p>
        </div>
        
        {/* Navigation buttons and Auto-Play status */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Active status indicator */}
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-[#181818] text-[11px] font-mono text-[#F5D76E] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer shadow effect-glow-gold"
            title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
          >
            <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-500 animate-pulse" : "bg-emerald-400 animate-ping"}`}></span>
            <span className="font-bold">{isPaused ? "PAUSED" : "SLIDING LIVE"}</span>
            {isPaused ? <Play className="w-3 h-3 ml-1 text-amber-400" /> : <Pause className="w-3 h-3 ml-1 text-emerald-400" />}
          </button>

          {/* Left / Right Navigation */}
          <div className="flex items-center gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-[#D4AF37]/30">
            <button 
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#1f1f1f] text-[#A7A7A7] hover:text-[#F5D76E] transition cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#1f1f1f] text-[#A7A7A7] hover:text-[#F5D76E] transition cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sliding Container with Hover Stop capability */}
      <div 
        className="relative overflow-hidden py-2"
      >
        <div 
          className="flex flex-nowrap transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / (itemsPerView || 1))}%)`,
          }}
        >
          {sectors.map((sector) => (
            <div 
              key={sector.id} 
              className="shrink-0 px-3 transition-all duration-350"
              style={{ width: `${100 / (itemsPerView || 1)}%` }}
            >
              <div className="group glass-gold-card rounded-2xl border border-[#D4AF37]/40 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 h-full shine-sweep-container">
                {/* Sector Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${sector.imageUrl})` }}
                  />
                  {/* Overlay shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  
                  {/* Title & Badge placed overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="bg-[#D4AF37] text-[#050505] text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
                      {sector.stats}
                    </span>
                    <span className="bg-[#050505]/90 text-[#F5D76E] text-[10px] font-mono border border-[#D4AF37]/30 px-2 py-1 rounded-lg">
                      {sector.avgSalary}
                    </span>
                  </div>
                </div>

                {/* Core Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F5D76E] transition-colors">
                          {sector.title}
                        </h3>
                        <p className="text-[10px] font-mono text-[#D4AF37]">{sector.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-[#A7A7A7] text-xs leading-relaxed min-h-[48px]">
                      {sector.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {sector.tags.map((tag, tIdx) => (
                        <span 
                          key={tag || tIdx} 
                          className="bg-[#050505] text-[#D8D8D8] border border-[#D4AF37]/20 text-[9px] font-mono px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Welfare Features check-list */}
                  <div className="bg-[#050505]/60 p-3 rounded-xl border border-[#D4AF37]/20 space-y-2">
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block font-bold">Employer Guarantees</span>
                    <div className="space-y-1.5">
                      {sector.features.map((feature, fIdx) => (
                        <div key={feature || fIdx} className="flex items-center gap-1.5 text-[10px] text-[#D8D8D8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct CTA click */}
                  <button
                    onClick={() => onSelectSector(sector.searchTerm)}
                    className="w-full bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/40 text-[#F5D76E] hover:border-[#D4AF37] py-2.5 px-4 rounded-xl text-[11px] font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Filter Active Vacancies</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators/Dots at bottom */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-[#111111] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50"}`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
