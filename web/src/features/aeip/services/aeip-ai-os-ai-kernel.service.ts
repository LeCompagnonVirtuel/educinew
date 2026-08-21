import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIKernel } from '@educi/types';
import { AEIPOSKernelError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSKernelService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getKernel(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listKernels(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createKernel(schoolId: string, data: Partial<AIKernel>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateKernel(schoolId: string, id: string, data: Partial<AIKernel>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteKernel(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}