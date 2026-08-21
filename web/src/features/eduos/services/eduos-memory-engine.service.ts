import type { SupabaseClient } from '@supabase/supabase-js';
import type { MemoryEngine } from '@educi/types';
import { EduOSMemoryEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMemoryEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMemoryEngine(schoolId: string, id: string): Promise<MemoryEngine> {
    const item = await this.repo.getMemoryEngine(schoolId, id);
    if (!item) throw new EduOSMemoryEngineError(id);
    return item;
  }
  async listMemoryEngines(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryEngine[]> {
    return this.repo.listMemoryEngines(schoolId, filters);
  }
  async createMemoryEngine(schoolId: string, data: Partial<MemoryEngine>): Promise<MemoryEngine> {
    return this.repo.createMemoryEngine(schoolId, data as any);
  }
  async updateMemoryEngine(schoolId: string, id: string, data: Partial<MemoryEngine>): Promise<MemoryEngine> {
    const existing = await this.repo.getMemoryEngine(schoolId, id);
    if (!existing) throw new EduOSMemoryEngineError(id);
    return this.repo.updateMemoryEngine(schoolId, id, data as any);
  }
  async deleteMemoryEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMemoryEngine(schoolId, id);
    if (!existing) throw new EduOSMemoryEngineError(id);
    return this.repo.deleteMemoryEngine(schoolId, id);
  }
}

