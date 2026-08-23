import { withSupabase } from '@/lib/supabase/server';
import { GeneralInfoSchema, AdminInfoSchema, AcademicConfigSchema, PedagogicStructureSchema, DirectorSchema, ModulesSchema, BrandingSchema, OnboardingDataSchema } from '@/features/onboarding/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: draft } = await supabase
    .from('onboarding_drafts')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['DRAFT', 'IN_PROGRESS'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!draft) {
    return Response.json({ data: null, message: 'Aucun onboarding en cours' });
  }

  return Response.json({
    data: {
      id: draft.id,
      userId: draft.user_id,
      status: draft.status,
      data: draft.data,
      progress: draft.progress,
      createdAt: draft.created_at,
      updatedAt: draft.updated_at,
    },
  });
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const existing = await supabase
    .from('onboarding_drafts')
    .select('id, status')
    .eq('user_id', user.id)
    .in('status', ['DRAFT', 'IN_PROGRESS'])
    .maybeSingle();

  if (existing.data) {
    return Response.json({ data: existing.data, message: 'Onboarding existant' });
  }

  const now = new Date().toISOString();
  const defaultData = {
    generalInfo: { name: '', email: '', country: "Côte d'Ivoire" },
    adminInfo: { schoolType: 'PRIVE', languages: ['fr'], currency: 'XOF', timezone: 'Africa/Abidjan' },
    academicConfig: {
      academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      yearStartDate: '', yearEndDate: '',
      termsCount: 3, semestersCount: 2, gradingSystem: 'FRENCH_20',
      passingGrade: 10, mentionThresholds: { 'Bien': 14, 'Très Bien': 16, 'Excellent': 18 },
      coefficientSystem: false,
    },
    pedagogicStructure: { levels: [] },
    director: { firstName: '', lastName: '', email: '', password: '' },
    modules: {
      payments: false, transport: false, library: false, cafeteria: false,
      health: false, discipline: false, marketplace: false, hr: false,
      gps: false, exams: true, sms: false, ai: false,
    },
    branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
  };

  const progress = {
    currentStep: 'general_info',
    completedSteps: [],
    startedAt: now,
    updatedAt: now,
  };

  const { data: draft, error } = await supabase
    .from('onboarding_drafts')
    .insert({
      user_id: user.id,
      status: 'IN_PROGRESS',
      data: defaultData,
      progress,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    data: {
      id: draft.id,
      userId: draft.user_id,
      status: draft.status,
      data: draft.data,
      progress: draft.progress,
      createdAt: draft.created_at,
      updatedAt: draft.updated_at,
    },
  }, { status: 201 });
});
