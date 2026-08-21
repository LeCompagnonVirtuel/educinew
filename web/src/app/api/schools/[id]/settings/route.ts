import { withSupabase } from '@supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 2];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: settings, error } = await supabase
    .from('schools')
    .select('language, timezone, currency, grading_system, passing_grade, academic_year, checkin_radius')
    .eq('id', id)
    .single();

  if (error || !settings) {
    return Response.json({ error: 'Établissement introuvable' }, { status: 404 });
  }

  return Response.json({
    language: settings.language || 'fr',
    timezone: settings.timezone || 'Africa/Abidjan',
    currency: settings.currency || 'XOF',
    dateFormat: 'DD/MM/YYYY',
    gradingSystem: settings.grading_system || '20',
    passingGrade: settings.passing_grade || 10,
    academicYear: settings.academic_year || '2025-2026',
    checkinRadius: settings.checkin_radius || 100,
    notifications: {},
    paymentSettings: {},
    academicSettings: {},
  });
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 2];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const updateData: Record<string, unknown> = {};
  if (body.language) updateData.language = body.language;
  if (body.timezone) updateData.timezone = body.timezone;
  if (body.currency) updateData.currency = body.currency;
  if (body.gradingSystem) updateData.grading_system = body.gradingSystem;
  if (body.passingGrade !== undefined) updateData.passing_grade = body.passingGrade;
  if (body.academicYear) updateData.academic_year = body.academicYear;
  if (body.checkinRadius !== undefined) updateData.checkin_radius = body.checkinRadius;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ error: 'Aucun paramètre à modifier' }, { status: 400 });
  }

  updateData.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('schools')
    .update(updateData)
    .eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
});
