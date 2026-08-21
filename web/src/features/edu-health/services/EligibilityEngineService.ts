import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface EligibilityRule {
  id: string;
  school_id: string;
  rule_code: string;
  name: string;
  description: string;
  category: 'financial' | 'academic' | 'health' | 'social' | 'other';
  criteria: EligibilityCriterion[];
  status: 'active' | 'inactive' | 'draft';
  priority: number;
  effective_date: string;
  expiration_date?: string;
  created_by: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EligibilityCriterion {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in';
  value: string | number | boolean;
  unit?: string;
}

export interface EligibilityResult {
  id: string;
  school_id: string;
  student_id: string;
  rule_id: string;
  eligible: boolean;
  score: number;
  evaluation_date: string;
  criteria_met: string[];
  criteria_not_met: string[];
  notes?: string;
}

export interface CreateEligibilityRule {
  name: string;
  description: string;
  category: 'financial' | 'academic' | 'health' | 'social' | 'other';
  criteria: EligibilityCriterion[];
  priority: number;
  effective_date: string;
  expiration_date?: string;
  created_by: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateEligibilityRule {
  name?: string;
  description?: string;
  criteria?: EligibilityCriterion[];
  status?: string;
  priority?: number;
  expiration_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class EligibilityEngineService {
  private readonly RULES_TABLE = 'eligibility_rules';
  private readonly RESULTS_TABLE = 'eligibility_results';

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
    const ruleCode = `ELR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .insert({
        rule_code: ruleCode,
        ...rule,
        status: 'active',
        school_id: schoolId,
      })
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

  async evaluate(schoolId: string, studentId: string, ruleId: string, studentData: Record<string, unknown>): Promise<EligibilityResult> {
    const rule = await this.getRuleById(schoolId, ruleId);
    if (!rule) throw new Error('Rule not found');

    const criteriaMet: string[] = [];
    const criteriaNotMet: string[] = [];
    let score = 0;

    for (const criterion of rule.criteria) {
      const fieldValue = studentData[criterion.field];
      const met = this.evaluateCriterion(criterion, fieldValue);

      if (met) {
        criteriaMet.push(criterion.id);
        score += 100 / rule.criteria.length;
      } else {
        criteriaNotMet.push(criterion.id);
      }
    }

    const eligible = criteriaNotMet.length === 0;

    const result: Omit<EligibilityResult, 'id'> = {
      school_id: schoolId,
      student_id: studentId,
      rule_id: ruleId,
      eligible,
      score: Math.round(score * 100) / 100,
      evaluation_date: new Date().toISOString(),
      criteria_met: criteriaMet,
      criteria_not_met: criteriaNotMet,
    };

    const { data, error } = await this.supabase
      .from(this.RESULTS_TABLE)
      .insert(result)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private evaluateCriterion(criterion: EligibilityCriterion, fieldValue: unknown): boolean {
    const value = criterion.value;

    switch (criterion.operator) {
      case 'equals':
        return fieldValue === value;
      case 'not_equals':
        return fieldValue !== value;
      case 'greater_than':
        return Number(fieldValue) > Number(value);
      case 'less_than':
        return Number(fieldValue) < Number(value);
      case 'contains':
        return String(fieldValue).includes(String(value));
      case 'in':
        return Array.isArray(value) ? value.includes(fieldValue as string) : false;
      default:
        return false;
    }
  }

  async getResults(schoolId: string, studentId: string): Promise<EligibilityResult[]> {
    const { data, error } = await this.supabase
      .from(this.RESULTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .order('evaluation_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getActiveRules(schoolId: string): Promise<EligibilityRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    totalRules: number;
    activeRules: number;
    totalEvaluations: number;
    eligibilityRate: number;
  }> {
    const rules = await this.getAllRules(schoolId);
    const { data: results } = await this.supabase
      .from(this.RESULTS_TABLE)
      .select('eligible')
      .eq('school_id', schoolId);

    const allResults = results || [];
    const eligibleCount = allResults.filter((r) => r.eligible).length;

    return {
      totalRules: rules.length,
      activeRules: rules.filter((r) => r.status === 'active').length,
      totalEvaluations: allResults.length,
      eligibilityRate: allResults.length > 0 ? (eligibleCount / allResults.length) * 100 : 0,
    };
  }
}
