import type { SupabaseClient } from '@supabase/supabase-js';
import type { HumanApproval } from '@educi/types';
import { EduOSHumanApprovalError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSHumanApprovalService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getHumanApproval(schoolId: string, id: string): Promise<HumanApproval> {
    const item = await this.repo.getHumanApproval(schoolId, id);
    if (!item) throw new EduOSHumanApprovalError(id);
    return item;
  }
  async listHumanApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<HumanApproval[]> {
    return this.repo.listHumanApprovals(schoolId, filters);
  }
  async createHumanApproval(schoolId: string, data: Partial<HumanApproval>): Promise<HumanApproval> {
    return this.repo.createHumanApproval(schoolId, data as any);
  }
  async updateHumanApproval(schoolId: string, id: string, data: Partial<HumanApproval>): Promise<HumanApproval> {
    const existing = await this.repo.getHumanApproval(schoolId, id);
    if (!existing) throw new EduOSHumanApprovalError(id);
    return this.repo.updateHumanApproval(schoolId, id, data as any);
  }
  async deleteHumanApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHumanApproval(schoolId, id);
    if (!existing) throw new EduOSHumanApprovalError(id);
    return this.repo.deleteHumanApproval(schoolId, id);
  }
}

