import type { SupabaseClient } from '@supabase/supabase-js';
import type { Voting } from '@educi/types';
import { EduOSVotingError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSVotingService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getVoting(schoolId: string, id: string): Promise<Voting> {
    const item = await this.repo.getVoting(schoolId, id);
    if (!item) throw new EduOSVotingError(id);
    return item;
  }
  async listVotings(schoolId: string, filters?: Record<string, unknown>): Promise<Voting[]> {
    return this.repo.listVotings(schoolId, filters);
  }
  async createVoting(schoolId: string, data: Partial<Voting>): Promise<Voting> {
    return this.repo.createVoting(schoolId, data as any);
  }
  async updateVoting(schoolId: string, id: string, data: Partial<Voting>): Promise<Voting> {
    const existing = await this.repo.getVoting(schoolId, id);
    if (!existing) throw new EduOSVotingError(id);
    return this.repo.updateVoting(schoolId, id, data as any);
  }
  async deleteVoting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVoting(schoolId, id);
    if (!existing) throw new EduOSVotingError(id);
    return this.repo.deleteVoting(schoolId, id);
  }
}

