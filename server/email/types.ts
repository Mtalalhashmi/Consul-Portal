export type EmailProviderType = "brevo" | "resend" | "smtp" | "gmail_api" | "test" | "auto";

export type EmailStatus = "queued" | "sending" | "sent" | "delivered" | "failed" | "retrying" | "bounced";

export type EmailTemplateType =
  | "welcome_email"
  | "email_verification"
  | "application_received"
  | "application_under_review"
  | "application_approved"
  | "application_rejected"
  | "documents_required"
  | "payment_successful"
  | "payment_failed"
  | "payment_pending"
  | "payment_reminder"
  | "job_application_submitted"
  | "job_application_approved"
  | "job_application_rejected"
  | "application_status_changed"
  | "admin_notification"
  | "password_reset"
  | "client_support_confirmation";

export interface EmailAttachment {
  filename: string;
  content?: string | Buffer; // Base64 or Buffer
  contentType?: string;
  path?: string;
}

export interface SendEmailOptions {
  to: string;
  recipientName?: string;
  subject?: string;
  template: EmailTemplateType;
  variables: Record<string, any>;
  attachments?: EmailAttachment[];
  idempotencyKey?: string;
  applicationId?: string;
  paymentId?: string;
  userId?: string;
  replyTo?: string;
  tags?: string[];
  isRetry?: boolean;
  skipQueue?: boolean;
}

export interface EmailSendResult {
  success: boolean;
  provider: string;
  messageId?: string;
  status: EmailStatus;
  error?: string;
  emailLogId?: string;
  timestamp: string;
}

export interface EmailLogRecord {
  id: string;
  user_id?: string;
  application_id?: string;
  payment_id?: string;
  recipient_email: string;
  recipient_name?: string;
  email_type: EmailTemplateType | string;
  subject: string;
  provider: string;
  provider_message_id?: string;
  status: EmailStatus;
  attempt_count: number;
  error_message?: string;
  html_preview?: string;
  created_at: string;
  sent_at?: string;
  last_attempt_at?: string;
  variables_summary?: string;
}

export interface EmailConfig {
  provider: EmailProviderType;
  apiKey?: string;
  brevoApiKey?: string;
  resendApiKey?: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  adminNotificationEmail: string;
  testMode: boolean;
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  smtpUser?: string;
  smtpPass?: string;
  paymentRemindersEnabled: boolean;
  reminderIntervalHours: number;
  maxReminders: number;
}

export interface EmailTemplateDefinition {
  id: EmailTemplateType;
  name: string;
  description: string;
  category: "account" | "application" | "payment" | "admin" | "support";
  defaultSubject: string;
  badgeText: string;
  badgeColor: string;
  defaultCtaText?: string;
  defaultCtaUrl?: string;
  enabled: boolean;
}
