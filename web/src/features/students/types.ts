import type {
  Student, StudentStatus, StudentGender, StudentBloodGroup,
  StudentFilters, StudentListResult, StudentStatistics, StudentTimeline,
  StudentDocument, StudentGuardian, StudentMedicalRecord,
  StudentAttendanceSummary, StudentGradeSummary, StudentPaymentSummary,
  StudentLibrarySummary, StudentCanteenSummary, StudentDisciplineSummary,
  StudentDashboard, CreateStudentRequest, UpdateStudentRequest,
  StudentPromotion, StudentTransfer, StudentArchive,
  StudentImport, StudentExport, StudentQRCode, StudentCard,
  StudentProfile, StudentEnrollment, StudentAcademicRecord,
  StudentParent, StudentEmergencyContact, StudentVaccination,
  StudentAllergy, StudentDisability, StudentTransport, StudentPhoto,
} from '@educi/types';

export type {
  Student, StudentStatus, StudentGender, StudentBloodGroup,
  StudentFilters, StudentListResult, StudentStatistics, StudentTimeline,
  StudentDocument, StudentGuardian, StudentMedicalRecord,
  StudentAttendanceSummary, StudentGradeSummary, StudentPaymentSummary,
  StudentLibrarySummary, StudentCanteenSummary, StudentDisciplineSummary,
  StudentDashboard, CreateStudentRequest, UpdateStudentRequest,
  StudentPromotion, StudentTransfer, StudentArchive,
  StudentImport, StudentExport, StudentQRCode, StudentCard,
  StudentProfile, StudentEnrollment, StudentAcademicRecord,
  StudentParent, StudentEmergencyContact, StudentVaccination,
  StudentAllergy, StudentDisability, StudentTransport, StudentPhoto,
};

export interface StudentRepository {
  create(data: CreateStudentRequest, schoolId: string): Promise<Student>;
  update(id: string, data: UpdateStudentRequest): Promise<Student>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Student | null>;
  findByMatricule(matricule: string): Promise<Student | null>;
  findByUserId(userId: string): Promise<Student | null>;
  findAll(schoolId: string, filters: StudentFilters): Promise<StudentListResult>;
  search(schoolId: string, query: string, limit?: number): Promise<Student[]>;
  uploadPhoto(studentId: string, file: File): Promise<string>;
  generateQRCode(studentId: string): Promise<string>;
  generateCard(studentId: string): Promise<string>;
  getTimeline(studentId: string, limit?: number): Promise<StudentTimeline[]>;
  getStatistics(schoolId: string): Promise<StudentStatistics>;
  getDashboard(schoolId: string): Promise<StudentDashboard>;
  importStudents(schoolId: string, data: CreateStudentRequest[]): Promise<StudentImport>;
  exportStudents(schoolId: string, filters: StudentFilters, format: string): Promise<StudentExport>;
  getMedicalRecord(studentId: string): Promise<StudentMedicalRecord | null>;
  updateMedicalRecord(studentId: string, data: Partial<StudentMedicalRecord>): Promise<void>;
  getGuardians(studentId: string): Promise<StudentGuardian[]>;
  addGuardian(studentId: string, guardian: Omit<StudentGuardian, 'id' | 'studentId'>): Promise<StudentGuardian>;
  removeGuardian(guardianId: string): Promise<void>;
  promote(studentId: string, data: Omit<StudentPromotion, 'id' | 'studentId'>): Promise<StudentPromotion>;
  transfer(studentId: string, data: Omit<StudentTransfer, 'id' | 'studentId'>): Promise<StudentTransfer>;
  getAttendanceSummary(studentId: string, academicYearId: string): Promise<StudentAttendanceSummary>;
  getGradeSummary(studentId: string, academicYearId: string): Promise<StudentGradeSummary>;
  getPaymentSummary(studentId: string): Promise<StudentPaymentSummary>;
  exists(schoolId: string, filters: { email?: string; matricule?: string }): Promise<boolean>;
}
