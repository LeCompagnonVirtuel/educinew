import type { SupabaseClient } from '@supabase/supabase-js';
import type { CommitteeMember } from '@educi/types';
import { EduOSCommitteeMemberError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCommitteeMemberService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCommitteeMember(schoolId: string, id: string): Promise<CommitteeMember> {
    const item = await this.repo.getCommitteeMember(schoolId, id);
    if (!item) throw new EduOSCommitteeMemberError(id);
    return item;
  }
  async listCommitteeMembers(schoolId: string, filters?: Record<string, unknown>): Promise<CommitteeMember[]> {
    return this.repo.listCommitteeMembers(schoolId, filters);
  }
  async createCommitteeMember(schoolId: string, data: Partial<CommitteeMember>): Promise<CommitteeMember> {
    return this.repo.createCommitteeMember(schoolId, data as any);
  }
  async updateCommitteeMember(schoolId: string, id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember> {
    const existing = await this.repo.getCommitteeMember(schoolId, id);
    if (!existing) throw new EduOSCommitteeMemberError(id);
    return this.repo.updateCommitteeMember(schoolId, id, data as any);
  }
  async deleteCommitteeMember(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCommitteeMember(schoolId, id);
    if (!existing) throw new EduOSCommitteeMemberError(id);
    return this.repo.deleteCommitteeMember(schoolId, id);
  }
}

