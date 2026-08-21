import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthReferral {
  id: string;
  school_id: string;
  referral_number: string;
  student_id: string;
  screening_id?: string;
  referred_by: string;
  referral_type: 'specialist' | 'hospital' | 'mental_health' | 'dental' | 'therapy' | 'other';
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  specialist_name?: string;
  specialist_contact?: string;
  reason: string;
  clinical_notes?: string;
  appointment_date?: string;
  appointment_location?: string;
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  parent_notified: boolean;
  parent_consent: boolean;
  documents: ReferralDocument[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ReferralDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

export interface CreateHealthReferral {
  student_id: string;
  screening_id?: string;
  referred_by: string;
  referral_type: 'specialist' | 'hospital' | 'mental_health' | 'dental' | 'therapy' | 'other';
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: string;
  clinical_notes?: string;
  specialist_name?: string;
  specialist_contact?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthReferral {
  status?: string;
  specialist_name?: string;
  specialist_contact?: string;
  appointment_date?: string;
  appointment_location?: string;
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  parent_notified?: boolean;
  parent_consent?: boolean;
  documents?: ReferralDocument[];
  metadata?: Record<string, unknown>;
}

export class HealthReferralService {
  private readonly TABLE = 'health_referrals';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthReferral | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, referral: CreateHealthReferral): Promise<HealthReferral> {
    const referralNumber = `HR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        referral_number: referralNumber,
        ...referral,
        status: 'pending',
        parent_notified: false,
        parent_consent: false,
        documents: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, referral: UpdateHealthReferral): Promise<HealthReferral> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...referral, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async getByStudent(schoolId: string, studentId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, referralType: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('referral_type', referralType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUrgent(schoolId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('urgency', ['urgent', 'emergency'])
      .in('status', ['pending', 'accepted'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getCompleted(schoolId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingFollowUp(schoolId: string): Promise<HealthReferral[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('follow_up_date', 'is', null)
      .lte('follow_up_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    pending: number;
    urgent: number;
    completed: number;
    averageCompletionDays: number;
  }> {
    const referrals = await this.getAll(schoolId);
    const completed = referrals.filter((r) => r.status === 'completed');
    const completionDays = completed.map((r) => {
      const created = new Date(r.created_at);
      const updated = new Date(r.updated_at);
      return (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    });

    return {
      total: referrals.length,
      pending: referrals.filter((r) => r.status === 'pending').length,
      urgent: referrals.filter((r) => r.urgency === 'urgent' || r.urgency === 'emergency').length,
      completed: completed.length,
      averageCompletionDays: completionDays.length > 0
        ? completionDays.reduce((a, b) => a + b, 0) / completionDays.length
        : 0,
    };
  }
}
