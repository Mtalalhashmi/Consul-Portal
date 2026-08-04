// Supabase Edge Function: submit-application
// Deploy command: supabase functions deploy submit-application --no-verify-jwt

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@consulportal.com";
    const fromEmail = Deno.env.get("FROM_EMAIL") || "notifications@consulportal.com";

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const body = await req.json();
    const { 
      vacancyId, 
      vacancyTitle, 
      country, 
      destinationCountry,
      name, 
      fullName, 
      email, 
      phone, 
      applyingFrom,
      company,
      passportNumber,
      documentPath,
      cvLink
    } = body;

    const applicantName = fullName || name;
    const destCountry = destinationCountry || country || "Schengen";

    if (!applicantName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Please complete all required fields (Name, Email, Phone)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const appId = `app-${Date.now()}`;
    const record = {
      id: appId,
      tracking_number: appId,
      name: applicantName,
      full_name: applicantName,
      email: email,
      phone: phone,
      vacancy_id: vacancyId || "custom-job",
      vacancy_title: vacancyTitle || "Work Visa Placement",
      country: destCountry,
      destination_country: destCountry,
      applying_from: applyingFrom || "Pakistan",
      company: company || "",
      passport_number: passportNumber || "",
      status: "Pending",
      document_path: documentPath || cvLink || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Insert into Supabase applications table
    const { error: dbError } = await supabase.from("applications").upsert([record]);
    if (dbError) {
      console.warn("DB Insert Note:", dbError.message);
    }

    // 2. Send Email via Resend if RESEND_API_KEY is configured
    if (resendApiKey) {
      const emailSubject = `New Job Application - ${vacancyTitle || 'Visa Sponsorship'} - ${applicantName}`;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0284c7;">New Job Application Received</h2>
          <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 15px 0;" />
          <p><strong>Applicant Name:</strong> ${applicantName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Applying From:</strong> ${applyingFrom || 'Pakistan'}</p>
          <p><strong>Job Title:</strong> ${vacancyTitle || 'Sponsorship Placement'}</p>
          <p><strong>Destination Country:</strong> ${destCountry}</p>
          <p><strong>Application ID:</strong> ${appId}</p>
          <p><strong>Document Path:</strong> ${documentPath || cvLink || 'No document uploaded'}</p>
          <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 15px 0;" />
          <p style="font-size: 12px; color: #64748b;">ConsulPortal Automated Notification System</p>
        </div>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          subject: emailSubject,
          html: emailHtml
        })
      }).catch(err => console.warn("Resend email warning:", err));
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Application submitted successfully. We will contact you soon.",
        application: record
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Your application could not be saved. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
