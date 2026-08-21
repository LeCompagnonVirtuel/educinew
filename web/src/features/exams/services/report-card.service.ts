import type { SupabaseExamRepository } from '../repositories';
import { reportCardSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ReportCardServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class ReportCardService {
  constructor(private readonly deps: ReportCardServiceDeps) {}

  async generate(data: Record<string, unknown>) {
    const parsed = reportCardSchema.parse({ ...data, schoolId: this.deps.schoolId });

    const student = await this.deps.repository.findStudent(parsed.studentId as string);
    if (!student) throw new Error('Student not found');

    const cls = await this.deps.repository.findClass(parsed.classId as string);
    if (!cls) throw new Error('Class not found');

    const termAverages = await this.deps.repository.calculateTermAverage(parsed.studentId as string, parsed.classId as string, parsed.termId as string);

    const { data: subjectMarks } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('mark, max_mark, exam:exams(name, subject_id, coefficient, date)')
      .eq('student_id', parsed.studentId)
      .eq('exam.term_id', parsed.termId)
      .order('exam.date');

    const marks = subjectMarks || [];

    let attendance = null;
    if (parsed.includeAttendance) {
      const { data } = await (this.deps.repository as any).supabase
        .from('attendance_records')
        .select('status')
        .eq('student_id', parsed.studentId)
        .eq('term_id', parsed.termId);
      const records = data || [];
      attendance = {
        totalDays: records.length,
        present: records.filter((r: any) => r.status === 'PRESENT').length,
        absent: records.filter((r: any) => r.status === 'ABSENT').length,
        late: records.filter((r: any) => r.status === 'LATE').length,
      };
    }

    const reportData = {
      student_id: parsed.studentId,
      class_id: parsed.classId,
      term_id: parsed.termId,
      academic_year_id: parsed.academicYearId,
      school_id: this.deps.schoolId,
      student_name: `${student.first_name} ${student.last_name}`,
      class_name: cls.name,
      marks,
      average: termAverages?.average || 0,
      attendance,
      format: parsed.format || 'PDF',
      generated_at: new Date().toISOString(),
    };

    const reportCard = await this.deps.repository.generateReportCard(reportData);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'REPORT_CARD_GENERATE', 'report_card', reportCard.id, undefined, reportCard);
    logger.info('Report card generated', { reportCardId: reportCard.id, studentId: parsed.studentId }, 'exams');
    return reportCard;
  }

  async findById(id: string) {
    const card = await this.deps.repository.findReportCard(id);
    if (!card) throw new Error('Report card not found');
    return card;
  }

  async findAll(termId?: string) {
    return this.deps.repository.findReportCards(this.deps.schoolId, termId);
  }
}
