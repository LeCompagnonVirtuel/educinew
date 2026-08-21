import type { SupabaseClient } from '@supabase/supabase-js';
import type { Committee } from '@educi/types';
import { EduOSCommitteeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCommitteeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCommittee(schoolId: string, id: string): Promise<Committee> {
    const item = await this.repo.getCommittee(schoolId, id);
    if (!item) throw new EduOSCommitteeError(id);
    return item;
  }
  async listCommittees(schoolId: string, filters?: Record<string, unknown>): Promise<Committee[]> {
    return this.repo.listCommittees(schoolId, filters);
  }
  async createCommittee(schoolId: string, data: Partial<Committee>): Promise<Committee> {
    return this.repo.createCommittee(schoolId, data as any);
  }
  async updateCommittee(schoolId: string, id: string, data: Partial<Committee>): Promise<Committee> {
    const existing = await this.repo.getCommittee(schoolId, id);
    if (!existing) throw new EduOSCommitteeError(id);
    return this.repo.updateCommittee(schoolId, id, data as any);
  }
  async deleteCommittee(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCommittee(schoolId, id);
    if (!existing) throw new EduOSCommitteeError(id);
    return this.repo.deleteCommittee(schoolId, id);
  }
}

