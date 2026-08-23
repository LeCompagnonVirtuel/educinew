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
  if (!secret) throw new Error('VERIFICATION_SECRET is required. Generate with: openssl rand -hex 32');
  return secret;
}

const TOKEN_EXPIRY_HOURS = parseInt(process.env.VERIFICATION_TOKEN_EXPIRY_HOURS || '24', 10);
const EMAIL_FROM = process.env.EMAIL_FROM || 'EduCI <noreply@educi.live>';

function hashToken(token: string): string {
  return createHmac('sha256', getVerificationSecret()).update(token).digest('hex');
}

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

async function sendVerificationEmail(
  resendKey: string,
  to: string,
  adminName: string,
  schoolName: string,
  verificationUrl: string
): Promise<{ sent: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
          from: EMAIL_FROM,
          to: [to],
          subject: 'Confirmez votre adresse e-mail â€” EduCI',
          html: buildConfirmationEmail(adminName, schoolName, verificationUrl),
          text: `Bonjour ${adminName},\n\nMerci d'avoir créé un compte EduCI pour ${schoolName}.\n\nConfirmez votre adresse e-mail en cliquant sur ce lien :\n\n${verificationUrl}\n\nCe lien expire dans ${TOKEN_EXPIRY_HOURS} heures.\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.\n\nâ€” EduCI\nhttps://educi.live`,
        }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.message || `Resend HTTP ${response.status}`;
      console.error('[submit] Resend API error:', errorMsg);
      return { sent: false, error: errorMsg };
    }

    return { sent: true };
  } catch (err: any) {
    const errorMsg = err.name === 'AbortError' ? 'Email send timeout (15s)' : err.message;
    console.error('[submit] Email send failed:', errorMsg);
    return { sent: false, error: errorMsg };
  }
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
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { sessionToken, password } = body;

    if (!sessionToken || typeof sessionToken !== 'string' || sessionToken.length < 16) {
      return NextResponse.json({ error: 'Session token invalide' }, { status: 400 });
    }

    // Fetch draft
    const { data: draft, error: fetchError } = await supabase
      .from('registration_drafts_v2')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (fetchError || !draft) {
      console.error('[submit] Draft fetch failed:', fetchError?.message, fetchError?.code);
      return NextResponse.json({
        error: fetchError?.code === 'PGRST116'
          ? 'Brouillon introuvable. Veuillez recommencer l\'inscription.'
          : 'Erreur de connexion à la base de données. Réessayez.',
      }, { status: fetchError?.code === 'PGRST116' ? 404 : 500 });
    }

    if (draft.status === 'completed') {
      return NextResponse.json({
        error: 'Ce brouillon a déjà été validé. Connectez-vous à votre compte.',
        code: 'ALREADY_COMPLETED',
      }, { status: 400 });
    }

    // If status is 'pending', allow resending verification email
    const isResend = draft.status === 'pending';

    if (draft.status !== 'draft' && !isResend) {
      return NextResponse.json({
        error: 'Ce brouillon a déjà été soumis',
        code: 'ALREADY_SUBMITTED',
      }, { status: 400 });
    }

    // Validate required fields
    if (!draft.owner_email || !draft.owner_last_name || !draft.owner_first_name || !draft.school_official_name) {
      return NextResponse.json({ error: 'Informations incomplètes', code: 'INCOMPLETE' }, { status: 400 });
    }

    const normalizedEmail = draft.owner_email.toLowerCase().trim();

    let authUserId: string;

    if (isResend) {
      // Resend case: reuse existing auth user
      authUserId = draft.auth_user_id;
      if (!authUserId) {
        return NextResponse.json({ error: 'Utilisateur introuvable pour ce brouillon', code: 'NO_AUTH_USER' }, { status: 400 });
      }
    } else {
      // Check if email already exists in auth â€” search users table first (fast), then auth (fallback)
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', normalizedEmail)
        .single();

      if (existingUser) {
        // User exists in users table â€” use their ID
        authUserId = existingUser.id;
      } else {
        // Check auth.users via admin API (paginated search)
        let foundAuthUser: any = null;
        let page = 1;
        const perPage = 100;
        while (!foundAuthUser && page <= 10) {
          const { data: usersList } = await supabase.auth.admin.listUsers({ page, perPage });
          foundAuthUser = usersList?.users?.find(u => u.email?.toLowerCase() === normalizedEmail);
          if (!usersList?.users || usersList.users.length < perPage) break;
          page++;
        }

        if (foundAuthUser) {
          authUserId = foundAuthUser.id;
        } else {
          // Create auth user with user's chosen password
          const userPassword = password && typeof password === 'string' && password.length >= 8
            ? password
            : randomBytes(24).toString('hex'); // Fallback if password not provided

          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: normalizedEmail,
            password: userPassword,
            email_confirm: false,
            user_metadata: {
              name: `${draft.owner_first_name} ${draft.owner_last_name}`,
              role: 'ADMIN',
              registration_source: 'enterprise_wizard',
            },
          });

          if (createError || !newUser.user) {
            console.error('[submit] Auth user creation failed:', createError);
            if (createError?.message?.includes('already been registered')) {
              return NextResponse.json({ error: 'Un compte existe deja avec cet email' }, { status: 409 });
            }
            return NextResponse.json({ error: 'Impossible de creer le compte' }, { status: 500 });
          }

          authUserId = newUser.user.id;
        }
      }
    }

    // Generate verification token and hash it before storage
    const rawToken = generateToken();
    const hashedToken = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    // Update draft (store hashed token)
    const { data: updatedDraft, error: updateError } = await supabase
      .from('registration_drafts_v2')
      .update({
        status: 'pending',
        auth_user_id: authUserId,
        verification_token_hash: hashedToken,
        verification_sent_at: new Date().toISOString(),
        verification_expires_at: expiresAt,
      })
      .eq('session_token', sessionToken)
      .select('id')
      .single();

    if (updateError || !updatedDraft) {
      console.error('[submit] Failed to store verification token hash:', updateError);
      return NextResponse.json({
        error: 'Erreur lors de la sauvegarde. Veuillez réessayer.',
        code: 'DRAFT_UPDATE_FAILED',
      }, { status: 500 });
    }

    // Log submission
    await supabase.from('registration_audit_log').insert({
      draft_id: draft.id,
      event_type: isResend ? 'verification_email_resent' : 'draft_submitted',
      event_data: { auth_user_id: authUserId, email: normalizedEmail, is_resend: isResend },
    });

    // Send verification email
    const resendKey = process.env.RESEND_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
    // Include draft ID and token in URL for reliable lookup
    const draftId = updatedDraft?.id || draft.id;
    const verificationUrl = `${siteUrl}/verification?id=${draftId}&token=${rawToken}`;
    const adminName = `${draft.owner_first_name} ${draft.owner_last_name}`;
    const schoolName = draft.school_official_name;

    if (!resendKey) {
      console.error('[submit] CRITICAL: RESEND_API_KEY not configured');
      // Still save the draft but return error about email
      return NextResponse.json({
        error: 'Configuration email manquante. Contactez le support.',
        code: 'EMAIL_CONFIG_MISSING',
      }, { status: 500 });
    }

    const emailResult = await sendVerificationEmail(resendKey, normalizedEmail, adminName, schoolName, verificationUrl);

    if (!emailResult.sent) {
      console.error('[submit] Email failed to send:', emailResult.error);
      // Revert draft status back to draft so user can retry
      await supabase
        .from('registration_drafts_v2')
        .update({ status: 'draft' })
        .eq('session_token', sessionToken);

      return NextResponse.json({
        error: "Impossible d'envoyer l'email de confirmation. Réessayez dans quelques instants.",
        code: 'EMAIL_SEND_FAILED',
      }, { status: 502 });
    }

    // Log email sent
    await supabase.from('registration_audit_log').insert({
      draft_id: draft.id,
      event_type: 'verification_email_sent',
      event_data: { email: normalizedEmail },
    });

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      status: 'pending',
    });
  } catch (error: any) {
    console.error('[submit] Error:', error);
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
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Merci d'avoir créé un compte EduCI pour <strong>${schoolName}</strong>.</p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#6B7280;text-align:center;">Cliquez sur le bouton ci-dessous pour activer votre compte et votre établissement :</p>
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
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FEF3C7;border-radius:10px;border:1px solid #FDE68A;">
                <tr><td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:13px;color:#92400E;font-weight:600;">Lien de confirmation :</p>
                  <p style="margin:0;font-size:12px;color:#92400E;line-height:1.5;">Copiez et collez ce lien dans votre navigateur si le bouton ne fonctionne pas :</p>
                  <p style="margin:8px 0 0;font-size:13px;color:#4F46E5;word-break:break-all;font-weight:600;background-color:#FFFFFF;padding:10px;border-radius:8px;border:1px solid #E5E7EB;">${verificationUrl}</p>
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
