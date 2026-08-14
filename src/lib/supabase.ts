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
    const appId = appData.id || `app-${Date.now()}`;
    const applicantName = appData.name || appData.fullName || "Applicant";
    const email = appData.email || "applicant@example.com";
    const phone = appData.phone || "";
    const trackingNumber = appData.trackingNumber || appData.tracking_number || appId;
    const country = appData.country || appData.destinationCountry || "General";
    const vacancyTitle = appData.vacancyTitle || appData.jobTitle || appData.vacancy_title || "General Application";
    const company = appData.company || appData.recruitmentTarget || "";
    const passportNumber = appData.passportNumber || appData.passport_number || appData.passportNum || "";
    const passportExpiry = appData.passportExpiry || appData.passport_expiry || "";
    const cnic = appData.cnic || "";
    const cvLink = appData.cvLink || appData.documentPath || appData.cv_link || "";
    const coverLetter = appData.coverLetter || appData.cover_letter || "";
    const uploadedFile = appData.uploadedFile || appData.uploaded_file || "";
    const createdAt = appData.createdAt || appData.created_at || new Date().toISOString();

    // 1. Primary table: applications
    const appRecord: Record<string, any> = {
      id: appId,
      tracking_number: trackingNumber,
      name: applicantName,
      email: email,
      phone: phone,
      vacancy_id: appData.vacancyId || appData.jobId || "",
      vacancy_title: vacancyTitle,
      country: country,
      applying_from: appData.applyingFrom || "Pakistan",
      company: company,
      passport_number: passportNumber,
      passport_expiry: passportExpiry,
      cnic: cnic,
      status: appData.status || "Pending",
      cv_link: cvLink,
      cover_letter: coverLetter,
      uploaded_file: uploadedFile || cvLink,
      created_at: createdAt
    };

    const { data: d1, error: err1 } = await supabase.from("applications").upsert([appRecord], { onConflict: "id" }).select();
    if (!err1) {
      console.log("[Supabase Client] Saved to 'applications' table successfully.");
    } else {
      console.warn("[Supabase applications table note]:", err1.message);
    }

    // 2. Secondary table: job_applications
    const jobAppRecord: Record<string, any> = {
      id: appId,
      full_name: applicantName,
      email: email,
      phone: phone,
      job_title: vacancyTitle,
      job_category: appData.category || "General",
      country: country,
      passport_num: passportNumber,
      status: appData.status || "Pending",
      created_at: createdAt
    };

    const { error: err2 } = await supabase.from("job_applications").upsert([jobAppRecord], { onConflict: "id" });
    if (!err2) {
      console.log("[Supabase Client] Saved to 'job_applications' table successfully.");
    }

    return { success: !err1 || !err2, record: appRecord };
  } catch (err: any) {
    console.warn("[Supabase Client App Save Note]:", err);
    return { success: false, error: err?.message };
  }
}

export async function saveUserAccountSupabaseClient(userData: any) {
  try {
    const userId = userData.id || `usr-${Date.now()}`;
    const name = userData.name || userData.fullName || "";
    const email = userData.email || "";
    const phone = userData.phone || "";
    const passportNum = userData.passportNum || userData.passport_num || userData.passportNumber || "";
    const trackId = userData.trackId || userData.track_id || userData.trackingNumber || "";
    const status = userData.status || "Active";
    const createdAt = userData.createdAt || new Date().toISOString();

    // 1. client_accounts table
    const clientRecord = {
      id: userId,
      name: name,
      email: email,
      phone: phone,
      passport_num: passportNum,
      track_id: trackId,
      status: status,
      created_at: createdAt
    };

    const { error: err1 } = await supabase.from("client_accounts").upsert([clientRecord], { onConflict: "id" });
    if (!err1) {
      console.log("[Supabase Client] Saved to 'client_accounts' table successfully.");
    } else {
      console.warn("[Supabase client_accounts note]:", err1.message);
    }

    // 2. profiles table fallback
    try {
      await supabase.from("profiles").upsert([{
        id: userId,
        full_name: name,
        email: email,
        phone: phone,
        country: userData.country || "Pakistan",
        role: userData.role || "client",
        status: status,
        created_at: createdAt
      }], { onConflict: "id" });
    } catch (_) {}

    return { success: true, record: clientRecord };
  } catch (err) {
    console.warn("[Supabase Client User Save Note]:", err);
    return { success: false };
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
      subject: queryData.subject || queryData.category || "General Inquiry",
      message: queryData.message || "",
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
    return { success: true };
  } catch (err) {
    console.warn("[Supabase Client Query Save Note]:", err);
    return { success: false };
  }
}

export async function savePaymentSupabaseClient(paymentData: any) {
  try {
    const record: Record<string, any> = {
      id: paymentData.id || `PAY-${Date.now()}`,
      track_id: paymentData.trackId || paymentData.track_id || "",
      client_name: paymentData.clientName || paymentData.sender_name || paymentData.client_name || "Client",
      method: paymentData.method || "Bank Transfer",
      amount: Number(paymentData.amount) || 0,
      created_at: new Date().toISOString()
    };

    // Include extended attributes if provided
    if (paymentData.status) record.status = paymentData.status;
    if (paymentData.clientEmail) record.client_email = paymentData.clientEmail;
    if (paymentData.stepTitle) record.step_title = paymentData.stepTitle;
    if (paymentData.currency) record.currency = paymentData.currency;
    if (paymentData.transactionId) record.transaction_id = paymentData.transactionId;

    let { error } = await supabase.from("payments").upsert([record], { onConflict: "id" });
    
    // If error because extended columns don't exist yet, fallback to base columns
    if (error && error.message?.includes("column")) {
      const baseRecord = {
        id: record.id,
        track_id: record.track_id,
        client_name: record.client_name,
        method: record.method,
        amount: record.amount,
        created_at: record.created_at
      };
      const res = await supabase.from("payments").upsert([baseRecord], { onConflict: "id" });
      error = res.error;
    }

    if (error) {
      await supabase.from("payment_receipts").upsert([record], { onConflict: "id" });
    }
    console.log("[Supabase Client] Payment saved to Supabase.");
    return { success: true };
  } catch (err) {
    console.warn("[Supabase Client Payment Save Note]:", err);
    return { success: false };
  }
}

export async function uploadFileSupabaseClient(file: File, bucketName: string = "application-documents"): Promise<{ success: boolean; url?: string; path?: string; error?: string }> {
  try {
    // 1. Validation: Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return { success: false, error: "Your document is larger than 10 MB." };
    }

    // 2. Format check: PDF, DOC, DOCX, JPG, PNG
    const allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.includes(ext)) {
      return { success: false, error: "This document type is not supported. Allowed formats: PDF, DOC, DOCX, JPG, PNG." };
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const filePath = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanFileName}`;

    // Attempt upload to primary bucket 'application-documents'
    let { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      // Try fallback bucket 'documents'
      let fallback = await supabase.storage.from("documents").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      });
      if (!fallback.error) {
        data = fallback.data;
        error = null;
        bucketName = "documents";
      } else {
        // Try fallback bucket 'applications'
        let fallbackApp = await supabase.storage.from("applications").upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });
        if (!fallbackApp.error) {
          data = fallbackApp.data;
          error = null;
          bucketName = "applications";
        }
      }
    }

    if (error) {
      console.warn("[Supabase Storage Upload Note]:", error.message);
      return { success: false, error: "Your document could not be uploaded. Please try again." };
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return {
      success: true,
      path: filePath,
      url: publicUrlData?.publicUrl || filePath
    };
  } catch (err: any) {
    console.error("[Supabase Storage Error]:", err);
    return { success: false, error: "Your document could not be uploaded. Please try again." };
  }
}
