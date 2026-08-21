import type { SupabaseClient } from '@supabase/supabase-js';
import type { MeetingAgendaItem } from '@educi/types';
import { EduOSMeetingAgendaItemError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMeetingAgendaItemService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMeetingAgendaItem(schoolId: string, id: string): Promise<MeetingAgendaItem> {
    const item = await this.repo.getMeetingAgendaItem(schoolId, id);
    if (!item) throw new EduOSMeetingAgendaItemError(id);
    return item;
  }
  async listMeetingAgendaItems(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAgendaItem[]> {
    return this.repo.listMeetingAgendaItems(schoolId, filters);
  }
  async createMeetingAgendaItem(schoolId: string, data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem> {
    return this.repo.createMeetingAgendaItem(schoolId, data as any);
  }
  async updateMeetingAgendaItem(schoolId: string, id: string, data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem> {
    const existing = await this.repo.getMeetingAgendaItem(schoolId, id);
    if (!existing) throw new EduOSMeetingAgendaItemError(id);
    return this.repo.updateMeetingAgendaItem(schoolId, id, data as any);
  }
  async deleteMeetingAgendaItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMeetingAgendaItem(schoolId, id);
    if (!existing) throw new EduOSMeetingAgendaItemError(id);
    return this.repo.deleteMeetingAgendaItem(schoolId, id);
  }
}

