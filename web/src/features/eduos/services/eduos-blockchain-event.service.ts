import type { SupabaseClient } from '@supabase/supabase-js';
import type { BlockchainEvent } from '@educi/types';
import { EduOSBlockchainEventError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBlockchainEventService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBlockchainEvent(schoolId: string, id: string): Promise<BlockchainEvent> {
    const item = await this.repo.getBlockchainEvent(schoolId, id);
    if (!item) throw new EduOSBlockchainEventError(id);
    return item;
  }
  async listBlockchainEvents(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainEvent[]> {
    return this.repo.listBlockchainEvents(schoolId, filters);
  }
  async createBlockchainEvent(schoolId: string, data: Partial<BlockchainEvent>): Promise<BlockchainEvent> {
    return this.repo.createBlockchainEvent(schoolId, data as any);
  }
  async updateBlockchainEvent(schoolId: string, id: string, data: Partial<BlockchainEvent>): Promise<BlockchainEvent> {
    const existing = await this.repo.getBlockchainEvent(schoolId, id);
    if (!existing) throw new EduOSBlockchainEventError(id);
    return this.repo.updateBlockchainEvent(schoolId, id, data as any);
  }
  async deleteBlockchainEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBlockchainEvent(schoolId, id);
    if (!existing) throw new EduOSBlockchainEventError(id);
    return this.repo.deleteBlockchainEvent(schoolId, id);
  }
}

