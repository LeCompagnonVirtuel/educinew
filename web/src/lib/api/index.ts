import { schoolsApi } from './schools';
import { gradesApi } from './grades';
import { attendanceApi } from './attendance';
import { messagingApi } from './messaging';
import { transportApi } from './transport';
import { notificationsApi } from './notifications';
import { aiApi } from './ai';
import { dashboardApi } from './dashboard';
import { teacherCheckinApi } from './teacher-checkin';
import { marketplaceApi } from './marketplace';
import { auditApi } from './audit';
import { scheduleApi } from './schedule';
import { emailApi } from './email';
import { paymentsApi } from './payments';
import { sbAuth } from './supabase-client';
import { sbSchools } from './supabase-client';
import { sbStudents } from './supabase-client';
import { sbTeachers } from './supabase-client';
import { sbClasses } from './supabase-client';
import { sbSubjects } from './supabase-client';
import { sbGrades } from './supabase-client';
import { sbAttendance } from './supabase-client';
import { sbPayments, sbInvoices, sbFinance } from './supabase-client';
import { sbNotifications } from './supabase-client';
import { sbMessaging } from './supabase-client';
import { sbDashboard } from './supabase-client';
import { sbTransport } from './supabase-client';
import { sbInvitations } from './supabase-client';
import { sbMarketplace } from './supabase-client';
import { sbImport } from './supabase-client';
import { sbAudit } from './supabase-client';
import { sbParent } from './supabase-client';
import { sbTeacherCheckin } from './supabase-client';
import { sbStaffAttendance } from './supabase-client';
import { sbPointage } from './supabase-client';
import { sbAi } from './supabase-client';
import { sbEmailTrigger } from './domains/email-trigger.service';

type AsyncFn = (...args: unknown[]) => Promise<unknown>;

class ApiClient {
  createInvitation: AsyncFn = sbInvitations.create as AsyncFn;
  getInvitations: AsyncFn = sbInvitations.list as AsyncFn;
  validateInvitation: AsyncFn = sbInvitations.validate as AsyncFn;
  revokeInvitation: AsyncFn = sbInvitations.validate as AsyncFn;

  getAuditLogs: AsyncFn = sbAudit.list as AsyncFn;

  createSchool: AsyncFn = sbSchools.create as AsyncFn;
  getSchools: AsyncFn = sbSchools.list as AsyncFn;
  getPublicStats: AsyncFn = sbSchools.getStats as AsyncFn;
  getSchool: AsyncFn = sbSchools.get as AsyncFn;
  getSchoolStats: AsyncFn = sbSchools.getStats as AsyncFn;
  updateSchool: AsyncFn = sbSchools.update as AsyncFn;

  getStudents: AsyncFn = sbStudents.list as AsyncFn;
  getStudentsWithPagination: AsyncFn = sbStudents.listWithPagination as AsyncFn;
  getStudentsAnalytics: AsyncFn = sbStudents.getAnalytics as AsyncFn;
  getStudent: AsyncFn = sbStudents.get as AsyncFn;
  getStudentPerformance: AsyncFn = sbStudents.getPerformance as AsyncFn;
  createStudent: AsyncFn = sbStudents.create as AsyncFn;
  updateStudent: AsyncFn = sbStudents.update as AsyncFn;
  deleteStudent: AsyncFn = sbStudents.remove as AsyncFn;
  validateImportFile: AsyncFn = sbImport.validateFile as AsyncFn;
  confirmImport: AsyncFn = sbImport.confirmImport as AsyncFn;

  getTeachers: AsyncFn = sbTeachers.list as AsyncFn;
  getTeachersWithPagination: AsyncFn = sbTeachers.listWithPagination as AsyncFn;
  getTeachersAnalytics: AsyncFn = sbTeachers.getAnalytics as AsyncFn;
  getTeacher: AsyncFn = sbTeachers.getById as AsyncFn;
  getTeacherPerformance: AsyncFn = sbTeachers.getPerformance as AsyncFn;
  getTeacherCheckinStats: AsyncFn = sbTeachers.getCheckinStats as AsyncFn;
  createTeacher: AsyncFn = sbTeachers.create as AsyncFn;
  updateTeacher: AsyncFn = sbTeachers.update as AsyncFn;
  deleteTeacher: AsyncFn = sbTeachers.remove as AsyncFn;
  validateTeacherImportFile: AsyncFn = sbImport.validateTeacherFile as AsyncFn;
  confirmTeacherImport: AsyncFn = sbImport.confirmTeacherImport as AsyncFn;

  getClasses: AsyncFn = sbClasses.list as AsyncFn;
  getClassesWithPagination: AsyncFn = sbClasses.listWithPagination as AsyncFn;
  getClassesAnalytics: AsyncFn = sbClasses.getAnalytics as AsyncFn;
  getClass: AsyncFn = sbClasses.getById as AsyncFn;
  createClass: AsyncFn = sbClasses.create as AsyncFn;
  updateClass: AsyncFn = sbClasses.update as AsyncFn;
  deleteClass: AsyncFn = sbClasses.remove as AsyncFn;

  getSchedule: AsyncFn = scheduleApi.getSchedule as AsyncFn;
  createScheduleSlot: AsyncFn = scheduleApi.createScheduleSlot as AsyncFn;
  updateScheduleSlot: AsyncFn = scheduleApi.updateScheduleSlot as AsyncFn;
  deleteScheduleSlot: AsyncFn = scheduleApi.deleteScheduleSlot as AsyncFn;
  checkConflicts: AsyncFn = scheduleApi.checkConflicts as AsyncFn;
  getSubjects: AsyncFn = scheduleApi.getSubjects as AsyncFn;

  sendEmail: AsyncFn = emailApi.send as AsyncFn;
  sendBulkEmail: AsyncFn = emailApi.sendBulk as AsyncFn;
  sendWelcomeEmail: AsyncFn = emailApi.sendWelcome as AsyncFn;
  sendPasswordResetEmail: AsyncFn = emailApi.sendPasswordReset as AsyncFn;
  sendVerificationEmail: AsyncFn = emailApi.sendVerification as AsyncFn;
  sendPaymentReceivedEmail: AsyncFn = emailApi.sendPaymentReceived as AsyncFn;
  sendPaymentPendingEmail: AsyncFn = emailApi.sendPaymentPending as AsyncFn;
  sendPaymentFailedEmail: AsyncFn = emailApi.sendPaymentFailed as AsyncFn;
  sendBulletinEmail: AsyncFn = emailApi.sendBulletinAvailable as AsyncFn;
  sendNewGradeEmail: AsyncFn = emailApi.sendNewGrade as AsyncFn;
  sendAbsenceEmail: AsyncFn = emailApi.sendAbsence as AsyncFn;
  sendLateEmail: AsyncFn = emailApi.sendLate as AsyncFn;
  sendAnnouncementEmail: AsyncFn = emailApi.sendAnnouncement as AsyncFn;
  sendInvitationEmail: AsyncFn = emailApi.sendInvitation as AsyncFn;
  sendTeacherCreatedEmail: AsyncFn = emailApi.sendTeacherCreated as AsyncFn;
  sendTrialEndingEmail: AsyncFn = emailApi.sendTrialEnding as AsyncFn;
  sendTrialExpiredEmail: AsyncFn = emailApi.sendTrialExpired as AsyncFn;
  sendSchoolCreatedEmail: AsyncFn = emailApi.sendSchoolCreated as AsyncFn;
  sendNewMessageEmail: AsyncFn = emailApi.sendNewMessage as AsyncFn;
  sendCustomEmail: AsyncFn = emailApi.sendCustom as AsyncFn;
  getEmailLogs: AsyncFn = emailApi.getLogs as AsyncFn;
  getEmailStats: AsyncFn = emailApi.getStats as AsyncFn;

  getGrades: AsyncFn = sbGrades.getGrades as AsyncFn;
  getClassReport: AsyncFn = sbGrades.getClassReport as AsyncFn;
  createGrade: AsyncFn = sbGrades.createGrade as AsyncFn;
  createBulkGrades: AsyncFn = sbGrades.createBulkGrades as AsyncFn;
  updateGrade: AsyncFn = sbGrades.updateGrade as AsyncFn;
  deleteGrade: AsyncFn = sbGrades.deleteGrade as AsyncFn;
  validateGrade: AsyncFn = sbGrades.validateGrade as AsyncFn;
  getUnvalidatedGrades: AsyncFn = sbGrades.getUnvalidatedGrades as AsyncFn;
  getStudentAverages: AsyncFn = sbGrades.getStudentAverages as AsyncFn;
  getClassAverages: AsyncFn = sbGrades.getClassAverages as AsyncFn;
  getClassDashboard: AsyncFn = sbGrades.getClassDashboard as AsyncFn;
  getStudentEvolution: AsyncFn = sbGrades.getStudentEvolution as AsyncFn;
  generateBulletins: AsyncFn = sbGrades.generateBulletins as AsyncFn;
  getBulletin: AsyncFn = sbGrades.getBulletin as AsyncFn;
  getStudentBulletins: AsyncFn = sbGrades.getStudentBulletins as AsyncFn;
  getClassBulletins: AsyncFn = sbGrades.getClassBulletins as AsyncFn;
  validateBulletin: AsyncFn = sbGrades.validateBulletin as AsyncFn;
  publishBulletin: AsyncFn = sbGrades.publishBulletin as AsyncFn;
  createPeriod: AsyncFn = sbGrades.createPeriod as AsyncFn;
  getPeriods: AsyncFn = sbGrades.getPeriods as AsyncFn;
  activatePeriod: AsyncFn = sbGrades.activatePeriod as AsyncFn;

  getAttendance: AsyncFn = sbAttendance.getAttendance as AsyncFn;
  getAttendanceStats: AsyncFn = sbAttendance.getAttendanceStats as AsyncFn;
  createAttendance: AsyncFn = sbAttendance.createAttendance as AsyncFn;
  createBulkAttendance: AsyncFn = sbAttendance.createBulkAttendance as AsyncFn;
  scanStudentQR: AsyncFn = sbAttendance.scanStudentQR as AsyncFn;
  getTodayAttendance: AsyncFn = sbAttendance.getTodayAttendance as AsyncFn;
  getDailyQRCode: AsyncFn = sbAttendance.getDailyQRCode as AsyncFn;

  getPayments: AsyncFn = sbPayments.list as AsyncFn;
  getPaymentStats: AsyncFn = sbPayments.getStats as AsyncFn;
  createPayment: AsyncFn = sbPayments.create as AsyncFn;
  updatePaymentStatus: AsyncFn = sbPayments.updateStatus as AsyncFn;
  getTuitionPlans: AsyncFn = sbPayments.getTuitionPlans as AsyncFn;
  createTuitionPlan: AsyncFn = sbPayments.createTuitionPlan as AsyncFn;
  getInvoices: AsyncFn = sbInvoices.list as AsyncFn;
  createInvoice: AsyncFn = sbInvoices.create as AsyncFn;
  bulkCreateInvoices: AsyncFn = sbInvoices.bulkCreateInvoices as AsyncFn;
  initiatePayment: AsyncFn = paymentsApi.initiatePayment as AsyncFn;
  verifyPayment: AsyncFn = sbPayments.verifyPayment as AsyncFn;
  getFinancialStats: AsyncFn = sbFinance.getStats as AsyncFn;
  getReceipt: AsyncFn = sbPayments.getReceipt as AsyncFn;
  getPaymentHistory: AsyncFn = sbPayments.getPaymentHistory as AsyncFn;
  getWallet: AsyncFn = sbPayments.getWallet as AsyncFn;
  rechargeWallet: AsyncFn = sbPayments.rechargeWallet as AsyncFn;
  getSupportedGateways: AsyncFn = sbPayments.getSupportedGateways as AsyncFn;
  getGatewayConfigs: AsyncFn = sbPayments.getGatewayConfigs as AsyncFn;
  saveGatewayConfig: AsyncFn = sbPayments.saveGatewayConfig as AsyncFn;
  testGatewayConnection: AsyncFn = sbPayments.testGatewayConnection as AsyncFn;
  toggleGateway: AsyncFn = sbPayments.toggleGateway as AsyncFn;
  deleteGatewayConfig: AsyncFn = sbPayments.deleteGatewayConfig as AsyncFn;
  getFeeCategories: AsyncFn = sbPayments.getFeeCategories as AsyncFn;
  createFeeCategory: AsyncFn = sbPayments.createFeeCategory as AsyncFn;
  updateFeeCategory: AsyncFn = sbPayments.updateFeeCategory as AsyncFn;
  deleteFeeCategory: AsyncFn = sbPayments.deleteFeeCategory as AsyncFn;
  getPaymentMethods: AsyncFn = sbPayments.getPaymentMethods as AsyncFn;
  getSubscription: AsyncFn = sbPayments.getSubscription as AsyncFn;
  getTrialStatus: AsyncFn = sbPayments.getTrialStatus as AsyncFn;
  createSubscription: AsyncFn = sbPayments.createSubscription as AsyncFn;
  cancelSubscription: AsyncFn = sbPayments.cancelSubscription as AsyncFn;

  getBuses: AsyncFn = sbTransport.getBuses as AsyncFn;
  getBus: AsyncFn = sbTransport.getBus as AsyncFn;
  getTrackingHistory: AsyncFn = sbTransport.getTrackingHistory as AsyncFn;
  createBus: AsyncFn = sbTransport.createBus as AsyncFn;
  updateBus: AsyncFn = sbTransport.updateBus as AsyncFn;
  deleteBus: AsyncFn = sbTransport.deleteBus as AsyncFn;

  getAnnouncements: AsyncFn = sbMessaging.getAnnouncements as AsyncFn;
  createAnnouncement: AsyncFn = sbMessaging.createAnnouncement as AsyncFn;
  deleteAnnouncement: AsyncFn = sbMessaging.deleteAnnouncement as AsyncFn;

  getInbox: AsyncFn = sbMessaging.getInbox as AsyncFn;
  getConversation: AsyncFn = sbMessaging.getConversation as AsyncFn;
  sendMessage: AsyncFn = sbMessaging.sendMessage as AsyncFn;

  getNotifications: AsyncFn = sbNotifications.getNotifications as AsyncFn;
  getUnreadCount: AsyncFn = sbNotifications.getUnreadCount as AsyncFn;
  markNotificationRead: AsyncFn = sbNotifications.markNotificationRead as AsyncFn;
  markAllNotificationsRead: AsyncFn = sbNotifications.markAllNotificationsRead as AsyncFn;

  chat: AsyncFn = sbAi.chat as AsyncFn;
  explainExercise: AsyncFn = sbAi.explainExercise as AsyncFn;
  generateQuiz: AsyncFn = sbAi.generateQuiz as AsyncFn;
  summarizeLesson: AsyncFn = sbAi.summarizeLesson as AsyncFn;

  getDashboardStats: AsyncFn = sbDashboard.getDashboardStats as AsyncFn;
  getStudentBulletinsSummary: AsyncFn = sbDashboard.getStudentBulletinsSummary as AsyncFn;
  getParentChildren: AsyncFn = sbDashboard.getParentChildren as AsyncFn;
  getAdminStats: AsyncFn = sbDashboard.getAdminStats as AsyncFn;
  getAdminAnalytics: AsyncFn = sbDashboard.getAdminAnalytics as AsyncFn;
  getAdminAlerts: AsyncFn = sbDashboard.getAdminAlerts as AsyncFn;
  getAdminActivity: AsyncFn = sbDashboard.getAdminActivity as AsyncFn;

  teacherCheckinGPS: AsyncFn = sbTeacherCheckin.teacherCheckinGPS as AsyncFn;
  teacherCheckinQR: AsyncFn = sbTeacherCheckin.teacherCheckinQR as AsyncFn;
  teacherCheckinFace: AsyncFn = sbTeacherCheckin.teacherCheckinFace as AsyncFn;
  validateGPSPresence: AsyncFn = sbTeacherCheckin.validateGPSPresence as AsyncFn;
  teacherCheckout: AsyncFn = sbTeacherCheckin.teacherCheckout as AsyncFn;
  getTeacherCheckinStatsBySchool: AsyncFn = sbTeacherCheckin.getTeacherCheckinStatsBySchool as AsyncFn;
  getTeacherCheckinRecords: AsyncFn = sbTeacherCheckin.getTeacherCheckinRecords as AsyncFn;
  getTeacherMonthlyStats: AsyncFn = sbTeacherCheckin.getTeacherMonthlyStats as AsyncFn;
  getTeacherBadges: AsyncFn = sbTeacherCheckin.getTeacherBadges as AsyncFn;
  checkTimetableConflict: AsyncFn = sbTeacherCheckin.checkTimetableConflict as AsyncFn;

  getMarketplaceListings: AsyncFn = sbMarketplace.getMarketplaceListings as AsyncFn;
  getMarketplaceListing: AsyncFn = sbMarketplace.getMarketplaceListing as AsyncFn;
  purchaseMarketplaceItem: AsyncFn = sbMarketplace.purchaseMarketplaceItem as AsyncFn;
  getMarketplaceCategories: AsyncFn = sbMarketplace.getMarketplaceCategories as AsyncFn;
  createMarketplaceListing: AsyncFn = sbMarketplace.createMarketplaceListing as AsyncFn;

  downloadImportTemplate(): Promise<unknown> {
    return sbImport.downloadTemplate();
  }

  async exportAccessCardsPDF(credentials: Record<string, unknown>[]) {
    return sbImport.exportAccessCardsPDF(credentials);
  }

  downloadTeacherImportTemplate(): Promise<unknown> {
    return sbImport.downloadTeacherTemplate();
  }

  async exportTeacherAccessCardsPDF(credentials: Record<string, unknown>[]) {
    return sbImport.exportTeacherAccessCardsPDF(credentials);
  }
}

export const api = new ApiClient();

export {
  sbAuth,
  sbSchools,
  sbStudents,
  sbTeachers,
  sbClasses,
  sbSubjects,
  sbGrades,
  sbAttendance,
  sbPayments,
  sbInvoices,
  sbFinance,
  sbNotifications,
  sbMessaging,
  sbDashboard,
  sbTransport,
  sbInvitations,
  sbAudit,
  sbAi,
  sbMarketplace,
  sbParent,
  sbTeacherCheckin,
  sbImport,
  sbEmailTrigger,
} from './supabase-client';

export { schoolsApi } from './schools';
export { gradesApi } from './grades';
export { attendanceApi } from './attendance';
export { messagingApi } from './messaging';
export { transportApi } from './transport';
export { notificationsApi } from './notifications';
export { aiApi } from './ai';
export { dashboardApi } from './dashboard';
export { teacherCheckinApi } from './teacher-checkin';
export { marketplaceApi } from './marketplace';
export { auditApi } from './audit';
export { scheduleApi } from './schedule';
export { emailApi } from './email';
export { sbEmailTrigger as emailTrigger } from './domains/email-trigger.service';