import { withSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const ValidateGpsSchema = z.object({
  student_id: z.string().uuid(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = ValidateGpsSchema.safeParse(body);

  if (!validation.success) {
    return Response.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const data = validation.data;

  const { data: location, error: locError } = await supabase
    .from('school_locations')
    .select('*')
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .single();

  if (locError || !location) {
    return Response.json({ valid: false, error: 'Aucune localisation configurée' }, { status: 400 });
  }

  const R = 6371e3;
  const lat1 = location.latitude * Math.PI / 180;
  const lat2 = data.latitude * Math.PI / 180;
  const dLat = (data.latitude - location.latitude) * Math.PI / 180;
  const dLon = (data.longitude - location.longitude) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const isValid = distance <= (location.radius || 100);

  return Response.json({ valid: isValid, distance, radius: location.radius || 100 });
});
