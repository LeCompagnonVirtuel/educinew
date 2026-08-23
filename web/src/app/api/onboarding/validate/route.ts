import { withSupabase } from '@/lib/supabase/server';
import {
  GeneralInfoSchema, AdminInfoSchema, AcademicConfigSchema,
  PedagogicStructureSchema, DirectorSchema, ModulesSchema, BrandingSchema,
} from '@/features/onboarding/validators';

const stepSchemas: Record<string, any> = {
  general_info: GeneralInfoSchema,
  admin_info: AdminInfoSchema,
  academic_config: AcademicConfigSchema,
  pedagogic_structure: PedagogicStructureSchema,
  director_creation: DirectorSchema,
  modules: ModulesSchema,
  branding: BrandingSchema,
};

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await req.json();
  const { step, data, onboardingId } = body;

  if (!step || !stepSchemas[step]) {
    return Response.json({ error: 'Étape invalide' }, { status: 400 });
  }

  if (!onboardingId) {
    return Response.json({ error: 'ID d\'onboarding requis' }, { status: 400 });
  }

  const { data: draft } = await supabase
    .from('onboarding_drafts')
    .select('*')
    .eq('id', onboardingId)
    .eq('user_id', user.id)
    .single();

  if (!draft) {
    return Response.json({ error: 'Onboarding introuvable' }, { status: 404 });
  }

  const schema = stepSchemas[step];
  const validation = schema.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const currentData = draft.data || {};
  const stepKeyMap: Record<string, string> = {
    general_info: 'generalInfo',
    admin_info: 'adminInfo',
    academic_config: 'academicConfig',
    pedagogic_structure: 'pedagogicStructure',
    director_creation: 'director',
    modules: 'modules',
    branding: 'branding',
  };

  const stepKey = stepKeyMap[step];
  const updatedData = {
    ...currentData,
    [stepKey]: { ...(currentData[stepKey] || {}), ...validation.data },
  };

  const currentProgress = draft.progress || {};
  const completedSteps = [...new Set([...(currentProgress.completedSteps || []), step])];

  const { error } = await supabase
    .from('onboarding_drafts')
    .update({
      data: updatedData,
      progress: {
        ...currentProgress,
        currentStep: step,
        completedSteps,
        updatedAt: new Date().toISOString(),
      },
      updated_at: new Date().toISOString(),
    })
    .eq('id', onboardingId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true, step, completedSteps });
});
