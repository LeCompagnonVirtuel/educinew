import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ConsentRecord {
  id: string;
  school_id: string;
  consent_number: string;
  student_id: string;
  parent_id: string;
  consent_type: 'medical' | 'screening' | 'referral' | 'data_sharing' | 'emergency_treatment' | 'mental_health';
  status: 'pending' | 'granted' | 'denied' | 'withdrawn' | 'expired';
  granted_at?: string;
  expires_at?: string;
  withdrawn_at?: string;
  scope: string[];
  purpose: string;
  data_recipients?: string[];
  third_parties?: string[];
  document_url?: string;
  signature_url?: string;
  ip_address?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateConsent {
  student_id: string;
  parent_id: string;
  consent_type: 'medical' | 'screening' | 'referral' | 'data_sharing' | 'emergency_treatment' | 'mental_health';
  scope: string[];
  purpose: string;
  data_recipients?: string[];
  third_parties?: string[];
  expires_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateConsent {
  status?: string;
  granted_at?: string;
  expires_at?: string;
  withdrawn_at?: string;
  scope?: string[];
  data_recipients?: string[];
  third_parties?: string[];
  document_url?: string;
  signature_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ConsentManagementService {
  private readonly TABLE = 'consent_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ConsentRecord | null> {
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

  async create(schoolId: string, consent: CreateConsent): Promise<ConsentRecord> {
    const consentNumber = `CON-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        consent_number: consentNumber,
        ...consent,
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, consent: UpdateConsent): Promise<ConsentRecord> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...consent, updated_at: new Date().toISOString() })
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

  async grant(schoolId: string, id: string, signatureUrl?: string): Promise<ConsentRecord> {
    return this.update(schoolId, id, {
      status: 'granted',
      granted_at: new Date().toISOString(),
      signature_url: signatureUrl,
    });
  }

  async deny(schoolId: string, id: string): Promise<ConsentRecord> {
    return this.update(schoolId, id, {
      status: 'denied',
    });
  }

  async withdraw(schoolId: string, id: string): Promise<ConsentRecord> {
    return this.update(schoolId, id, {
      status: 'withdrawn',
      withdrawn_at: new Date().toISOString(),
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, consentType: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('consent_type', consentType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'granted')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getExpired(schoolId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'granted')
      .not('expires_at', 'is', null)
      .lt('expires_at', new Date().toISOString())
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<ConsentRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async checkConsent(schoolId: string, studentId: string, consentType: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('id')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .eq('consent_type', consentType)
      .eq('status', 'granted')
      .is('deleted_at', null)
      .single();

    if (error) return false;
    return !!data;
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    pending: number;
    granted: number;
    denied: number;
    withdrawn: number;
    expired: number;
  }> {
    const consents = await this.getAll(schoolId);
    return {
      total: consents.length,
      pending: consents.filter((c) => c.status === 'pending').length,
      granted: consents.filter((c) => c.status === 'granted').length,
      denied: consents.filter((c) => c.status === 'denied').length,
      withdrawn: consents.filter((c) => c.status === 'withdrawn').length,
      expired: consents.filter((c) => c.status === 'expired').length,
    };
  }
}
