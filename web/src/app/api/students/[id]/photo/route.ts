import { withSupabase } from '@/lib/supabase/server';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN', 'SECRETAIRE'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split('/').filter(Boolean).at(-2);

  const { data: student } = await supabase.from('students').select('id, school_id').eq('id', id).single();
  if (!student) return Response.json({ error: 'Élève introuvable' }, { status: 404 });
  if (student.school_id !== profile?.school_id) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return Response.json({ error: 'Fichier requis' }, { status: 400 });

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: 'Format non supporté. Utilisez PNG, JPEG ou WebP' }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: 'Le fichier ne doit pas dépasser 5MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filePath = `students/${id}/photo.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('student-photos')
    .upload(filePath, file, { upsert: true });

  if (uploadError) return Response.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from('student-photos').getPublicUrl(filePath);

  await supabase.from('students').update({ photo_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq('id', id);

  await supabase.from('student_timeline').insert({
    student_id: id,
    school_id: profile?.school_id,
    type: 'PHOTO',
    description: 'Photo de profil mise à jour',
    created_by: user.id,
  });

  return Response.json({ photoUrl: urlData.publicUrl });
});
