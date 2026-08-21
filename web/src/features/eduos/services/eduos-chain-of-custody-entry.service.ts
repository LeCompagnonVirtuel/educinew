import type { SupabaseClient } from '@supabase/supabase-js';
import type { ChainOfCustodyEntry } from '@educi/types';
import { EduOSChainOfCustodyEntryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSChainOfCustodyEntryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getChainOfCustodyEntry(schoolId: string, id: string): Promise<ChainOfCustodyEntry> {
    const item = await this.repo.getChainOfCustodyEntry(schoolId, id);
    if (!item) throw new EduOSChainOfCustodyEntryError(id);
    return item;
  }
  async listChainOfCustodyEntries(schoolId: string, filters?: Record<string, unknown>): Promise<ChainOfCustodyEntry[]> {
    return this.repo.listChainOfCustodyEntries(schoolId, filters);
  }
  async createChainOfCustodyEntry(schoolId: string, data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry> {
    return this.repo.createChainOfCustodyEntry(schoolId, data as any);
  }
  async updateChainOfCustodyEntry(schoolId: string, id: string, data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry> {
    const existing = await this.repo.getChainOfCustodyEntry(schoolId, id);
    if (!existing) throw new EduOSChainOfCustodyEntryError(id);
    return this.repo.updateChainOfCustodyEntry(schoolId, id, data as any);
  }
  async deleteChainOfCustodyEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getChainOfCustodyEntry(schoolId, id);
    if (!existing) throw new EduOSChainOfCustodyEntryError(id);
    return this.repo.deleteChainOfCustodyEntry(schoolId, id);
  }
}


