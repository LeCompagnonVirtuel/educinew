import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ConsentTrackingRecord {
  id: string;
  school_id: string;
  record_number: string;
  consent_type: string;
  description: string;
  legal_basis: string;
  retention_period_days: number;
  status: 'active' | 'inactive' | 'pending_approval';
  total_consents: number;
  active_consents: number;
  expired_consents: number;
  withdrawn_consents: number;
  last_audit_date?: string;
  next_audit_date?: string;
  data_controller: string;
  dpo_contact?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateConsentTrackingRecord {
  consent_type: string;
  description: string;
  legal_basis: string;
  retention_period_days: number;
  data_controller: string;
  dpo_contact?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateConsentTrackingRecord {
  status?: string;
  retention_period_days?: number;
  data_controller?: string;
  dpo_contact?: string;
  last_audit_date?: string;
  next_audit_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ConsentTrackingService {
  private readonly TABLE = 'consent_tracking_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ConsentTrackingRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ConsentTrackingRecord | null> {
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

  async create(schoolId: string, record: CreateConsentTrackingRecord): Promise<ConsentTrackingRecord> {
    const recordNumber = `CT-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        status: 'active',
        total_consents: 0,
        active_consents: 0,
        expired_consents: 0,
        withdrawn_consents: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdateConsentTrackingRecord): Promise<ConsentTrackingRecord> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...record, updated_at: new Date().toISOString() })
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

  async getByType(schoolId: string, consentType: string): Promise<ConsentTrackingRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('consent_type', consentType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingAudit(schoolId: string): Promise<ConsentTrackingRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .not('next_audit_date', 'is', null)
      .lte('next_audit_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    totalConsents: number;
    activeConsents: number;
    expiredConsents: number;
    pendingAudit: number;
  }> {
    const records = await this.getAll(schoolId);

    return {
      total: records.length,
      active: records.filter((r) => r.status === 'active').length,
      totalConsents: records.reduce((sum, r) => sum + r.total_consents, 0),
      activeConsents: records.reduce((sum, r) => sum + r.active_consents, 0),
      expiredConsents: records.reduce((sum, r) => sum + r.expired_consents, 0),
      pendingAudit: records.filter(
        (r) => r.next_audit_date && r.next_audit_date <= new Date().toISOString().split('T')[0]
      ).length,
    };
  }
}
