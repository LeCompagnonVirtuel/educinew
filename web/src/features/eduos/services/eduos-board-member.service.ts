import type { SupabaseClient } from '@supabase/supabase-js';
import type { BoardMember } from '@educi/types';
import { EduOSBoardMemberError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBoardMemberService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBoardMember(schoolId: string, id: string): Promise<BoardMember> {
    const item = await this.repo.getBoardMember(schoolId, id);
    if (!item) throw new EduOSBoardMemberError(id);
    return item;
  }
  async listBoardMembers(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMember[]> {
    return this.repo.listBoardMembers(schoolId, filters);
  }
  async createBoardMember(schoolId: string, data: Partial<BoardMember>): Promise<BoardMember> {
    return this.repo.createBoardMember(schoolId, data as any);
  }
  async updateBoardMember(schoolId: string, id: string, data: Partial<BoardMember>): Promise<BoardMember> {
    const existing = await this.repo.getBoardMember(schoolId, id);
    if (!existing) throw new EduOSBoardMemberError(id);
    return this.repo.updateBoardMember(schoolId, id, data as any);
  }
  async deleteBoardMember(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBoardMember(schoolId, id);
    if (!existing) throw new EduOSBoardMemberError(id);
    return this.repo.deleteBoardMember(schoolId, id);
  }
}

