import type {
  Teacher,
  TeacherProfile,
  TeacherAssignment,
  TeacherContract,
  TeacherDepartment,
  TeacherSubject,
  TeacherSchedule,
  TeacherAvailability,
  TeacherAttendance,
  TeacherPayrollSummary,
  TeacherLeave,
  TeacherQualification,
  TeacherCertification,
  TeacherExperience,
  TeacherEmergencyContact,
  TeacherMedicalRecord,
  TeacherEvaluation,
  TeacherPerformance,
  TeacherStatistics,
  TeacherTimeline,
  TeacherImport,
  TeacherExport,
  TeacherFilters,
  TeacherSearch,
  TeacherDashboard,
  TeacherStatus,
  TeacherGender,
  TeacherEmploymentType,
  TeacherContractType,
  TeacherGrade,
  TeacherSpeciality,
  TeacherLeaveType,
  TeacherLeaveStatus,
  TeacherEvaluationType,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  TeacherListResult,
} from '@educi/types';

export type {
  Teacher,
  TeacherProfile,
  TeacherAssignment,
  TeacherContract,
  TeacherDepartment,
  TeacherSubject,
  TeacherSchedule,
  TeacherAvailability,
  TeacherAttendance,
  TeacherPayrollSummary,
  TeacherLeave,
  TeacherQualification,
  TeacherCertification,
  TeacherExperience,
  TeacherEmergencyContact,
  TeacherMedicalRecord,
  TeacherEvaluation,
  TeacherPerformance,
  TeacherStatistics,
  TeacherTimeline,
  TeacherImport,
  TeacherExport,
  TeacherFilters,
  TeacherSearch,
  TeacherDashboard,
  TeacherStatus,
  TeacherGender,
  TeacherEmploymentType,
  TeacherContractType,
  TeacherGrade,
  TeacherSpeciality,
  TeacherLeaveType,
  TeacherLeaveStatus,
  TeacherEvaluationType,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  TeacherListResult,
};

export interface TeacherRepository {
  findById(id: string): Promise<Teacher | null>;
  findAll(schoolId: string, filters: TeacherFilters): Promise<TeacherListResult>;
  search(schoolId: string, query: string, limit?: number): Promise<Teacher[]>;
  create(data: CreateTeacherRequest, schoolId: string): Promise<Teacher>;
  update(id: string, data: UpdateTeacherRequest): Promise<Teacher>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  getStatistics(schoolId: string): Promise<TeacherStatistics>;
  getDashboard(schoolId: string): Promise<TeacherDashboard>;
  getTimeline(teacherId: string, limit?: number): Promise<TeacherTimeline[]>;
  getAssignments(teacherId: string): Promise<TeacherAssignment[]>;
  getSchedule(teacherId: string): Promise<TeacherSchedule[]>;
  getAvailability(teacherId: string): Promise<TeacherAvailability[]>;
  getLeaves(teacherId: string): Promise<TeacherLeave[]>;
  getContracts(teacherId: string): Promise<TeacherContract[]>;
  getEvaluations(teacherId: string): Promise<TeacherEvaluation[]>;
  getQualifications(teacherId: string): Promise<TeacherQualification[]>;
  getCertifications(teacherId: string): Promise<TeacherCertification[]>;
  getPayroll(schoolId: string): Promise<TeacherPayrollSummary[]>;
  importTeachers(schoolId: string, data: CreateTeacherRequest[]): Promise<{ imported: number; skipped: number; errors: Array<{ row: number; error: string }> }>;
  exportTeachers(schoolId: string, filters: TeacherFilters, format: string): Promise<Teacher[]>;
}
