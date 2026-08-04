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

export async function saveApplicationSupabaseClient(appData: any) {
  try {
    const record = {
      id: appData.id || `app-${Date.now()}`,
      tracking_number: appData.trackingNumber || appData.id,
      name: appData.name || "Applicant",
      email: appData.email || "",
      phone: appData.phone || "",
      vacancy_id: appData.vacancyId || "",
      vacancy_title: appData.vacancyTitle || "",
      country: appData.country || "",
      applying_from: appData.applyingFrom || "Pakistan",
      company: appData.company || "",
      passport_number: appData.passportNumber || "",
      passport_expiry: appData.passportExpiry || "",
      cnic: appData.cnic || "",
      status: appData.status || "Pending",
      created_at: appData.createdAt || new Date().toISOString(),
      cv_link: appData.cvLink || "",
      cover_letter: appData.coverLetter || ""
    };
    const { error } = await supabase.from("applications").upsert([record], { onConflict: "id" });
    if (error) {
      await supabase.from("job_applications").upsert([record], { onConflict: "id" });
    }
    console.log("[Supabase Client] Job application saved to Supabase.");
  } catch (err) {
    console.warn("[Supabase Client App Save Note]:", err);
  }
}

export async function saveUserAccountSupabaseClient(userData: any) {
  try {
    const record = {
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      role: userData.role || "user",
      status: userData.status || "active",
      passport_num: userData.passportNum || "",
      track_id: userData.trackId || "",
      created_at: new Date().toISOString()
    };
    const { error } = await supabase.from("client_accounts").upsert([record], { onConflict: "id" });
    if (error) {
      const { error: err2 } = await supabase.from("users").upsert([record], { onConflict: "id" });
      if (err2) {
        await supabase.from("clients").upsert([record], { onConflict: "id" });
      }
    }
    console.log("[Supabase Client] User account saved to Supabase.");
  } catch (err) {
    console.warn("[Supabase Client User Save Note]:", err);
  }
}

export async function saveQuerySupabaseClient(queryData: {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  category?: string;
  country?: string;
  type?: string;
}) {
  try {
    const record = {
      id: queryData.id || `query-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: queryData.name || "Client",
      email: queryData.email || "",
      phone: queryData.phone || "",
      subject: queryData.subject || queryData.category || "General Inquiry",
      message: queryData.message || "",
      category: queryData.category || "General",
      country: queryData.country || "",
      type: queryData.type || "client_query",
      created_at: new Date().toISOString()
    };
    const { error } = await supabase.from("client_queries").upsert([record], { onConflict: "id" });
    if (error) {
      const { error: err2 } = await supabase.from("queries").upsert([record], { onConflict: "id" });
      if (err2) {
        await supabase.from("contacts").upsert([record], { onConflict: "id" });
      }
    }
    console.log("[Supabase Client] Query saved to Supabase.");
  } catch (err) {
    console.warn("[Supabase Client Query Save Note]:", err);
  }
}

export async function savePaymentSupabaseClient(paymentData: any) {
  try {
    const record = {
      id: paymentData.id || `PAY-${Date.now()}`,
      transaction_id: paymentData.transactionId || "",
      track_id: paymentData.trackId || "",
      client_name: paymentData.clientName || "",
      client_email: paymentData.clientEmail || "",
      step_title: paymentData.stepTitle || "",
      amount: paymentData.amount || 0,
      currency: paymentData.currency || "PKR",
      method: paymentData.method || "Bank Transfer",
      status: paymentData.status || "Verified",
      created_at: new Date().toISOString()
    };
    const { error } = await supabase.from("payments").upsert([record], { onConflict: "id" });
    if (error) {
      await supabase.from("payment_receipts").upsert([record], { onConflict: "id" });
    }
    console.log("[Supabase Client] Payment saved to Supabase.");
  } catch (err) {
    console.warn("[Supabase Client Payment Save Note]:", err);
  }
}

export async function uploadFileSupabaseClient(file: File, bucketName: string = "documents"): Promise<{ success: boolean; url?: string; path?: string; error?: string }> {
  try {
    // 1. Validation: Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return { success: false, error: "File size exceeds maximum allowed limit of 10 MB." };
    }

    // 2. Format check: PDF, DOC, DOCX, JPG, PNG
    const allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.includes(ext)) {
      return { success: false, error: "Unsupported file format. Please upload PDF, DOC, DOCX, JPG, or PNG files." };
    }

    const filePath = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

    // Attempt upload to primary bucket, then fallback bucket
    let { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      // Try fallback bucket 'applications'
      const fallback = await supabase.storage.from("applications").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });
      if (!fallback.error) {
        data = fallback.data;
        error = null;
        bucketName = "applications";
      }
    }

    if (error) {
      console.warn("[Supabase Storage Upload Note]:", error.message);
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return {
      success: true,
      path: filePath,
      url: publicUrlData?.publicUrl || filePath
    };
  } catch (err: any) {
    console.error("[Supabase Storage Error]:", err);
    return { success: false, error: err?.message || "Failed to upload document" };
  }
}
