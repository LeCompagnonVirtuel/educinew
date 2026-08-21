import { sbSchedule } from './domains/schedule.service';
import { sbSubjects } from './supabase-client';

export const scheduleApi = {
  getSchedule: (filters?: { classId?: string; teacherId?: string; subjectId?: string; dayOfWeek?: number; schoolId?: string }) =>
    sbSchedule.list(filters?.schoolId),
  createScheduleSlot: (data: any) => sbSchedule.create(data),
  updateScheduleSlot: (id: string, data: any) => sbSchedule.update(id, data),
  deleteScheduleSlot: (id: string) => sbSchedule.remove(id),
  checkConflicts: (data: any) => sbSchedule.checkConflicts(data),
  getSubjects: () => sbSubjects.list(),
};