import type { SupabaseClient } from '@supabase/supabase-js';
import type { BPMNEngine } from '@educi/types';
import { EduOSBPMNEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBPMNEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBPMNEngine(schoolId: string, id: string): Promise<BPMNEngine> {
    const item = await this.repo.getBPMNEngine(schoolId, id);
    if (!item) throw new EduOSBPMNEngineError(id);
    return item;
  }
  async listBPMNEngines(schoolId: string, filters?: Record<string, unknown>): Promise<BPMNEngine[]> {
    return this.repo.listBpmnEngines(schoolId, filters);
  }
  async createBPMNEngine(schoolId: string, data: Partial<BPMNEngine>): Promise<BPMNEngine> {
    return this.repo.createBPMNEngine(schoolId, data as any);
  }
  async updateBPMNEngine(schoolId: string, id: string, data: Partial<BPMNEngine>): Promise<BPMNEngine> {
    const existing = await this.repo.getBPMNEngine(schoolId, id);
    if (!existing) throw new EduOSBPMNEngineError(id);
    return this.repo.updateBPMNEngine(schoolId, id, data as any);
  }
  async deleteBPMNEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBPMNEngine(schoolId, id);
    if (!existing) throw new EduOSBPMNEngineError(id);
    return this.repo.deleteBPMNEngine(schoolId, id);
  }
}

