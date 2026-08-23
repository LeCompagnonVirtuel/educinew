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
    const { sessionToken, step, data } = body;

    if (!sessionToken || typeof sessionToken !== 'string' || sessionToken.length < 16) {
      return NextResponse.json({ error: 'Session token requis (format invalide)' }, { status: 400 });
    }

    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Verify the session token belongs to an existing draft (prevents guessing)
    const { data: existingCheck } = await supabase
      .from('registration_drafts_v2')
      .select('id, created_at')
      .eq('session_token', sessionToken)
      .single();

    // For new drafts, verify the token was generated recently (anti-abuse)
    if (!existingCheck) {
      const tokenTimestamp = parseInt(sessionToken.split('_').pop() || '0', 10);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      if (Date.now() - tokenTimestamp > maxAge && tokenTimestamp > 0) {
        return NextResponse.json({ error: 'Session expirée, veuillez recommencer' }, { status: 403 });
      }
    }

    // Build update object based on step data
    const updateData: Record<string, any> = {
      current_step: step,
      updated_at: new Date().toISOString(),
    };

    // Map step data to columns
    if (data.personal) {
      if (data.personal.civility !== undefined) updateData.owner_civility = data.personal.civility;
      if (data.personal.lastName !== undefined) updateData.owner_last_name = data.personal.lastName;
      if (data.personal.firstName !== undefined) updateData.owner_first_name = data.personal.firstName;
      if (data.personal.dateOfBirth !== undefined) updateData.owner_date_of_birth = data.personal.dateOfBirth || null;
      if (data.personal.gender !== undefined) updateData.owner_gender = data.personal.gender;
      if (data.personal.nationality !== undefined) updateData.owner_nationality = data.personal.nationality;
      if (data.personal.photoUrl !== undefined) updateData.owner_photo_url = data.personal.photoUrl;
      if (data.personal.phone !== undefined) updateData.owner_phone = data.personal.phone;
      if (data.personal.whatsapp !== undefined) updateData.owner_whatsapp = data.personal.whatsapp;
      if (data.personal.email !== undefined) updateData.owner_email = data.personal.email;
      if (data.personal.securityQuestion !== undefined) updateData.owner_security_question = data.personal.securityQuestion;
      if (data.personal.securityAnswer !== undefined) updateData.owner_security_answer = data.personal.securityAnswer;
    }

    if (data.school) {
      if (data.school.officialName !== undefined) updateData.school_official_name = data.school.officialName;
      if (data.school.commercialName !== undefined) updateData.school_commercial_name = data.school.commercialName;
      if (data.school.acronym !== undefined) updateData.school_acronym = data.school.acronym;
      if (data.school.type !== undefined) updateData.school_type = data.school.type;
      if (data.school.visibility !== undefined) updateData.school_visibility = data.school.visibility;
      if (data.school.ministry !== undefined) updateData.school_ministry = data.school.ministry;
      if (data.school.rccm !== undefined) updateData.school_rccm = data.school.rccm;
      if (data.school.taxNumber !== undefined) updateData.school_fiscal_number = data.school.taxNumber;
      if (data.school.creationDate !== undefined) updateData.school_creation_date = data.school.creationDate || null;
      if (data.school.authorizationNumber !== undefined) updateData.school_authorization_number = data.school.authorizationNumber;
    }

    if (data.location) {
      if (data.location.country !== undefined) updateData.location_country = data.location.country;
      if (data.location.region !== undefined) updateData.location_region = data.location.region;
      if (data.location.city !== undefined) updateData.location_city = data.location.city;
      if (data.location.commune !== undefined) updateData.location_commune = data.location.commune;
      if (data.location.quarter !== undefined) updateData.location_quarter = data.location.quarter;
      if (data.location.fullAddress !== undefined) updateData.location_full_address = data.location.fullAddress;
      if (data.location.postalCode !== undefined) updateData.location_postal_code = data.location.postalCode;
      if (data.location.latitude !== undefined) updateData.location_latitude = data.location.latitude || null;
      if (data.location.longitude !== undefined) updateData.location_longitude = data.location.longitude || null;
    }

    if (data.contacts) {
      if (data.contacts.phonePrimary !== undefined) updateData.contact_phone_primary = data.contacts.phonePrimary;
      if (data.contacts.phoneSecondary !== undefined) updateData.contact_phone_secondary = data.contacts.phoneSecondary;
      if (data.contacts.whatsapp !== undefined) updateData.contact_whatsapp = data.contacts.whatsapp;
      if (data.contacts.emailPrimary !== undefined) updateData.contact_email_primary = data.contacts.emailPrimary;
      if (data.contacts.emailAdmin !== undefined) updateData.contact_email_admin = data.contacts.emailAdmin;
      if (data.contacts.website !== undefined) updateData.contact_website = data.contacts.website;
      if (data.contacts.facebook !== undefined) updateData.contact_facebook = data.contacts.facebook;
      if (data.contacts.linkedin !== undefined) updateData.contact_linkedin = data.contacts.linkedin;
      if (data.contacts.instagram !== undefined) updateData.contact_instagram = data.contacts.instagram;
      if (data.contacts.youtube !== undefined) updateData.contact_youtube = data.contacts.youtube;
      if (data.contacts.twitter !== undefined) updateData.contact_twitter = data.contacts.twitter;
    }

    if (data.branding) {
      if (data.branding.logoUrl !== undefined) updateData.branding_logo_url = data.branding.logoUrl;
      if (data.branding.logoMonoUrl !== undefined) updateData.branding_logo_mono_url = data.branding.logoMonoUrl;
      if (data.branding.iconUrl !== undefined) updateData.branding_icon_url = data.branding.iconUrl;
      if (data.branding.signatureUrl !== undefined) updateData.branding_signature_url = data.branding.signatureUrl;
      if (data.branding.stampUrl !== undefined) updateData.branding_stamp_url = data.branding.stampUrl;
      if (data.branding.primaryColor !== undefined) updateData.branding_primary_color = data.branding.primaryColor;
      if (data.branding.secondaryColor !== undefined) updateData.branding_secondary_color = data.branding.secondaryColor;
      if (data.branding.accentColor !== undefined) updateData.branding_accent_color = data.branding.accentColor;
      if (data.branding.buttonColor !== undefined) updateData.branding_button_color = data.branding.buttonColor;
      if (data.branding.dashboardColor !== undefined) updateData.branding_dashboard_color = data.branding.dashboardColor;
      if (data.branding.theme !== undefined) updateData.branding_theme = data.branding.theme;
      if (data.branding.typography !== undefined) updateData.branding_typography = data.branding.typography;
      if (data.branding.slogan !== undefined) updateData.branding_slogan = data.branding.slogan;
      if (data.branding.motto !== undefined) updateData.branding_motto = data.branding.motto;
      if (data.branding.description !== undefined) updateData.branding_description = data.branding.description;
    }

    if (data.academic) {
      if (data.academic.academicYear !== undefined) updateData.academic_year_name = data.academic.academicYear;
      if (data.academic.cycles !== undefined) updateData.academic_cycles = data.academic.cycles;
      if (data.academic.levels !== undefined) updateData.academic_levels = data.academic.levels;
      if (data.academic.classes !== undefined) updateData.academic_classes = data.academic.classes;
      if (data.academic.subjects !== undefined) updateData.academic_subjects = data.academic.subjects;
      if (data.academic.gradingSystem !== undefined) updateData.academic_grading_system = data.academic.gradingSystem;
      if (data.academic.periodType !== undefined) updateData.academic_period_type = data.academic.periodType;
    }

    if (data.modules !== undefined) updateData.modules = data.modules;

    if (data.payments) {
      if (data.payments.mobileMoney !== undefined) updateData.payment_mobile_money = data.payments.mobileMoney;
      if (data.payments.bankCards !== undefined) updateData.payment_bank_cards = data.payments.bankCards;
      if (data.payments.transfers !== undefined) updateData.payment_transfers = data.payments.transfers;
      if (data.payments.cash !== undefined) updateData.payment_cash = data.payments.cash;
      if (data.payments.moneyFusionUrl !== undefined) updateData.payment_money_fusion_url = data.payments.moneyFusionUrl;
    }

    if (data.security) {
      if (data.security.maxAdmins !== undefined) updateData.security_max_admins = Number(data.security.maxAdmins) || 3;
      if (data.security.allowDelegation !== undefined) updateData.security_allow_delegation = data.security.allowDelegation;
      if (data.security.securityLevel !== undefined) updateData.security_level = data.security.securityLevel;
      if (data.security.twoFactorEnabled !== undefined) updateData.security_two_factor = data.security.twoFactorEnabled;
    }

    // Update completed steps
    if (step !== undefined) {
      const { data: existing } = await supabase
        .from('registration_drafts_v2')
        .select('completed_steps')
        .eq('session_token', sessionToken)
        .single();

      let completedSteps: number[] = [];
      if (existing?.completed_steps) {
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
          const raw = existing.completed_steps;
          completedSteps = Array.isArray(raw) ? raw : JSON.parse(raw);
        } catch {
          completedSteps = [];
        }
      }
      if (!completedSteps.includes(step)) {
        updateData.completed_steps = [...completedSteps, step];
      }
    }

    // Upsert draft
    const { data: existingDraft } = await supabase
      .from('registration_drafts_v2')
      .select('id')
      .eq('session_token', sessionToken)
      .single();

    if (existingDraft) {
      const { error: updateError } = await supabase
        .from('registration_drafts_v2')
        .update(updateData)
        .eq('session_token', sessionToken);

      if (updateError) {
        console.error('[save-draft] Update failed:', updateError);
        return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 });
      }
    } else {
      updateData.session_token = sessionToken;
      updateData.status = 'draft';
      const { error: insertError } = await supabase
        .from('registration_drafts_v2')
        .insert(updateData);

      if (insertError) {
        console.error('[save-draft] Insert failed:', insertError);
        return NextResponse.json({ error: 'Erreur lors de la création du brouillon' }, { status: 500 });
      }
    }

    // Log save event
    if (existingDraft) {
      await supabase.from('registration_audit_log').insert({
        draft_id: existingDraft.id,
        event_type: 'draft_saved',
        event_data: { step },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[save-draft] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
