import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createHmac, randomBytes } from 'crypto';
export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key);
}

function getVerificationSecret(): string {
  const secret = process.env.VERIFICATION_SECRET;
  if (!secret) throw new Error('VERIFICATION_SECRET is required');
  return secret;
}

function hashToken(token: string): string {
  return createHmac('sha256', getVerificationSecret()).update(token).digest('hex');
}

const TOKEN_EXPIRY_HOURS = parseInt(process.env.VERIFICATION_TOKEN_EXPIRY_HOURS || '24', 10);
const RATE_LIMIT_MAX = parseInt(process.env.RESEND_RATE_LIMIT_MAX || '3', 10);
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RESEND_RATE_LIMIT_WINDOW_MS || '300000', 10);
const EMAIL_FROM = process.env.EMAIL_FROM || 'EduCI <noreply@educi.live>';


async function sendEmail(
  resendKey: string,
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<{ sent: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const payload: Record<string, any> = { from: EMAIL_FROM, to: [to], subject, html };
    if (text) payload.text = text;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { sent: false, error: errorData?.message || `Resend HTTP ${response.status}` };
    }
    return { sent: true };
  } catch (err: any) {
    return { sent: false, error: err.name === 'AbortError' ? 'Timeout (15s)' : err.message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { email, sessionToken, draftId } = body;

    const targetEmail = email?.toLowerCase()?.trim();
    if (!targetEmail && !sessionToken && !draftId) {
      return NextResponse.json({ error: 'Email, session token ou draft ID requis' }, { status: 400 });
    }

    let draft: any = null;

    // Priority 1: lookup by draftId (fastest, from verification page)
    if (draftId) {
      const { data } = await supabase
        .from('registration_drafts_v2')
        .select('*')
        .eq('id', draftId)
        .single();
      draft = data;
    }

    // Priority 2: lookup by sessionToken
    if (!draft && sessionToken) {
      const { data } = await supabase
        .from('registration_drafts_v2')
        .select('*')
        .eq('session_token', sessionToken)
        .single();
      draft = data;
    }

    if (!draft && targetEmail) {
      const { data } = await supabase
        .from('registration_drafts_v2')
        .select('*')
        .eq('owner_email', targetEmail)
        .in('status', ['pending', 'draft'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      draft = data;
    }

    if (!draft) {
      return NextResponse.json({ success: true, message: 'Si un compte existe, un email a ete envoye.' });
    }

    if (draft.status === 'active') {
      return NextResponse.json({ success: true, message: 'Compte deja actif.' });
    }

    // Rate limiting
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    await supabase
      .from('otp_rate_limits')
      .delete()
      .eq('email', draft.owner_email)
      .eq('action', 'resend')
      .lt('window_start', windowStart);

    const { data: rateLimit } = await supabase
      .from('otp_rate_limits')
      .select('id, attempts')
      .eq('email', draft.owner_email)
      .eq('action', 'resend')
      .gte('window_start', windowStart)
      .order('window_start', { ascending: false })
      .limit(1)
      .single();

    if (rateLimit && rateLimit.attempts >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Trop de demandes. Reessayez dans 5 minutes.' }, { status: 429 });
    }

    if (rateLimit) {
      await supabase
        .from('otp_rate_limits')
        .update({ attempts: rateLimit.attempts + 1 })
        .eq('id', rateLimit.id);
    } else {
      await supabase
        .from('otp_rate_limits')
        .insert({ email: draft.owner_email, action: 'resend', attempts: 1 });
    }

    // Generate new token and HASH it (same as submit route)
    const rawToken = randomBytes(32).toString('hex');
    const hashedToken = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Update draft â€” store HASHED token (consistent with submit route)
    const { error: updateError } = await supabase
      .from('registration_drafts_v2')
      .update({
        status: 'pending',
        verification_token_hash: hashedToken,
        verification_sent_at: new Date().toISOString(),
        verification_expires_at: expiresAt,
      })
      .eq('id', draft.id);

    if (updateError) {
      console.error('[resend] Failed to store verification token hash:', updateError);
      return NextResponse.json({ error: 'Erreur de sauvegarde. RÃ©essayez.' }, { status: 500 });
    }

    // Send email
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('[resend] CRITICAL: RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Configuration email manquante' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
    // Include draft ID in URL (consistent with submit route)
    const verificationUrl = `${siteUrl}/verification?id=${draft.id}&token=${rawToken}`;
    const adminName = `${draft.owner_first_name} ${draft.owner_last_name}`;

    const plainText = `Bonjour ${adminName},\n\nConfirmez votre adresse e-mail EduCI pour ${draft.school_official_name} :\n\n${verificationUrl}\n\nCe lien expire dans ${TOKEN_EXPIRY_HOURS} heures.\n\nâ€” EduCI`;

    const emailResult = await sendEmail(
      resendKey,
      draft.owner_email,
      'Confirmez votre adresse e-mail â€” EduCI',
      buildConfirmationEmail(adminName, draft.school_official_name, verificationUrl),
      plainText
    );

    if (!emailResult.sent) {
      console.error('[resend] Email failed:', emailResult.error);
      return NextResponse.json({
        error: "Impossible d'envoyer l'email. Reessayez dans quelques instants.",
        code: 'EMAIL_SEND_FAILED',
      }, { status: 502 });
    }

    // Log resend
    await supabase.from('registration_audit_log').insert({
      draft_id: draft.id,
      event_type: 'verification_resent',
      event_data: { email: draft.owner_email },
    });

    return NextResponse.json({ success: true, message: 'Email de confirmation renvoye.' });
  } catch (error: any) {
    console.error('[resend] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function buildConfirmationEmail(name: string, schoolName: string, verificationUrl: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F0F2F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F0F2F5;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
        <tr><td align="center" style="padding-bottom:32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 50%,#8B5CF6 100%);border-radius:16px;padding:14px 28px;box-shadow:0 4px 14px rgba(79,70,229,0.4);">
              <span style="font-size:26px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;">Edu</span><span style="font-size:26px;font-weight:800;color:#FF8A00;letter-spacing:-0.5px;">CI</span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background-color:#FFFFFF;border-radius:16px;border:1px solid #E5E7EB;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr><td align="center" style="padding-bottom:24px;">
              <div style="background:linear-gradient(135deg,#EEF2FF,#E0E7FF);border-radius:50px;padding:16px 20px;display:inline-block;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4F46E5"/></svg>
              </div>
            </td></tr>
            <tr><td>
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#111827;text-align:center;">Confirmez votre adresse e-mail</h1>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Bonjour <strong>${name}</strong>,</p>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Merci d'avoir crÃ©Ã© un compte EduCI pour <strong>${schoolName}</strong>.</p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Cliquez sur le bouton ci-dessous pour activer votre compte :</p>
            </td></tr>
            <tr><td align="center" style="padding:16px 0 32px;">
              <a href="${verificationUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#FFFFFF;text-decoration:none;font-size:16px;font-weight:700;padding:16px 48px;border-radius:12px;box-shadow:0 4px 14px rgba(79,70,229,0.4);">Confirmer mon adresse e-mail</a>
            </td></tr>
            <tr><td>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FEF3C7;border-radius:10px;border:1px solid #FDE68A;">
                <tr><td style="padding:16px 20px;">
                  <p style="margin:0;font-size:13px;color:#92400E;line-height:1.5;">Ce lien expire dans <strong>${TOKEN_EXPIRY_HOURS} heures</strong>. Si vous n'etes pas a l'origine de cette demande, ignorez cet e-mail.</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="padding-top:16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F9FAFB;border-radius:10px;border:1px solid #F3F4F6;">
                <tr><td style="padding:16px 20px;">
                  <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.5;">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
                  <p style="margin:8px 0 0;font-size:12px;color:#4F46E5;word-break:break-all;">${verificationUrl}</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:32px 0 0;text-align:center;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#6B7280;"><a href="https://educi.live" style="color:#4F46E5;text-decoration:none;">educi.live</a></p>
          <p style="margin:0 0 8px;font-size:12px;color:#9CA3AF;">Plateforme intelligente de gestion scolaire</p>
          <p style="margin:0;font-size:11px;color:#D1D5DB;">Â© 2025 EduCI</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
