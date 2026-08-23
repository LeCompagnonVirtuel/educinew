import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const TraversalSchema = z.object({
  start_entity_id: z.string().uuid('ID entitÃ© invalide'),
  direction: z.enum(['OUTGOING', 'INCOMING', 'BOTH']),
  relation_types: z.array(z.string()).optional(),
  max_depth: z.number().int().min(1).max(10).optional(),
  limit: z.number().int().min(1).max(1000).optional(),
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
    const validation = TraversalSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const maxDepth = data.max_depth || 3;
    const limit = data.limit || 100;
    const visited = new Set<string>();
    const result: Array<{ entity: Record<string, unknown>; relations: Array<Record<string, unknown>>; depth: number }> = [];

    async function traverse(entityId: string, depth: number): Promise<void> {
      if (depth > maxDepth || visited.has(entityId) || result.length >= limit) return;
      visited.add(entityId);

      const { data: entity } = await supabase
        .from('gedkin_entities')
        .select('*')
        .eq('id', entityId)
        .eq('school_id', schoolId)
        .is('deleted_at', null)
        .single();

      if (!entity) return;

      let relationQuery = supabase
        .from('gedkin_relations')
        .select('*')
        .eq('school_id', schoolId)
        .is('deleted_at', null);

      if (data.direction === 'OUTGOING') {
        relationQuery = relationQuery.eq('source_id', entityId);
      } else if (data.direction === 'INCOMING') {
        relationQuery = relationQuery.eq('target_id', entityId);
      } else {
        relationQuery = relationQuery.or(`source_id.eq.${entityId},target_id.eq.${entityId}`);
      }

      if (data.relation_types && data.relation_types.length > 0) {
        relationQuery = relationQuery.in('type', data.relation_types);
      }

      const { data: relations } = await relationQuery;

      result.push({ entity, relations: relations || [], depth });

      if (relations) {
        for (const rel of relations) {
          const nextId = rel.source_id === entityId ? rel.target_id : rel.source_id;
          await traverse(nextId, depth + 1);
        }
      }
    }

    await traverse(data.start_entity_id, 0);

    return NextResponse.json({ data: result, total: result.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
