import type { SupabaseClient } from '@supabase/supabase-js';
import type { MeetingAttendee } from '@educi/types';
import { EduOSMeetingAttendeeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMeetingAttendeeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMeetingAttendee(schoolId: string, id: string): Promise<MeetingAttendee> {
    const item = await this.repo.getMeetingAttendee(schoolId, id);
    if (!item) throw new EduOSMeetingAttendeeError(id);
    return item;
  }
  async listMeetingAttendees(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAttendee[]> {
    return this.repo.listMeetingAttendees(schoolId, filters);
  }
  async createMeetingAttendee(schoolId: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee> {
    return this.repo.createMeetingAttendee(schoolId, data as any);
  }
  async updateMeetingAttendee(schoolId: string, id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee> {
    const existing = await this.repo.getMeetingAttendee(schoolId, id);
    if (!existing) throw new EduOSMeetingAttendeeError(id);
    return this.repo.updateMeetingAttendee(schoolId, id, data as any);
  }
  async deleteMeetingAttendee(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMeetingAttendee(schoolId, id);
    if (!existing) throw new EduOSMeetingAttendeeError(id);
    return this.repo.deleteMeetingAttendee(schoolId, id);
  }
}

