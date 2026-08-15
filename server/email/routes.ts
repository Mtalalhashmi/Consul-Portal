import express from "express";
import { 
  IN_MEMORY_EMAIL_LOGS, 
  FAILED_RETRY_QUEUE, 
  TEMPLATE_TOGGLE_STATE, 
  getEmailConfig, 
  sendTransactionalEmail, 
  logEmailRecord,
  validateEmail,
  getSupabaseEmailClient
} from "./emailService";
import { EMAIL_TEMPLATE_DEFINITIONS, generateEmailHtml } from "./templates";
import { EmailTemplateType } from "./types";

const router = express.Router();

// GET /api/admin/email/logs
router.get("/logs", async (req, res) => {
  try {
    const { status, type, search, limit = 50, offset = 0 } = req.query;

    // Try fetching from Supabase first
    try {
      const supabase = getSupabaseEmailClient();
      if (supabase) {
        let query = supabase.from("email_logs").select("*", { count: "exact" });
        if (status && status !== "all") query = query.eq("status", String(status));
        if (type && type !== "all") query = query.eq("email_type", String(type));
        if (search) {
          query = query.or(`recipient_email.ilike.%${search}%,subject.ilike.%${search}%,application_id.ilike.%${search}%`);
        }
        query = query.order("created_at", { ascending: false }).range(Number(offset), Number(offset) + Number(limit) - 1);

        const { data, count, error } = await query;

        if (!error && data && data.length > 0) {
          return res.json({
            logs: data,
            total: count || data.length,
            source: "supabase"
          });
        }
      }
    } catch (sbErr) {
      console.warn("Supabase query fallback to memory:", sbErr);
    }

    // Fallback to in-memory logs
    let filtered = [...IN_MEMORY_EMAIL_LOGS];
    if (status && status !== "all") {
      filtered = filtered.filter(l => l.status === status);
    }
    if (type && type !== "all") {
      filtered = filtered.filter(l => l.email_type === type);
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(l => 
        l.recipient_email.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        (l.application_id && l.application_id.toLowerCase().includes(q))
      );
    }

    const start = Number(offset);
    const paginated = filtered.slice(start, start + Number(limit));

    return res.json({
      logs: paginated,
      total: filtered.length,
      source: "memory"
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to fetch email logs: " + err.message });
  }
});

// GET /api/admin/email/stats
router.get("/stats", async (req, res) => {
  try {
    const config = getEmailConfig();
    const allLogs = IN_MEMORY_EMAIL_LOGS;

    const total = allLogs.length;
    const delivered = allLogs.filter(l => l.status === "delivered" || l.status === "sent").length;
    const failed = allLogs.filter(l => l.status === "failed").length;
    const queued = FAILED_RETRY_QUEUE.length;

    return res.json({
      total,
      delivered,
      failed,
      queued,
      deliveryRate: total > 0 ? Math.round((delivered / total) * 100) : 100,
      activeProvider: config.provider,
      providerConfigured: !!(config.brevoApiKey || config.resendApiKey || config.smtpUser),
      testMode: config.testMode,
      fromEmail: config.fromEmail,
      fromName: config.fromName,
      adminNotificationEmail: config.adminNotificationEmail
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to compute stats: " + err.message });
  }
});

// GET /api/admin/email/config
router.get("/config", (req, res) => {
  const config = getEmailConfig();
  return res.json({
    provider: config.provider,
    hasBrevoKey: !!config.brevoApiKey,
    hasResendKey: !!config.resendApiKey,
    hasSmtpConfig: !!(config.smtpUser && config.smtpPass),
    smtpHost: config.smtpHost,
    fromEmail: config.fromEmail,
    fromName: config.fromName,
    replyTo: config.replyTo,
    adminNotificationEmail: config.adminNotificationEmail,
    testMode: config.testMode,
    paymentRemindersEnabled: config.paymentRemindersEnabled,
    reminderIntervalHours: config.reminderIntervalHours
  });
});

// GET /api/admin/email/templates
router.get("/templates", (req, res) => {
  const templates = Object.values(EMAIL_TEMPLATE_DEFINITIONS).map(def => ({
    ...def,
    enabled: TEMPLATE_TOGGLE_STATE[def.id] !== false
  }));
  return res.json(templates);
});

// POST /api/admin/email/templates/toggle
router.post("/templates/toggle", (req, res) => {
  const { templateId, enabled } = req.body;
  if (!templateId) {
    return res.status(400).json({ error: "Template ID is required." });
  }
  TEMPLATE_TOGGLE_STATE[templateId] = enabled !== false;
  return res.json({ success: true, templateId, enabled: TEMPLATE_TOGGLE_STATE[templateId] });
});

// POST /api/admin/email/preview
router.post("/preview", (req, res) => {
  const { template, variables = {} } = req.body;
  if (!template || !EMAIL_TEMPLATE_DEFINITIONS[template as EmailTemplateType]) {
    return res.status(400).json({ error: "Valid template type is required." });
  }

  const { subject, html } = generateEmailHtml(template as EmailTemplateType, variables);
  return res.json({ subject, html });
});

// POST /api/admin/email/send-manual
router.post("/send-manual", async (req, res) => {
  try {
    const { to, recipientName, template, subject, variables = {}, applicationId, paymentId } = req.body;

    if (!to || !template) {
      return res.status(400).json({ error: "Recipient email ('to') and 'template' are required." });
    }

    if (!validateEmail(to)) {
      return res.status(400).json({ error: `Invalid recipient email address: ${to}` });
    }

    const result = await sendTransactionalEmail({
      to,
      recipientName: recipientName || to.split("@")[0],
      template: template as EmailTemplateType,
      subject,
      variables,
      applicationId,
      paymentId
    });

    return res.json({
      success: result.success,
      message: result.success ? `Email (${template}) successfully sent to ${to}` : `Failed to send email: ${result.error}`,
      result
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal error sending manual email: " + err.message });
  }
});

// POST /api/admin/email/test
router.post("/test", async (req, res) => {
  try {
    const { to = "Info@consulportal.tech", template = "welcome_email" } = req.body;

    if (!validateEmail(to)) {
      return res.status(400).json({ error: `Invalid test email address: ${to}` });
    }

    const result = await sendTransactionalEmail({
      to,
      recipientName: "ConsulPortal Admin Tester",
      template: template as EmailTemplateType,
      variables: {
        client_name: "ConsulPortal Admin Tester",
        verification_code: "786012",
        application_id: "APP-TEST-8899",
        payment_id: "PAY-TEST-5544",
        amount: 25000,
        country: "Schengen Europe",
        job_title: "Logistics Lead & Warehouse Officer"
      }
    });

    return res.json({
      success: result.success,
      message: result.success ? `Live test email dispatched successfully to ${to} via ${result.provider}` : `Test failed: ${result.error}`,
      result
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Test dispatch error: " + err.message });
  }
});

// POST /api/webhooks/brevo
router.post("/webhooks/brevo", async (req, res) => {
  try {
    const event = req.body;
    console.log("[Brevo Webhook Event]:", event);

    const messageId = event["message-id"] || event.messageId;
    const email = event.email;
    const eventType = event.event; // 'delivered', 'request', 'bounced', 'spam', etc.

    if (messageId || email) {
      const match = IN_MEMORY_EMAIL_LOGS.find(l => l.provider_message_id === messageId || l.recipient_email === email);
      if (match) {
        if (eventType === "delivered") match.status = "delivered";
        if (eventType === "bounced" || eventType === "soft_bounce") match.status = "bounced";
        if (eventType === "deferred") match.status = "retrying";
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/webhooks/resend
router.post("/webhooks/resend", async (req, res) => {
  try {
    const event = req.body;
    console.log("[Resend Webhook Event]:", event);

    const emailId = event?.data?.email_id;
    const type = event?.type; // 'email.delivered', 'email.bounced', etc.

    if (emailId) {
      const match = IN_MEMORY_EMAIL_LOGS.find(l => l.provider_message_id === emailId);
      if (match) {
        if (type === "email.delivered") match.status = "delivered";
        if (type === "email.bounced") match.status = "bounced";
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
