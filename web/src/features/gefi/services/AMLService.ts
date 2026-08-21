import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AMLCheck {
  id: string;
  school_id: string;
  check_number: string;
  entity_type: 'student' | 'staff' | 'vendor' | 'donor' | 'institution';
  entity_id: string;
  entity_name: string;
  check_type: 'sanctions' | 'pep' | 'adverse_media' | 'watchlist' | 'comprehensive';
  status: 'pending' | 'in_progress' | 'clear' | 'flagged' | 'review_required';
  risk_level: 'low' | 'medium' | 'high' | 'prohibited';
  results: AMLCheckResult[];
  checked_by?: string;
  checked_at?: string;
  notes?: string;
  next_review_date?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AMLCheckResult {
  check_type: string;
  result: 'clear' | 'match' | 'potential_match' | 'error';
  details: string;
  confidence: number;
  source: string;
}

export interface CreateAMLCheck {
  entity_type: 'student' | 'staff' | 'vendor' | 'donor' | 'institution';
  entity_id: string;
  entity_name: string;
  check_type: 'sanctions' | 'pep' | 'adverse_media' | 'watchlist' | 'comprehensive';
  checked_by?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAMLCheck {
  status?: string;
  risk_level?: string;
  results?: AMLCheckResult[];
  notes?: string;
  next_review_date?: string;
  metadata?: Record<string, unknown>;
}

export class AMLService {
  private readonly TABLE = 'aml_checks';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AMLCheck[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AMLCheck | null> {
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

  async create(schoolId: string, check: CreateAMLCheck): Promise<AMLCheck> {
    const checkNumber = `AML-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        check_number: checkNumber,
        ...check,
        status: 'pending',
        risk_level: 'low',
        results: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, check: UpdateAMLCheck): Promise<AMLCheck> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...check, updated_at: new Date().toISOString() })
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

  async completeCheck(schoolId: string, id: string, results: AMLCheckResult[]): Promise<AMLCheck> {
    const hasFlag = results.some((r) => r.result === 'match');
    const hasPotential = results.some((r) => r.result === 'potential_match');

    let riskLevel: 'low' | 'medium' | 'high' | 'prohibited' = 'low';
    let status: 'pending' | 'in_progress' | 'clear' | 'flagged' | 'review_required' = 'clear';

    if (hasFlag) {
      riskLevel = 'high';
      status = 'flagged';
    } else if (hasPotential) {
      riskLevel = 'medium';
      status = 'review_required';
    }

    return this.update(schoolId, id, {
      results,
      status,
      risk_level: riskLevel,
      checked_at: new Date().toISOString(),
    });
  }

  async getByEntity(schoolId: string, entityType: string, entityId: string): Promise<AMLCheck[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByStatus(schoolId: string, status: string): Promise<AMLCheck[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getFlagged(schoolId: string): Promise<AMLCheck[]> {
    return this.getByStatus(schoolId, 'flagged');
  }

  async getHighRisk(schoolId: string): Promise<AMLCheck[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('risk_level', 'high')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPendingReview(schoolId: string): Promise<AMLCheck[]> {
    return this.getByStatus(schoolId, 'review_required');
  }

  async getDueForReview(schoolId: string): Promise<AMLCheck[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .lte('next_review_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getAMLStats(schoolId: string): Promise<{ total: number; clear: number; flagged: number; reviewRequired: number; highRiskRate: number }> {
    const checks = await this.getAll(schoolId);
    const highRisk = checks.filter((c) => c.risk_level === 'high' || c.risk_level === 'prohibited');
    return {
      total: checks.length,
      clear: checks.filter((c) => c.status === 'clear').length,
      flagged: checks.filter((c) => c.status === 'flagged').length,
      reviewRequired: checks.filter((c) => c.status === 'review_required').length,
      highRiskRate: checks.length > 0 ? (highRisk.length / checks.length) * 100 : 0,
    };
  }

  async scheduleReview(schoolId: string, id: string, nextReviewDate: string): Promise<AMLCheck> {
    return this.update(schoolId, id, { next_review_date: nextReviewDate });
  }
}
