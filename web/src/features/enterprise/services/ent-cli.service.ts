// Enterprise Platform Service - CLI
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CLI, CLICreate } from '@educi/types';
import { EntCliNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCliService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCli(schoolId: string, id: string): Promise<CLI> {
    const item = await this.repo.findCliById(schoolId, id);
    if (!item) throw new EntCliNotFoundError(id);
    return item;
  }
  async listClis(schoolId: string, filters?: Record<string, unknown>): Promise<CLI[]> {
    return this.repo.findAllClis(schoolId, filters);
  }
  async createCli(schoolId: string, data: CLICreate): Promise<CLI> {
    return this.repo.createCli(schoolId, data);
  }
  async updateCli(schoolId: string, id: string, data: Partial<CLICreate>): Promise<CLI> {
    const existing = await this.repo.findCliById(schoolId, id);
    if (!existing) throw new EntCliNotFoundError(id);
    return this.repo.updateCli(schoolId, id, data);
  }
  async deleteCli(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCliById(schoolId, id);
    if (!existing) throw new EntCliNotFoundError(id);
    return this.repo.deleteCli(schoolId, id);
  }
  async countClis(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countClis(schoolId, filters);
  }
}
