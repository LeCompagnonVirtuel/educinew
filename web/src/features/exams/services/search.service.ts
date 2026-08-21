import type { SupabaseExamRepository } from '../repositories';
import { examSearchSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface SearchServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class SearchService {
  constructor(private readonly deps: SearchServiceDeps) {}

  async search(data: Record<string, unknown>) {
    const parsed = examSearchSchema.parse({ ...data, schoolId: this.deps.schoolId });

    let query = (this.deps.repository as any).supabase
      .from('exams')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .ilike('name', `%${parsed.query}%`);

    if (parsed.types && parsed.types.length > 0) {
      query = query.in('type', parsed.types);
    }
    if (parsed.statuses && parsed.statuses.length > 0) {
      query = query.in('status', parsed.statuses);
    }
    if (parsed.classIds && parsed.classIds.length > 0) {
      query = query.in('class_id', parsed.classIds);
    }
    if (parsed.subjectIds && parsed.subjectIds.length > 0) {
      query = query.in('subject_id', parsed.subjectIds);
    }
    if (parsed.dateFrom) {
      query = query.gte('date', parsed.dateFrom);
    }
    if (parsed.dateTo) {
      query = query.lte('date', parsed.dateTo);
    }

    const limit = parsed.limit || 20;
    query = query.order('date', { ascending: false }).limit(limit);

    const { data: exams, error } = await query;
    if (error) throw error;

    logger.info('Exams searched', { query: parsed.query, count: exams?.length || 0 }, 'exams');
    return exams || [];
  }

  async searchWithFilters(filters: Record<string, unknown>) {
    return this.deps.repository.findAllExams(this.deps.schoolId, filters);
  }

  async searchByName(query: string, limit = 20) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exams')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .ilike('name', `%${query}%`)
      .order('date', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }
}
