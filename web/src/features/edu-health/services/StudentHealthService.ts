import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface StudentHealth {
  id: string;
  school_id: string;
  student_id: string;
  blood_type?: string;
  allergies: string[];
  medications: string[];
  medical_conditions: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  insurance_provider?: string;
  insurance_number?: string;
  doctor_name?: string;
  doctor_phone?: string;
  height_cm?: number;
  weight_kg?: number;
  vision_left?: string;
  vision_right?: string;
  dental_status?: string;
  immunizations: Immunization[];
  last_checkup_date?: string;
  next_checkup_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Immunization {
  id: string;
  vaccine_name: string;
  date_administered: string;
  dose_number: number;
  lot_number?: string;
  administered_by?: string;
  next_dose_date?: string;
}

export interface CreateStudentHealth {
  student_id: string;
  blood_type?: string;
  allergies?: string[];
  medications?: string[];
  medical_conditions?: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  insurance_provider?: string;
  insurance_number?: string;
  doctor_name?: string;
  doctor_phone?: string;
  height_cm?: number;
  weight_kg?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateStudentHealth {
  blood_type?: string;
  allergies?: string[];
  medications?: string[];
  medical_conditions?: string[];
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  insurance_provider?: string;
  insurance_number?: string;
  doctor_name?: string;
  doctor_phone?: string;
  height_cm?: number;
  weight_kg?: number;
  vision_left?: string;
  vision_right?: string;
  dental_status?: string;
  immunizations?: Immunization[];
  last_checkup_date?: string;
  next_checkup_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class StudentHealthService {
  private readonly TABLE = 'student_health';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<StudentHealth[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<StudentHealth | null> {
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

  async getByStudentId(schoolId: string, studentId: string): Promise<StudentHealth | null> {
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

  async create(schoolId: string, health: CreateStudentHealth): Promise<StudentHealth> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...health,
        allergies: health.allergies || [],
        medications: health.medications || [],
        medical_conditions: health.medical_conditions || [],
        immunizations: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, health: UpdateStudentHealth): Promise<StudentHealth> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...health, updated_at: new Date().toISOString() })
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

  async addImmunization(schoolId: string, id: string, immunization: Immunization): Promise<StudentHealth> {
    const record = await this.getById(schoolId, id);
    if (!record) throw new Error('Student health record not found');

    return this.update(schoolId, id, {
      immunizations: [...record.immunizations, immunization],
    });
  }

  async getWithAllergies(schoolId: string): Promise<StudentHealth[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .not('allergies', 'eq', '[]');

    if (error) throw error;
    return data || [];
  }

  async getWithMedications(schoolId: string): Promise<StudentHealth[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .not('medications', 'eq', '[]');

    if (error) throw error;
    return data || [];
  }

  async getOverdueCheckups(schoolId: string): Promise<StudentHealth[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .not('next_checkup_date', 'is', null)
      .lt('next_checkup_date', new Date().toISOString().split('T')[0]);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    withAllergies: number;
    withMedications: number;
    withConditions: number;
    overdueCheckups: number;
  }> {
    const records = await this.getAll(schoolId);
    return {
      total: records.length,
      withAllergies: records.filter((r) => r.allergies.length > 0).length,
      withMedications: records.filter((r) => r.medications.length > 0).length,
      withConditions: records.filter((r) => r.medical_conditions.length > 0).length,
      overdueCheckups: records.filter(
        (r) => r.next_checkup_date && r.next_checkup_date < new Date().toISOString().split('T')[0]
      ).length,
    };
  }
}
