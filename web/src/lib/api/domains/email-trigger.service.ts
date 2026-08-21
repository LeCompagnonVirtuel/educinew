import { getSupabase } from '../shared';

export const sbEmailTrigger = {
  async onStudentCreated(email: string, name: string, className: string, matricule: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'student_created',
          to: email,
          name,
          className,
          matricule,
        },
      });
    } catch {}
  },

  async onTeacherCreated(email: string, name: string, tempPassword: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'teacher_created',
          to: email,
          name,
          tempPassword,
        },
      });
    } catch {}
  },

  async onParentCreated(email: string, name: string, tempPassword: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'parent_created',
          to: email,
          name,
          tempPassword,
        },
      });
    } catch {}
  },

  async onLoginConfirmation(email: string, name: string, userAgent?: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'login_confirmation',
          to: email,
          name,
          userAgent,
        },
      });
    } catch {}
  },

  async onPaymentReceived(email: string, name: string, amount: number, reference: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'payment_received',
          to: email,
          name,
          amount,
          reference,
        },
      });
    } catch {}
  },

  async onPaymentFailed(email: string, name: string, amount: number, reference: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'payment_failed',
          to: email,
          name,
          amount,
          reference,
        },
      });
    } catch {}
  },

  async onSchoolCreated(email: string, name: string, schoolName: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'school_created',
          to: email,
          name,
          schoolName,
        },
      });
    } catch {}
  },

  async onInvitation(email: string, adminName: string, schoolName: string, staffRole: string, token: string, expiresAt: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'staff_invitation',
          to: email,
          adminName,
          schoolName,
          staffRole,
          token,
          expiresAt,
        },
      });
    } catch {}
  },

  async onBulletinPublished(email: string, studentName: string, className: string, periodName: string, average: number, mention: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'bulletin_published',
          to: email,
          studentName,
          className,
          periodName,
          average,
          mention,
        },
      });
    } catch {}
  },

  async onLateArrival(email: string, name: string, studentName: string, date: string, time: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'late_arrival',
          to: email,
          name,
          studentName,
          date,
          time,
        },
      });
    } catch {}
  },

  async onAbsence(email: string, name: string, studentName: string, date: string) {
    const supabase = getSupabase();
    try {
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'absence',
          to: email,
          name,
          studentName,
          date,
        },
      });
    } catch {}
  },
};

export const emailTrigger = sbEmailTrigger;