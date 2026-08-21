import type { SupabaseExamRepository } from '../repositories';
import { exportMarksSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ExportServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class ExportService {
  constructor(private readonly deps: ExportServiceDeps) {}

  async exportMarks(data: Record<string, unknown>) {
    const parsed = exportMarksSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const marks = await this.deps.repository.exportMarks(this.deps.schoolId, {
      exam_id: parsed.examId,
      class_id: parsed.classId,
      term_id: parsed.termId,
    });

    logger.info('Marks exported', { count: marks.length, format: parsed.format }, 'exams');
    return this.formatData(marks, parsed.format as string);
  }

  async exportResults(termId: string, format = 'CSV') {
    const results = await this.deps.repository.exportResults(this.deps.schoolId, termId);
    logger.info('Results exported', { count: results.length, format }, 'exams');
    return this.formatData(results, format);
  }

  async exportRankings(academicYearId: string, format = 'CSV') {
    const rankings = await this.deps.repository.exportRankings(this.deps.schoolId, academicYearId);
    logger.info('Rankings exported', { count: rankings.length, format }, 'exams');
    return this.formatData(rankings, format);
  }

  private formatData(data: Record<string, unknown>[], format: string) {
    switch (format) {
      case 'CSV':
        return this.toCSV(data);
      case 'JSON':
        return JSON.stringify(data, null, 2);
      case 'EXCEL':
        return this.toCSV(data);
      case 'PDF':
        return JSON.stringify(data, null, 2);
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  private toCSV(data: Record<string, unknown>[]): string {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((h) => `"${String(row[h] ?? '')}"`).join(','));
    return [headers.join(','), ...rows].join('\n');
  }
}
