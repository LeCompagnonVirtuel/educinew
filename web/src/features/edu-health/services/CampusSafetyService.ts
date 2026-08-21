import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CampusSafetyRecord {
  id: string;
  school_id: string;
  record_number: string;
  safety_type: 'fire' | 'lockdown' | 'evacuation' | 'shelter' | 'medical_emergency' | 'security_breach' | 'other';
  status: 'active' | 'completed' | 'cancelled';
  date_time: string;
  location: string;
  reported_by: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  actions_taken: SafetyAction[];
  people_involved: string[];
  injuries_reported: boolean;
  injury_details?: string;
  property_damage: boolean;
  property_damage_details?: string;
  emergency_services_called: boolean;
  emergency_services_details?: string;
  all_clear_given: boolean;
  all_clear_time?: string;
  debrief_required: boolean;
  debrief_completed: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SafetyAction {
  id: string;
  action: string;
  taken_by: string;
  time: string;
}

export interface CreateCampusSafetyRecord {
  safety_type: 'fire' | 'lockdown' | 'evacuation' | 'shelter' | 'medical_emergency' | 'security_breach' | 'other';
  location: string;
  reported_by: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  actions_taken?: SafetyAction[];
  people_involved?: string[];
  injuries_reported?: boolean;
  injury_details?: string;
  property_damage?: boolean;
  property_damage_details?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCampusSafetyRecord {
  status?: string;
  severity?: string;
  actions_taken?: SafetyAction[];
  people_involved?: string[];
  injuries_reported?: boolean;
  injury_details?: string;
  property_damage?: boolean;
  property_damage_details?: string;
  emergency_services_called?: boolean;
  emergency_services_details?: string;
  all_clear_given?: boolean;
  all_clear_time?: string;
  debrief_required?: boolean;
  debrief_completed?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class CampusSafetyService {
  private readonly TABLE = 'campus_safety_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CampusSafetyRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CampusSafetyRecord | null> {
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

  async create(schoolId: string, record: CreateCampusSafetyRecord): Promise<CampusSafetyRecord> {
    const recordNumber = `CS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        status: 'active',
        date_time: new Date().toISOString(),
        actions_taken: record.actions_taken || [],
        people_involved: record.people_involved || [],
        injuries_reported: record.injuries_reported ?? false,
        property_damage: record.property_damage ?? false,
        emergency_services_called: false,
        all_clear_given: false,
        debrief_required: false,
        debrief_completed: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdateCampusSafetyRecord): Promise<CampusSafetyRecord> {
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

  async giveAllClear(schoolId: string, id: string): Promise<CampusSafetyRecord> {
    return this.update(schoolId, id, {
      status: 'completed',
      all_clear_given: true,
      all_clear_time: new Date().toISOString(),
    });
  }

  async getByType(schoolId: string, safetyType: string): Promise<CampusSafetyRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('safety_type', safetyType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<CampusSafetyRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getWithInjuries(schoolId: string): Promise<CampusSafetyRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('injuries_reported', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingDebrief(schoolId: string): Promise<CampusSafetyRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('debrief_required', true)
      .eq('debrief_completed', false)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    byType: Record<string, number>;
    withInjuries: number;
    pendingDebrief: number;
  }> {
    const records = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    records.forEach((r) => {
      byType[r.safety_type] = (byType[r.safety_type] || 0) + 1;
    });

    return {
      total: records.length,
      active: records.filter((r) => r.status === 'active').length,
      byType,
      withInjuries: records.filter((r) => r.injuries_reported).length,
      pendingDebrief: records.filter((r) => r.debrief_required && !r.debrief_completed).length,
    };
  }
}
