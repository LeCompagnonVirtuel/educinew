import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'dispostable.com', 'tempail.com', 'tempr.email', 'temp-mail.org',
  'fakeinbox.com', 'trashmail.com', 'maildrop.cc', 'discard.email',
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.some(d => domain === d || domain.endsWith('.' + d));
}

function isForbiddenDomain(email: string): boolean {
  const forbidden = ['test.com', 'example.com', 'localhost'];
  const domain = email.split('@')[1]?.toLowerCase();
  return forbidden.includes(domain);
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
    const { sessionToken } = await request.json();

    if (!sessionToken) {
      return NextResponse.json({ error: 'Session token requis' }, { status: 400 });
    }

    // Fetch draft
    const { data: draft, error: fetchError } = await supabase
      .from('registration_drafts_v2')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (fetchError || !draft) {
      return NextResponse.json({ error: 'Brouillon introuvable' }, { status: 404 });
    }

    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 0;
    const total = 50;

    // === OWNER VALIDATIONS ===
    // Email
    if (!draft.owner_email) {
      errors.push('Email du propriétaire requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.owner_email)) {
      errors.push('Format email invalide');
    } else if (isDisposableEmail(draft.owner_email)) {
      errors.push('Les emails jetables ne sont pas autorisés');
    } else if (isForbiddenDomain(draft.owner_email)) {
      errors.push('Domaine email non autorisé');
    } else {
      score += 2;
      // Check uniqueness
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', draft.owner_email.toLowerCase().trim())
        .single();
      if (existingUser) {
        errors.push('Un compte existe déjà avec cet email');
      } else {
        score += 1;
      }
    }

    // Last name
    if (!draft.owner_last_name || draft.owner_last_name.length < 2) {
      errors.push('Nom du propriétaire requis (min 2 caractères)');
    } else {
      score += 2;
    }

    // First name
    if (!draft.owner_first_name || draft.owner_first_name.length < 2) {
      errors.push('Prénom du propriétaire requis (min 2 caractères)');
    } else {
      score += 2;
    }

    // Phone
    if (draft.owner_phone) {
      score += 1;
      // Check uniqueness
      const { data: existingPhone } = await supabase
        .from('users')
        .select('id')
        .eq('phone', draft.owner_phone)
        .single();
      if (existingPhone) {
        warnings.push('Ce numéro de téléphone est déjà utilisé');
      } else {
        score += 1;
      }
    }

    // Gender
    if (draft.owner_gender) score += 1;
    // Nationality
    if (draft.owner_nationality) score += 1;

    // === SCHOOL VALIDATIONS ===
    if (!draft.school_official_name || draft.school_official_name.length < 3) {
      errors.push("Nom de l'établissement requis (min 3 caractères)");
    } else {
      score += 2;
      // Check school name uniqueness
      const { data: existingSchool } = await supabase
        .from('schools')
        .select('id')
        .ilike('name', draft.school_official_name)
        .single();
      if (existingSchool) {
        warnings.push("Un établissement avec ce nom existe déjà");
      } else {
        score += 1;
      }
    }

    if (!draft.school_type) {
      errors.push("Type d'établissement requis");
    } else {
      score += 2;
    }

    if (draft.school_visibility) score += 1;
    if (draft.school_acronym) score += 1;
    if (draft.school_rccm) score += 1;
    if (draft.school_fiscal_number) score += 1;

    // === LOCATION VALIDATIONS ===
    if (!draft.location_country) {
      errors.push('Pays requis');
    } else {
      score += 2;
    }

    if (!draft.location_city || draft.location_city.length < 2) {
      errors.push('Ville requise');
    } else {
      score += 2;
    }

    if (draft.location_region) score += 1;
    if (draft.location_commune) score += 1;
    if (draft.location_full_address) score += 1;

    // GPS validation
    if (draft.location_latitude && draft.location_longitude) {
      if (draft.location_latitude >= -90 && draft.location_latitude <= 90 &&
          draft.location_longitude >= -180 && draft.location_longitude <= 180) {
        score += 2;
      } else {
        warnings.push('Coordonnées GPS invalides');
      }
    }

    // === CONTACTS VALIDATIONS ===
    if (draft.contact_phone_primary) score += 2;
    if (draft.contact_email_primary) score += 2;
    if (draft.contact_website) score += 1;

    // === BRANDING VALIDATIONS ===
    if (draft.branding_primary_color) score += 2;
    if (draft.branding_secondary_color) score += 1;
    if (draft.branding_logo_url) score += 2;
    if (draft.branding_typography) score += 1;
    if (draft.branding_theme) score += 1;

    // === ACADEMIC VALIDATIONS ===
    score += 1; // Academic year auto-generated
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
      const cycles = typeof draft.academic_cycles === 'string' ? JSON.parse(draft.academic_cycles) : draft.academic_cycles;
      if (Array.isArray(cycles) && cycles.length > 0) score += 1;
    } catch { /* invalid JSON, skip */ }
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
      const levels = typeof draft.academic_levels === 'string' ? JSON.parse(draft.academic_levels) : draft.academic_levels;
      if (Array.isArray(levels) && levels.length > 0) score += 1;
    } catch { /* invalid JSON, skip */ }

    // === MODULES VALIDATIONS ===
    let modules: string[] = [];
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
      modules = typeof draft.modules === 'string' ? JSON.parse(draft.modules) : draft.modules;
    } catch { /* invalid JSON */ }
    if (Array.isArray(modules) && modules.length > 0) {
      score += 2;
    } else {
      errors.push('Au moins un module requis');
    }

    // === PAYMENTS VALIDATIONS ===
    if (draft.payment_mobile_money || draft.payment_bank_cards || draft.payment_cash) {
      score += 2;
    }

    // === SECURITY VALIDATIONS ===
    if (draft.security_level) score += 1;
    if (draft.security_max_admins > 0) score += 1;

    const percentage = Math.round((score / total) * 100);
    const isValid = errors.length === 0;

    // Save validation results
    await supabase
      .from('registration_drafts_v2')
      .update({
        validation_results: JSON.stringify({ errors, warnings, score, total, percentage }),
        validation_score: percentage,
      })
      .eq('session_token', sessionToken);

    return NextResponse.json({
      valid: isValid,
      errors,
      warnings,
      score,
      total,
      percentage,
      canSubmit: isValid && percentage >= 60,
    });
  } catch (error: any) {
    console.error('[validate] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
