import { supabase, camel, getUserSchoolId } from './supabase';

export async function surveillanceScanQR(qrCode: string, action: string = 'ARRIVAL') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');

  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/scan-pointage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      qr_code: qrCode,
      scan_type: action,
      device_info: 'Mobile-Surveillant',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur scan' }));
    throw new Error(err.error || `Erreur HTTP ${res.status}`);
  }
  return res.json();
}

export async function getVisitorStats() {
  const schoolId = await getUserSchoolId();
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase.from('visitors').select('status').eq('school_id', schoolId).gte('entry_time', `${today}T00:00:00`).lt('entry_time', `${today}T23:59:59`);
  const total = data?.length || 0;
  const inside = data?.filter(v => v.status === 'INSIDE').length || 0;
  return { total, inside };
}

export async function registerVisitor(data: { visitorName: string; visitorPhone?: string; purpose: string; personToVisit: string; personRole?: string }) {
  const { data: { user } } = await supabase.auth.getUser();
  const schoolId = await getUserSchoolId();
  const { data: visitor, error } = await supabase.from('visitors').insert({
    school_id: schoolId,
    visitor_name: data.visitorName,
    visitor_phone: data.visitorPhone || null,
    purpose: data.purpose,
    person_to_visit: data.personToVisit,
    person_role: data.personRole || null,
    status: 'INSIDE',
    created_by: user?.id,
  }).select().single();
  if (error) throw error;
  return camel(visitor);
}

export async function checkoutVisitor(visitorId: string) {
  const { data, error } = await supabase.from('visitors').update({ exit_time: new Date().toISOString(), status: 'EXITED' }).eq('id', visitorId).select().single();
  if (error) throw error;
  return camel(data);
}

export async function getActiveVisitors() {
  const schoolId = await getUserSchoolId();
  const { data, error } = await supabase.from('visitors').select('*').eq('school_id', schoolId).eq('status', 'INSIDE').order('entry_time', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}
