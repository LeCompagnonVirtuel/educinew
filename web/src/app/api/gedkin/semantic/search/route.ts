import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const SearchSchema = z.object({
  query: z.string().min(1, 'RequÃªte requise'),
  ontology_id: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).optional(),
  threshold: z.number().min(0).max(1).optional(),
  type: z.enum(['EXACT', 'FUZZY', 'SEMANTIC']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'ENSEIGNANT'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }

    const body = await request.json();
    const validation = SearchSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const limit = data.limit || 20;
    const threshold = data.threshold || 0.5;
    const searchType = data.type || 'FUZZY';

    let query = supabase
      .from('gedkin_concepts')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (data.ontology_id) {
      query = query.eq('ontology_id', data.ontology_id);
    }

    if (searchType === 'EXACT') {
      query = query.ilike('name', data.query);
    } else if (searchType === 'FUZZY') {
      query = query.or(`name.ilike.%${data.query}%,description.ilike.%${data.query}%`);
    } else {
      query = query.or(`name.ilike.%${data.query}%,description.ilike.%${data.query}%,properties->>'keywords'.ilike.%${data.query}%`);
    }

    query = query.limit(limit);

    const { data: results, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const scoredResults = (results || []).map((concept: Record<string, unknown>) => {
      const name = (concept.name as string) || '';
      const description = (concept.description as string) || '';
      const searchLower = data.query.toLowerCase();

      let score = 0;
      if (name.toLowerCase().includes(searchLower)) score += 0.7;
      if (description.toLowerCase().includes(searchLower)) score += 0.3;

      return { ...concept, score: Math.min(score, 1.0) };
    }).filter((item: { score: number }) => item.score >= threshold);

    return NextResponse.json({
      data: scoredResults,
      total: scoredResults.length,
      query: data.query,
      type: searchType,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
