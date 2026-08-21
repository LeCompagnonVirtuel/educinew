import type { SupabaseClient } from '@supabase/supabase-js';
import type { BoardMeeting } from '@educi/types';
import { EduOSBoardMeetingError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBoardMeetingService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBoardMeeting(schoolId: string, id: string): Promise<BoardMeeting> {
    const item = await this.repo.getBoardMeeting(schoolId, id);
    if (!item) throw new EduOSBoardMeetingError(id);
    return item;
  }
  async listBoardMeetings(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMeeting[]> {
    return this.repo.listBoardMeetings(schoolId, filters);
  }
  async createBoardMeeting(schoolId: string, data: Partial<BoardMeeting>): Promise<BoardMeeting> {
    return this.repo.createBoardMeeting(schoolId, data as any);
  }
  async updateBoardMeeting(schoolId: string, id: string, data: Partial<BoardMeeting>): Promise<BoardMeeting> {
    const existing = await this.repo.getBoardMeeting(schoolId, id);
    if (!existing) throw new EduOSBoardMeetingError(id);
    return this.repo.updateBoardMeeting(schoolId, id, data as any);
  }
  async deleteBoardMeeting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBoardMeeting(schoolId, id);
    if (!existing) throw new EduOSBoardMeetingError(id);
    return this.repo.deleteBoardMeeting(schoolId, id);
  }
}

