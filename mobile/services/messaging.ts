import { supabase, camel, getUserSchoolId } from './supabase';

export async function getInbox() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('messages').select('*, sender:users!messages_sender_id_fkey(*), receiver:users!messages_receiver_id_fkey(*)').or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data);
}

export async function getConversation(userId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('messages').select('*, sender:users!messages_sender_id_fkey(*)').or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`).order('created_at');
  if (error) throw error;
  return camel(data);
}

export async function sendMessage(receiverId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  const schoolId = await getUserSchoolId();
  if (!schoolId) throw new Error('Établissement non identifié');
  const { data, error } = await supabase.from('messages').insert({ sender_id: user.id, receiver_id: receiverId, content, school_id: schoolId }).select().single();
  if (error) throw error;
  return data;
}

export async function getAnnouncements(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  let q = supabase.from('announcements').select('*');
  if (sid) q = q.eq('school_id', sid);
  const { data, error } = await q.order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data);
}

export async function sendEmail(params: {
  to: string;
  template?: string;
  templateParams?: Record<string, any>;
  subject?: string;
  html?: string;
  recipientName?: string;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Erreur envoi email');
  return res.json();
}

export async function sendBulkEmail(params: {
  recipients: { email: string; name?: string; userId?: string }[];
  template?: string;
  templateParams?: Record<string, any>;
  subject?: string;
  html?: string;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Erreur envoi email groupé');
  return res.json();
}

export async function sendPaymentReceivedEmail(parentEmail: string, studentName: string, amount: number, paymentMethod: string, reference: string, schoolName: string) {
  return sendEmail({
    to: parentEmail,
    template: 'payment_received',
    templateParams: { studentName, amount, paymentMethod, reference, schoolName },
    recipientName: studentName,
  });
}

export async function sendBulletinEmail(parentEmail: string, studentName: string, className: string, periodName: string, generalAverage: number, mention: string) {
  return sendEmail({
    to: parentEmail,
    template: 'bulletin_available',
    templateParams: { studentName, className, periodName, generalAverage, mention },
    recipientName: studentName,
  });
}

export async function sendAbsenceEmail(parentEmail: string, studentName: string, date: string, className: string, parentName: string) {
  return sendEmail({
    to: parentEmail,
    template: 'absence',
    templateParams: { studentName, date, className, parentName },
    recipientName: parentName,
  });
}

export async function sendAnnouncementEmail(recipientEmail: string, schoolName: string, title: string, message: string, recipientName: string) {
  return sendEmail({
    to: recipientEmail,
    template: 'new_announcement',
    templateParams: { schoolName, title, message, recipientName },
    recipientName,
  });
}

export async function getEmailLogs(filters?: { schoolId?: string; status?: string; type?: string; limit?: number }) {
  let q = supabase.from('email_logs').select('*').order('created_at', { ascending: false });
  if (filters?.schoolId) q = q.eq('school_id', filters.schoolId);
  if (filters?.status) q = q.eq('status', filters.status);
  if (filters?.type) q = q.eq('email_type', filters.type);
  if (filters?.limit) q = q.limit(filters.limit);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data || []);
}
