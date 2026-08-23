import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'none' }, async (_req, ctx) => {
  const { error } = await ctx.supabaseAdmin.from('schools').select('id').limit(1);
  if (error) {
    return Response.json({ status: 'error', message: error.message }, { status: 500 });
  }
  return Response.json({ status: 'ok', timestamp: new Date().toISOString(), db: 'connected' });
});
