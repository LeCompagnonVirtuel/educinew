import type { SupabaseExamRepository } from '../repositories';
import { transcriptSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface TranscriptServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class TranscriptService {
  constructor(private readonly deps: TranscriptServiceDeps) {}

  async generate(data: Record<string, unknown>) {
    const parsed = transcriptSchema.parse({ ...data, schoolId: this.deps.schoolId });

    const student = await this.deps.repository.findStudent(parsed.studentId as string);
    if (!student) throw new Error('Student not found');

    const { data: terms } = await (this.deps.repository as any).supabase
      .from('terms')
      .select('*')
      .eq('academic_year_id', parsed.academicYearId)
      .order('semester');

    const termResults = [];
    for (const term of terms || []) {
      const termAvg = await this.deps.repository.calculateTermAverage(parsed.studentId as string, student.class_id, term.id);
      termResults.push({ term, average: termAvg?.average || 0 });
    }

    const annualAvg = await (this.deps.repository as any).supabase
      .from('annual_averages')
      .select('average')
      .eq('student_id', parsed.studentId)
      .eq('academic_year_id', parsed.academicYearId)
      .single();

    let attendance = null;
    if (parsed.includeAttendance) {
      const { data } = await (this.deps.repository as any).supabase
        .from('attendance_records')
        .select('status')
        .eq('student_id', parsed.studentId)
        .eq('academic_year_id', parsed.academicYearId);
      const records = data || [];
      attendance = {
        totalDays: records.length,
        present: records.filter((r: any) => r.status === 'PRESENT').length,
        absent: records.filter((r: any) => r.status === 'ABSENT').length,
      };
    }

    const { data: decisions } = await (this.deps.repository as any).supabase
      .from('decisions')
      .select('*')
      .eq('student_id', parsed.studentId)
      .eq('academic_year_id', parsed.academicYearId);

    const transcriptData = {
      student_id: parsed.studentId,
      academic_year_id: parsed.academicYearId,
      school_id: this.deps.schoolId,
      student_name: `${student.first_name} ${student.last_name}`,
      matricule: student.matricule,
      class_name: student.class_name,
      terms: termResults,
      annual_average: annualAvg?.data?.average || 0,
      attendance,
      decisions: decisions || [],
      format: parsed.format || 'PDF',
      generated_at: new Date().toISOString(),
    };

    const transcript = await this.deps.repository.generateTranscript(transcriptData);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'TRANSCRIPT_GENERATE', 'transcript', transcript.id, undefined, transcript);
    logger.info('Transcript generated', { transcriptId: transcript.id, studentId: parsed.studentId }, 'exams');
    return transcript;
  }

  async findById(id: string) {
    const transcript = await this.deps.repository.findTranscript(id);
    if (!transcript) throw new Error('Transcript not found');
    return transcript;
  }

  async findAll(academicYearId?: string) {
    return this.deps.repository.findTranscripts(this.deps.schoolId, academicYearId);
  }
}
