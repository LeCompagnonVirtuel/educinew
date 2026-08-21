import type { SupabaseExamRepository } from '../repositories';
import { logger } from '@educi/logger';

interface DashboardServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class DashboardService {
  constructor(private readonly deps: DashboardServiceDeps) {}

  async getDashboard(termId?: string) {
    const dashboard = await this.deps.repository.getExamDashboard(this.deps.schoolId);

    let upcomingQuery = (this.deps.repository as any).supabase
      .from('exams')
      .select('id, name, type, date, subject_id, class_id')
      .eq('school_id', this.deps.schoolId)
      .gte('date', new Date().toISOString())
      .order('date')
      .limit(10);

    if (termId) upcomingQuery = upcomingQuery.eq('term_id', termId);
    const { data: upcoming } = await upcomingQuery;

    let recentQuery = (this.deps.repository as any).supabase
      .from('exams')
      .select('id, name, type, date, subject_id, class_id')
      .eq('school_id', this.deps.schoolId)
      .lte('date', new Date().toISOString())
      .order('date', { ascending: false })
      .limit(10);

    if (termId) recentQuery = recentQuery.eq('term_id', termId);
    const { data: recent } = await recentQuery;

    const { data: pendingMarks } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('id, exam_id')
      .eq('school_id', this.deps.schoolId)
      .eq('status', 'DRAFT');

    const { data: pendingValidation } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('id, exam_id')
      .eq('school_id', this.deps.schoolId)
      .eq('status', 'SUBMITTED');

    const { data: pendingCorrections } = await (this.deps.repository as any).supabase
      .from('corrections')
      .select('id')
      .eq('school_id', this.deps.schoolId)
      .eq('status', 'PENDING');

    logger.info('Exam dashboard loaded', { schoolId: this.deps.schoolId }, 'exams');
    return {
      ...dashboard,
      upcomingExams: upcoming || [],
      recentExams: recent || [],
      pendingMarks: pendingMarks?.length || 0,
      pendingValidation: pendingValidation?.length || 0,
      pendingCorrections: pendingCorrections?.length || 0,
    };
  }

  async getSummary() {
    const { data: exams } = await (this.deps.repository as any).supabase
      .from('exams')
      .select('id, status, type')
      .eq('school_id', this.deps.schoolId);

    const { data: marks } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('id, status')
      .eq('school_id', this.deps.schoolId);

    const { data: decisions } = await (this.deps.repository as any).supabase
      .from('decisions')
      .select('id, decision')
      .eq('school_id', this.deps.schoolId);

    return {
      totalExams: exams?.length || 0,
      examsByStatus: (exams || []).reduce((acc: Record<string, number>, e: any) => { acc[e.status] = (acc[e.status] || 0) + 1; return acc; }, {}),
      totalMarks: marks?.length || 0,
      marksByStatus: (marks || []).reduce((acc: Record<string, number>, m: any) => { acc[m.status] = (acc[m.status] || 0) + 1; return acc; }, {}),
      totalDecisions: decisions?.length || 0,
      decisionsByType: (decisions || []).reduce((acc: Record<string, number>, d: any) => { acc[d.decision] = (acc[d.decision] || 0) + 1; return acc; }, {}),
    };
  }
}
