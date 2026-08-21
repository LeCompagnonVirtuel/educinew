import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createAuthClient } from '@/lib/supabase/server';
import { EntUserMfaService } from '@/features/enterprise/services/ent-users-mfa.service';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authSupabase = await createAuthClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const { data: userSchool } = await authSupabase
      .from('user_schools')
      .select('school_id')
      .eq('user_id', user.id)
      .eq('school_id', schoolId)
      .single();

    const { data: profile } = await authSupabase.from('users').select('role').eq('id', user.id).single();
    if (!userSchool && profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntUserMfaService(supabase);
    const data = await service.getUserMfa(schoolId, parentId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authSupabase = await createAuthClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await request.json();
    const schoolId = body.schoolId;
    const parentId = body.parentId;
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const { data: userSchool } = await authSupabase
      .from('user_schools')
      .select('school_id')
      .eq('user_id', user.id)
      .eq('school_id', schoolId)
      .single();

    const { data: profile } = await authSupabase.from('users').select('role').eq('id', user.id).single();
    if (!userSchool && profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntUserMfaService(supabase);
    const data = await service.updateUserMfa(schoolId, parentId, params.id, body);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authSupabase = await createAuthClient();
    const { data: { user }, error: authError } = await authSupabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
    if (!parentId) return NextResponse.json({ error: 'parentId required' }, { status: 400 });

    const { data: userSchool } = await authSupabase
      .from('user_schools')
      .select('school_id')
      .eq('user_id', user.id)
      .eq('school_id', schoolId)
      .single();

    const { data: profile } = await authSupabase.from('users').select('role').eq('id', user.id).single();
    if (!userSchool && profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const service = new EntUserMfaService(supabase);
    const data = await service.deleteUserMfa(schoolId, parentId, params.id);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
