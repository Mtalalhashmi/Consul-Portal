import nodemailer from "nodemailer";
import { EmailAttachment, EmailSendResult } from "../types";

export async function sendViaSmtp(opts: {
  host: string;
  port: number;
  secure?: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName?: string;
  replyTo?: string;
  subject: string;
  htmlContent: string;
  attachments?: EmailAttachment[];
}): Promise<EmailSendResult> {
  const { host, port, secure, user, pass, fromEmail, fromName, toEmail, replyTo, subject, htmlContent, attachments } = opts;

  if (!user || !pass) {
    return {
      success: false,
      provider: "smtp",
      status: "failed",
      error: "SMTP credentials (SMTP_USER / SMTP_PASS) are not configured.",
      timestamp: new Date().toISOString()
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host || "smtp.gmail.com",
      port: port || 587,
      secure: secure !== undefined ? secure : port === 465,
      auth: {
        user,
        pass
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    const fromAddress = fromName ? `"${fromName}" <${fromEmail || user}>` : (fromEmail || user);

    const mailOptions: any = {
      from: fromAddress,
      to: toEmail,
      subject,
      html: htmlContent,
      replyTo: replyTo || "Info@consulportal.tech"
    };

    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments.map(att => ({
        filename: att.filename,
        content: att.content,
        path: att.path,
        contentType: att.contentType
      }));
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      provider: "smtp",
      messageId: info.messageId || `smtp-${Date.now()}`,
      status: "delivered",
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      provider: "smtp",
      status: "failed",
      error: err?.message || String(err),
      timestamp: new Date().toISOString()
    };
  }
}
