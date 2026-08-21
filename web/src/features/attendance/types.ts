import type {
  Attendance, TeacherAttendance, AttendanceRecord, AttendanceSession,
  AttendanceSummary, AttendanceStatistics, AttendanceDashboard, AttendanceTimeline,
  AttendanceReport, AttendanceAlert, AttendanceNotification, AttendanceImport,
  AttendanceExport, AttendanceHistory, AttendanceCorrection, AttendanceJustification,
  AttendanceDevice, AttendanceLocation, AttendanceSync, AttendanceQR, AttendanceGPS,
  AttendanceFaceRecognition, AttendanceNFC, AttendanceSettings, AttendancePolicy,
  AttendanceAudit, AttendanceSearch, AttendanceAnalytics, AttendanceFilters,
  CreateAttendanceRequest, UpdateAttendanceRequest, CreateTeacherAttendanceRequest,
  CreateSessionRequest, BulkAttendanceRequest, AttendanceReportRequest,
  AttendanceDashboardRequest, AttendanceImportRequest, AttendanceExportRequest,
  AttendanceRepository,
  StudentAttendanceStatus, TeacherAttendanceStatus, AttendanceMethod, AttendanceReason,
  AttendanceType, AttendanceSessionStatus, AttendancePeriod,
} from '@educi/types';

export type {
  Attendance, TeacherAttendance, AttendanceRecord, AttendanceSession,
  AttendanceSummary, AttendanceStatistics, AttendanceDashboard, AttendanceTimeline,
  AttendanceReport, AttendanceAlert, AttendanceNotification, AttendanceImport,
  AttendanceExport, AttendanceHistory, AttendanceCorrection, AttendanceJustification,
  AttendanceDevice, AttendanceLocation, AttendanceSync, AttendanceQR, AttendanceGPS,
  AttendanceFaceRecognition, AttendanceNFC, AttendanceSettings, AttendancePolicy,
  AttendanceAudit, AttendanceSearch, AttendanceAnalytics, AttendanceFilters,
  CreateAttendanceRequest, UpdateAttendanceRequest, CreateTeacherAttendanceRequest,
  CreateSessionRequest, BulkAttendanceRequest, AttendanceReportRequest,
  AttendanceDashboardRequest, AttendanceImportRequest, AttendanceExportRequest,
  AttendanceRepository,
  StudentAttendanceStatus, TeacherAttendanceStatus, AttendanceMethod, AttendanceReason,
  AttendanceType, AttendanceSessionStatus, AttendancePeriod,
};

export interface AttendanceRepositoryExtended extends AttendanceRepository {
  countByClassAndDate(schoolId: string, classId: string, date: string): Promise<{ total: number; present: number; absent: number; late: number }>;
  countByTeacherAndDate(schoolId: string, teacherId: string, date: string): Promise<{ total: number; present: number; absent: number }>;
  findActiveSession(schoolId: string, classId: string): Promise<AttendanceSession | null>;
  getConsecutiveAbsences(schoolId: string, studentId: string): Promise<number>;
  getAttendanceRate(schoolId: string, studentId: string, startDate: string, endDate: string): Promise<number>;
  getTeacherAttendanceRate(schoolId: string, teacherId: string, startDate: string, endDate: string): Promise<number>;
}
