import type { Employee, EmployeeProfile, EmergencyContact, MedicalInformation, EmployeeContract, EmploymentHistory, HrDepartment, Position, SalaryScale, SalaryGrade, Benefit, Deduction, Allowance, Bonus, PayrollReference, Leave, LeaveBalance, LeaveApproval, Training, TrainingSession, TrainingEnrollment, Certification, PerformanceReview, Evaluation, Objective, Promotion, Transfer, Termination, DisciplinaryAction, Warning, Suspension, Reward, Recruitment, Candidate, Interview, JobOffer, EmployeeDocument, EmployeeSchedule, EmployeeShift, EmployeeAttendance, EmployeeDashboard, EmployeeStatistics, EmployeeTimeline, EmployeeAudit, EmployeeSearch, EmployeeFilters, HRNotification, HRSettings, HRRepository } from '@educi/types';

export interface HRRepositoryExtended extends HRRepository {
  findUser(userId: string): Promise<any | null>;
  findClass(classId: string): Promise<any | null>;
  findAcademicYear(yearId: string): Promise<any | null>;
  getSchoolSettings(schoolId: string): Promise<any>;
  logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
}

export type { Employee, EmployeeProfile, EmergencyContact, MedicalInformation, EmployeeContract, EmploymentHistory, HrDepartment, Position, SalaryScale, SalaryGrade, Benefit, Deduction, Allowance, Bonus, PayrollReference, Leave, LeaveBalance, LeaveApproval, Training, TrainingSession, TrainingEnrollment, Certification, PerformanceReview, Evaluation, Objective, Promotion, Transfer, Termination, DisciplinaryAction, Warning, Suspension, Reward, Recruitment, Candidate, Interview, JobOffer, EmployeeDocument, EmployeeSchedule, EmployeeShift, EmployeeAttendance, EmployeeDashboard, EmployeeStatistics, EmployeeTimeline, EmployeeAudit, EmployeeSearch, EmployeeFilters, HRNotification, HRSettings };
