import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface MatchRule {
  id: string;
  school_id: string;
  rule_code: string;
  name: string;
  description: string;
  source_field: string;
  target_field: string;
  match_type: 'exact' | 'fuzzy' | 'range' | 'regex' | 'composite';
  tolerance?: number;
  priority: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface MatchResult {
  id: string;
  job_id: string;
  rule_id: string;
  source_record_id: string;
  target_record_id: string;
  score: number;
  confidence: number;
  status: 'auto_matched' | 'manual_matched' | 'rejected' | 'pending_review';
  matched_fields: string[];
  discrepancy_fields: string[];
  notes?: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMatchRule {
  name: string;
  description: string;
  source_field: string;
  target_field: string;
  match_type: 'exact' | 'fuzzy' | 'range' | 'regex' | 'composite';
  tolerance?: number;
  priority: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateMatchRule {
  name?: string;
  description?: string;
  source_field?: string;
  target_field?: string;
  match_type?: string;
  tolerance?: number;
  priority?: number;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class MatchService {
  private readonly RULES_TABLE = 'match_rules';
  private readonly RESULTS_TABLE = 'match_results';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllRules(schoolId: string): Promise<MatchRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('priority', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getRuleById(schoolId: string, id: string): Promise<MatchRule | null> {
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

  async createRule(schoolId: string, rule: CreateMatchRule): Promise<MatchRule> {
    const ruleCode = `MR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .insert({
        rule_code: ruleCode,
        ...rule,
        is_active: true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRule(schoolId: string, id: string, rule: UpdateMatchRule): Promise<MatchRule> {
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

  async executeMatch(schoolId: string, jobId: string, sourceData: Record<string, unknown>[], targetData: Record<string, unknown>[]): Promise<MatchResult[]> {
    const rules = await this.getActiveRules(schoolId);
    const results: MatchResult[] = [];

    for (const source of sourceData) {
      for (const target of targetData) {
        let totalScore = 0;
        let matchedFields: string[] = [];
        let discrepancyFields: string[] = [];

        for (const rule of rules) {
          const sourceValue = source[rule.source_field];
          const targetValue = target[rule.target_field];

          const matchResult = this.evaluateMatch(sourceValue, targetValue, rule);
          if (matchResult.matched) {
            totalScore += matchResult.score;
            matchedFields.push(rule.source_field);
          } else {
            discrepancyFields.push(rule.source_field);
          }
        }

        const averageScore = rules.length > 0 ? totalScore / rules.length : 0;
        const confidence = averageScore / 100;

        if (averageScore >= 70) {
          const { data, error } = await this.supabase
            .from(this.RESULTS_TABLE)
            .insert({
              job_id: jobId,
              rule_id: rules[0]?.id || '',
              source_record_id: source.id as string,
              target_record_id: target.id as string,
              score: averageScore,
              confidence,
              status: averageScore >= 90 ? 'auto_matched' : 'pending_review',
              matched_fields: matchedFields,
              discrepancy_fields: discrepancyFields,
              school_id: schoolId,
            })
            .select()
            .single();

          if (!error && data) results.push(data);
        }
      }
    }

    return results;
  }

  private evaluateMatch(sourceValue: unknown, targetValue: unknown, rule: MatchRule): { matched: boolean; score: number } {
    if (sourceValue === undefined || targetValue === undefined) {
      return { matched: false, score: 0 };
    }

    switch (rule.match_type) {
      case 'exact':
        return { matched: sourceValue === targetValue, score: sourceValue === targetValue ? 100 : 0 };
      case 'fuzzy': {
        const str1 = String(sourceValue).toLowerCase();
        const str2 = String(targetValue).toLowerCase();
        const similarity = this.calculateSimilarity(str1, str2);
        return { matched: similarity >= (rule.tolerance || 80), score: similarity * 100 };
      }
      case 'range': {
        const num1 = Number(sourceValue);
        const num2 = Number(targetValue);
        const diff = Math.abs(num1 - num2);
        return { matched: diff <= (rule.tolerance || 0), score: diff <= (rule.tolerance || 0) ? 100 : Math.max(0, 100 - diff) };
      }
      default:
        return { matched: false, score: 0 };
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1;
    return (longer.length - this.editDistance(longer, shorter)) / longer.length;
  }

  private editDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  async getActiveRules(schoolId: string): Promise<MatchRule[]> {
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

  async getResults(schoolId: string, jobId: string): Promise<MatchResult[]> {
    const { data, error } = await this.supabase
      .from(this.RESULTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('job_id', jobId)
      .order('score', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateResult(schoolId: string, id: string, updates: Partial<MatchResult>): Promise<MatchResult> {
    const { data, error } = await this.supabase
      .from(this.RESULTS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async approveMatch(schoolId: string, id: string): Promise<MatchResult> {
    return this.updateResult(schoolId, id, { status: 'manual_matched' });
  }

  async rejectMatch(schoolId: string, id: string): Promise<MatchResult> {
    return this.updateResult(schoolId, id, { status: 'rejected' });
  }

  async getMatchStats(schoolId: string, jobId: string): Promise<{ total: number; autoMatched: number; pendingReview: number; rejected: number; averageScore: number }> {
    const results = await this.getResults(schoolId, jobId);
    return {
      total: results.length,
      autoMatched: results.filter((r) => r.status === 'auto_matched').length,
      pendingReview: results.filter((r) => r.status === 'pending_review').length,
      rejected: results.filter((r) => r.status === 'rejected').length,
      averageScore: results.length > 0 ? results.reduce((sum, r) => sum + r.score, 0) / results.length : 0,
    };
  }
}
