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
      className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-8 scroll-mt-24"
    >
      {/* Header and title matching premium brand styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Primary Placement Sectors
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Global Talent & Workforce Segments
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Check live visa placements, salaries, and welfare packages tailored for specific professional tracks.
          </p>
        </div>
        
        {/* Navigation buttons and Auto-Play status */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Active status indicator */}
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer"
            title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
          >
            <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-pulse"}`}></span>
            <span>{isPaused ? "PAUSED" : "SLIDING LIVE"}</span>
            {isPaused ? <Play className="w-3 h-3 ml-1 text-amber-400" /> : <Pause className="w-3 h-3 ml-1 text-emerald-400" />}
          </button>

          {/* Left / Right Navigation */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
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
            transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {sectors.map((sector) => (
            <div 
              key={sector.id} 
              className="shrink-0 px-3 transition-all duration-350"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="group bg-slate-950/70 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Sector Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${sector.imageUrl})` }}
                  />
                  {/* Overlay shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Title & Badge placed overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
                      {sector.stats}
                    </span>
                    <span className="bg-slate-950/90 text-white text-[10px] font-mono border border-slate-800 px-2 py-1 rounded-lg">
                      {sector.avgSalary}
                    </span>
                  </div>
                </div>

                {/* Core Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {sector.title}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-500">{sector.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed min-h-[48px]">
                      {sector.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {sector.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-slate-900 text-slate-300 border border-slate-800/60 text-[9px] font-mono px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Welfare Features check-list */}
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 space-y-2">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block">Employer Guarantees</span>
                    <div className="space-y-1.5">
                      {sector.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct CTA click */}
                  <button
                    onClick={() => onSelectSector(sector.searchTerm)}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white py-2.5 px-4 rounded-xl text-[11px] font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition cursor-pointer group-hover:border-amber-500/20"
                  >
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>Filter Active Vacancies</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? "w-6 bg-amber-500" : "w-1.5 bg-slate-800 hover:bg-slate-700"}`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
