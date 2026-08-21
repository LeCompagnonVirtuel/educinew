import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createDocumentRepository } from '@/features/documents/repositories/document.repository';
import { createDocumentService } from '@/features/documents/services/document.service';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await request.json();

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

    const schoolId = body.schoolId;
    if (schoolId) {
      const { data: userSchool } = await supabase.from('user_schools').select('school_id').eq('user_id', user.id).eq('school_id', schoolId).single();
      if (!userSchool && user.user_metadata?.role !== 'SUPER_ADMIN' && user.app_metadata?.role !== 'SUPER_ADMIN') {
        return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
      }
    }

    const serviceRoleSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createDocumentRepository(serviceRoleSupabase);
    const service = createDocumentService(repo);
    const data = await service.permanentDeleteDocument(id, body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
