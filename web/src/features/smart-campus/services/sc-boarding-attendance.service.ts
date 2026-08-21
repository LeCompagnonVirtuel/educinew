import type { SupabaseClient } from '@supabase/supabase-js';
import type { BoardingAttendance, BoardingAttendanceCreate } from '@educi/types';
import { ScBoardingAttendanceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBoardingAttendanceService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAttendance(schoolId: string, id: string): Promise<BoardingAttendance> {
    const attendance = await this.repo.findBoardingAttendanceById(schoolId, id);
    if (!attendance) throw new ScBoardingAttendanceNotFoundError(id);
    return attendance;
  }

  async listAttendances(schoolId: string, filters?: Record<string, unknown>): Promise<BoardingAttendance[]> {
    return this.repo.findAllBoardingAttendances(schoolId, filters);
  }

  async createAttendance(schoolId: string, data: BoardingAttendanceCreate): Promise<BoardingAttendance> {
    return this.repo.createBoardingAttendance(schoolId, data);
  }

  async updateAttendance(schoolId: string, id: string, data: Partial<BoardingAttendanceCreate>): Promise<BoardingAttendance> {
    const existing = await this.repo.findBoardingAttendanceById(schoolId, id);
    if (!existing) throw new ScBoardingAttendanceNotFoundError(id);
    return this.repo.updateBoardingAttendance(schoolId, id, data);
  }

  async deleteAttendance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBoardingAttendanceById(schoolId, id);
    if (!existing) throw new ScBoardingAttendanceNotFoundError(id);
    return this.repo.deleteBoardingAttendance(schoolId, id);
  }

  async countAttendances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBoardingAttendances(schoolId, filters);
  }
}
