import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-5: Corporate — Corporate Training & Development
// ============================================================================

export interface GewlpCorporateProgram extends BaseEntity { company_id: string; name: string; description: string; program_type: 'onboarding'|'upskilling'|'leadership'|'compliance'|'safety'|'diversity'; budget: number; currency: string; start_date: string; end_date?: string; max_participants: number; status: 'planning'|'active'|'completed'|'cancelled'; metadata: Record<string,unknown>; }
export interface GewlpCorporateModule extends BaseEntity { program_id: string; title: string; description: string; instructor_id?: string; content_type: 'live'|'self_paced'|'blended'; duration_hours: number; materials_url?: string; max_participants?: number; order: number; status: 'draft'|'active'|'archived'; }
export interface GewlpCorporateEnrollment extends BaseEntity { program_id: string; employee_id: string; enrolled_by: string; enrolled_at: string; status: 'enrolled'|'in_progress'|'completed'|'withdrawn'|'expelled'; completion_pct: number; }
export interface GewlpCorporateCompletion extends BaseEntity { enrollment_id: string; module_id: string; employee_id: string; score?: number; passed: boolean; completed_at: string; time_spent_minutes: number; feedback?: string; }
export interface GewlpCorporateInstructor extends BaseEntity { user_id: string; company_id: string; name: string; expertise: string[]; rating_avg: number; total_sessions: number; status: 'active'|'inactive'; }
export interface GewlpCorporateSession extends BaseEntity { module_id: string; instructor_id: string; session_date: string; start_time: string; end_time: string; location?: string; meeting_url?: string; attendees: string[]; status: 'scheduled'|'in_progress'|'completed'|'cancelled'; }
export interface GewlpCorporateAssessment extends BaseEntity { module_id: string; title: string; description: string; assessment_type: 'quiz'|'exam'|'project'|'presentation'; max_score: number; passing_score: number; time_limit_minutes?: number; status: 'draft'|'active'|'archived'; }
export interface GewlpCorporateAssessmentResult extends BaseEntity { assessment_id: string; employee_id: string; score: number; passed: boolean; submitted_at: string; graded_at?: string; answers: Record<string,unknown>; }
export interface GewlpCorporateBudget extends BaseEntity { company_id: string; program_id?: string; fiscal_year: number; allocated: number; spent: number; currency: string; category: string; approved_by?: string; approved_at?: string; }
export interface GewlpCorporateReport extends BaseEntity { company_id: string; program_id?: string; report_type: 'completion'|'roi'|'engagement'|'compliance'|'skills_gap'; period: string; data: Record<string,unknown>; generated_at: string; generated_by: string; }
export interface GewlpCorporateCompliance extends BaseEntity { company_id: string; regulation: string; description: string; required_training_ids: string[]; deadline?: string; status: 'compliant'|'at_risk'|'non_compliant'; last_checked_at: string; }
export interface GewlpCorporateFeedback extends BaseEntity { program_id: string; employee_id: string; session_id?: string; rating: number; comment: string; category: 'content'|'instructor'|'logistics'|'overall'; submitted_at: string; anonymous: boolean; }

export const Gewlp5TableNames: Record<string, string> = {
  GewlpCorporateProgram: 'gewlp_corporate_programs',
  GewlpCorporateModule: 'gewlp_corporate_modules',
  GewlpCorporateEnrollment: 'gewlp_corporate_enrollments',
  GewlpCorporateCompletion: 'gewlp_corporate_completions',
  GewlpCorporateInstructor: 'gewlp_corporate_instructors',
  GewlpCorporateSession: 'gewlp_corporate_sessions',
  GewlpCorporateAssessment: 'gewlp_corporate_assessments',
  GewlpCorporateAssessmentResult: 'gewlp_corporate_assessment_results',
  GewlpCorporateBudget: 'gewlp_corporate_budgets',
  GewlpCorporateReport: 'gewlp_corporate_reports',
  GewlpCorporateCompliance: 'gewlp_corporate_compliances',
  GewlpCorporateFeedback: 'gewlp_corporate_feedbacks',
};

export interface Gewlp5Repository {
  corporatePrograms: CrudRepository<GewlpCorporateProgram>;
  corporateModules: CrudRepository<GewlpCorporateModule>;
  corporateEnrollments: CrudRepository<GewlpCorporateEnrollment>;
  corporateCompletions: CrudRepository<GewlpCorporateCompletion>;
  corporateInstructors: CrudRepository<GewlpCorporateInstructor>;
  corporateSessions: CrudRepository<GewlpCorporateSession>;
  corporateAssessments: CrudRepository<GewlpCorporateAssessment>;
  corporateAssessmentResults: CrudRepository<GewlpCorporateAssessmentResult>;
  corporateBudgets: CrudRepository<GewlpCorporateBudget>;
  corporateReports: CrudRepository<GewlpCorporateReport>;
  corporateCompliances: CrudRepository<GewlpCorporateCompliance>;
  corporateFeedbacks: CrudRepository<GewlpCorporateFeedback>;
}

export function createGewlp5Repository(supabase: SupabaseClient): Gewlp5Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    corporatePrograms: crud<GewlpCorporateProgram>(Gewlp5TableNames.GewlpCorporateProgram),
    corporateModules: crud<GewlpCorporateModule>(Gewlp5TableNames.GewlpCorporateModule),
    corporateEnrollments: crud<GewlpCorporateEnrollment>(Gewlp5TableNames.GewlpCorporateEnrollment),
    corporateCompletions: crud<GewlpCorporateCompletion>(Gewlp5TableNames.GewlpCorporateCompletion),
    corporateInstructors: crud<GewlpCorporateInstructor>(Gewlp5TableNames.GewlpCorporateInstructor),
    corporateSessions: crud<GewlpCorporateSession>(Gewlp5TableNames.GewlpCorporateSession),
    corporateAssessments: crud<GewlpCorporateAssessment>(Gewlp5TableNames.GewlpCorporateAssessment),
    corporateAssessmentResults: crud<GewlpCorporateAssessmentResult>(Gewlp5TableNames.GewlpCorporateAssessmentResult),
    corporateBudgets: crud<GewlpCorporateBudget>(Gewlp5TableNames.GewlpCorporateBudget),
    corporateReports: crud<GewlpCorporateReport>(Gewlp5TableNames.GewlpCorporateReport),
    corporateCompliances: crud<GewlpCorporateCompliance>(Gewlp5TableNames.GewlpCorporateCompliance),
    corporateFeedbacks: crud<GewlpCorporateFeedback>(Gewlp5TableNames.GewlpCorporateFeedback),
  };
}
