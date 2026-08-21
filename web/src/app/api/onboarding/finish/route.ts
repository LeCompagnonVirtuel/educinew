import { withSupabase } from '@supabase/server';
import { CompleteOnboardingSchema } from '@/features/onboarding/validators';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await req.json();
  const validation = CompleteOnboardingSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const { onboardingId } = validation.data;

  const { data: draft } = await supabase
    .from('onboarding_drafts')
    .select('*')
    .eq('id', onboardingId)
    .eq('user_id', user.id)
    .single();

  if (!draft) {
    return Response.json({ error: 'Onboarding introuvable' }, { status: 404 });
  }

  if (draft.status === 'COMPLETED') {
    return Response.json({ error: 'Onboarding déjà terminé' }, { status: 409 });
  }

  const data = draft.data;
  const missingFields: string[] = [];

  if (!data.generalInfo?.name) missingFields.push('generalInfo.name');
  if (!data.generalInfo?.email) missingFields.push('generalInfo.email');
  if (!data.adminInfo?.schoolType) missingFields.push('adminInfo.schoolType');
  if (!data.academicConfig?.academicYear) missingFields.push('academicConfig.academicYear');
  if (!data.director?.firstName) missingFields.push('director.firstName');
  if (!data.director?.lastName) missingFields.push('director.lastName');
  if (!data.director?.email) missingFields.push('director.email');
  if (!data.director?.password) missingFields.push('director.password');

  if (missingFields.length > 0) {
    return Response.json({
      error: 'Champs obligatoires manquants',
      missingFields,
    }, { status: 400 });
  }

  const { data: school, error: schoolError } = await supabase
    .from('schools')
    .insert({
      name: data.generalInfo.name,
      code: data.generalInfo.code || null,
      email: data.generalInfo.email,
      phone: data.generalInfo.phone || null,
      address: data.generalInfo.address || null,
      city: data.generalInfo.city || null,
      region: data.generalInfo.region || null,
      country: data.generalInfo.country || "Côte d'Ivoire",
      latitude: data.generalInfo.latitude || null,
      longitude: data.generalInfo.longitude || null,
      logo_url: data.generalInfo.logoUrl || null,
      primary_color: data.branding?.colorPrimary || '#1E40AF',
      secondary_color: data.branding?.colorSecondary || '#3B82F6',
      academic_year: data.academicConfig.academicYear,
      grading_system: data.academicConfig.gradingSystem,
      passing_grade: data.academicConfig.passingGrade,
      language: data.adminInfo.languages?.[0] || 'fr',
      timezone: data.adminInfo.timezone || 'Africa/Abidjan',
      currency: data.adminInfo.currency || 'XOF',
      is_active: true,
    })
    .select()
    .single();

  if (schoolError || !school) {
    return Response.json({ error: schoolError?.message || 'Erreur création école' }, { status: 400 });
  }

  const { error: updateDraftError } = await supabase
    .from('onboarding_drafts')
    .update({
      status: 'COMPLETED',
      school_id: school.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', onboardingId);

  if (updateDraftError) {
    return Response.json({ error: updateDraftError.message }, { status: 400 });
  }

  return Response.json({
    success: true,
    schoolId: school.id,
    message: 'École créée avec succès',
  }, { status: 201 });
});
