import { Resend } from "resend";
import { EmailAttachment, EmailSendResult } from "../types";

export async function sendViaResend(opts: {
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
  const { apiKey, fromEmail, fromName, toEmail, replyTo, subject, htmlContent, attachments, tags } = opts;

  if (!apiKey) {
    return {
      success: false,
      provider: "resend",
      status: "failed",
      error: "Resend API Key is not configured.",
      timestamp: new Date().toISOString()
    };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

    const resendAttachments = attachments?.map(att => {
      let content: any = att.content;
      if (Buffer.isBuffer(content)) {
        content = content;
      }
      return {
        filename: att.filename,
        content
      };
    });

    const response = await resend.emails.send({
      from: fromAddress,
      to: [toEmail],
      subject,
      html: htmlContent,
      replyTo: replyTo || "Info@consulportal.tech",
      attachments: resendAttachments,
      tags: tags?.map(t => ({ name: "category", value: t }))
    });

    if (response.error) {
      return {
        success: false,
        provider: "resend",
        status: "failed",
        error: response.error.message || JSON.stringify(response.error),
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      provider: "resend",
      messageId: response.data?.id || `resend-${Date.now()}`,
      status: "delivered",
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      provider: "resend",
      status: "failed",
      error: err?.message || String(err),
      timestamp: new Date().toISOString()
    };
  }
}
