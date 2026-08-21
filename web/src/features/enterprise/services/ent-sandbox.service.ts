// Enterprise Platform Service - Sandbox
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Sandbox, SandboxCreate } from '@educi/types';
import { EntSandboxNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSandboxService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSandbox(schoolId: string, id: string): Promise<Sandbox> {
    const item = await this.repo.findSandboxById(schoolId, id);
    if (!item) throw new EntSandboxNotFoundError(id);
    return item;
  }
  async listSandboxs(schoolId: string, filters?: Record<string, unknown>): Promise<Sandbox[]> {
    return this.repo.findAllSandboxs(schoolId, filters);
  }
  async createSandbox(schoolId: string, data: SandboxCreate): Promise<Sandbox> {
    return this.repo.createSandbox(schoolId, data);
  }
  async updateSandbox(schoolId: string, id: string, data: Partial<SandboxCreate>): Promise<Sandbox> {
    const existing = await this.repo.findSandboxById(schoolId, id);
    if (!existing) throw new EntSandboxNotFoundError(id);
    return this.repo.updateSandbox(schoolId, id, data);
  }
  async deleteSandbox(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSandboxById(schoolId, id);
    if (!existing) throw new EntSandboxNotFoundError(id);
    return this.repo.deleteSandbox(schoolId, id);
  }
  async countSandboxs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSandboxs(schoolId, filters);
  }
}
