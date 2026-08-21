import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const CreateTermSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  order: z.number().int().positive().optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const yearId = pathParts[pathParts.length - 2];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: terms, error } = await supabase
    .from('academic_terms')
    .select('*')
    .eq('academic_year_id', yearId)
    .order('order', { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(terms || []);
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const yearId = pathParts[pathParts.length - 2];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['ADMIN', 'SUPER_ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();
  const validation = CreateTermSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;

  const { data: term, error } = await supabase
    .from('academic_terms')
    .insert({
      academic_year_id: yearId,
      name: data.name,
      start_date: data.startDate || null,
      end_date: data.endDate || null,
      order: data.order || null,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(term, { status: 201 });
});
