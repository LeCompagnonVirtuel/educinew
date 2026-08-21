import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AccessibilityProfile {
  id: string;
  school_id: string;
  student_id: string;
  disability_type: 'physical' | 'sensory' | 'cognitive' | 'learning' | 'multiple' | 'other';
  severity: 'mild' | 'moderate' | 'severe' | 'profound';
  status: 'active' | 'under_review' | 'inactive';
  diagnosis: string;
  diagnosing_professional?: string;
  diagnosis_date?: string;
  accommodations: AccommodationEntry[];
  assistive_technology: AssistiveTechnology[];
  modifications: ModificationEntry[];
  support_level: 'universal' | 'targeted' | 'intensive';
  review_date: string;
  last_review_date?: string;
  parent_contact: string;
  external_agencies: ExternalAgency[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AccommodationEntry {
  id: string;
  type: 'environmental' | 'instructional' | 'assessment' | 'behavioral' | 'technology';
  description: string;
  implemented: boolean;
  effective: boolean;
}

export interface AssistiveTechnology {
  id: string;
  name: string;
  type: string;
  provider?: string;
  cost?: number;
  status: 'active' | 'inactive' | 'requested';
}

export interface ModificationEntry {
  id: string;
  subject: string;
  description: string;
  reason: string;
}

export interface ExternalAgency {
  id: string;
  name: string;
  contact: string;
  service_type: string;
}

export interface CreateAccessibilityProfile {
  student_id: string;
  disability_type: 'physical' | 'sensory' | 'cognitive' | 'learning' | 'multiple' | 'other';
  severity: 'mild' | 'moderate' | 'severe' | 'profound';
  diagnosis: string;
  diagnosing_professional?: string;
  diagnosis_date?: string;
  parent_contact: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAccessibilityProfile {
  status?: string;
  disability_type?: string;
  severity?: string;
  accommodations?: AccommodationEntry[];
  assistive_technology?: AssistiveTechnology[];
  modifications?: ModificationEntry[];
  support_level?: string;
  review_date?: string;
  external_agencies?: ExternalAgency[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class AccessibilityService {
  private readonly TABLE = 'accessibility_profiles';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AccessibilityProfile[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AccessibilityProfile | null> {
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

  async create(schoolId: string, profile: CreateAccessibilityProfile): Promise<AccessibilityProfile> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...profile,
        status: 'active',
        accommodations: [],
        assistive_technology: [],
        modifications: [],
        support_level: 'targeted',
        external_agencies: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, profile: UpdateAccessibilityProfile): Promise<AccessibilityProfile> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...profile, updated_at: new Date().toISOString() })
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

  async addAccommodation(schoolId: string, id: string, accommodation: AccommodationEntry): Promise<AccessibilityProfile> {
    const profile = await this.getById(schoolId, id);
    if (!profile) throw new Error('Profile not found');

    return this.update(schoolId, id, {
      accommodations: [...profile.accommodations, accommodation],
    });
  }

  async getByStudent(schoolId: string, studentId: string): Promise<AccessibilityProfile | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async getByDisabilityType(schoolId: string, disabilityType: string): Promise<AccessibilityProfile[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('disability_type', disabilityType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<AccessibilityProfile[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('review_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    byType: Record<string, number>;
    pendingReview: number;
  }> {
    const profiles = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    profiles.forEach((p) => {
      byType[p.disability_type] = (byType[p.disability_type] || 0) + 1;
    });

    return {
      total: profiles.length,
      active: profiles.filter((p) => p.status === 'active').length,
      byType,
      pendingReview: profiles.filter(
        (p) => p.status === 'active' && p.review_date <= new Date().toISOString().split('T')[0]
      ).length,
    };
  }
}
