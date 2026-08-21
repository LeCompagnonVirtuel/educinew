import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SocialSupport {
  id: string;
  school_id: string;
  support_number: string;
  student_id: string;
  support_type: 'housing' | 'food' | 'clothing' | 'transport' | 'financial' | 'family' | 'other';
  status: 'identified' | 'assessment' | 'in_progress' | 'resolved' | 'closed';
  identified_by: string;
  date_identified: string;
  assessment_date?: string;
  urgency: 'low' | 'moderate' | 'high' | 'critical';
  needs: SocialNeed[];
  interventions: SocialIntervention[];
  referrals: SocialReferral[];
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  confidential: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SocialNeed {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'moderate' | 'high';
  met: boolean;
}

export interface SocialIntervention {
  id: string;
  type: string;
  description: string;
  provider: string;
  date: string;
  outcome: string;
}

export interface SocialReferral {
  id: string;
  agency_name: string;
  contact: string;
  service_type: string;
  referral_date: string;
  status: 'pending' | 'active' | 'completed';
}

export interface CreateSocialSupport {
  student_id: string;
  support_type: 'housing' | 'food' | 'clothing' | 'transport' | 'financial' | 'family' | 'other';
  identified_by: string;
  urgency: 'low' | 'moderate' | 'high' | 'critical';
  needs?: SocialNeed[];
  confidential?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSocialSupport {
  status?: string;
  assessment_date?: string;
  needs?: SocialNeed[];
  interventions?: SocialIntervention[];
  referrals?: SocialReferral[];
  outcome?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SocialSupportService {
  private readonly TABLE = 'social_supports';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SocialSupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SocialSupport | null> {
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

  async create(schoolId: string, support: CreateSocialSupport): Promise<SocialSupport> {
    const supportNumber = `SS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        support_number: supportNumber,
        ...support,
        status: 'identified',
        date_identified: new Date().toISOString(),
        needs: support.needs || [],
        interventions: [],
        referrals: [],
        confidential: support.confidential ?? true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, support: UpdateSocialSupport): Promise<SocialSupport> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...support, updated_at: new Date().toISOString() })
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

  async addReferral(schoolId: string, id: string, referral: SocialReferral): Promise<SocialSupport> {
    const support = await this.getById(schoolId, id);
    if (!support) throw new Error('Social support record not found');

    return this.update(schoolId, id, {
      referrals: [...support.referrals, referral],
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<SocialSupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, supportType: string): Promise<SocialSupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('support_type', supportType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUrgent(schoolId: string): Promise<SocialSupport[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('urgency', ['high', 'critical'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingFollowUp(schoolId: string): Promise<SocialSupport[]> {
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
    open: number;
    urgent: number;
    byType: Record<string, number>;
    resolved: number;
  }> {
    const supports = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    supports.forEach((s) => {
      byType[s.support_type] = (byType[s.support_type] || 0) + 1;
    });

    return {
      total: supports.length,
      open: supports.filter((s) => !['resolved', 'closed'].includes(s.status)).length,
      urgent: supports.filter((s) => s.urgency === 'urgent' || s.urgency === 'critical').length,
      byType,
      resolved: supports.filter((s) => s.status === 'resolved' || s.status === 'closed').length,
    };
  }
}
