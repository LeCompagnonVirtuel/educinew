import type { SupabaseExamRepository } from '../repositories';
import { examTimelineSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface TimelineServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class TimelineService {
  constructor(private readonly deps: TimelineServiceDeps) {}

  async getTimeline(filters?: Record<string, unknown>) {
    const parsed = filters ? examTimelineSchema.parse({ ...filters, schoolId: this.deps.schoolId }) : { schoolId: this.deps.schoolId };

    let query = (this.deps.repository as any).supabase
      .from('exam_timeline')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .order('created_at', { ascending: false });

    if (parsed.classId) query = query.eq('class_id', parsed.classId);
    if (parsed.subjectId) query = query.eq('subject_id', parsed.subjectId);
    if (parsed.startDate) query = query.gte('created_at', parsed.startDate);
    if (parsed.endDate) query = query.lte('created_at', parsed.endDate);
    if (parsed.limit) query = query.limit(parsed.limit);

    const { data, error } = await query;
    if (error) throw error;

    logger.info('Exam timeline loaded', { schoolId: this.deps.schoolId, count: data?.length || 0 }, 'exams');
    return data || [];
  }

  async logEvent(eventData: Record<string, unknown>) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_timeline')
      .insert({ ...eventData, school_id: this.deps.schoolId, created_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getExamTimeline(examId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_timeline')
      .select('*')
      .eq('exam_id', examId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getClassTimeline(classId: string, limit = 50) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_timeline')
      .select('*')
      .eq('class_id', classId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }
}
