import { sbAttendance } from './supabase-client';
import { sbEmailTrigger } from './domains/email-trigger.service';

export const attendanceApi = {
  getAttendance(filters: { studentId?: string; classId?: string; date?: string } = {}) {
    return sbAttendance.list(filters) as Promise<any[]>;
  },

  getAttendanceStats(classId?: string) {
    return sbAttendance.getStats(undefined, classId) as Promise<any>;
  },

  createAttendance(data: any) {
    return sbAttendance.create(data) as Promise<any>;
  },

  async createBulkAttendance(data: any) {
    const records = data.records || data;
    const result = await sbAttendance.createBulk(Array.isArray(records) ? records : [records]) as any;
    const recordList = Array.isArray(records) ? records : [records];
    for (const rec of recordList) {
      if (rec.status === 'ABSENT' && rec.student_email && rec.student_name) {
        sbEmailTrigger.onAbsence(
          rec.parent_email || rec.student_email,
          rec.parent_name || rec.student_name,
          rec.student_name,
          rec.date || new Date().toISOString().split('T')[0]
        );
      }
      if (rec.status === 'LATE' && rec.student_email && rec.student_name) {
        sbEmailTrigger.onLateArrival(
          rec.parent_email || rec.student_email,
          rec.parent_name || rec.student_name,
          rec.student_name,
          rec.date || new Date().toISOString().split('T')[0],
          rec.time || new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        );
      }
    }
    return result;
  },

  scanStudentQR(matricule: string, type: 'ARRIVAL' | 'DEPARTURE' = 'ARRIVAL') {
    return sbAttendance.scanQR(matricule, type) as Promise<any>;
  },

  getTodayAttendance(classId?: string) {
    return sbAttendance.getToday() as Promise<any>;
  },

  async getDailyQRCode() {
    try {
      const { sbAttendance } = await import('./supabase-client');
      const { data: { session } } = await (await import('./supabase-client')).getSupabase().auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-qr`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ type: 'daily_attendance' }),
        }
      );

      if (!response.ok) throw new Error('Failed to generate QR code');
      return response.json();
    } catch {
      // Fallback: return a local QR code identifier
      const today = new Date().toISOString().split('T')[0];
      return {
        id: `qr-${today}`,
        date: today,
        code: `DAILY-${today}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        expiresAt: `${today}T23:59:59`,
      };
    }
  },
};
