import { getSupabase } from './shared';

export interface EmailLog {
  id: string;
  school_id: string;
  to_email: string;
  subject: string;
  status: 'SENT' | 'FAILED' | 'PENDING';
  type: string;
  created_at: string;
  createdAt: string;
  sent_at: string | null;
  error_message: string | null;
  retry_count: number;
  attempts: number;
  recipientEmail: string;
  recipientName: string;
  emailType: string;
}

export const emailApi = {
  async send(to: string, subject: string, html: string, text?: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { to, subject, html, text },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendBulk(emails: Array<{ to: string; subject: string; html: string; text?: string }>) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'bulk', emails },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendWelcome(to: string, name: string, role: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'welcome', to, name, role },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendPasswordReset(to: string, name: string, resetUrl: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'password_reset', to, name, resetUrl },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendVerification(to: string, name: string, verificationUrl: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'verification', to, name, verificationUrl },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendPaymentReceived(to: string, name: string, amount: number, reference: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'payment_received', to, name, amount, reference },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendPaymentPending(to: string, name: string, amount: number, reference: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'payment_pending', to, name, amount, reference },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendPaymentFailed(to: string, name: string, amount: number, reference: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'payment_failed', to, name, amount, reference },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendBulletinAvailable(to: string, name: string, studentName: string, period: string, downloadUrl: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'bulletin_available', to, name, studentName, period, downloadUrl },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendNewGrade(to: string, name: string, studentName: string, subject: string, grade: number) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'new_grade', to, name, studentName, subject, grade },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendAbsence(to: string, name: string, studentName: string, date: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'absence', to, name, studentName, date },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendLate(to: string, name: string, studentName: string, date: string, time: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'late', to, name, studentName, date, time },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendAnnouncement(to: string, name: string, title: string, message: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'announcement', to, name, title, message },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendInvitation(to: string, name: string, inviterName: string, schoolName: string, inviteUrl: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'invitation', to, name, inviterName, schoolName, inviteUrl },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendTeacherCreated(to: string, name: string, tempPassword: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'teacher_created', to, name, tempPassword },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendTrialEnding(to: string, name: string, daysLeft: number) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'trial_ending', to, name, daysLeft },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendTrialExpired(to: string, name: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'trial_expired', to, name },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendSchoolCreated(to: string, name: string, schoolName: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'school_created', to, name, schoolName },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendNewMessage(to: string, name: string, fromName: string, message: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'new_message', to, name, fromName, message },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async sendCustom(to: string, subject: string, html: string, text?: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: { type: 'custom', to, subject, html, text },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  async getLogs(schoolId?: string, status?: string, type?: string, limit = 100) {
    const supabase = getSupabase();
    let query = supabase.from('email_logs').select('*').order('created_at', { ascending: false }).limit(limit);
    if (schoolId) query = query.eq('school_id', schoolId);
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('type', type);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getStats(schoolId?: string) {
    const supabase = getSupabase();
    let query = supabase.from('email_logs').select('status, created_at, type');
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const sent = data.filter((d: any) => d.status === 'SENT').length;
    const failed = data.filter((d: any) => d.status === 'FAILED').length;
    const pending = data.filter((d: any) => d.status === 'PENDING').length;
    const byType: Record<string, number> = {};
    data.forEach((d: any) => { byType[d.type] = (byType[d.type] || 0) + 1; });
    return { total, sent, failed, pending, byType, successRate: total > 0 ? Math.round((sent / total) * 100) : 0 };
  },
};