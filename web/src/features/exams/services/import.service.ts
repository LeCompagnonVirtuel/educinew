import type { SupabaseExamRepository } from '../repositories';
import { importMarksSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ImportServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class ImportService {
  constructor(private readonly deps: ImportServiceDeps) {}

  async importMarks(data: Record<string, unknown>) {
    const parsed = importMarksSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const exam = await this.deps.repository.findExam(parsed.examId as string);
    if (!exam) throw new Error('Exam not found');

    let rows: Record<string, unknown>[] = [];

    if (parsed.data) {
      rows = this.parseCSV(parsed.data as string);
    } else if (parsed.fileUrl) {
      const response = await fetch(parsed.fileUrl as string);
      const text = await response.text();
      rows = this.parseCSV(text);
    }

    if (parsed.validateOnly) {
      const validation = this.validateRows(rows, exam);
      return { valid: validation.valid, errors: validation.errors, totalRows: rows.length };
    }

    const entries = rows.map((row) => ({
      exam_id: parsed.examId,
      student_id: row.student_id,
      subject_id: row.subject_id || exam.subject_id,
      mark: Number(row.mark),
      max_mark: Number(row.max_mark || exam.max_mark),
      comment: row.comment,
      status: 'DRAFT',
      school_id: this.deps.schoolId,
    }));

    let marks;
    if (parsed.overwrite) {
      marks = await this.deps.repository.importMarks(entries);
    } else {
      marks = await this.deps.repository.bulkEnterMarks(entries);
    }

    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARKS_IMPORT', 'marks', parsed.examId as string, undefined, { count: marks.length, format: parsed.format });
    logger.info('Marks imported', { examId: parsed.examId, count: marks.length, format: parsed.format }, 'exams');
    return { imported: marks.length, marks };
  }

  private parseCSV(csv: string): Record<string, unknown>[] {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map((h: string) => h.trim().toLowerCase());
    return lines.slice(1).map((line: string) => {
      const values = line.split(',');
      const row: Record<string, unknown> = {};
      headers.forEach((h: string, i: number) => {
        row[h] = values[i]?.trim();
      });
      return row;
    });
  }

  private validateRows(rows: Record<string, unknown>[], exam: any): { valid: boolean; errors: Array<{ row: number; error: string }> } {
    const errors: Array<{ row: number; error: string }> = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row.student_id) errors.push({ row: i + 1, error: 'Missing student_id' });
      if (row.mark === undefined || row.mark === null) errors.push({ row: i + 1, error: 'Missing mark' });
      const mark = Number(row.mark);
      const maxMark = Number(row.max_mark || exam.max_mark);
      if (isNaN(mark) || mark < 0) errors.push({ row: i + 1, error: 'Invalid mark value' });
      if (mark > maxMark) errors.push({ row: i + 1, error: `Mark ${mark} exceeds max ${maxMark}` });
    }
    return { valid: errors.length === 0, errors };
  }
}
