import type { SupabaseClient } from '@supabase/supabase-js';
import type { Board } from '@educi/types';
import { EduOSBoardError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBoardService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBoard(schoolId: string, id: string): Promise<Board> {
    const item = await this.repo.getBoard(schoolId, id);
    if (!item) throw new EduOSBoardError(id);
    return item;
  }
  async listBoards(schoolId: string, filters?: Record<string, unknown>): Promise<Board[]> {
    return this.repo.listBoards(schoolId, filters);
  }
  async createBoard(schoolId: string, data: Partial<Board>): Promise<Board> {
    return this.repo.createBoard(schoolId, data as any);
  }
  async updateBoard(schoolId: string, id: string, data: Partial<Board>): Promise<Board> {
    const existing = await this.repo.getBoard(schoolId, id);
    if (!existing) throw new EduOSBoardError(id);
    return this.repo.updateBoard(schoolId, id, data as any);
  }
  async deleteBoard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBoard(schoolId, id);
    if (!existing) throw new EduOSBoardError(id);
    return this.repo.deleteBoard(schoolId, id);
  }
}

