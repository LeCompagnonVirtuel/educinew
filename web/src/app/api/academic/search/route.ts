import { withSupabase } from '@supabase/server';
import { z } from 'zod';

const SearchSchema = z.object({
  query: z.string().min(1, 'Requise'),
  types: z.string().optional(),
  limit: z.number().int().positive().max(50).optional(),
});

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = SearchSchema.safeParse({
    query: params.query || undefined,
    types: params.types || undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const { query, types, limit: resultLimit } = validation.data;
  const limit = resultLimit || 10;
  const searchTypes = types ? types.split(',') : ['students', 'teachers', 'classes', 'subjects', 'rooms'];

  const results: Record<string, any[]> = {};

  const searchPromises = searchTypes.map(async (type) => {
    switch (type.trim()) {
      case 'students': {
        const { data } = await supabase
          .from('students')
          .select('id, first_name, last_name, student_number')
          .eq('school_id', schoolId)
          .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,student_number.ilike.%${query}%`)
          .limit(limit);
        return { type: 'students', data: data || [] };
      }
      case 'teachers': {
        const { data } = await supabase
          .from('teachers')
          .select('id, first_name, last_name, employee_number')
          .eq('school_id', schoolId)
          .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,employee_number.ilike.%${query}%`)
          .limit(limit);
        return { type: 'teachers', data: data || [] };
      }
      case 'classes': {
        const { data } = await supabase
          .from('classes')
          .select('id, name, code')
          .eq('school_id', schoolId)
          .or(`name.ilike.%${query}%,code.ilike.%${query}%`)
          .limit(limit);
        return { type: 'classes', data: data || [] };
      }
      case 'subjects': {
        const { data } = await supabase
          .from('subjects')
          .select('id, name, code')
          .eq('school_id', schoolId)
          .or(`name.ilike.%${query}%,code.ilike.%${query}%`)
          .limit(limit);
        return { type: 'subjects', data: data || [] };
      }
      case 'rooms': {
        const { data } = await supabase
          .from('rooms')
          .select('id, name, code')
          .eq('school_id', schoolId)
          .or(`name.ilike.%${query}%,code.ilike.%${query}%`)
          .limit(limit);
        return { type: 'rooms', data: data || [] };
      }
      default:
        return { type, data: [] };
    }
  });

  const searchResults = await Promise.all(searchPromises);
  searchResults.forEach(({ type, data }) => {
    results[type] = data;
  });

  return Response.json({ results });
});
