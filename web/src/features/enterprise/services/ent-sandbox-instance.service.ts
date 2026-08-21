// Enterprise Platform Service - SandboxInstance
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SandboxInstance, SandboxInstanceCreate } from '@educi/types';
import { EntSandboxInstanceNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSandboxInstanceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSandboxInstance(schoolId: string, id: string): Promise<SandboxInstance> {
    const item = await this.repo.findSandboxInstanceById(schoolId, id);
    if (!item) throw new EntSandboxInstanceNotFoundError(id);
    return item;
  }
  async listSandboxInstances(schoolId: string, filters?: Record<string, unknown>): Promise<SandboxInstance[]> {
    return this.repo.findAllSandboxInstances(schoolId, filters);
  }
  async createSandboxInstance(schoolId: string, data: SandboxInstanceCreate): Promise<SandboxInstance> {
    return this.repo.createSandboxInstance(schoolId, data);
  }
  async updateSandboxInstance(schoolId: string, id: string, data: Partial<SandboxInstanceCreate>): Promise<SandboxInstance> {
    const existing = await this.repo.findSandboxInstanceById(schoolId, id);
    if (!existing) throw new EntSandboxInstanceNotFoundError(id);
    return this.repo.updateSandboxInstance(schoolId, id, data);
  }
  async deleteSandboxInstance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSandboxInstanceById(schoolId, id);
    if (!existing) throw new EntSandboxInstanceNotFoundError(id);
    return this.repo.deleteSandboxInstance(schoolId, id);
  }
  async countSandboxInstances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSandboxInstances(schoolId, filters);
  }
}
