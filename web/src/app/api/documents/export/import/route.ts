import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createDocumentRepository } from '@/features/documents/repositories/document.repository';
import { createExportService } from '@/features/documents/services/export.service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
                const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const serviceRoleSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const repo = createDocumentRepository(serviceRoleSupabase);
    const service = createExportService(repo);
    const data = await service.importDocuments(body);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message }, { status: (error as { statusCode?: number }).statusCode || 500 });
  }
}
