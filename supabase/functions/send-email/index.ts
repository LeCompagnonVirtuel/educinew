import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";
import {
  welcomeEmail,
  verifyEmail,
  passwordReset,
  passwordResetConfirmation,
  loginConfirmation,
  schoolCreated,
  schoolActivated,
  trialEnding,
  trialExpired,
  subscriptionExpired,
  teacherAccountCreated,
  teacherInvitation,
  parentAccountCreated,
  parentPortalAccess,
  studentAccountCreated,
  paymentReceived,
  paymentPending,
  paymentFailed,
  paymentRefunded,
  newGrade,
  bulletinAvailable,
  absenceNotification,
  lateArrival,
  newAnnouncement,
  newMessage,
  newResource,
  invitationEmail,
  customEmail,
  type EmailTemplateType,
} from "../_shared/email-templates.ts";

const RESEND_API_URL = "https://api.resend.com/emails";
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 1000;

function escapeHtml(str: string): string {
  if (typeof str !== "string") return String(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeTemplateParams(params: Record<string, any>): Record<string, any> {
  const escaped: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      escaped[key] = escapeHtml(value);
    } else if (Array.isArray(value)) {
      escaped[key] = value.map(item => typeof item === "string" ? escapeHtml(item) : item);
    } else {
      escaped[key] = value;
    }
  }
  return escaped;
}

interface SendEmailRequest {
  to: string;
  subject?: string;
  html?: string;
  template?: EmailTemplateType;
  templateParams?: Record<string, any>;
  schoolId?: string;
  userId?: string;
  recipientName?: string;
  metadata?: Record<string, any>;
  attachments?: { filename: string; content: string; contentType?: string }[];
}

interface BulkEmailRequest {
  recipients: { email: string; name?: string; userId?: string }[];
  subject?: string;
  html?: string;
  template?: EmailTemplateType;
  templateParams?: Record<string, any>;
  schoolId?: string;
  metadata?: Record<string, any>;
}

function resolveTemplate(
  type: EmailTemplateType,
  params: Record<string, any>
): { subject: string; html: string } {
  const templateMap: Record<string, () => { subject: string; html: string }> = {
    welcome: () => welcomeEmail(params.name || "Utilisateur", params.loginUrl || "https://educi.live/login"),
    verify_email: () => verifyEmail(params.name || "Utilisateur", params.verifyUrl || "#"),
    password_reset: () => passwordReset(params.name || "Utilisateur", params.resetUrl || "#"),
    password_reset_confirmation: () => passwordResetConfirmation(params.name || "Utilisateur"),
    login_confirmation: () => loginConfirmation(params.name || "Utilisateur", params.deviceInfo || "Navigateur inconnu", params.timestamp || new Date().toLocaleString("fr-FR")),
    school_created: () => schoolCreated(params.adminName || "Admin", params.schoolName || "École", params.dashboardUrl || "https://educi.live/dashboard"),
    school_activated: () => schoolActivated(params.adminName || "Admin", params.schoolName || "École", params.planName || "Premium"),
    trial_ending: () => trialEnding(params.adminName || "Admin", params.schoolName || "École", params.daysRemaining || 0, params.upgradeUrl || "https://educi.live/pricing"),
    trial_expired: () => trialExpired(params.adminName || "Admin", params.schoolName || "École", params.upgradeUrl || "https://educi.live/pricing"),
    subscription_expired: () => subscriptionExpired(params.adminName || "Admin", params.schoolName || "École", params.renewalUrl || "https://educi.live/pricing"),
    teacher_account_created: () => teacherAccountCreated(params.teacherName || "Enseignant", params.email || "", params.tempPassword || "", params.loginUrl || "https://educi.live/login"),
    teacher_invitation: () => teacherInvitation(params.inviterName || "Admin", params.schoolName || "École", params.inviteUrl || "#", params.expiresAt || ""),
    parent_account_created: () => parentAccountCreated(params.parentName || "Parent", params.email || "", params.tempPassword || "", params.loginUrl || "https://educi.live/login"),
    parent_portal_access: () => parentPortalAccess(params.parentName || "Parent", params.childrenNames || [], params.loginUrl || "https://educi.live/login"),
    student_account_created: () => studentAccountCreated(params.studentName || "Élève", params.className || "", params.matricule || "", params.loginUrl || "https://educi.live/login"),
    payment_received: () => paymentReceived(params.studentName || "Élève", params.amount || 0, params.paymentMethod || "", params.reference || "", params.schoolName || ""),
    payment_pending: () => paymentPending(params.studentName || "Élève", params.amount || 0, params.dueDate || "", params.payUrl || "#"),
    payment_failed: () => paymentFailed(params.studentName || "Élève", params.amount || 0, params.reason || "Erreur inconnue"),
    payment_refunded: () => paymentRefunded(params.studentName || "Élève", params.amount || 0, params.reference || ""),
    new_grade: () => newGrade(params.studentName || "Élève", params.subject || "", params.score || 0, params.maxScore || 20, params.periodName || ""),
    bulletin_available: () => bulletinAvailable(params.studentName || "Élève", params.className || "", params.periodName || "", params.generalAverage || 0, params.mention || ""),
    absence: () => absenceNotification(params.studentName || "Élève", params.date || "", params.className || "", params.parentName || "Parent"),
    late: () => lateArrival(params.studentName || "Élève", params.date || "", params.lateMinutes || 0, params.parentName || "Parent"),
    new_announcement: () => newAnnouncement(params.schoolName || "École", params.title || "", params.message || "", params.recipientName || "Utilisateur"),
    new_message: () => newMessage(params.senderName || "Expéditeur", params.preview || ""),
    new_resource: () => newResource(params.studentName || "Élève", params.resourceName || "", params.subjectName || "", params.teacherName || ""),
    invitation: () => invitationEmail(params.inviterName || "Admin", params.schoolName || "École", params.role || "", params.inviteUrl || "#", params.expiresAt || ""),
    custom: () => customEmail(params.title || "EduCI", params.body || "", params.ctaLabel, params.ctaUrl),
  };

  const factory = templateMap[type];
  if (!factory) {
    throw new Error(`Template inconnu: ${type}`);
  }
  return factory();
}

async function sendViaResend(
  resendKey: string,
  to: string,
  subject: string,
  html: string,
  from?: string,
  attachments?: { filename: string; content: string; contentType?: string }[]
): Promise<{ id: string }> {
  const body: Record<string, any> = {
    from: from || "EduCI <noreply@educi.live>",
    to: [to],
    subject,
    html,
  };

  if (attachments && attachments.length > 0) {
    body.attachments = attachments.map(a => ({
      filename: a.filename,
      content: a.content,
      content_type: a.contentType || "application/pdf",
    }));
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.message || `Resend API error: ${response.status}`;
    console.error(`[Resend] Error ${response.status}: ${errorMsg}`, { to, subject });
    throw new Error(errorMsg);
  }

  return response.json();
}

async function sendWithRetry(
  resendKey: string,
  to: string,
  subject: string,
  html: string,
  from?: string,
  attachments?: { filename: string; content: string; contentType?: string }[]
): Promise<{ id: string; attempts: number }> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      const result = await sendViaResend(resendKey, to, subject, html, from, attachments);
      if (attempt > 1) {
        console.log(`[Resend] Succeeded on attempt ${attempt}/${MAX_RETRY_ATTEMPTS} for ${to}`);
      }
      return { id: result.id, attempts: attempt };
    } catch (err) {
      lastError = err as Error;
      console.error(`[Resend] Attempt ${attempt}/${MAX_RETRY_ATTEMPTS} failed for ${to}: ${err.message}`);
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastError || new Error("Échec après toutes les tentatives");
}

async function logEmail(
  supabase: any,
  data: {
    recipientEmail: string;
    recipientName?: string;
    subject: string;
    emailType: string;
    status: string;
    resendId?: string;
    errorMessage?: string;
    schoolId?: string;
    userId?: string;
    metadata?: Record<string, any>;
    attempts?: number;
  }
): Promise<string | null> {
  try {
    if (data.status === "SENT" && data.resendId) {
      const { data: logId } = await supabase.rpc("log_email_sent", {
        p_recipient_email: data.recipientEmail,
        p_subject: data.subject,
        p_email_type: data.emailType,
        p_resend_id: data.resendId,
        p_school_id: data.schoolId || null,
        p_user_id: data.userId || null,
        p_metadata: { ...data.metadata, attempts: data.attempts || 1 },
        p_recipient_name: data.recipientName || null,
      });
      return logId;
    } else if (data.status === "FAILED") {
      const { data: logId } = await supabase.rpc("log_email_failed", {
        p_recipient_email: data.recipientEmail,
        p_subject: data.subject,
        p_email_type: data.emailType,
        p_error_message: data.errorMessage || "Unknown error",
        p_school_id: data.schoolId || null,
        p_user_id: data.userId || null,
        p_metadata: { ...data.metadata, attempts: data.attempts || 0 },
        p_recipient_name: data.recipientName || null,
      });
      return logId;
    }
  } catch (e) {
    console.error("[LogEmail] Failed to log email:", e);
  }
  return null;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!resendKey) {
      console.error("[send-email] RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "RESEND_API_KEY non configuré" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("[send-email] Auth failed:", authError?.message);
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SECURITY: Extract school_id from authenticated user
    const { data: userData } = await supabase
      .from("users")
      .select("school_id, role")
      .eq("id", user.id)
      .single();

    if (!userData?.school_id) {
      return new Response(JSON.stringify({ error: "Utilisateur non lié à un établissement" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SECURITY: Restrict custom HTML to admin roles only
    const body = await req.json();
    if (body.html && !["ADMIN", "SUPER_ADMIN"].includes(userData.role)) {
      return new Response(JSON.stringify({ error: "Seuls les administrateurs peuvent envoyer du contenu HTML personnalisé" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rateCheck = await checkRateLimit(user.id, 30, 60_000);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ error: "Trop de requêtes. Réessayez dans quelques secondes." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil(rateCheck.resetIn / 1000)),
          },
        }
      );
    }

    const isBulk = "recipients" in body;

    if (isBulk) {
      const bulkReq = body as BulkEmailRequest;
      if (!bulkReq.recipients || !Array.isArray(bulkReq.recipients) || bulkReq.recipients.length === 0) {
        return new Response(JSON.stringify({ error: "Liste de destinataires requise" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (bulkReq.recipients.length > 100) {
        return new Response(JSON.stringify({ error: "Maximum 100 destinataires par envoi" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // SECURITY: Verify all recipients belong to the same school
      const recipientEmails = bulkReq.recipients.map((r: any) => r.email).filter(Boolean);
      if (recipientEmails.length > 0) {
        const { data: validRecipients } = await supabase
          .from("users")
          .select("email")
          .in("email", recipientEmails)
          .eq("school_id", userData.school_id);

        const validEmails = new Set(validRecipients?.map((r: any) => r.email) || []);
        const invalidRecipients = recipientEmails.filter((e: string) => !validEmails.has(e));
        if (invalidRecipients.length > 0) {
          return new Response(JSON.stringify({
            error: `${invalidRecipients.length} destinataire(s) non trouvé(s) dans votre établissement`,
            invalidRecipients,
          }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      let subject = bulkReq.subject;
      let html = bulkReq.html;

      if (bulkReq.template) {
        const resolved = resolveTemplate(bulkReq.template, escapeTemplateParams(bulkReq.templateParams || {}));
        subject = subject || resolved.subject;
        html = html || resolved.html;
      }

      if (!subject || !html) {
        return new Response(
          JSON.stringify({ error: "Sujet et contenu requis (template ou subject+html)" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const results = [];
      for (const recipient of bulkReq.recipients) {
        try {
          const { id, attempts } = await sendWithRetry(resendKey, recipient.email, subject, html);
          await logEmail(supabase, {
            recipientEmail: recipient.email,
            recipientName: recipient.name,
            subject,
            emailType: bulkReq.template || "custom",
            status: "SENT",
            resendId: id,
            schoolId: bulkReq.schoolId,
            userId: recipient.userId,
            metadata: bulkReq.metadata,
            attempts,
          });
          results.push({ email: recipient.email, status: "sent", id, attempts });
        } catch (err) {
          await logEmail(supabase, {
            recipientEmail: recipient.email,
            recipientName: recipient.name,
            subject,
            emailType: bulkReq.template || "custom",
            status: "FAILED",
            errorMessage: err.message,
            schoolId: bulkReq.schoolId,
            userId: recipient.userId,
            metadata: bulkReq.metadata,
            attempts: MAX_RETRY_ATTEMPTS,
          });
          results.push({ email: recipient.email, status: "failed", error: "Échec de l'envoi", attempts: MAX_RETRY_ATTEMPTS });
        }
      }

      console.log(`[send-email] Bulk: ${results.filter(r => r.status === "sent").length}/${bulkReq.recipients.length} sent`);

      return new Response(
        JSON.stringify({
          success: true,
          total: bulkReq.recipients.length,
          sent: results.filter((r) => r.status === "sent").length,
          failed: results.filter((r) => r.status === "failed").length,
          results,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const singleReq = body as SendEmailRequest;
    if (!singleReq.to) {
      return new Response(JSON.stringify({ error: "Destinataire requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // SECURITY: Verify recipient belongs to the same school
    const { data: recipientUser } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", singleReq.to)
      .eq("school_id", userData.school_id)
      .single();

    if (!recipientUser) {
      return new Response(JSON.stringify({ error: "Destinataire non trouvé dans votre établissement" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let subject = singleReq.subject;
    let html = singleReq.html;

    if (singleReq.template) {
      const resolved = resolveTemplate(singleReq.template, escapeTemplateParams(singleReq.templateParams || {}));
      subject = subject || resolved.subject;
      html = html || resolved.html;
    }

    if (!subject || !html) {
      return new Response(
        JSON.stringify({ error: "Sujet et contenu requis (template ou subject+html)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { id, attempts } = await sendWithRetry(resendKey, singleReq.to, subject, html, undefined, singleReq.attachments);

    await logEmail(supabase, {
      recipientEmail: singleReq.to,
      recipientName: singleReq.recipientName,
      subject,
      emailType: singleReq.template || "custom",
      status: "SENT",
      resendId: id,
      schoolId: singleReq.schoolId,
      userId: singleReq.userId,
      metadata: singleReq.metadata,
      attempts,
    });

    console.log(`[send-email] Single: sent to ${singleReq.to} (${singleReq.template || "custom"}) in ${attempts} attempt(s)`);

    return new Response(
      JSON.stringify({ success: true, id, attempts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[send-email] Fatal error:", error);
    return new Response(JSON.stringify({ error: error.message || "Erreur interne" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
