# Security Specification & Test Plan

## 1. Data Invariants

- **User Collection (`/users/{userId}`)**:
  - `userId` must strictly match `request.auth.uid`.
  - PII (email, phone, passportNum) read access restricted strictly to the user owner (`request.auth.uid == userId`) or verified system admins.
  - Role escalation is prevented: normal users cannot set or elevate their role field.

- **Applications Collection (`/applications/{applicationId}`)**:
  - `applicantEmail` must match `request.auth.token.email`.
  - Reading applications restricted to the applicant or system admins.

- **Passport Tracking (`/passports/{trackId}`)**:
  - A passport track can only be read by an authenticated user whose `email` or `userId` matches the document, or by admins.

- **Virtual Mailbox (`/emails/{emailId}`)**:
  - Reading email messages restricted strictly to `recipientEmail == request.auth.token.email` or admins.

- **Settings (`/settings/{settingId}`)**:
  - Read access is public for app operational parameters (e.g., WhatsApp number).
  - Write access restricted strictly to verified admins.

---

## 2. Dirty Dozen Security Payloads

1. **Payload 1: Unauthenticated User Creation** - Attempt to write to `/users/other_uid` without auth token. -> Expected: PERMISSION_DENIED
2. **Payload 2: Role Escalation Attack** - Authenticated user attempts to write `role: "admin"` during profile registration. -> Expected: PERMISSION_DENIED
3. **Payload 3: PII Leak via Blanket Read** - User A attempts to list all documents in `/users`. -> Expected: PERMISSION_DENIED
4. **Payload 4: Identity Spoofing in Application** - User with email `userA@test.com` submits application with `applicantEmail: "userB@test.com"`. -> Expected: PERMISSION_DENIED
5. **Payload 5: Foreign Application Tampering** - User A attempts to update or delete application owned by User B. -> Expected: PERMISSION_DENIED
6. **Payload 6: Passport Track Interception** - Unauthenticated user requests passport record of another candidate. -> Expected: PERMISSION_DENIED
7. **Payload 7: Email Inbox Scraping** - User A queries emails with `recipientEmail == "userB@test.com"`. -> Expected: PERMISSION_DENIED
8. **Payload 8: Global Setting Defacement** - Non-admin user attempts to overwrite `/settings/whatsapp`. -> Expected: PERMISSION_DENIED
9. **Payload 9: Oversized Field Bomb Attack** - User sends a 1MB payload string into `name` or `trackId`. -> Expected: PERMISSION_DENIED
10. **Payload 10: ID Poisoning Attack** - User attempts to create a document ID containing path traversal characters `../../`. -> Expected: PERMISSION_DENIED
11. **Payload 11: Unverified Email Spoofing** - User with `email_verified == false` attempts admin access or restricted write operations. -> Expected: PERMISSION_DENIED
12. **Payload 12: Terminal State Tampering** - Candidate attempts to change `status: "approved"` to `"pending"`. -> Expected: PERMISSION_DENIED
