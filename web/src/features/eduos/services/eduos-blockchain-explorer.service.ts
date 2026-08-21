import type { SupabaseClient } from '@supabase/supabase-js';
import type { BlockchainExplorer } from '@educi/types';
import { EduOSBlockchainExplorerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBlockchainExplorerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBlockchainExplorer(schoolId: string, id: string): Promise<BlockchainExplorer> {
    const item = await this.repo.getBlockchainExplorer(schoolId, id);
    if (!item) throw new EduOSBlockchainExplorerError(id);
    return item;
  }
  async listBlockchainExplorers(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainExplorer[]> {
    return this.repo.listBlockchainExplorers(schoolId, filters);
  }
  async createBlockchainExplorer(schoolId: string, data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer> {
    return this.repo.createBlockchainExplorer(schoolId, data as any);
  }
  async updateBlockchainExplorer(schoolId: string, id: string, data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer> {
    const existing = await this.repo.getBlockchainExplorer(schoolId, id);
    if (!existing) throw new EduOSBlockchainExplorerError(id);
    return this.repo.updateBlockchainExplorer(schoolId, id, data as any);
  }
  async deleteBlockchainExplorer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBlockchainExplorer(schoolId, id);
    if (!existing) throw new EduOSBlockchainExplorerError(id);
    return this.repo.deleteBlockchainExplorer(schoolId, id);
  }
}

