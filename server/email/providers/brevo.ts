import { EmailAttachment, EmailSendResult } from "../types";

export async function sendViaBrevo(opts: {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName?: string;
  replyTo?: string;
  subject: string;
  htmlContent: string;
  attachments?: EmailAttachment[];
  tags?: string[];
}): Promise<EmailSendResult> {
  const { apiKey, fromEmail, fromName, toEmail, toName, replyTo, subject, htmlContent, attachments, tags } = opts;

  if (!apiKey) {
    return {
      success: false,
      provider: "brevo",
      status: "failed",
      error: "Brevo API Key (BREVO_API_KEY / EMAIL_API_KEY) is not configured in server environment.",
      timestamp: new Date().toISOString()
    };
  }

  // Format attachments for Brevo REST API: [{ content: base64, name: filename }]
  const formattedAttachments = attachments?.map(att => {
    let base64Content = "";
    if (Buffer.isBuffer(att.content)) {
      base64Content = att.content.toString("base64");
    } else if (typeof att.content === "string") {
      base64Content = att.content.startsWith("data:")
        ? att.content.split(",")[1]
        : att.content;
    }
    return {
      name: att.filename,
      content: base64Content
    };
  }).filter(att => !!att.content);

  const payload: any = {
    sender: {
      name: fromName || "ConsulPortal Authority",
      email: fromEmail || "Info@consulportal.tech"
    },
    to: [
      {
        email: toEmail,
        name: toName || toEmail.split("@")[0]
      }
    ],
    subject,
    htmlContent,
    replyTo: replyTo ? { email: replyTo } : { email: "Info@consulportal.tech", name: "ConsulPortal Support" }
  };

  if (formattedAttachments && formattedAttachments.length > 0) {
    payload.attachment = formattedAttachments;
  }

  if (tags && tags.length > 0) {
    payload.tags = tags;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    const data: any = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || data?.error || `Brevo HTTP status ${response.status}`;
      return {
        success: false,
        provider: "brevo",
        status: "failed",
        error: errorMsg,
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      provider: "brevo",
      messageId: data?.messageId || data?.id || `brevo-${Date.now()}`,
      status: "delivered",
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      provider: "brevo",
      status: "failed",
      error: err?.message || String(err),
      timestamp: new Date().toISOString()
    };
  }
}
