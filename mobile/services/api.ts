export { setToken, setRefreshToken, cached, executeRequest } from './base';

export {
  login,
  refreshToken,
  validateSchoolCode,
  forgotPassword,
  verifyOTP,
  verifyEmailToken,
  resendOTP,
  getProfile,
  changePassword,
  activateAccount,
  activateEnterpriseAccount,
  validateInvitation,
  loginWithQRCode,
  completeFirstLogin,
  getSchoolBranding,
  registerSchool,
  getSchools,
  getSchool,
} from './auth';

export {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentPerformance,
  getParentChildren,
  getChildGrades,
  getChildAttendance,
  getChildSchedule,
  getChildDocuments,
  getStudentAttendanceByUser,
  getStudentBulletinsSummary,
  getStudentAssignments,
  getStudentDocuments,
  getStudentBulletinsFromTable,
  submitAssignment,
  getQuizzes,
  getQuizQuestions,
  submitQuizResult,
} from './students';

export {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherSchedule,
  getTeacherClasses,
  getTeacherDashboardQuickActions,
  getTeacherRecentMessages,
  getTeacherAttendanceStats,
  getTeacherDashboardStats,
  getTeacherRecentActions,
  teacherCheckinGPS,
  teacherCheckinQR,
  teacherCheckinFace,
  teacherCheckout,
  validateTeacherPresence,
  getTeacherCheckinStats,
  getTeacherCheckinRecords,
  getTeacherMonthlyStats,
  getTeacherBadges,
  checkTimetableConflict,
  getTeacherAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from './teachers';

export {
  getGrades,
  getClassReport,
  createGrade,
  createBulkGrades,
  updateGrade,
  deleteGrade,
  validateGrade,
  getUnvalidatedGrades,
  getStudentAverages,
  getClassAverages,
  getClassDashboard,
  getStudentEvolution,
  generateBulletins,
  getBulletin,
  getStudentBulletins,
  getClassBulletins,
  validateBulletin,
  publishBulletin,
  getPeriods,
} from './grades';

export {
  getAttendance,
  getAttendanceStats,
  createAttendanceBulk,
  getTodayAttendance,
  scanStudentQR,
  getDailyQRCode,
  staffCheckIn,
  staffCheckOut,
  staffStartBreak,
  staffEndBreak,
  getStaffTodayRecord,
  getStaffAttendanceHistory,
} from './attendance';

export {
  initiatePayment,
  getPayments,
  getPaymentStats,
  getRecentPayments,
  getInvoices,
  getPaymentHistory,
  getReceipt,
  verifyPayment,
  getWallet,
  rechargeWallet,
  getPaymentMethods,
} from './payments';

export {
  getInbox,
  getConversation,
  sendMessage,
  getAnnouncements,
  sendEmail,
  sendBulkEmail,
  sendPaymentReceivedEmail,
  sendBulletinEmail,
  sendAbsenceEmail,
  sendAnnouncementEmail,
  getEmailLogs,
} from './messaging';

export {
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  registerPushToken,
  unregisterPushToken,
} from './notifications';

export { getBuses, getBus, getTrackingHistory } from './transport';

export {
  getDashboardStats,
  getQuickActions,
  getUserTasks,
  getSchoolStats,
  getParentDashboard,
} from './dashboard';

export {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  getSubjects,
  getCourses,
} from './classes';

export {
  getMarketplaceListings,
  getMarketplaceListing,
  purchaseMarketplaceItem,
  getMarketplaceCategories,
  createMarketplaceListing,
} from './marketplace';

export {
  surveillanceScanQR,
  getVisitorStats,
  registerVisitor,
  checkoutVisitor,
  getActiveVisitors,
} from './surveillance';

export { chat, explainExercise, generateQuiz, summarizeLesson } from './ai';

import * as auth from './auth';
import * as students from './students';
import * as teachers from './teachers';
import * as grades from './grades';
import * as attendance from './attendance';
import * as payments from './payments';
import * as messaging from './messaging';
import * as notifications from './notifications';
import * as transport from './transport';
import * as dashboard from './dashboard';
import * as classes from './classes';
import * as marketplace from './marketplace';
import * as surveillance from './surveillance';
import * as ai from './ai';
import { setToken, setRefreshToken, cached, executeRequest } from './base';

export const api = {
  setToken,
  setRefreshToken,
  cached,
  executeRequest,
  ...auth,
  ...students,
  ...teachers,
  ...grades,
  ...attendance,
  ...payments,
  ...messaging,
  ...notifications,
  ...transport,
  ...dashboard,
  ...classes,
  ...marketplace,
  ...surveillance,
  ...ai,
};
