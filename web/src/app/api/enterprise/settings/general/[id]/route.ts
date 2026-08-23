import { NextRequest, NextResponse } from 'next/server';
import { withSupabase } from '@supabase/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { EntGeneralSettingService } from '@/features/enterprise/services/ent-settings-general.service';

async function checkSchoolAccess(supabase: any, schoolId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Non authentifié', status: 401 };

  const { data: userSchool } = await supabase
    .from('user_schools')
    .select('school_id')
    .eq('user_id', user.id)
    .eq('school_id', schoolId)
    .single();

  if (!userSchool) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'SUPER_ADMIN') {
      return { error: 'Non autorisé', status: 403 };
    }
  }

  return null;
}

export const GET = withSupabase({ auth: 'user' }, async (req: NextRequest, ctx: any) => {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const url = new URL(req.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    const { searchParams } = url;
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const accessError = await checkSchoolAccess(supabase, schoolId);
    if (accessError) return NextResponse.json({ error: accessError.error }, { status: accessError.status });

    const serviceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntGeneralSettingService(serviceClient);
    const data = await service.getGeneralSetting(schoolId, parentId, id!);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
});

export const PUT = withSupabase({ auth: 'user' }, async (req: NextRequest, ctx: any) => {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const url = new URL(req.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    const body = await req.json();
    const schoolId = body.schoolId;
    const parentId = body.parentId;
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const accessError = await checkSchoolAccess(supabase, schoolId);
    if (accessError) return NextResponse.json({ error: accessError.error }, { status: accessError.status });

    const serviceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntGeneralSettingService(serviceClient);
    const data = await service.updateGeneralSetting(schoolId, parentId, id!, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
});

export const DELETE = withSupabase({ auth: 'user' }, async (req: NextRequest, ctx: any) => {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const url = new URL(req.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    const { searchParams } = url;
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const accessError = await checkSchoolAccess(supabase, schoolId);
    if (accessError) return NextResponse.json({ error: accessError.error }, { status: accessError.status });

    const serviceClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntGeneralSettingService(serviceClient);
    const data = await service.deleteGeneralSetting(schoolId, parentId, id!);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
});
