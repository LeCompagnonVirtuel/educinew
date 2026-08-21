// Enterprise Platform Service - GoLiveApproval
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GoLiveApproval, GoLiveApprovalCreate } from '@educi/types';
import { EntGoLiveApprovalNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGoLiveApprovalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGoLiveApproval(schoolId: string, id: string): Promise<GoLiveApproval> {
    const item = await this.repo.findGoLiveApprovalById(schoolId, id);
    if (!item) throw new EntGoLiveApprovalNotFoundError(id);
    return item;
  }
  async listGoLiveApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<GoLiveApproval[]> {
    return this.repo.findAllGoLiveApprovals(schoolId, filters);
  }
  async createGoLiveApproval(schoolId: string, data: GoLiveApprovalCreate): Promise<GoLiveApproval> {
    return this.repo.createGoLiveApproval(schoolId, data);
  }
  async updateGoLiveApproval(schoolId: string, id: string, data: Partial<GoLiveApprovalCreate>): Promise<GoLiveApproval> {
    const existing = await this.repo.findGoLiveApprovalById(schoolId, id);
    if (!existing) throw new EntGoLiveApprovalNotFoundError(id);
    return this.repo.updateGoLiveApproval(schoolId, id, data);
  }
  async deleteGoLiveApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGoLiveApprovalById(schoolId, id);
    if (!existing) throw new EntGoLiveApprovalNotFoundError(id);
    return this.repo.deleteGoLiveApproval(schoolId, id);
  }
  async countGoLiveApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGoLiveApprovals(schoolId, filters);
  }
}
