import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createHmac } from 'crypto';
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

async function findDraftByToken(supabase: any, token: string, draftId?: string | null) {
  const tokenHash = hashToken(token);

  // Try 1: lookup by draftId + hash
  if (draftId) {
    const { data, error } = await supabase
      .from('registration_drafts_v2')
      .select('*')
      .eq('id', draftId)
      .eq('verification_token_hash', tokenHash)
      .single();
    if (data && !error) return { draft: data, matchedHash: tokenHash };

    // Try 2: draftId + raw token (legacy unhashed tokens)
    const { data: legacy, error: legacyErr } = await supabase
      .from('registration_drafts_v2')
      .select('*')
      .eq('id', draftId)
      .eq('verification_token_hash', token)
      .single();
    if (legacy && !legacyErr) return { draft: legacy, matchedHash: token };
  }

  // Try 3: lookup by hash only (no draftId)
  const { data, error } = await supabase
    .from('registration_drafts_v2')
    .select('*')
    .eq('verification_token_hash', tokenHash)
    .single();
  if (data && !error) return { draft: data, matchedHash: tokenHash };

  // Try 4: lookup by raw token only (legacy unhashed tokens)
  const { data: legacy, error: legacyErr } = await supabase
    .from('registration_drafts_v2')
    .select('*')
    .eq('verification_token_hash', token)
    .single();
  if (legacy && !legacyErr) return { draft: legacy, matchedHash: token };

  return null;
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
    const { token, draftId } = body;

    if (!token || typeof token !== 'string' || token.length < 32) {
      return NextResponse.json({ error: 'Token invalide', code: 'INVALID_TOKEN' }, { status: 400 });
    }

    // Find draft with multi-hash fallback
    const result = await findDraftByToken(supabase, token, draftId);

    if (!result) {
      console.error('[verify] Draft not found for token', { draftId, tokenLen: token.length });

      // Check if draft exists by ID (hash mismatch due to env change, or token consumed)
      if (draftId) {
        const { data: existingDraft } = await supabase
          .from('registration_drafts_v2')
          .select('id, status, school_id, owner_email, verification_token_hash, verification_expires_at')
          .eq('id', draftId)
          .single();

        if (existingDraft) {
          if (existingDraft.status === 'active') {
            return NextResponse.json({
              success: true, alreadyActive: true,
              schoolId: existingDraft.school_id, email: existingDraft.owner_email,
              schoolName: '',
            });
          }
          if (!existingDraft.verification_token_hash) {
            return NextResponse.json({
              error: 'Ce lien a déjà été utilisé. Connectez-vous à votre compte.',
              code: 'TOKEN_CONSUMED',
            }, { status: 400 });
          }
          // Hash exists but doesn't match â€” check expiration first
          if (existingDraft.verification_expires_at && new Date(existingDraft.verification_expires_at) < new Date()) {
            return NextResponse.json({
              error: 'Ce lien a expiré. Veuillez en demander un nouveau.',
              code: 'EXPIRED',
              email: existingDraft.owner_email,
            }, { status: 400 });
          }
          // Hash mismatch but not expired â€” token doesn't match stored hash
          // Do NOT bypass verification: require user to request a new link
          console.warn('[verify] Hash mismatch for draft', draftId, 'â€” user must request a new link');
          return NextResponse.json({
            error: 'Lien invalide. Veuillez demander un nouveau lien de vérification.',
            code: 'HASH_MISMATCH',
            email: existingDraft.owner_email,
          }, { status: 400 });
        }
      }

      return NextResponse.json({ error: 'Lien invalide ou expiré.', code: 'INVALID_TOKEN' }, { status: 400 });
    }

    const { draft } = result;

    // Already activated
    if (draft.status === 'active') {
      return NextResponse.json({
        success: true, alreadyActive: true,
        schoolId: draft.school_id, email: draft.owner_email,
      });
    }

    // Expired
    if (draft.status === 'expired') {
      return NextResponse.json({ error: 'Ce lien a expiré.', code: 'EXPIRED', email: draft.owner_email }, { status: 400 });
    }

    if (draft.verification_expires_at && new Date(draft.verification_expires_at) < new Date()) {
      await supabase.from('registration_drafts_v2').update({ status: 'expired', verification_token_hash: null }).eq('id', draft.id);
      return NextResponse.json({ error: 'Ce lien a expiré.', code: 'EXPIRED', email: draft.owner_email }, { status: 400 });
    }

    // Not pending
    if (draft.status !== 'pending') {
      return NextResponse.json({ error: `Statut invalide: ${draft.status}`, code: 'INVALID_STATUS' }, { status: 400 });
    }

    // Activate â€” use the matchedHash that findDraftByToken already confirmed
    const { matchedHash } = result;
    const allTokensToTry = [matchedHash, hashToken(token), token].filter((v, i, a) => a.indexOf(v) === i);
    let activationResult: any = null;
    let activationError: any = null;

    for (const tokenHash of allTokensToTry) {
      const rpcResult = await supabase.rpc('enterprise_activate_school', {
        p_draft_id: draft.id,
        p_token_hash: tokenHash,
      });

      if (rpcResult.error) {
        activationError = rpcResult.error;
        if (activationError.message?.includes('permission denied')) break;
        continue;
      }

      // RPC executed successfully â€” parse the JSONB result
      let parsed: any = null;
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
        parsed = typeof rpcResult.data === 'string' ? JSON.parse(rpcResult.data) : rpcResult.data;
      } catch {
        parsed = { success: false, error: 'Invalid server response' };
      }

      if (parsed?.success) {
        activationResult = parsed;
        activationError = null;
        break;
      }

      // RPC returned {success: false, code: "INVALID_DRAFT"} â€” hash didn't match inside the function, try next
      if (parsed?.code === 'INVALID_DRAFT') continue;

      // Other RPC-level failure (e.g. TOKEN_EXPIRED, ACTIVATION_FAILED) â€” don't retry
      activationResult = parsed;
      activationError = null;
      break;
    }

    if (activationError) {
      console.error('[verify] Activation RPC error:', JSON.stringify(activationError, null, 2));
      return NextResponse.json({
        error: "Erreur lors de l'activation. Veuillez réessayer ou contacter le support.",
        code: 'RPC_ERROR',
        details: activationError.message || String(activationError),
      }, { status: 500 });
    }

    if (!activationResult) {
      activationResult = { success: false, error: 'Aucun hash ne correspond', code: 'HASH_MISMATCH' };
    }

    if (!activationResult.success) {
      console.error('[verify] Activation failed:', JSON.stringify(activationResult, null, 2));
      return NextResponse.json({
        error: activationResult.error || "Echec de l'activation",
        code: activationResult.code || 'ACTIVATION_FAILED',
      }, { status: 500 });
    }

    // DOUBLE CHECK: Ensure email_confirmed_at is set in auth.users
    const activatedUserId = activationResult.user_id;
    if (activatedUserId) {
      const { data: authCheck } = await supabase.auth.admin.getUserById(activatedUserId);
      if (authCheck?.user && !authCheck.user.email_confirmed_at) {
        console.warn('[verify] email_confirmed_at missing after activation, fixing...');
        await supabase.auth.admin.updateUserById(activatedUserId, {
          email_confirm: true,
          user_metadata: { ...authCheck.user.user_metadata, email_confirmed: true, is_active: true, school_id: activationResult.school_id, role: 'ADMIN' },
        });
      }
    }

    // Invalidate token
    await supabase.from('registration_drafts_v2').update({ verification_token_hash: null }).eq('id', draft.id);

    // Generate magic link
    let magicLink: string | null = null;
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
      const { data: linkData } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: draft.owner_email,
      });
      magicLink = linkData?.properties?.action_link || null;
    } catch (e) {
      console.warn('[verify] Could not generate magic link:', e);
    }

    return NextResponse.json({
      success: true,
      schoolId: activationResult.school_id,
      schoolCode: activationResult.school_code,
      schoolName: activationResult.school_name,
      userId: activationResult.user_id,
      email: activationResult.email,
      magicLink,
    });
  } catch (error: any) {
    console.error('[verify] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur', code: 'SERVER_ERROR' }, { status: 500 });
  }
}
