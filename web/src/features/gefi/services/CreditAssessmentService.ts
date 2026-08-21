import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CreditAssessment {
  id: string;
  school_id: string;
  assessment_number: string;
  student_id: string;
  loan_id?: string;
  credit_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'very_high';
  factors: CreditFactor[];
  recommendation: 'approve' | 'deny' | 'conditional';
  max_loan_amount: number;
  recommended_interest_rate: number;
  conditions?: string[];
  assessed_at: string;
  assessed_by?: string;
  valid_until: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreditFactor {
  category: string;
  factor: string;
  value: number;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface CreateCreditAssessment {
  student_id: string;
  loan_id?: string;
  student_data: Record<string, unknown>;
  assessed_by?: string;
  metadata?: Record<string, unknown>;
}

export class CreditAssessmentService {
  private readonly TABLE = 'credit_assessments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CreditAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CreditAssessment | null> {
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

  async create(schoolId: string, assessment: CreateCreditAssessment): Promise<CreditAssessment> {
    const assessmentNumber = `CA-${Date.now()}`;
    const result = this.calculateCreditScore(assessment.student_data);

    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 3);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        assessment_number: assessmentNumber,
        student_id: assessment.student_id,
        loan_id: assessment.loan_id,
        credit_score: result.score,
        risk_level: result.riskLevel,
        factors: result.factors,
        recommendation: result.recommendation,
        max_loan_amount: result.maxLoanAmount,
        recommended_interest_rate: result.interestRate,
        conditions: result.conditions,
        assessed_at: new Date().toISOString(),
        assessed_by: assessment.assessed_by,
        valid_until: validUntil.toISOString(),
        school_id: schoolId,
        metadata: assessment.metadata,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, updates: Partial<CreditAssessment>): Promise<CreditAssessment> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
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

  private calculateCreditScore(studentData: Record<string, unknown>): {
    score: number;
    riskLevel: 'low' | 'medium' | 'high' | 'very_high';
    factors: CreditFactor[];
    recommendation: 'approve' | 'deny' | 'conditional';
    maxLoanAmount: number;
    interestRate: number;
    conditions: string[];
  } {
    const factors: CreditFactor[] = [];
    let score = 50;
    const conditions: string[] = [];

    const gpa = (studentData.gpa as number) || 0;
    if (gpa >= 3.5) {
      factors.push({ category: 'academic', factor: 'GPA', value: gpa, weight: 20, impact: 'positive' });
      score += 15;
    } else if (gpa >= 2.5) {
      factors.push({ category: 'academic', factor: 'GPA', value: gpa, weight: 20, impact: 'neutral' });
    } else {
      factors.push({ category: 'academic', factor: 'GPA', value: gpa, weight: 20, impact: 'negative' });
      score -= 10;
      conditions.push('Maintain minimum GPA of 2.5');
    }

    const familyIncome = (studentData.family_income as number) || 0;
    if (familyIncome > 0) {
      const incomeImpact = familyIncome > 500000 ? 'positive' : familyIncome > 200000 ? 'neutral' : 'negative';
      factors.push({ category: 'financial', factor: 'Family Income', value: familyIncome, weight: 25, impact: incomeImpact });
      if (incomeImpact === 'positive') score += 10;
      else if (incomeImpact === 'negative') score -= 10;
    }

    const age = (studentData.age as number) || 0;
    if (age >= 18) {
      factors.push({ category: 'demographic', factor: 'Age', value: age, weight: 5, impact: 'positive' });
      score += 5;
    }

    score = Math.max(0, Math.min(100, score));

    let riskLevel: 'low' | 'medium' | 'high' | 'very_high';
    if (score >= 70) riskLevel = 'low';
    else if (score >= 50) riskLevel = 'medium';
    else if (score >= 30) riskLevel = 'high';
    else riskLevel = 'very_high';

    let recommendation: 'approve' | 'deny' | 'conditional';
    if (score >= 60) recommendation = 'approve';
    else if (score >= 40) recommendation = 'conditional';
    else recommendation = 'deny';

    const maxLoanAmount = score * 10000;
    const interestRate = riskLevel === 'low' ? 5 : riskLevel === 'medium' ? 8 : riskLevel === 'high' ? 12 : 15;

    return { score, riskLevel, factors, recommendation, maxLoanAmount, interestRate, conditions };
  }

  async getByStudent(schoolId: string, studentId: string): Promise<CreditAssessment[]> {
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

  async getValidAssessment(schoolId: string, studentId: string): Promise<CreditAssessment | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .gte('valid_until', new Date().toISOString())
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  async getByRiskLevel(schoolId: string, riskLevel: string): Promise<CreditAssessment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('risk_level', riskLevel)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
