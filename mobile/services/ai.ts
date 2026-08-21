import { supabase } from './supabase';

export async function chat(message: string, context?: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/ai-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ message, context }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  } catch (e: any) {
    throw new Error(e?.message || 'Service IA indisponible');
  }
}

export async function explainExercise(exercise: string, subject: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/ai-explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ exercise, subject }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  } catch (e: any) {
    throw new Error(e?.message || 'Service IA indisponible');
  }
}

export async function generateQuiz(subject: string, level: string, count?: number) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/ai-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ subject, level, count }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  } catch (e: any) {
    throw new Error(e?.message || 'Service IA indisponible');
  }
}

export async function summarizeLesson(content: string, subject: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/ai-summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ content, subject }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  } catch (e: any) {
    throw new Error(e?.message || 'Service IA indisponible');
  }
}
