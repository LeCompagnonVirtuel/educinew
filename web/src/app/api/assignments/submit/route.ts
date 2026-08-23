import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { createClient as createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
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

  const { data: profile } = await supabase
    .from('users')
    .select('role, school_id')
    .eq('id', user.id)
    .single();

  if (!profile?.school_id) {
    return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });
  }

  if (!['STUDENT', 'PARENT'].includes(profile.role)) {
    return NextResponse.json({ error: 'Seul un élève peut soumettre un devoir' }, { status: 403 });
  }

  const body = await req.json();
  const { student_id, assignment_id, file_url, content } = body;

  if (!student_id || !assignment_id) {
    return NextResponse.json({ error: 'student_id et assignment_id sont requis' }, { status: 400 });
  }

  const { data: assignment, error: assignErr } = await supabase
    .from('assignments')
    .select('id, status, due_date, school_id')
    .eq('id', assignment_id)
    .eq('school_id', profile.school_id)
    .single();

  if (assignErr || !assignment) {
    return NextResponse.json({ error: 'Devoir introuvable' }, { status: 404 });
  }

  if (assignment.status === 'CLOSED') {
    return NextResponse.json({ error: 'Ce devoir est fermé' }, { status: 400 });
  }

  const isLate = assignment.due_date && new Date(assignment.due_date) < new Date();

  const { data: existing } = await supabase
    .from('assignment_submissions')
    .select('id')
    .eq('assignment_id', assignment_id)
    .eq('student_id', student_id)
    .single();

  if (existing) {
    const { data: updated, error: updateErr } = await supabase
      .from('assignment_submissions')
      .update({
        content,
        file_url,
        status: isLate ? 'LATE' : 'SUBMITTED',
        submitted_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }
    return NextResponse.json(updated);
  }

  const { data: submission, error: insertErr } = await supabase
    .from('assignment_submissions')
    .insert({
      assignment_id,
      student_id,
      school_id: profile.school_id,
      content,
      file_url,
      status: isLate ? 'LATE' : 'SUBMITTED',
    })
    .select()
    .single();

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 });
  }

  return NextResponse.json(submission, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
