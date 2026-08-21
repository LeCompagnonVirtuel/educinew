import type { SupabaseClient } from '@supabase/supabase-js';
import type { Attendance } from '@educi/types';
import { LxpAttendanceNotFoundError, LxpAttendanceRecordError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAttendanceService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAttendance(schoolId: string, id: string): Promise<Attendance> {
    const attendance = await this.repo.findAttendanceById(schoolId, id);
    if (!attendance) throw new LxpAttendanceNotFoundError(id);
    return attendance;
  }

  async listAttendance(sessionId: string): Promise<readonly Attendance[]> {
    return this.repo.findAttendanceBySession(sessionId);
  }

  async recordAttendance(sessionId: string, userId: string, status: string): Promise<Attendance> {
    const recorded = await this.repo.recordAttendance(sessionId, userId, status);
    if (!recorded) throw new LxpAttendanceRecordError();
    return recorded;
  }

  async updateAttendance(schoolId: string, id: string, status: string): Promise<Attendance> {
    const existing = await this.repo.findAttendanceById(schoolId, id);
    if (!existing) throw new LxpAttendanceNotFoundError(id);
    const updated = await this.repo.updateAttendance(id, status);
    if (!updated) throw new LxpAttendanceRecordError();
    return updated;
  }

  async getUserAttendance(userId: string, courseId: string): Promise<readonly Attendance[]> {
    return this.repo.findUserAttendance(userId, courseId);
  }
}
