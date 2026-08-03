import { createClient } from "@supabase/supabase-js";

function sanitizeUrl(rawUrl?: string): string {
  const defaultUrl = "https://ulnuttbknfavzckbaqzb.supabase.co";
  if (!rawUrl || typeof rawUrl !== "string") return defaultUrl;
  let cleaned = rawUrl.trim();
  if (!cleaned || cleaned === "undefined" || cleaned === "null") return defaultUrl;
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = "https://" + cleaned;
  }
  try {
    const parsed = new URL(cleaned);
    if ((parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname.includes(".")) {
      return cleaned;
    }
  } catch (e) {
    // Ignore invalid URL
  }
  return defaultUrl;
}

function sanitizeKey(rawKey?: string): string {
  const defaultKey = "sb_publishable_FD3F2UqYEhyD9Xa05MI0DA_sDwTlWaR";
  if (!rawKey || typeof rawKey !== "string") return defaultKey;
  const cleaned = rawKey.trim();
  if (!cleaned || cleaned === "undefined" || cleaned === "null" || cleaned.length < 15) return defaultKey;
  return cleaned;
}

// Supabase project configuration provided by user
export const SUPABASE_URL = sanitizeUrl((import.meta as any).env?.VITE_SUPABASE_URL);
export const SUPABASE_ANON_KEY = sanitizeKey((import.meta as any).env?.VITE_SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("applications").select("count", { count: "exact", head: true });
    if (error && error.code !== "PGRST116" && !error.message.includes("does not exist")) {
      console.warn("[Supabase] Connection test response:", error.message);
    }
    return { connected: true, url: SUPABASE_URL };
  } catch (err: any) {
    console.error("[Supabase] Connection error:", err);
    return { connected: false, error: err?.message };
  }
}
