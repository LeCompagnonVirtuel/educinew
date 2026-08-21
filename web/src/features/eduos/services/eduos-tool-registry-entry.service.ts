import type { SupabaseClient } from '@supabase/supabase-js';
import type { ToolRegistryEntry } from '@educi/types';
import { EduOSToolRegistryEntryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSToolRegistryEntryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getToolRegistryEntry(schoolId: string, id: string): Promise<ToolRegistryEntry> {
    const item = await this.repo.getToolRegistryEntry(schoolId, id);
    if (!item) throw new EduOSToolRegistryEntryError(id);
    return item;
  }
  async listToolRegistryEntrys(schoolId: string, filters?: Record<string, unknown>): Promise<ToolRegistryEntry[]> {
    return this.repo.listToolRegistryEntrys(schoolId, filters);
  }
  async createToolRegistryEntry(schoolId: string, data: Partial<ToolRegistryEntry>): Promise<ToolRegistryEntry> {
    return this.repo.createToolRegistryEntry(schoolId, data as any);
  }
  async updateToolRegistryEntry(schoolId: string, id: string, data: Partial<ToolRegistryEntry>): Promise<ToolRegistryEntry> {
    const existing = await this.repo.getToolRegistryEntry(schoolId, id);
    if (!existing) throw new EduOSToolRegistryEntryError(id);
    return this.repo.updateToolRegistryEntry(schoolId, id, data as any);
  }
  async deleteToolRegistryEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getToolRegistryEntry(schoolId, id);
    if (!existing) throw new EduOSToolRegistryEntryError(id);
    return this.repo.deleteToolRegistryEntry(schoolId, id);
  }
}

