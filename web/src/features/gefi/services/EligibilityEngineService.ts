import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface EligibilityRule {
  id: string;
  school_id: string;
  rule_code: string;
  name: string;
  description: string;
  type: 'academic' | 'financial' | 'demographic' | 'behavioral' | 'custom';
  conditions: Record<string, unknown>;
  action: 'qualify' | 'disqualify' | 'flag' | 'prioritize';
  priority: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EligibilityAssessment {
  id: string;
  school_id: string;
  student_id: string;
  program_id: string;
  result: 'eligible' | 'ineligible' | 'conditional' | 'pending';
  score: number;
  matched_rules: string[];
  flagged_rules: string[];
  notes?: string;
  assessed_at: string;
  assessed_by?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateEligibilityRule {
  rule_code: string;
  name: string;
  description: string;
  type: 'academic' | 'financial' | 'demographic' | 'behavioral' | 'custom';
  conditions: Record<string, unknown>;
  action: 'qualify' | 'disqualify' | 'flag' | 'prioritize';
  priority: number;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateEligibilityRule {
  name?: string;
  description?: string;
  conditions?: Record<string, unknown>;
  action?: 'qualify' | 'disqualify' | 'flag' | 'prioritize';
  priority?: number;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class EligibilityEngineService {
  private readonly RULES_TABLE = 'eligibility_rules';
  private readonly ASSESSMENTS_TABLE = 'eligibility_assessments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllRules(schoolId: string): Promise<EligibilityRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('priority', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getRuleById(schoolId: string, id: string): Promise<EligibilityRule | null> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createRule(schoolId: string, rule: CreateEligibilityRule): Promise<EligibilityRule> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .insert({ ...rule, is_active: rule.is_active ?? true, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRule(schoolId: string, id: string, rule: UpdateEligibilityRule): Promise<EligibilityRule> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .update({ ...rule, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.RULES_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async getActiveRules(schoolId: string): Promise<EligibilityRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('priority', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async assess(schoolId: string, studentId: string, programId: string, studentData: Record<string, unknown>): Promise<EligibilityAssessment> {
    const activeRules = await this.getActiveRules(schoolId);
    const matchedRules: string[] = [];
    const flaggedRules: string[] = [];
    let score = 0;

    for (const rule of activeRules) {
      const conditionMet = this.evaluateCondition(rule.conditions, studentData);
      if (conditionMet) {
        if (rule.action === 'qualify') {
          matchedRules.push(rule.id);
          score += 10;
        } else if (rule.action === 'disqualify') {
          flaggedRules.push(rule.id);
          score -= 20;
        } else if (rule.action === 'flag') {
          flaggedRules.push(rule.id);
        } else if (rule.action === 'prioritize') {
          matchedRules.push(rule.id);
          score += 15;
        }
      }
    }

    let result: 'eligible' | 'ineligible' | 'conditional' | 'pending' = 'pending';
    if (flaggedRules.length > 0) {
      const disqualifyRules = activeRules.filter((r) => flaggedRules.includes(r.id) && r.action === 'disqualify');
      result = disqualifyRules.length > 0 ? 'ineligible' : 'conditional';
    } else if (matchedRules.length > 0) {
      result = 'eligible';
    }

    const { data, error } = await this.supabase
      .from(this.ASSESSMENTS_TABLE)
      .insert({
        student_id: studentId,
        program_id: programId,
        result,
        score,
        matched_rules: matchedRules,
        flagged_rules: flaggedRules,
        assessed_at: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private evaluateCondition(conditions: Record<string, unknown>, studentData: Record<string, unknown>): boolean {
    for (const [key, value] of Object.entries(conditions)) {
      const studentValue = studentData[key];
      if (typeof value === 'object' && value !== null) {
        const rule = value as Record<string, unknown>;
        if (rule.min !== undefined && (studentValue as number) < (rule.min as number)) return false;
        if (rule.max !== undefined && (studentValue as number) > (rule.max as number)) return false;
        if (rule.equals !== undefined && studentValue !== rule.equals) return false;
        if (rule.in !== undefined && Array.isArray(rule.in) && !rule.in.includes(studentValue)) return false;
      } else {
        if (studentValue !== value) return false;
      }
    }
    return true;
  }

  async getAssessments(schoolId: string, studentId: string): Promise<EligibilityAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.ASSESSMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .order('assessed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAssessmentById(schoolId: string, id: string): Promise<EligibilityAssessment | null> {
    const { data, error } = await this.supabase
      .from(this.ASSESSMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
