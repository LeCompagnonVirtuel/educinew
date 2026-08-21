import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantRuntime } from '@educi/types';
import { EduOSTenantRuntimeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTenantRuntimeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTenantRuntime(schoolId: string, id: string): Promise<TenantRuntime> {
    const item = await this.repo.getTenantRuntime(schoolId, id);
    if (!item) throw new EduOSTenantRuntimeError(id);
    return item;
  }
  async listTenantRuntimes(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRuntime[]> {
    return this.repo.listTenantRuntimes(schoolId, filters);
  }
  async createTenantRuntime(schoolId: string, data: Partial<TenantRuntime>): Promise<TenantRuntime> {
    return this.repo.createTenantRuntime(schoolId, data as any);
  }
  async updateTenantRuntime(schoolId: string, id: string, data: Partial<TenantRuntime>): Promise<TenantRuntime> {
    const existing = await this.repo.getTenantRuntime(schoolId, id);
    if (!existing) throw new EduOSTenantRuntimeError(id);
    return this.repo.updateTenantRuntime(schoolId, id, data as any);
  }
  async deleteTenantRuntime(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTenantRuntime(schoolId, id);
    if (!existing) throw new EduOSTenantRuntimeError(id);
    return this.repo.deleteTenantRuntime(schoolId, id);
  }
}

