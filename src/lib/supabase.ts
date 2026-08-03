import { createClient } from "@supabase/supabase-js";

// Supabase project configuration provided by user
export const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || "https://ulnuttbknfavzckbaqzb.supabase.co";
export const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_FD3F2UqYEhyD9Xa05MI0DA_sDwTlWaR";

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
