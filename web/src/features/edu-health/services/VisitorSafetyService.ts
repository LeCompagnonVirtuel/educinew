import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface VisitorSafety {
  id: string;
  school_id: string;
  visit_number: string;
  visitor_name: string;
  visitor_type: 'parent' | 'contractor' | 'delivery' | 'official' | 'volunteer' | 'other';
  purpose: string;
  person_to_visit: string;
  badge_issued: boolean;
  badge_number?: string;
  check_in_time: string;
  check_out_time?: string;
  escort_required: boolean;
  escort_name?: string;
  zones_accessed: string[];
  health_screening_completed: boolean;
  id_verified: boolean;
  vehicle_registration?: string;
  emergency_contact?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateVisitorSafety {
  visitor_name: string;
  visitor_type: 'parent' | 'contractor' | 'delivery' | 'official' | 'volunteer' | 'other';
  purpose: string;
  person_to_visit: string;
  escort_required: boolean;
  escort_name?: string;
  vehicle_registration?: string;
  emergency_contact?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateVisitorSafety {
  check_out_time?: string;
  badge_issued?: boolean;
  badge_number?: string;
  escort_name?: string;
  zones_accessed?: string[];
  health_screening_completed?: boolean;
  id_verified?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class VisitorSafetyService {
  private readonly TABLE = 'visitor_safety';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<VisitorSafety[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<VisitorSafety | null> {
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

  async create(schoolId: string, visitor: CreateVisitorSafety): Promise<VisitorSafety> {
    const visitNumber = `VIS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        visit_number: visitNumber,
        ...visitor,
        badge_issued: false,
        check_in_time: new Date().toISOString(),
        zones_accessed: [],
        health_screening_completed: false,
        id_verified: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, visitor: UpdateVisitorSafety): Promise<VisitorSafety> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...visitor, updated_at: new Date().toISOString() })
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

  async checkOut(schoolId: string, id: string): Promise<VisitorSafety> {
    return this.update(schoolId, id, {
      check_out_time: new Date().toISOString(),
    });
  }

  async issueBadge(schoolId: string, id: string, badgeNumber: string): Promise<VisitorSafety> {
    return this.update(schoolId, id, {
      badge_issued: true,
      badge_number: badgeNumber,
    });
  }

  async getCurrentlyOnSite(schoolId: string): Promise<VisitorSafety[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('check_out_time', null)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, visitorType: string): Promise<VisitorSafety[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('visitor_type', visitorType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUnescorted(schoolId: string): Promise<VisitorSafety[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('escort_required', true)
      .is('escort_name', null)
      .is('check_out_time', null)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    currentlyOnSite: number;
    todayVisitors: number;
    byType: Record<string, number>;
    unescorted: number;
  }> {
    const visitors = await this.getAll(schoolId);
    const today = new Date().toISOString().split('T')[0];
    const byType: Record<string, number> = {};
    visitors.forEach((v) => {
      byType[v.visitor_type] = (byType[v.visitor_type] || 0) + 1;
    });

    return {
      total: visitors.length,
      currentlyOnSite: visitors.filter((v) => !v.check_out_time).length,
      todayVisitors: visitors.filter((v) => v.check_in_time.startsWith(today)).length,
      byType,
      unescorted: visitors.filter((v) => v.escort_required && !v.escort_name && !v.check_out_time).length,
    };
  }
}
