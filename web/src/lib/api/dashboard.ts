import { sbDashboard } from './domains/dashboard.service';

export const dashboardApi = {
  getDashboardStats: (userId: string) => sbDashboard.getStats(userId),
  getStudentStats: (studentId: string) => sbDashboard.getStudentStats(studentId),
  getStudentBulletins: (studentId: string) => sbDashboard.getStudentBulletins(studentId),
};