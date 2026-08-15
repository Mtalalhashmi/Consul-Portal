import { EmailTemplateType, EmailTemplateDefinition } from "./types";

export function escapeHtml(str: any): string {
  if (str === null || str === undefined) return "";
  const s = String(str);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function replaceVariables(template: string, vars: Record<string, any>): string {
  if (!template) return "";
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    if (vars[key] !== undefined && vars[key] !== null) {
      if (Array.isArray(vars[key])) {
        return vars[key].map(v => escapeHtml(v)).join(", ");
      }
      return escapeHtml(vars[key]);
    }
    return "";
  });
}

export const EMAIL_TEMPLATE_DEFINITIONS: Record<EmailTemplateType, EmailTemplateDefinition> = {
  welcome_email: {
    id: "welcome_email",
    name: "1. Welcome / Account Created",
    description: "Sent when a client registers on ConsulPortal",
    category: "account",
    defaultSubject: "Welcome to ConsulPortal, {{client_name}}! Account Provisioned",
    badgeText: "ACCOUNT CREATED",
    badgeColor: "#10b981",
    defaultCtaText: "Access Client Portal",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  email_verification: {
    id: "email_verification",
    name: "2. Email Verification",
    description: "Sent with security verification code to confirm candidate email",
    category: "account",
    defaultSubject: "Verify Your Email Address - ConsulPortal Security Code: {{verification_code}}",
    badgeText: "SECURITY VERIFICATION",
    badgeColor: "#3b82f6",
    defaultCtaText: "Verify My Account",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  application_received: {
    id: "application_received",
    name: "3. Application Received",
    description: "Sent when an application is saved and logged into the database",
    category: "application",
    defaultSubject: "📋 Application Received - Reference ID: {{application_id}}",
    badgeText: "APPLICATION RECEIVED",
    badgeColor: "#3b82f6",
    defaultCtaText: "View Application Status",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  application_under_review: {
    id: "application_under_review",
    name: "4. Application Under Review",
    description: "Sent when application status changes to Under Review",
    category: "application",
    defaultSubject: "🔍 Application Under Review - Ref: {{application_id}}",
    badgeText: "UNDER REVIEW",
    badgeColor: "#f59e0b",
    defaultCtaText: "Track Processing Stage",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  application_approved: {
    id: "application_approved",
    name: "5. Application Approved",
    description: "Sent when consular application is approved",
    category: "application",
    defaultSubject: "🎉 Congratulations! Your Visa Application Has Been Approved - Ref: {{application_id}}",
    badgeText: "OFFICIALLY APPROVED",
    badgeColor: "#10b981",
    defaultCtaText: "View Approval & Next Steps",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  application_rejected: {
    id: "application_rejected",
    name: "6. Application Rejected",
    description: "Sent when application is rejected with formal reason",
    category: "application",
    defaultSubject: "Consular Application Status Update - Ref: {{application_id}}",
    badgeText: "APPLICATION UPDATE",
    badgeColor: "#ef4444",
    defaultCtaText: "View Account Options",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  documents_required: {
    id: "documents_required",
    name: "7. Additional Documents Required",
    description: "Sent when verification department requests missing credentials",
    category: "application",
    defaultSubject: "📄 Action Required: Additional Documents Needed for Ref: {{application_id}}",
    badgeText: "DOCUMENTS REQUIRED",
    badgeColor: "#ec4899",
    defaultCtaText: "Upload Requested Documents",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  payment_successful: {
    id: "payment_successful",
    name: "8. Payment Successful",
    description: "Sent only after verified payment status in database",
    category: "payment",
    defaultSubject: "✅ Escrow Payment Verified & Receipt - Ref: {{payment_id}}",
    badgeText: "PAYMENT VERIFIED",
    badgeColor: "#10b981",
    defaultCtaText: "Download Official Receipt",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  payment_failed: {
    id: "payment_failed",
    name: "9. Payment Failed",
    description: "Sent when transaction fails with retry instructions",
    category: "payment",
    defaultSubject: "⚠️ Payment Transaction Unsuccessful - Action Required",
    badgeText: "TRANSACTION FAILED",
    badgeColor: "#ef4444",
    defaultCtaText: "Retry Payment Deposit",
    defaultCtaUrl: "https://consulportal.tech/pay",
    enabled: true
  },
  payment_pending: {
    id: "payment_pending",
    name: "10. Payment Pending",
    description: "Sent when escrow payment deposit is pending verification",
    category: "payment",
    defaultSubject: "⏳ Escrow Payment Deposit Awaiting Verification - Ref: {{payment_id}}",
    badgeText: "PAYMENT PENDING",
    badgeColor: "#f59e0b",
    defaultCtaText: "Check Deposit Status",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  payment_reminder: {
    id: "payment_reminder",
    name: "11. Payment Reminder",
    description: "Sent periodically for pending milestone fees (max 3 times)",
    category: "payment",
    defaultSubject: "⏰ Reminder: Milestone Processing Fee Pending - Ref: {{payment_id}}",
    badgeText: "PAYMENT REMINDER",
    badgeColor: "#eab308",
    defaultCtaText: "Complete Milestone Payment",
    defaultCtaUrl: "https://consulportal.tech/pay",
    enabled: true
  },
  job_application_submitted: {
    id: "job_application_submitted",
    name: "12. Job Application Submitted",
    description: "Sent when a candidate applies for an international job vacancy",
    category: "application",
    defaultSubject: "💼 Job Vacancy Application Lodged: {{job_title}} ({{country}})",
    badgeText: "VACANCY APPLICATION",
    badgeColor: "#6366f1",
    defaultCtaText: "View Candidate Profile",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  job_application_approved: {
    id: "job_application_approved",
    name: "13. Job Application Approved",
    description: "Sent when job candidate passes employer/consular screening",
    category: "application",
    defaultSubject: "🎉 Employer Nomination Approved: {{job_title}} ({{country}})",
    badgeText: "JOB NOMINATION APPROVED",
    badgeColor: "#10b981",
    defaultCtaText: "Accept Offer & Proceed",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  job_application_rejected: {
    id: "job_application_rejected",
    name: "14. Job Application Rejected",
    description: "Sent when job candidate does not meet prerequisites",
    category: "application",
    defaultSubject: "Job Application Update - {{job_title}} ({{country}})",
    badgeText: "SELECTION COMPLETED",
    badgeColor: "#64748b",
    defaultCtaText: "Explore Other Vacancies",
    defaultCtaUrl: "https://consulportal.tech/jobs",
    enabled: true
  },
  application_status_changed: {
    id: "application_status_changed",
    name: "15. Application Status Changed",
    description: "Sent on general milestone transitions",
    category: "application",
    defaultSubject: "Status Update on Your Visa Dossier (Ref: {{application_id}}): {{status}}",
    badgeText: "STATUS UPDATED",
    badgeColor: "#3b82f6",
    defaultCtaText: "Open Client Dashboard",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  },
  admin_notification: {
    id: "admin_notification",
    name: "16. Admin Event Notification",
    description: "Dispatched to admin on high-priority client actions",
    category: "admin",
    defaultSubject: "🚨 [ADMIN ALERT] {{event}} - {{client_name}}",
    badgeText: "ADMIN DIRECT ALERT",
    badgeColor: "#dc2626",
    defaultCtaText: "Open Admin Console",
    defaultCtaUrl: "https://consulportal.tech/admin",
    enabled: true
  },
  password_reset: {
    id: "password_reset",
    name: "17. Password Reset",
    description: "Sent with secure temporary token/OTP to reset account password",
    category: "account",
    defaultSubject: "ConsulPortal Security: Password Reset Request",
    badgeText: "PASSWORD RESET",
    badgeColor: "#8b5cf6",
    defaultCtaText: "Reset Your Password",
    defaultCtaUrl: "https://consulportal.tech/portal?reset=true",
    enabled: true
  },
  client_support_confirmation: {
    id: "client_support_confirmation",
    name: "18. Client Support / Contact Confirmation",
    description: "Sent when a client submits a support query or consular inquiry",
    category: "support",
    defaultSubject: "💬 Support Inquiry Received: {{subject}} [Ticket #{{ticket_id}}]",
    badgeText: "INQUIRY LOGGED",
    badgeColor: "#06b6d4",
    defaultCtaText: "Check Ticket Status",
    defaultCtaUrl: "https://consulportal.tech/portal",
    enabled: true
  }
};

export function renderBaseLayout(opts: {
  title: string;
  badgeText: string;
  badgeColor: string;
  recipientName: string;
  bodyContentHtml: string;
  detailsTable?: { label: string; value: string }[];
  ctaText?: string;
  ctaUrl?: string;
  footerNotice?: string;
  unsubscribeUrl?: string;
}): string {
  const brandName = "ConsulPortal";
  const brandSub = "Global Consular Affairs & Overseas Employment Authority";
  const supportEmail = "Info@consulportal.tech";
  const supportPhone = "+1 (606) 515-4971";
  const websiteUrl = "https://consulportal.tech";
  const officeAddress = "Consular Plaza, First St SE, Washington, D.C. 20004 | Global Processing Division";
  const year = new Date().getFullYear();

  let tableHtml = "";
  if (opts.detailsTable && opts.detailsTable.length > 0) {
    tableHtml = `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          ${opts.detailsTable.map(row => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 9px 0; color: #64748b; font-weight: 600; width: 42%; vertical-align: top;">${escapeHtml(row.label)}:</td>
              <td style="padding: 9px 0; color: #0f172a; font-weight: 700; vertical-align: top;">${escapeHtml(row.value)}</td>
            </tr>
          `).join("")}
        </table>
      </div>
    `;
  }

  let ctaHtml = "";
  if (opts.ctaText && opts.ctaUrl) {
    ctaHtml = `
      <div style="text-align: center; margin: 30px 0 20px 0;">
        <a href="${escapeHtml(opts.ctaUrl)}" target="_blank" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; font-weight: 800; text-decoration: none; padding: 14px 34px; border-radius: 10px; font-size: 14px; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35); text-transform: uppercase;">
          ${escapeHtml(opts.ctaText)} →
        </a>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(opts.title)}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media screen and (max-width: 620px) {
      .email-container { width: 100% !important; margin: 0 !important; }
      .content-padding { padding: 20px 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 8px; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35); border: 1px solid #1e293b;">
          
          <!-- Top Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #f59e0b;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 50%; width: 52px; height: 52px; line-height: 52px; text-align: center; color: #f59e0b; font-size: 24px; font-weight: bold; margin-bottom: 10px;">
                      🛂
                    </div>
                    <h1 style="color: #ffffff; margin: 6px 0 0 0; font-size: 22px; font-weight: 900; letter-spacing: 0.8px; text-transform: uppercase;">
                      ${brandName}
                    </h1>
                    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; font-family: 'Courier New', Courier, monospace; letter-spacing: 1.8px; text-transform: uppercase;">
                      ${brandSub}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td class="content-padding" style="padding: 32px 28px; background-color: #ffffff;">
              <!-- Status Badge -->
              <div style="margin-bottom: 16px;">
                <span style="display: inline-block; background-color: ${opts.badgeColor}; color: #ffffff; font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 30px; text-transform: uppercase; letter-spacing: 1.2px;">
                  ${escapeHtml(opts.badgeText)}
                </span>
              </div>

              <!-- Main Heading -->
              <h2 style="color: #0f172a; font-size: 20px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.35; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                ${escapeHtml(opts.title)}
              </h2>

              <!-- Salutation -->
              <p style="font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 14px 0;">
                Dear ${escapeHtml(opts.recipientName)},
              </p>

              <!-- Dynamic Body HTML -->
              <div style="font-size: 14px; line-height: 1.65; color: #334155;">
                ${opts.bodyContentHtml}
              </div>

              <!-- Details Table -->
              ${tableHtml}

              <!-- Call To Action -->
              ${ctaHtml}

              <!-- Security Notice Box -->
              ${opts.footerNotice ? `
                <div style="background-color: #f1f5f9; border-left: 4px solid #64748b; padding: 12px 14px; border-radius: 6px; margin-top: 24px;">
                  <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.5;">
                    ${opts.footerNotice}
                  </p>
                </div>
              ` : `
                <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 14px; border-radius: 6px; margin-top: 24px;">
                  <p style="margin: 0; font-size: 12px; color: #92400e; line-height: 1.5;">
                    🔒 <strong>Official Escrow Protection:</strong> ConsulPortal will never ask for your private password or deposit payments outside official designated gateway accounts.
                  </p>
                </div>
              `}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 26px 20px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.65; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; color: #f8fafc; font-weight: 800; font-size: 13px;">
                ${brandName} Authority
              </p>
              <p style="margin: 0 0 10px 0; color: #94a3b8;">
                📍 ${officeAddress}
              </p>
              <p style="margin: 0 0 14px 0;">
                ✉️ <a href="mailto:${supportEmail}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${supportEmail}</a> &nbsp;|&nbsp; 
                📞 <a href="tel:${supportPhone}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${supportPhone}</a> &nbsp;|&nbsp; 
                🌐 <a href="${websiteUrl}" target="_blank" style="color: #f59e0b; text-decoration: none; font-weight: 600;">consulportal.tech</a>
              </p>
              <p style="margin: 0 0 12px 0;">
                <a href="${websiteUrl}/privacy" target="_blank" style="color: #64748b; text-decoration: underline; margin: 0 6px;">Privacy Policy</a> • 
                <a href="${websiteUrl}/terms" target="_blank" style="color: #64748b; text-decoration: underline; margin: 0 6px;">Terms of Service</a> • 
                <a href="${websiteUrl}/portal" target="_blank" style="color: #64748b; text-decoration: underline; margin: 0 6px;">Client Portal</a>
              </p>
              <p style="margin: 0; color: #475569; font-size: 10px;">
                © ${year} ${brandName} Authority. All rights reserved.<br>
                Official Transactional Notification — Cryptographically Dispatched via Brevo / SMTP Core
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateEmailHtml(template: EmailTemplateType, variables: Record<string, any>): { subject: string; html: string } {
  const def = EMAIL_TEMPLATE_DEFINITIONS[template] || EMAIL_TEMPLATE_DEFINITIONS.welcome_email;
  const clientName = variables.client_name || variables.name || variables.recipientName || "Valued Client";
  const nowStr = new Date().toISOString().split("T")[0];

  const fullVars: Record<string, any> = {
    client_name: clientName,
    website_name: "ConsulPortal",
    support_email: "Info@consulportal.tech",
    support_phone: "+1 (606) 515-4971",
    dashboard_url: "https://consulportal.tech/portal",
    submission_date: nowStr,
    current_date: nowStr,
    country: "Schengen Europe",
    currency: "PKR",
    amount: "0",
    ...variables
  };

  const subject = replaceVariables(def.defaultSubject, fullVars);
  let bodyContent = "";
  let detailsTable: { label: string; value: string }[] | undefined;
  let ctaText = def.defaultCtaText;
  let ctaUrl = def.defaultCtaUrl;
  let footerNotice: string | undefined;

  switch (template) {
    case "welcome_email":
      bodyContent = `
        <p>Welcome to <strong>ConsulPortal</strong>! Your client account has been successfully provisioned on our global immigration and work permit gateway.</p>
        <p>You can now log in to explore verified overseas vacancies across 40+ countries, submit applications with full biometric and consular tracking, and manage your visa dossier securely.</p>
      `;
      detailsTable = [
        { label: "Account Email", value: fullVars.recipient_email || fullVars.email || "Registered Email" },
        { label: "Account Status", value: "Active & Verified" },
        { label: "Consular Desk", value: fullVars.country || "Global Consular Services" },
        { label: "Registration Date", value: fullVars.submission_date }
      ];
      break;

    case "email_verification":
      bodyContent = `
        <p>Thank you for registering on ConsulPortal. To secure your account and proceed with application lodgment, please verify your email address using the one-time security code below:</p>
        <div style="background: #f8fafc; border: 2px dashed #3b82f6; border-radius: 12px; text-align: center; padding: 20px; margin: 20px 0;">
          <span style="font-size: 11px; font-family: monospace; color: #64748b; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 6px;">ONE-TIME SECURITY CODE</span>
          <span style="font-size: 32px; font-weight: 900; font-family: monospace; color: #1e3a8a; letter-spacing: 6px;">${escapeHtml(fullVars.verification_code || "786012")}</span>
          <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 6px;">Valid for 15 minutes. Do not share this code with anyone.</span>
        </div>
        <p>If you did not request this verification code, please disregard this email or contact support at <a href="mailto:Info@consulportal.tech">Info@consulportal.tech</a>.</p>
      `;
      ctaText = "Enter Verification Code";
      break;

    case "application_received":
      bodyContent = `
        <p>We are pleased to confirm that your application for <strong>${escapeHtml(fullVars.job_title || fullVars.service_name || fullVars.vacancy_title || "Overseas Visa Application")}</strong> has been successfully received and lodged into the central consular database.</p>
        <p>Our certified immigration auditors and trade recruitment advisors are currently conducting the preliminary credential check.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "APP-PENDING" },
        { label: "Applied Position", value: fullVars.job_title || fullVars.vacancy_title || "General Application" },
        { label: "Destination Country", value: fullVars.country || "Schengen Division" },
        { label: "Submission Date", value: fullVars.submission_date },
        { label: "Initial Status", value: fullVars.status || "Pending Review" }
      ];
      break;

    case "application_under_review":
      bodyContent = `
        <p>Your application dossier (Ref: <strong>${escapeHtml(fullVars.application_id)}</strong>) has advanced to the formal evaluation stage.</p>
        <p>Consular advisors and visa compliance officers are auditing your academic credentials, trade experience, and police clearance documents against host-country embassy criteria.</p>
        <p>No further action is required from you at this time unless additional paperwork is requested.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "N/A" },
        { label: "Dossier Status", value: "UNDER FORMAL REVIEW" },
        { label: "Destination Country", value: fullVars.country || "General" },
        { label: "Review Officer Desk", value: "Consular Evaluation Committee" }
      ];
      break;

    case "application_approved":
      bodyContent = `
        <p style="color: #065f46; font-weight: 700; font-size: 15px;">🎉 Exceptional News! We are delighted to inform you that your consular visa application has been officially APPROVED!</p>
        <p>Your credentials meet all immigration requirements for <strong>${escapeHtml(fullVars.country || "the requested destination")}</strong>. Your file is now ready for physical dossier stamping and biometric scheduling.</p>
        <p>Please log in to your Candidate Portal immediately to download your approval certificate and review your next steps.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "N/A" },
        { label: "Approval Decision", value: "OFFICIALLY APPROVED ✓" },
        { label: "Selected Category", value: fullVars.job_title || fullVars.service_name || "Work Permit" },
        { label: "Destination", value: fullVars.country || "Schengen Division" },
        { label: "Effective Date", value: fullVars.current_date }
      ];
      ctaText = "View Approval Certificate";
      break;

    case "application_rejected":
      bodyContent = `
        <p>Thank you for your application to ConsulPortal. Following a comprehensive review of your dossier (Ref: <strong>${escapeHtml(fullVars.application_id)}</strong>), the evaluation board was unable to approve this application at this time.</p>
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 14px; border-radius: 6px; margin: 16px 0; color: #991b1b; font-size: 13px;">
          <strong>Official Reason for Decision:</strong><br>
          ${escapeHtml(fullVars.rejection_reason || fullVars.reason || "Current trade experience or qualification documentation does not meet minimum host-country statutory thresholds.")}
        </div>
        <p>You remain eligible to re-apply for other available opportunities once prerequisite qualifications or certifications are updated.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "N/A" },
        { label: "Status", value: "Application Not Approved" },
        { label: "Review Date", value: fullVars.current_date }
      ];
      ctaText = "Explore Other Opportunities";
      ctaUrl = "https://consulportal.tech/jobs";
      break;

    case "documents_required":
      bodyContent = `
        <p>To finalize the processing of your application dossier (Ref: <strong>${escapeHtml(fullVars.application_id)}</strong>), our consular verification department requires the following additional documents:</p>
        <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 10px; padding: 16px; margin: 16px 0;">
          <h4 style="margin: 0 0 8px 0; color: #9d174d; font-size: 13px; font-family: monospace; text-transform: uppercase;">Required Documents:</h4>
          <p style="margin: 0; font-size: 13px; color: #831843; font-weight: 700;">
            ${escapeHtml(fullVars.documents_list || fullVars.docList || "Attested Degree / Diploma, Police Clearance Certificate, Passport Scans")}
          </p>
        </div>
        <p>Please upload these documents prior to the submission deadline: <strong>${escapeHtml(fullVars.deadline || "Within 7 business days")}</strong>.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "N/A" },
        { label: "Action Required", value: "Upload Additional Documents" },
        { label: "Submission Deadline", value: fullVars.deadline || "Within 7 Days" }
      ];
      ctaText = "Upload Documents Now";
      break;

    case "payment_successful":
      bodyContent = `
        <p style="color: #065f46; font-weight: 700; font-size: 15px;">We are pleased to confirm that your Escrow Payment has been successfully verified and cleared.</p>
        <p>Your payment is held safely in escrow and your visa processing file has advanced to the next milestone.</p>
      `;
      detailsTable = [
        { label: "Payment / Receipt ID", value: fullVars.payment_id || "PAY-VERIFIED" },
        { label: "Transaction Reference", value: fullVars.transaction_id || "TXN-AUTO" },
        { label: "Amount Cleared", value: `${fullVars.currency || "PKR"} ${Number(fullVars.amount || 0).toLocaleString()}` },
        { label: "Milestone Service", value: fullVars.service_name || fullVars.step_title || "Step Processing Fee" },
        { label: "Payment Gateway", value: fullVars.payment_method || "Verified Bank Gateway" },
        { label: "Payment Date", value: fullVars.payment_date || fullVars.current_date }
      ];
      ctaText = "Download Official Receipt";
      break;

    case "payment_failed":
      bodyContent = `
        <p>We were unable to process your escrow deposit of <strong>${escapeHtml(fullVars.currency || "PKR")} ${Number(fullVars.amount || 0).toLocaleString()}</strong> for milestone: <em>${escapeHtml(fullVars.service_name || fullVars.step_title || "Processing Fee")}</em>.</p>
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; border-radius: 6px; margin: 16px 0; color: #991b1b; font-size: 13px;">
          <strong>Failure Reason:</strong> ${escapeHtml(fullVars.error_message || fullVars.reason || "Payment transaction could not be reconciled with the banking gateway.")}
        </div>
        <p>To avoid processing delays, please retry your deposit via an alternative payment method (EasyPaisa, JazzCash, NayaPay, or HBL Direct).</p>
      `;
      detailsTable = [
        { label: "Attempted Amount", value: `${fullVars.currency || "PKR"} ${Number(fullVars.amount || 0).toLocaleString()}` },
        { label: "Reference Ref", value: fullVars.payment_id || fullVars.application_id || "N/A" },
        { label: "Status", value: "Transaction Failed" }
      ];
      ctaText = "Retry Payment";
      ctaUrl = "https://consulportal.tech/pay";
      break;

    case "payment_pending":
      bodyContent = `
        <p>Your milestone fee payment deposit of <strong>${escapeHtml(fullVars.currency || "PKR")} ${Number(fullVars.amount || 0).toLocaleString()}</strong> has been submitted and is currently awaiting manual verification by our billing department.</p>
        <p>Verification normally takes 1-2 business hours. You will receive an official payment confirmation receipt as soon as your funds are cleared.</p>
      `;
      detailsTable = [
        { label: "Deposit ID", value: fullVars.payment_id || "PAY-PENDING" },
        { label: "Amount Submitted", value: `${fullVars.currency || "PKR"} ${Number(fullVars.amount || 0).toLocaleString()}` },
        { label: "Payment Channel", value: fullVars.payment_method || "Bank / Mobile Wallet" },
        { label: "Verification Status", value: "Pending Manual Review" }
      ];
      break;

    case "payment_reminder":
      bodyContent = `
        <p>This is an automated reminder regarding the pending milestone fee for your visa file (Ref: <strong>${escapeHtml(fullVars.application_id || fullVars.payment_id)}</strong>).</p>
        <p>Milestone: <strong>${escapeHtml(fullVars.service_name || fullVars.step_title || "Consular Processing Step")}</strong><br>
        Amount Due: <strong>${escapeHtml(fullVars.currency || "PKR")} ${Number(fullVars.amount || 0).toLocaleString()}</strong></p>
        <p>Please complete this payment to keep your consular file moving forward without embassy appointment delays.</p>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || fullVars.payment_id || "N/A" },
        { label: "Milestone", value: fullVars.service_name || fullVars.step_title || "Processing Milestone" },
        { label: "Amount Due", value: `${fullVars.currency || "PKR"} ${Number(fullVars.amount || 0).toLocaleString()}` },
        { label: "Reminder Number", value: fullVars.reminder_count ? `${fullVars.reminder_count} of 3` : "1 of 3" }
      ];
      ctaText = "Pay Milestone Invoice";
      ctaUrl = "https://consulportal.tech/pay";
      break;

    case "job_application_submitted":
      bodyContent = `
        <p>Your candidacy profile has been formally lodged for the international vacancy <strong>${escapeHtml(fullVars.job_title)}</strong> in <strong>${escapeHtml(fullVars.country)}</strong>.</p>
        <p>Our employer liaisons are reviewing your credentials against sponsor quota regulations.</p>
      `;
      detailsTable = [
        { label: "Vacancy Title", value: fullVars.job_title || "Overseas Vacancy" },
        { label: "Target Destination", value: fullVars.country || "International" },
        { label: "Candidate Name", value: clientName },
        { label: "Application ID", value: fullVars.application_id || "JOB-APP" },
        { label: "Submission Date", value: fullVars.submission_date }
      ];
      break;

    case "job_application_approved":
      bodyContent = `
        <p style="color: #065f46; font-weight: 700; font-size: 15px;">Congratulations! Your application for <strong>${escapeHtml(fullVars.job_title)}</strong> in <strong>${escapeHtml(fullVars.country)}</strong> has been approved by the employer.</p>
        <p>The employer sponsorship certificate and visa allocation contract are being generated.</p>
      `;
      detailsTable = [
        { label: "Position", value: fullVars.job_title || "Job Vacancy" },
        { label: "Destination", value: fullVars.country || "Host Country" },
        { label: "Nomination Status", value: "APPROVED & SPONSORED" }
      ];
      break;

    case "job_application_rejected":
      bodyContent = `
        <p>Thank you for applying for the position of <strong>${escapeHtml(fullVars.job_title)}</strong> in <strong>${escapeHtml(fullVars.country)}</strong>.</p>
        <p>While your qualifications are valued, the employer has moved forward with candidates matching specific quota criteria for this cohort.</p>
        <p>You can apply for other available vacancies on our live job board at any time.</p>
      `;
      ctaText = "Search Live Job Vacancies";
      ctaUrl = "https://consulportal.tech/jobs";
      break;

    case "application_status_changed":
      bodyContent = `
        <p>An update has been logged on your visa file (Ref: <strong>${escapeHtml(fullVars.application_id)}</strong>).</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 16px 0;">
          <span style="font-size: 11px; font-family: monospace; color: #64748b; text-transform: uppercase;">NEW STATUS:</span><br>
          <strong style="font-size: 16px; color: #0f172a;">${escapeHtml(fullVars.status || "Updated")}</strong>
          ${fullVars.notes ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #475569;">${escapeHtml(fullVars.notes)}</p>` : ""}
        </div>
      `;
      detailsTable = [
        { label: "Reference ID", value: fullVars.application_id || "N/A" },
        { label: "Current Status", value: fullVars.status || "In Progress" },
        { label: "Updated Date", value: fullVars.current_date }
      ];
      break;

    case "admin_notification":
      bodyContent = `
        <p style="font-weight: 700; color: #991b1b;">Dear Administrator,</p>
        <p>A high-priority client event has occurred on the ConsulPortal system that requires review or action:</p>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin: 16px 0;">
          <strong>Event:</strong> ${escapeHtml(fullVars.event || "Client Activity")}<br>
          <strong>Client Name:</strong> ${escapeHtml(fullVars.client_name)} (${escapeHtml(fullVars.client_email || fullVars.recipient_email || "N/A")})<br>
          <strong>Reference ID:</strong> ${escapeHtml(fullVars.application_id || fullVars.payment_id || "N/A")}<br>
          ${fullVars.details ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #334155;"><strong>Details:</strong> ${escapeHtml(fullVars.details)}</p>` : ""}
        </div>
      `;
      detailsTable = [
        { label: "Event Type", value: fullVars.event || "Admin Event" },
        { label: "Client Email", value: fullVars.client_email || fullVars.recipient_email || "N/A" },
        { label: "Timestamp", value: new Date().toLocaleString() }
      ];
      ctaText = "Open Admin Portal";
      ctaUrl = "https://consulportal.tech/admin";
      break;

    case "password_reset":
      bodyContent = `
        <p>We received a request to reset the password for your ConsulPortal account. Use the secure authorization code below to set a new password:</p>
        <div style="background: #f8fafc; border: 2px dashed #8b5cf6; border-radius: 12px; text-align: center; padding: 20px; margin: 20px 0;">
          <span style="font-size: 11px; font-family: monospace; color: #64748b; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 6px;">PASSWORD RESET CODE</span>
          <span style="font-size: 32px; font-weight: 900; font-family: monospace; color: #5b21b6; letter-spacing: 6px;">${escapeHtml(fullVars.reset_token || fullVars.token || fullVars.otp || "984210")}</span>
          <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 6px;">Expires in 30 minutes. Single-use only.</span>
        </div>
        <p>If you did not request a password reset, your account is still secure and no changes were made.</p>
      `;
      ctaText = "Reset My Password";
      ctaUrl = "https://consulportal.tech/portal?reset=true";
      break;

    case "client_support_confirmation":
      bodyContent = `
        <p>Thank you for contacting ConsulPortal Consular Support. Your inquiry has been received and routed to our dedicated helpdesk.</p>
        <p>A consular support officer will review your ticket and respond within 2-4 business hours.</p>
        <div style="background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; padding: 14px; margin: 16px 0;">
          <strong style="color: #0f766e; font-size: 13px;">Your Message Summary:</strong>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #115e59; font-style: italic;">
            "${escapeHtml(fullVars.message || fullVars.inquiry || "General inquiry regarding consular services.")}"
          </p>
        </div>
      `;
      detailsTable = [
        { label: "Ticket Number", value: fullVars.ticket_id || ("TKT-" + Math.floor(10000 + Math.random() * 90000)) },
        { label: "Inquiry Topic", value: fullVars.subject || fullVars.category || "Consular Support" },
        { label: "Logged Date", value: fullVars.submission_date }
      ];
      break;
  }

  const fullHtml = renderBaseLayout({
    title: subject,
    badgeText: def.badgeText,
    badgeColor: def.badgeColor,
    recipientName: clientName,
    bodyContentHtml: bodyContent,
    detailsTable,
    ctaText,
    ctaUrl,
    footerNotice
  });

  return { subject, html: fullHtml };
}
