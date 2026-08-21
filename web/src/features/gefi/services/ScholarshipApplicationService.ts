import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ScholarshipApplication {
  id: string;
  school_id: string;
  application_number: string;
  program_id: string;
  student_id: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'interview' | 'approved' | 'rejected' | 'waitlisted';
  submitted_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
  score?: number;
  rank?: number;
  documents: Record<string, unknown>[];
  essay?: string;
  recommendation_letters?: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateScholarshipApplication {
  program_id: string;
  student_id: string;
  documents: Record<string, unknown>[];
  essay?: string;
  recommendation_letters?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateScholarshipApplication {
  status?: 'submitted' | 'under_review' | 'shortlisted' | 'interview' | 'approved' | 'rejected' | 'waitlisted';
  reviewed_by?: string;
  review_notes?: string;
  score?: number;
  rank?: number;
  metadata?: Record<string, unknown>;
}

export class ScholarshipApplicationService {
  private readonly TABLE = 'scholarship_applications';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ScholarshipApplication[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ScholarshipApplication | null> {
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

  async create(schoolId: string, application: CreateScholarshipApplication): Promise<ScholarshipApplication> {
    const applicationNumber = `SCH-APP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        application_number: applicationNumber,
        ...application,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, application: UpdateScholarshipApplication): Promise<ScholarshipApplication> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...application, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, reviewedBy: string, notes?: string): Promise<ScholarshipApplication> {
    return this.update(schoolId, id, {
      status: 'approved',
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      review_notes: notes,
    });
  }

  async reject(schoolId: string, id: string, reviewedBy: string, notes?: string): Promise<ScholarshipApplication> {
    return this.update(schoolId, id, {
      status: 'rejected',
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      review_notes: notes,
    });
  }

  async getByProgram(schoolId: string, programId: string): Promise<ScholarshipApplication[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('program_id', programId)
      .is('deleted_at', null)
      .order('score', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<ScholarshipApplication[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<ScholarshipApplication[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getApproved(schoolId: string): Promise<ScholarshipApplication[]> {
    return this.getByStatus(schoolId, 'approved');
  }

  async shortlist(schoolId: string, id: string, reviewedBy: string): Promise<ScholarshipApplication> {
    return this.update(schoolId, id, {
      status: 'shortlisted',
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
    });
  }
}
