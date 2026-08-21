import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const QuerySchema = z.object({
  query: z.string().min(1, 'Requise requise'),
  context: z.record(z.unknown()).optional(),
  model: z.enum(['DEEPSEEK', 'GEMINI']).optional(),
  max_tokens: z.number().int().min(1).max(10000).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'ENSEIGNANT'];
    if (!allowedRoles.includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });

    const body = await request.json();
    const validation = QuerySchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));
      return NextResponse.json({ error: 'Donnees invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const { data: record, error } = await supabase.from('gedkin_copilot_queries').insert({
      school_id: schoolId, user_id: user.id, query: data.query,
      context: data.context || {}, model: data.model || 'DEEPSEEK',
      max_tokens: data.max_tokens || 4096, temperature: data.temperature || 0.7,
      status: 'PENDING',
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
