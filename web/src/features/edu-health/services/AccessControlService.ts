import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AccessControlRecord {
  id: string;
  school_id: string;
  record_number: string;
  zone: string;
  access_type: 'entry' | 'exit' | 'restricted_area' | 'emergency';
  person_id: string;
  person_type: 'student' | 'staff' | 'visitor' | 'contractor';
  authorized: boolean;
  date_time: string;
  method: 'badge' | 'key' | 'biometric' | 'manual' | 'other';
  location: string;
  reason?: string;
  accompanied_by?: string;
  duration_minutes?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateAccessControlRecord {
  zone: string;
  access_type: 'entry' | 'exit' | 'restricted_area' | 'emergency';
  person_id: string;
  person_type: 'student' | 'staff' | 'visitor' | 'contractor';
  authorized: boolean;
  method: 'badge' | 'key' | 'biometric' | 'manual' | 'other';
  location: string;
  reason?: string;
  accompanied_by?: string;
  duration_minutes?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAccessControlRecord {
  authorized?: boolean;
  reason?: string;
  duration_minutes?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class AccessControlService {
  private readonly TABLE = 'access_control_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AccessControlRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AccessControlRecord | null> {
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

  async create(schoolId: string, record: CreateAccessControlRecord): Promise<AccessControlRecord> {
    const recordNumber = `AC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        date_time: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdateAccessControlRecord): Promise<AccessControlRecord> {
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

  async getByPerson(schoolId: string, personId: string): Promise<AccessControlRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('person_id', personId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByZone(schoolId: string, zone: string): Promise<AccessControlRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('zone', zone)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUnauthorized(schoolId: string): Promise<AccessControlRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('authorized', false)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getVisitors(schoolId: string): Promise<AccessControlRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('person_type', 'visitor')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    authorized: number;
    unauthorized: number;
    byType: Record<string, number>;
    todayEntries: number;
  }> {
    const records = await this.getAll(schoolId);
    const today = new Date().toISOString().split('T')[0];
    const byType: Record<string, number> = {};
    records.forEach((r) => {
      byType[r.person_type] = (byType[r.person_type] || 0) + 1;
    });

    return {
      total: records.length,
      authorized: records.filter((r) => r.authorized).length,
      unauthorized: records.filter((r) => !r.authorized).length,
      byType,
      todayEntries: records.filter((r) => r.date_time.startsWith(today)).length,
    };
  }
}
