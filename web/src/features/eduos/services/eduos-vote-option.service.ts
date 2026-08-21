import type { SupabaseClient } from '@supabase/supabase-js';
import type { VoteOption } from '@educi/types';
import { EduOSVoteOptionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSVoteOptionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getVoteOption(schoolId: string, id: string): Promise<VoteOption> {
    const item = await this.repo.getVoteOption(schoolId, id);
    if (!item) throw new EduOSVoteOptionError(id);
    return item;
  }
  async listVoteOptions(schoolId: string, filters?: Record<string, unknown>): Promise<VoteOption[]> {
    return this.repo.listVoteOptions(schoolId, filters);
  }
  async createVoteOption(schoolId: string, data: Partial<VoteOption>): Promise<VoteOption> {
    return this.repo.createVoteOption(schoolId, data as any);
  }
  async updateVoteOption(schoolId: string, id: string, data: Partial<VoteOption>): Promise<VoteOption> {
    const existing = await this.repo.getVoteOption(schoolId, id);
    if (!existing) throw new EduOSVoteOptionError(id);
    return this.repo.updateVoteOption(schoolId, id, data as any);
  }
  async deleteVoteOption(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVoteOption(schoolId, id);
    if (!existing) throw new EduOSVoteOptionError(id);
    return this.repo.deleteVoteOption(schoolId, id);
  }
}

