import type { SupabaseClient } from '@supabase/supabase-js';
import type { BlockchainAuditTrail } from '@educi/types';
import { EduOSBlockchainAuditTrailError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBlockchainAuditTrailService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBlockchainAuditTrail(schoolId: string, id: string): Promise<BlockchainAuditTrail> {
    const item = await this.repo.getBlockchainAuditTrail(schoolId, id);
    if (!item) throw new EduOSBlockchainAuditTrailError(id);
    return item;
  }
  async listBlockchainAuditTrails(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainAuditTrail[]> {
    return this.repo.listBlockchainAuditTrails(schoolId, filters);
  }
  async createBlockchainAuditTrail(schoolId: string, data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail> {
    return this.repo.createBlockchainAuditTrail(schoolId, data as any);
  }
  async updateBlockchainAuditTrail(schoolId: string, id: string, data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail> {
    const existing = await this.repo.getBlockchainAuditTrail(schoolId, id);
    if (!existing) throw new EduOSBlockchainAuditTrailError(id);
    return this.repo.updateBlockchainAuditTrail(schoolId, id, data as any);
  }
  async deleteBlockchainAuditTrail(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBlockchainAuditTrail(schoolId, id);
    if (!existing) throw new EduOSBlockchainAuditTrailError(id);
    return this.repo.deleteBlockchainAuditTrail(schoolId, id);
  }
}

