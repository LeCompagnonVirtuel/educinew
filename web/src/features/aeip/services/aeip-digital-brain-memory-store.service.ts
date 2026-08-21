import type { SupabaseClient } from '@supabase/supabase-js';
import type { MemoryStore } from '@educi/types';
import { AEIPDigitalBrainMemoryError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainMemoryService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getMemory(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listMemories(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createMemory(schoolId: string, data: Partial<MemoryStore>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateMemory(schoolId: string, id: string, data: Partial<MemoryStore>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteMemory(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}