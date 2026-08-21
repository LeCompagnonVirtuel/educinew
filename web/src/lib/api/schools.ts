import { sbSchools, sbDashboard } from './supabase-client';

export const schoolsApi = {
  createSchool(data: { name: string; type: string; address?: string; phone?: string; email?: string }) {
    return sbSchools.create(data) as Promise<any>;
  },

  getSchools() {
    return sbSchools.list() as Promise<any[]>;
  },

  async getPublicStats() {
    try {
      const stats = await sbDashboard.getPublicStats();
      return {
        schools: stats.schools || 0,
        students: stats.students || 0,
        teachers: stats.teachers || 0,
        parents: stats.parents || 0,
      };
    } catch {
      return { schools: 0, students: 0, teachers: 0, parents: 0 };
    }
  },

  getSchool(id: string) {
    return sbSchools.get(id) as Promise<any>;
  },

  getSchoolStats(id: string) {
    return sbSchools.getStats(id) as Promise<any>;
  },

  updateSchool(id: string, data: any) {
    return sbSchools.update(id, data) as Promise<any>;
  },
};
