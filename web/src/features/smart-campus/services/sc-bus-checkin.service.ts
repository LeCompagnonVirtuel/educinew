import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusAttendance } from '@educi/types';
import { ScBusAttendanceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusCheckInService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async checkIn(schoolId: string, tripId: string, studentId: string): Promise<BusAttendance> {
    return this.repo.markStudentPresent(schoolId, tripId, studentId);
  }

  async checkOut(schoolId: string, tripId: string, studentId: string): Promise<BusAttendance> {
    return this.repo.markStudentAbsent(schoolId, tripId, studentId);
  }

  async markLate(schoolId: string, tripId: string, studentId: string): Promise<BusAttendance> {
    return this.repo.markStudentLate(schoolId, tripId, studentId);
  }

  async getAttendance(schoolId: string, id: string): Promise<BusAttendance> {
    const record = await this.repo.findBusAttendanceById(schoolId, id);
    if (!record) throw new ScBusAttendanceNotFoundError(id);
    return record;
  }

  async getAttendanceByTrip(schoolId: string, tripId: string): Promise<BusAttendance[]> {
    return this.repo.findBusAttendanceByTrip(schoolId, tripId);
  }

  async getAttendanceByDate(schoolId: string, date: string): Promise<BusAttendance[]> {
    return this.repo.findBusAttendanceByDate(schoolId, date);
  }

  async getTripStats(schoolId: string, tripId: string): Promise<{ present: number; absent: number; late: number }> {
    return this.repo.getBusAttendanceStats(schoolId, tripId);
  }

  async getStudentAttendanceHistory(schoolId: string, studentId: string, from: string, to: string): Promise<BusAttendance[]> {
    return this.repo.findStudentBusAttendance(schoolId, studentId, from, to);
  }
}
