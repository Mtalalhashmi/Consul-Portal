/**
 * Utility helper to resolve the most high-fidelity, polished, and visually appropriate
 * Unsplash image for any global job role based on its title keywords.
 */
export function getJobImageByTitle(title: string): string {
  const lowerTitle = title.toLowerCase();

  // 1. Food Packing / Food Packaging / Food Packers
  if (
    lowerTitle.includes("packing") ||
    lowerTitle.includes("packaging") ||
    lowerTitle.includes("packer") ||
    lowerTitle.includes("portioning") ||
    lowerTitle.includes("canning")
  ) {
    return "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600";
  }

  // 2. Solar / Wind / Renewable / Power Systems
  if (
    lowerTitle.includes("solar") ||
    lowerTitle.includes("wind") ||
    lowerTitle.includes("renewable") ||
    lowerTitle.includes("grid commissioning")
  ) {
    return "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600";
  }

  // 3. Nurse / Caregiver / Geriatric Care / Clinical / Medical / Healthcare
  if (
    lowerTitle.includes("nurse") ||
    lowerTitle.includes("geriatric") ||
    lowerTitle.includes("caregiver") ||
    lowerTitle.includes("ward") ||
    lowerTitle.includes("medical") ||
    lowerTitle.includes("healthcare") ||
    lowerTitle.includes("nursing") ||
    lowerTitle.includes("clinical")
  ) {
    return "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600";
  }

  // 4. Warehouse / Logistics / Forklift / Cargo / Baggage / Pallet
  if (
    lowerTitle.includes("warehouse") ||
    lowerTitle.includes("logistics") ||
    lowerTitle.includes("forklift") ||
    lowerTitle.includes("cargo") ||
    lowerTitle.includes("baggage") ||
    lowerTitle.includes("pallet") ||
    lowerTitle.includes("depot") ||
    lowerTitle.includes("distribution")
  ) {
    return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600";
  }

  // 5. Welder / Welding / Fabricator / Metalwork
  if (
    lowerTitle.includes("welder") ||
    lowerTitle.includes("welding") ||
    lowerTitle.includes("fabricator") ||
    lowerTitle.includes("metalwork")
  ) {
    return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600";
  }

  // 6. CNC / Machinist / Lathe / Milling
  if (
    lowerTitle.includes("cnc") ||
    lowerTitle.includes("machinist") ||
    lowerTitle.includes("lathe") ||
    lowerTitle.includes("milling")
  ) {
    return "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600";
  }

  // 7. Chef / Cook / Culinary / Kitchen / Dining / Cabin Crew
  if (
    lowerTitle.includes("cook") ||
    lowerTitle.includes("chef") ||
    lowerTitle.includes("culinary") ||
    lowerTitle.includes("kitchen") ||
    lowerTitle.includes("dining") ||
    lowerTitle.includes("steward") ||
    lowerTitle.includes("cabin crew")
  ) {
    return "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600";
  }

  // 8. Teacher / Instructor / IELTS / English / Educator / Kindergarten / School
  if (
    lowerTitle.includes("teacher") ||
    lowerTitle.includes("instructor") ||
    lowerTitle.includes("ielts") ||
    lowerTitle.includes("english") ||
    lowerTitle.includes("educator") ||
    lowerTitle.includes("school") ||
    lowerTitle.includes("kindergarten") ||
    lowerTitle.includes("montessori")
  ) {
    return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600";
  }

  // 9. Retail / Store / Boutique / Sales / Deputy Manager
  if (
    lowerTitle.includes("retail") ||
    lowerTitle.includes("store") ||
    lowerTitle.includes("boutique") ||
    lowerTitle.includes("sales") ||
    (lowerTitle.includes("manager") && (lowerTitle.includes("deputy") || lowerTitle.includes("retail")))
  ) {
    return "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600";
  }

  // 10. Developer / Programmer / Coder / Software / DevOps / Architect / QA / IT / Tech
  if (
    lowerTitle.includes("developer") ||
    lowerTitle.includes("programmer") ||
    lowerTitle.includes("coder") ||
    lowerTitle.includes("software") ||
    lowerTitle.includes("devops") ||
    lowerTitle.includes("architect") ||
    lowerTitle.includes("qa") ||
    lowerTitle.includes("test lead") ||
    lowerTitle.includes("it") ||
    lowerTitle.includes("tech")
  ) {
    return "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600";
  }

  // 11. Agricultural / Greenhouse / Harvester / Farming / Crop
  if (
    lowerTitle.includes("agricultural") ||
    lowerTitle.includes("greenhouse") ||
    lowerTitle.includes("harvester") ||
    lowerTitle.includes("farming") ||
    lowerTitle.includes("crop") ||
    lowerTitle.includes("cultivate")
  ) {
    return "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600";
  }

  // 12. Hotel / Guest / Cabin Crew / Room Attendant / Housekeeper / Hospitality
  if (
    lowerTitle.includes("hotel") ||
    lowerTitle.includes("guest") ||
    lowerTitle.includes("attendant") ||
    lowerTitle.includes("housekeeper") ||
    lowerTitle.includes("hospitality") ||
    lowerTitle.includes("porter") ||
    lowerTitle.includes("lounge") ||
    lowerTitle.includes("concierge")
  ) {
    return "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600";
  }

  // 13. Carpenter / Structural / Formwork / Concrete
  if (
    lowerTitle.includes("carpenter") ||
    lowerTitle.includes("shuttering") ||
    lowerTitle.includes("formwork") ||
    lowerTitle.includes("concrete")
  ) {
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600";
  }

  // 14. HVAC / Duct / Electrical Technician
  if (
    lowerTitle.includes("hvac") ||
    lowerTitle.includes("duct") ||
    lowerTitle.includes("ac") ||
    lowerTitle.includes("air conditioning")
  ) {
    return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600";
  }

  // 15. Civil / Mechanical / Pipe / Piping / Welder / Construction Engineer / Heavy / Supervisor / Laborer
  if (
    lowerTitle.includes("civil") ||
    lowerTitle.includes("mechanical") ||
    lowerTitle.includes("pipe") ||
    lowerTitle.includes("piping") ||
    lowerTitle.includes("welder") ||
    lowerTitle.includes("construction") ||
    lowerTitle.includes("laborer") ||
    lowerTitle.includes("supervisor") ||
    lowerTitle.includes("heavy")
  ) {
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600";
  }

  // Fallback
  return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600";
}
