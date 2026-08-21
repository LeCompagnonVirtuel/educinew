// Re-export shared utilities
export { getSupabase, camel } from './shared';

// Re-export all domain services for backward compatibility
export { sbAuth } from './domains/auth.service';
export { sbSchools } from './domains/schools.service';
export { sbStudents } from './domains/students.service';
export { sbTeachers } from './domains/teachers.service';
export { sbClasses } from './domains/classes.service';
export { sbSubjects } from './domains/subjects.service';
export { sbGrades } from './domains/grades.service';
export { sbAttendance } from './domains/attendance.service';
export { sbPayments, sbInvoices, sbFinance } from './domains/payments.service';
export { sbNotifications } from './domains/notifications.service';
export { sbMessaging } from './domains/messaging.service';
export { sbDashboard } from './domains/dashboard.service';
export { sbTransport } from './domains/transport.service';
export { sbInvitations } from './domains/invitations.service';
export { sbMarketplace } from './domains/marketplace.service';
export { sbImport } from './domains/import.service';
export { sbAudit } from './domains/audit.service';
export { sbParent } from './domains/parent.service';
export { sbTeacherCheckin } from './domains/teacher-checkin.service';
export { sbStaffAttendance } from './domains/staff-attendance.service';
export { sbPointage } from './domains/pointage.service';
export { sbAi } from './domains/ai.service';
export { sbEmailTrigger } from './domains/email-trigger.service';
