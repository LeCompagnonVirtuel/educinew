import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AccommodationRecord {
  id: string;
  school_id: string;
  record_number: string;
  student_id: string;
  profile_id?: string;
  accommodation_type: 'environmental' | 'instructional' | 'assessment' | 'behavioral' | 'technology' | 'scheduling';
  category: 'physical' | 'cognitive' | 'sensory' | 'emotional' | 'other';
  description: string;
  implementation_details: string;
  status: 'active' | 'pending' | 'inactive' | 'expired';
  start_date: string;
  end_date?: string;
  renewal_date?: string;
  responsible_staff: string[];
  effectiveness_rating?: number;
  review_date: string;
  cost?: number;
  funding_source?: string;
  documentation_url?: string;
  parent_notified: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateAccommodationRecord {
  student_id: string;
  profile_id?: string;
  accommodation_type: 'environmental' | 'instructional' | 'assessment' | 'behavioral' | 'technology' | 'scheduling';
  category: 'physical' | 'cognitive' | 'sensory' | 'emotional' | 'other';
  description: string;
  implementation_details: string;
  start_date: string;
  end_date?: string;
  responsible_staff?: string[];
  cost?: number;
  funding_source?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAccommodationRecord {
  status?: string;
  description?: string;
  implementation_details?: string;
  end_date?: string;
  renewal_date?: string;
  responsible_staff?: string[];
  effectiveness_rating?: number;
  review_date?: string;
  documentation_url?: string;
  parent_notified?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class AccommodationService {
  private readonly TABLE = 'accommodation_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AccommodationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AccommodationRecord | null> {
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

  async create(schoolId: string, record: CreateAccommodationRecord): Promise<AccommodationRecord> {
    const recordNumber = `ACC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        status: 'active',
        responsible_staff: record.responsible_staff || [],
        parent_notified: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdateAccommodationRecord): Promise<AccommodationRecord> {
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

  async getByStudent(schoolId: string, studentId: string): Promise<AccommodationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, accommodationType: string): Promise<AccommodationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('accommodation_type', accommodationType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<AccommodationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingRenewal(schoolId: string): Promise<AccommodationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .not('renewal_date', 'is', null)
      .lte('renewal_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    pendingRenewal: number;
    byType: Record<string, number>;
    totalCost: number;
  }> {
    const records = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    records.forEach((r) => {
      byType[r.accommodation_type] = (byType[r.accommodation_type] || 0) + 1;
    });

    return {
      total: records.length,
      active: records.filter((r) => r.status === 'active').length,
      pendingRenewal: records.filter(
        (r) => r.status === 'active' && r.renewal_date && r.renewal_date <= new Date().toISOString().split('T')[0]
      ).length,
      byType,
      totalCost: records.reduce((sum, r) => sum + (r.cost || 0), 0),
    };
  }
}
