import { getSupabase } from '../shared';

export const sbAi = {
  async chat(message: string, context?: string) {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const res = await fetch(`${baseUrl}/functions/v1/ai-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ message, context }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  },

  async explainExercise(exercise: string, subject: string) {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const res = await fetch(`${baseUrl}/functions/v1/ai-explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ exercise, subject }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  },

  async generateQuiz(subject: string, level: string, count?: number) {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const res = await fetch(`${baseUrl}/functions/v1/ai-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ subject, level, count }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  },

  async summarizeLesson(content: string, subject: string) {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const res = await fetch(`${baseUrl}/functions/v1/ai-summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ content, subject }),
    });
    if (!res.ok) throw new Error('Erreur IA');
    return res.json();
  },
};
