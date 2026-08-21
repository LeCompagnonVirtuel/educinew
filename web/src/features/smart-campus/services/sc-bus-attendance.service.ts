import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusAttendance, BusCheckIn, BusCheckOut } from '@educi/types';
import { ScAttendanceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusAttendanceService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAttendance(schoolId: string, id: string): Promise<BusAttendance> {
    const attendance = await this.repo.findBusAttendanceById(schoolId, id);
    if (!attendance) throw new ScAttendanceNotFoundError(id);
    return attendance;
  }

  async listAttendances(schoolId: string, filters?: Record<string, unknown>): Promise<BusAttendance[]> {
    return this.repo.findAllBusAttendances(schoolId, filters);
  }

  async checkIn(schoolId: string, data: BusCheckIn): Promise<BusAttendance> {
    return this.repo.createBusCheckIn(schoolId, data);
  }

  async checkOut(schoolId: string, data: BusCheckOut): Promise<BusAttendance> {
    return this.repo.createBusCheckOut(schoolId, data);
  }

  async deleteAttendance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusAttendanceById(schoolId, id);
    if (!existing) throw new ScAttendanceNotFoundError(id);
    return this.repo.deleteBusAttendance(schoolId, id);
  }

  async countAttendances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusAttendances(schoolId, filters);
  }
}
