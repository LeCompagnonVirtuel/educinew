import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ComplianceRecord {
  id: string;
  school_id: string;
  record_number: string;
  regulation: string;
  description: string;
  category: 'health' | 'safeguarding' | 'safety' | 'data_protection' | 'accessibility' | 'other';
  status: 'compliant' | 'non_compliant' | 'partially_compliant' | 'under_review' | 'exempt';
  last_assessment_date: string;
  next_assessment_date: string;
  evidence: ComplianceEvidence[];
  responsible_person: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ComplianceEvidence {
  id: string;
  type: 'document' | 'policy' | 'training' | 'audit' | 'inspection' | 'other';
  description: string;
  file_url?: string;
  date_collected: string;
}

export interface CreateComplianceRecord {
  regulation: string;
  description: string;
  category: 'health' | 'safeguarding' | 'safety' | 'data_protection' | 'accessibility' | 'other';
  last_assessment_date: string;
  next_assessment_date: string;
  responsible_person: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateComplianceRecord {
  status?: string;
  last_assessment_date?: string;
  next_assessment_date?: string;
  evidence?: ComplianceEvidence[];
  responsible_person?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ComplianceTrackingService {
  private readonly TABLE = 'compliance_records';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ComplianceRecord | null> {
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

  async create(schoolId: string, record: CreateComplianceRecord): Promise<ComplianceRecord> {
    const recordNumber = `CR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        record_number: recordNumber,
        ...record,
        status: 'under_review',
        evidence: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, record: UpdateComplianceRecord): Promise<ComplianceRecord> {
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

  async addEvidence(schoolId: string, id: string, evidence: ComplianceEvidence): Promise<ComplianceRecord> {
    const record = await this.getById(schoolId, id);
    if (!record) throw new Error('Compliance record not found');

    return this.update(schoolId, id, {
      evidence: [...record.evidence, evidence],
    });
  }

  async getByCategory(schoolId: string, category: string): Promise<ComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getNonCompliant(schoolId: string): Promise<ComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['non_compliant', 'partially_compliant'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingAssessment(schoolId: string): Promise<ComplianceRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .lte('next_assessment_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    compliant: number;
    nonCompliant: number;
    pendingAssessment: number;
    byCategory: Record<string, number>;
  }> {
    const records = await this.getAll(schoolId);
    const byCategory: Record<string, number> = {};
    records.forEach((r) => {
      byCategory[r.category] = (byCategory[r.category] || 0) + 1;
    });

    return {
      total: records.length,
      compliant: records.filter((r) => r.status === 'compliant').length,
      nonCompliant: records.filter((r) => r.status === 'non_compliant' || r.status === 'partially_compliant').length,
      pendingAssessment: records.filter(
        (r) => r.next_assessment_date <= new Date().toISOString().split('T')[0]
      ).length,
      byCategory,
    };
  }
}
