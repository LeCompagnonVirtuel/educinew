import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import { NextRequest, NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';
export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
function getVerificationSecret(): string {
  const secret = process.env.VERIFICATION_SECRET;
  if (!secret) throw new Error('VERIFICATION_SECRET is required. Generate with: openssl rand -hex 32');
  return secret;
}

const GENERIC_MESSAGE = 'Si un compte existe avec cette adresse, un e-mail de confirmation a été envoyé.';
const TOKEN_EXPIRY_HOURS = 24;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

function hashToken(token: string): string {
  return createHmac('sha256', getVerificationSecret()).update(token).digest('hex');
}

async function checkRateLimitDB(supabase: any, email: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  await supabase
    .from('otp_rate_limits')
    .delete()
    .eq('email', email)
    .eq('action', 'send')
    .lt('window_start', windowStart);

  const { data: existing } = await supabase
    .from('otp_rate_limits')
    .select('id, attempts')
    .eq('email', email)
    .eq('action', 'send')
    .gte('window_start', windowStart)
    .order('window_start', { ascending: false })
    .limit(1)
    .single();

  if (existing && existing.attempts >= RATE_LIMIT_MAX) {
    return false;
  }

  if (existing) {
    await supabase
      .from('otp_rate_limits')
      .update({ attempts: existing.attempts + 1 })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('otp_rate_limits')
      .insert({ email, action: 'send', attempts: 1 });
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    // Rate limiting
    const allowed = await checkRateLimitDB(supabase, normalizedEmail);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez dans 5 minutes.' },
        { status: 429 }
      );
    }

    // Find user
    let user: any = null;
    const { data: userRecord } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .single();

    if (userRecord) {
      const { data: { user: authUser } } = await supabase.auth.admin.getUserById(userRecord.id);
      user = authUser;
    }

    if (!user) {
      const { data: { users: recentUsers } } = await supabase.auth.admin.listUsers({ page: 1, perPage: 50 });
      user = recentUsers?.find((u: any) => u.email === normalizedEmail) || null;
    }

    if (!user) {
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    if (user.email_confirmed_at) {
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    // Check if the user has an active enterprise registration (draft active but email not confirmed in auth)
    const { data: activeDraft } = await supabase
      .from('registration_drafts_v2')
      .select('id, status, school_id')
      .eq('auth_user_id', user.id)
      .eq('status', 'active')
      .limit(1)
      .single();

    if (activeDraft) {
      // Draft is active = school was created, but email_confirmed_at is missing in auth.users
      // Fix it now by confirming the email directly
      await supabase.auth.admin.updateUserById(user.id, {
        email_confirm: true,
        user_metadata: { ...user.user_metadata, email_confirmed: true, is_active: true },
      });

      // Also ensure the users table is consistent
      await supabase
        .from('users')
        .update({ email_verified: true, email_verified_at: new Date().toISOString(), is_active: true, status: 'ACTIVE' })
        .eq('id', user.id);

      return NextResponse.json({ success: true, message: 'Votre email a été confirmé. Vous pouvez maintenant vous connecter.', emailConfirmed: true });
    }

    // Check if user has a pending enterprise draft — redirect to registration/resend flow
    const { data: pendingDraft } = await supabase
      .from('registration_drafts_v2')
      .select('id, status')
      .eq('auth_user_id', user.id)
      .in('status', ['pending', 'draft'])
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (pendingDraft) {
      // Call registration/resend internally to send the proper enterprise verification email
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
      const resendResponse = await fetch(`${siteUrl}/api/registration/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, draftId: pendingDraft.id }),
      });
      const resendData = await resendResponse.json().catch(() => ({}));
      return NextResponse.json({ success: true, message: 'Email de confirmation renvoyé.' });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('[resend-confirmation] RESEND_API_KEY not configured');
      return NextResponse.json({ success: false, error: 'Configuration email manquante.' }, { status: 500 });
    }

    // Generate verification token
    const rawToken = generateVerificationToken();
    const hashedToken = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Invalidate previous tokens for this user
    await supabase
      .from('users')
      .update({ verification_token: null, verification_expires_at: null })
      .eq('id', user.id)
      .not('verification_token', 'is', null);

    // Store hashed token on user
    await supabase
      .from('users')
      .update({
        verification_token: hashedToken,
        verification_sent_at: new Date().toISOString(),
        verification_expires_at: expiresAt,
      })
      .eq('id', user.id);

    // Also invalidate old OTP tokens
    await supabase
      .from('email_confirmation_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('used_at', null);

    // Build verification URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
    const verificationUrl = `${siteUrl}/verification?token=${rawToken}`;

    // Get school name from draft for the email
    const { data: draft } = await supabase
      .from('onboarding_drafts')
      .select('school_name')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const adminName = user.user_metadata?.name || normalizedEmail.split('@')[0];
    const schoolName = draft?.school_name || 'Votre établissement';

    // Send email with verification link
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'EduCI <noreply@educi.live>',
        to: [normalizedEmail],
        subject: 'Confirmez votre adresse e-mail — EduCI',
        html: buildConfirmationEmail(adminName, schoolName, verificationUrl),
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json().catch(() => ({}));
      console.error('[resend-confirmation] Resend error:', errorData);
      return NextResponse.json({
        success: false,
        error: 'Impossible d\'envoyer l\'email. Réessayez dans quelques instants.',
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error: any) {
    console.error('[resend-confirmation] Fatal error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur serveur lors de l\'envoi de l\'email.',
    }, { status: 500 });
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
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Merci d'avoir créé un compte EduCI pour <strong>${schoolName}</strong>.</p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Cliquez sur le bouton ci-dessous pour activer votre compte :</p>
            </td></tr>
            <tr><td align="center" style="padding:16px 0 32px;">
              <a href="${verificationUrl}" style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#FFFFFF;text-decoration:none;font-size:16px;font-weight:700;padding:16px 48px;border-radius:12px;box-shadow:0 4px 14px rgba(79,70,229,0.4);">Confirmer mon adresse e-mail</a>
            </td></tr>
            <tr><td>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FEF3C7;border-radius:10px;border:1px solid #FDE68A;">
                <tr><td style="padding:16px 20px;">
                  <p style="margin:0;font-size:13px;color:#92400E;line-height:1.5;">⏱️ Ce lien expire dans <strong>24 heures</strong>. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
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
          <p style="margin:0;font-size:11px;color:#D1D5DB;">© 2025 EduCI — L'équipe EduCI</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
