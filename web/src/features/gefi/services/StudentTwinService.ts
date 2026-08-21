import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface StudentTwin {
  id: string;
  school_id: string;
  twin_code: string;
  student_id: string;
  student_name: string;
  academic_profile: AcademicProfile;
  financial_profile: FinancialProfile;
  behavioral_profile: BehavioralProfile;
  risk_indicators: RiskIndicator[];
  recommendations: string[];
  status: 'active' | 'inactive' | 'archived';
  last_updated: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface AcademicProfile {
  gpa: number;
  attendance_rate: number;
  grade_trend: 'improving' | 'stable' | 'declining';
  subjects_strength: Record<string, number>;
  subjects_weakness: Record<string, number>;
  predicted_performance: number;
}

export interface FinancialProfile {
  total_fees_paid: number;
  total_fees_pending: number;
  scholarship_status: string;
  payment_history: 'regular' | 'irregular' | 'default';
  financial_risk_score: number;
}

export interface BehavioralProfile {
  attendance_pattern: string;
  disciplinary_records: number;
  engagement_score: number;
  participation_level: 'high' | 'medium' | 'low';
}

export interface RiskIndicator {
  category: string;
  indicator: string;
  risk_level: 'low' | 'medium' | 'high';
  score: number;
  details: string;
}

export interface CreateStudentTwin {
  student_id: string;
  student_name: string;
  academic_profile: AcademicProfile;
  financial_profile: FinancialProfile;
  behavioral_profile: BehavioralProfile;
  metadata?: Record<string, unknown>;
}

export interface UpdateStudentTwin {
  academic_profile?: AcademicProfile;
  financial_profile?: FinancialProfile;
  behavioral_profile?: BehavioralProfile;
  risk_indicators?: RiskIndicator[];
  recommendations?: string[];
  metadata?: Record<string, unknown>;
}

export class StudentTwinService {
  private readonly TABLE = 'student_twins';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<StudentTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<StudentTwin | null> {
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

  async create(schoolId: string, twin: CreateStudentTwin): Promise<StudentTwin> {
    const twinCode = `ST-${Date.now()}`;
    const riskIndicators = this.calculateRiskIndicators(twin.academic_profile, twin.financial_profile, twin.behavioral_profile);
    const recommendations = this.generateRecommendations(riskIndicators);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        twin_code: twinCode,
        ...twin,
        risk_indicators: riskIndicators,
        recommendations,
        status: 'active',
        last_updated: new Date().toISOString(),
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, twin: UpdateStudentTwin): Promise<StudentTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...twin, last_updated: new Date().toISOString(), updated_at: new Date().toISOString() })
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

  private calculateRiskIndicators(
    academic: AcademicProfile,
    financial: FinancialProfile,
    behavioral: BehavioralProfile
  ): RiskIndicator[] {
    const indicators: RiskIndicator[] = [];

    if (academic.gpa < 2.0) {
      indicators.push({
        category: 'academic',
        indicator: 'Low GPA',
        risk_level: 'high',
        score: 80,
        details: `GPA of ${academic.gpa} is below acceptable threshold`,
      });
    } else if (academic.gpa < 2.5) {
      indicators.push({
        category: 'academic',
        indicator: 'Below Average GPA',
        risk_level: 'medium',
        score: 50,
        details: `GPA of ${academic.gpa} is below average`,
      });
    }

    if (academic.attendance_rate < 75) {
      indicators.push({
        category: 'academic',
        indicator: 'Poor Attendance',
        risk_level: 'high',
        score: 85,
        details: `Attendance rate of ${academic.attendance_rate}% is below required minimum`,
      });
    }

    if (financial.payment_history === 'default') {
      indicators.push({
        category: 'financial',
        indicator: 'Payment Default',
        risk_level: 'high',
        score: 90,
        details: 'Student has payment defaults',
      });
    }

    if (financial.total_fees_pending > financial.total_fees_paid * 0.5) {
      indicators.push({
        category: 'financial',
        indicator: 'High Pending Fees',
        risk_level: 'medium',
        score: 60,
        details: 'Pending fees exceed 50% of total paid',
      });
    }

    if (behavioral.disciplinary_records > 3) {
      indicators.push({
        category: 'behavioral',
        indicator: 'Multiple Disciplinary Records',
        risk_level: 'medium',
        score: 55,
        details: `${behavioral.disciplinary_records} disciplinary records on file`,
      });
    }

    return indicators;
  }

  private generateRecommendations(indicators: RiskIndicator[]): string[] {
    const recommendations: string[] = [];
    const highRisk = indicators.filter((i) => i.risk_level === 'high');
    const mediumRisk = indicators.filter((i) => i.risk_level === 'medium');

    if (highRisk.some((i) => i.category === 'academic')) {
      recommendations.push('Schedule academic intervention meeting');
      recommendations.push('Assign tutoring support');
    }

    if (highRisk.some((i) => i.category === 'financial')) {
      recommendations.push('Review financial aid eligibility');
      recommendations.push('Set up payment plan');
    }

    if (mediumRisk.length > 2) {
      recommendations.push('Schedule comprehensive student review');
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue monitoring');
    }

    return recommendations;
  }

  async getByStudent(schoolId: string, studentId: string): Promise<StudentTwin | null> {
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

  async getHighRisk(schoolId: string): Promise<StudentTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).filter((t) => t.risk_indicators.some((r) => r.risk_level === 'high'));
  }

  async getAtRisk(schoolId: string): Promise<StudentTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).filter((t) => t.risk_indicators.some((r) => r.risk_level === 'high' || r.risk_level === 'medium'));
  }

  async getTopPerformers(schoolId: string, limit: number): Promise<StudentTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return (data || [])
      .sort((a, b) => b.academic_profile.gpa - a.academic_profile.gpa)
      .slice(0, limit);
  }

  async getStats(schoolId: string): Promise<{ total: number; highRisk: number; atRisk: number; averageGpa: number }> {
    const twins = await this.getAll(schoolId);
    const active = twins.filter((t) => t.status === 'active');
    return {
      total: active.length,
      highRisk: active.filter((t) => t.risk_indicators.some((r) => r.risk_level === 'high')).length,
      atRisk: active.filter((t) => t.risk_indicators.some((r) => r.risk_level === 'medium' || r.risk_level === 'high')).length,
      averageGpa: active.length > 0 ? active.reduce((sum, t) => sum + t.academic_profile.gpa, 0) / active.length : 0,
    };
  }
}
