import { SupabaseClient } from '@supabase/supabase-js';
import {
  NationalExam, NationalExamCreate, NationalExamUpdate,
  ExamCenter, ExamCenterCreate, ExamCenterUpdate,
  ExamCandidate, ExamCandidateCreate, ExamCandidateUpdate,
  ExamSupervisor, ExamSupervisorCreate, ExamSupervisorUpdate,
  ExamSession, ExamSessionCreate, ExamSessionUpdate,
  MarkingCenter, MarkingCenterCreate, MarkingCenterUpdate,
  ExamResult, ExamResultCreate, ExamResultUpdate,
  Certificate, CertificateCreate, CertificateUpdate,
  Diploma, DiplomaCreate, DiplomaUpdate,
  ExamFraud, ExamFraudCreate, ExamFraudUpdate,
  ExamAppeal, ExamAppealCreate, ExamAppealUpdate,
  ExamStatistics, ExamStatisticsCreate, ExamStatisticsUpdate,
} from '@educi/types';
import {
  GovNationalExamNotFoundError,
  GovExamCenterNotFoundError,
  GovExamCandidateNotFoundError,
  GovExamSupervisorNotFoundError,
  GovExamSessionNotFoundError,
  GovMarkingCenterNotFoundError,
  GovExamResultNotFoundError,
  GovCertificateNotFoundError,
  GovDiplomaNotFoundError,
  GovExamFraudNotFoundError,
  GovExamAppealNotFoundError,
  GovExamStatisticsNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 3: National Examinations & Certifications
// ============================================================================

export interface GOV3Repository {
  nationalExam: NationalExamRepo;
  examCenter: ExamCenterRepo;
  examCandidate: ExamCandidateRepo;
  examSupervisor: ExamSupervisorRepo;
  examSession: ExamSessionRepo;
  markingCenter: MarkingCenterRepo;
  examResult: ExamResultRepo;
  certificate: CertificateRepo;
  diploma: DiplomaRepo;
  examFraud: ExamFraudRepo;
  examAppeal: ExamAppealRepo;
  examStatistics: ExamStatisticsRepo;
}

export interface NationalExamRepo {
  findById(schoolId: string, id: string): Promise<NationalExam>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]>;
  create(schoolId: string, data: Partial<NationalExamCreate>): Promise<NationalExam>;
  update(schoolId: string, id: string, data: Partial<NationalExamCreate>): Promise<NationalExam>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByAcademicYear(schoolId: string, academicYear: string): Promise<NationalExam[]>;
  findActive(schoolId: string): Promise<NationalExam[]>;
  findByType(schoolId: string, type: string): Promise<NationalExam[]>;
}

export interface ExamCenterRepo {
  findById(schoolId: string, id: string): Promise<ExamCenter>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]>;
  create(schoolId: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter>;
  update(schoolId: string, id: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamCenter[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<ExamCenter[]>;
  findActive(schoolId: string): Promise<ExamCenter[]>;
}

export interface ExamCandidateRepo {
  findById(schoolId: string, id: string): Promise<ExamCandidate>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCandidate[]>;
  create(schoolId: string, data: Partial<ExamCandidateCreate>): Promise<ExamCandidate>;
  update(schoolId: string, id: string, data: Partial<ExamCandidateCreate>): Promise<ExamCandidate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamCandidate[]>;
  findByStudent(schoolId: string, studentId: string): Promise<ExamCandidate[]>;
  findByCenter(schoolId: string, centerId: string): Promise<ExamCandidate[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamCandidate[]>;
}

export interface ExamSupervisorRepo {
  findById(schoolId: string, id: string): Promise<ExamSupervisor>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSupervisor[]>;
  create(schoolId: string, data: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor>;
  update(schoolId: string, id: string, data: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamSupervisor[]>;
  findByCenter(schoolId: string, centerId: string): Promise<ExamSupervisor[]>;
  findActive(schoolId: string): Promise<ExamSupervisor[]>;
}

export interface ExamSessionRepo {
  findById(schoolId: string, id: string): Promise<ExamSession>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSession[]>;
  create(schoolId: string, data: Partial<ExamSessionCreate>): Promise<ExamSession>;
  update(schoolId: string, id: string, data: Partial<ExamSessionCreate>): Promise<ExamSession>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamSession[]>;
  findByCenter(schoolId: string, centerId: string): Promise<ExamSession[]>;
  findByDateRange(schoolId: string, startDate: string, endDate: string): Promise<ExamSession[]>;
}

export interface MarkingCenterRepo {
  findById(schoolId: string, id: string): Promise<MarkingCenter>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<MarkingCenter[]>;
  create(schoolId: string, data: Partial<MarkingCenterCreate>): Promise<MarkingCenter>;
  update(schoolId: string, id: string, data: Partial<MarkingCenterCreate>): Promise<MarkingCenter>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<MarkingCenter[]>;
  findActive(schoolId: string): Promise<MarkingCenter[]>;
  findByLocation(schoolId: string, location: string): Promise<MarkingCenter[]>;
}

export interface ExamResultRepo {
  findById(schoolId: string, id: string): Promise<ExamResult>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamResult[]>;
  create(schoolId: string, data: Partial<ExamResultCreate>): Promise<ExamResult>;
  update(schoolId: string, id: string, data: Partial<ExamResultCreate>): Promise<ExamResult>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamResult[]>;
  findByStudent(schoolId: string, studentId: string): Promise<ExamResult[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamResult[]>;
  publish(schoolId: string, examId: string): Promise<void>;
}

export interface CertificateRepo {
  findById(schoolId: string, id: string): Promise<Certificate>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]>;
  create(schoolId: string, data: Partial<CertificateCreate>): Promise<Certificate>;
  update(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStudent(schoolId: string, studentId: string): Promise<Certificate[]>;
  findByExam(schoolId: string, examId: string): Promise<Certificate[]>;
  verify(schoolId: string, certificateNumber: string): Promise<Certificate | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface DiplomaRepo {
  findById(schoolId: string, id: string): Promise<Diploma>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Diploma[]>;
  create(schoolId: string, data: Partial<DiplomaCreate>): Promise<Diploma>;
  update(schoolId: string, id: string, data: Partial<DiplomaCreate>): Promise<Diploma>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStudent(schoolId: string, studentId: string): Promise<Diploma[]>;
  findBySchool(schoolId: string, schoolId_: string): Promise<Diploma[]>;
  verify(schoolId: string, diplomaNumber: string): Promise<Diploma | null>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface ExamFraudRepo {
  findById(schoolId: string, id: string): Promise<ExamFraud>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamFraud[]>;
  create(schoolId: string, data: Partial<ExamFraudCreate>): Promise<ExamFraud>;
  update(schoolId: string, id: string, data: Partial<ExamFraudCreate>): Promise<ExamFraud>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamFraud[]>;
  findByCandidate(schoolId: string, candidateId: string): Promise<ExamFraud[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamFraud[]>;
  investigate(schoolId: string, id: string): Promise<void>;
}

export interface ExamAppealRepo {
  findById(schoolId: string, id: string): Promise<ExamAppeal>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAppeal[]>;
  create(schoolId: string, data: Partial<ExamAppealCreate>): Promise<ExamAppeal>;
  update(schoolId: string, id: string, data: Partial<ExamAppealCreate>): Promise<ExamAppeal>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamAppeal[]>;
  findByCandidate(schoolId: string, candidateId: string): Promise<ExamAppeal[]>;
  findByStatus(schoolId: string, status: string): Promise<ExamAppeal[]>;
  resolve(schoolId: string, id: string, decision: string): Promise<void>;
}

export interface ExamStatisticsRepo {
  findById(schoolId: string, id: string): Promise<ExamStatistics>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<ExamStatistics[]>;
  create(schoolId: string, data: Partial<ExamStatisticsCreate>): Promise<ExamStatistics>;
  update(schoolId: string, id: string, data: Partial<ExamStatisticsCreate>): Promise<ExamStatistics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByExam(schoolId: string, examId: string): Promise<ExamStatistics[]>;
  findByRegion(schoolId: string, regionId: string): Promise<ExamStatistics[]>;
  findLatest(schoolId: string, examId: string): Promise<ExamStatistics | null>;
}

// ============================================================================
// Factory
// ============================================================================

function makeRepo<T>(supabase: SupabaseClient, table: string, Err: new (id: string) => Error, extra: Record<string, any> = {}) {
  const base = {
    async findById(schoolId: string, id: string): Promise<T> {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new Err(id);
      return data;
    },
    async findAll(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
    async create(schoolId: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId: string, id: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new Err(id);
      return d;
    },
    async delete(schoolId: string, id: string): Promise<void> {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId: string): Promise<number> {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
  };
  return Object.assign(base, extra) as any;
}

export function createGOV3Repository(supabase: SupabaseClient): GOV3Repository {
  return {
    nationalExam: makeRepo(supabase, 'gov_national_exams', GovNationalExamNotFoundError, {
      async findByAcademicYear(schoolId: string, academicYear: string) {
        const { data, error } = await supabase.from('gov_national_exams').select('*').eq('school_id', schoolId).eq('academic_year', academicYear);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_national_exams').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_national_exams').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    examCenter: makeRepo(supabase, 'gov_exam_centers', GovExamCenterNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_centers').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_exam_centers').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_exam_centers').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    examCandidate: makeRepo(supabase, 'gov_exam_candidates', GovExamCandidateNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_candidates').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_exam_candidates').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCenter(schoolId: string, centerId: string) {
        const { data, error } = await supabase.from('gov_exam_candidates').select('*').eq('school_id', schoolId).eq('center_id', centerId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_exam_candidates').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
    }),
    examSupervisor: makeRepo(supabase, 'gov_exam_supervisors', GovExamSupervisorNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_supervisors').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCenter(schoolId: string, centerId: string) {
        const { data, error } = await supabase.from('gov_exam_supervisors').select('*').eq('school_id', schoolId).eq('center_id', centerId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_exam_supervisors').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    examSession: makeRepo(supabase, 'gov_exam_sessions', GovExamSessionNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_sessions').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCenter(schoolId: string, centerId: string) {
        const { data, error } = await supabase.from('gov_exam_sessions').select('*').eq('school_id', schoolId).eq('center_id', centerId);
        if (error) throw error;
        return data ?? [];
      },
      async findByDateRange(schoolId: string, startDate: string, endDate: string) {
        const { data, error } = await supabase.from('gov_exam_sessions').select('*').eq('school_id', schoolId).gte('date', startDate).lte('date', endDate);
        if (error) throw error;
        return data ?? [];
      },
    }),
    markingCenter: makeRepo(supabase, 'gov_marking_centers', GovMarkingCenterNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_marking_centers').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_marking_centers').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByLocation(schoolId: string, location: string) {
        const { data, error } = await supabase.from('gov_marking_centers').select('*').eq('school_id', schoolId).eq('location', location);
        if (error) throw error;
        return data ?? [];
      },
    }),
    examResult: makeRepo(supabase, 'gov_exam_results', GovExamResultNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_results').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_exam_results').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_exam_results').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async publish(schoolId: string, examId: string) {
        const { error } = await supabase.from('gov_exam_results').update({ status: 'published' }).eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
      },
    }),
    certificate: makeRepo(supabase, 'gov_certificates', GovCertificateNotFoundError, {
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_certificates').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_certificates').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async verify(schoolId: string, certificateNumber: string) {
        const { data, error } = await supabase.from('gov_certificates').select('*').eq('school_id', schoolId).eq('certificate_number', certificateNumber).single();
        if (error) return null;
        return data;
      },
      async revoke(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_certificates').update({ status: 'revoked', revocation_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovCertificateNotFoundError(id);
      },
    }),
    diploma: makeRepo(supabase, 'gov_diplomas', GovDiplomaNotFoundError, {
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_diplomas').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findBySchool(schoolId: string, schoolId_: string) {
        const { data, error } = await supabase.from('gov_diplomas').select('*').eq('school_id', schoolId).eq('target_school_id', schoolId_);
        if (error) throw error;
        return data ?? [];
      },
      async verify(schoolId: string, diplomaNumber: string) {
        const { data, error } = await supabase.from('gov_diplomas').select('*').eq('school_id', schoolId).eq('diploma_number', diplomaNumber).single();
        if (error) return null;
        return data;
      },
      async revoke(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_diplomas').update({ status: 'revoked', revocation_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovDiplomaNotFoundError(id);
      },
    }),
    examFraud: makeRepo(supabase, 'gov_exam_frauds', GovExamFraudNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_frauds').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCandidate(schoolId: string, candidateId: string) {
        const { data, error } = await supabase.from('gov_exam_frauds').select('*').eq('school_id', schoolId).eq('candidate_id', candidateId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_exam_frauds').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async investigate(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_exam_frauds').update({ status: 'investigating' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovExamFraudNotFoundError(id);
      },
    }),
    examAppeal: makeRepo(supabase, 'gov_exam_appeals', GovExamAppealNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_appeals').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCandidate(schoolId: string, candidateId: string) {
        const { data, error } = await supabase.from('gov_exam_appeals').select('*').eq('school_id', schoolId).eq('candidate_id', candidateId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_exam_appeals').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async resolve(schoolId: string, id: string, decision: string) {
        const { error } = await supabase.from('gov_exam_appeals').update({ status: 'resolved', decision }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovExamAppealNotFoundError(id);
      },
    }),
    examStatistics: makeRepo(supabase, 'gov_exam_statistics', GovExamStatisticsNotFoundError, {
      async findByExam(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_statistics').select('*').eq('school_id', schoolId).eq('exam_id', examId);
        if (error) throw error;
        return data ?? [];
      },
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_exam_statistics').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, examId: string) {
        const { data, error } = await supabase.from('gov_exam_statistics').select('*').eq('school_id', schoolId).eq('exam_id', examId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
  };
}
