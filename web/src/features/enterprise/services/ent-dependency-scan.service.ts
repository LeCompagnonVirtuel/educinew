// Enterprise Platform Service - DependencyScan
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DependencyScan, DependencyScanCreate } from '@educi/types';
import { EntDependencyScanNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDependencyScanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDependencyScan(schoolId: string, id: string): Promise<DependencyScan> {
    const item = await this.repo.findDependencyScanById(schoolId, id);
    if (!item) throw new EntDependencyScanNotFoundError(id);
    return item;
  }
  async listDependencyScans(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyScan[]> {
    return this.repo.findAllDependencyScans(schoolId, filters);
  }
  async createDependencyScan(schoolId: string, data: DependencyScanCreate): Promise<DependencyScan> {
    return this.repo.createDependencyScan(schoolId, data);
  }
  async updateDependencyScan(schoolId: string, id: string, data: Partial<DependencyScanCreate>): Promise<DependencyScan> {
    const existing = await this.repo.findDependencyScanById(schoolId, id);
    if (!existing) throw new EntDependencyScanNotFoundError(id);
    return this.repo.updateDependencyScan(schoolId, id, data);
  }
  async deleteDependencyScan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDependencyScanById(schoolId, id);
    if (!existing) throw new EntDependencyScanNotFoundError(id);
    return this.repo.deleteDependencyScan(schoolId, id);
  }
  async countDependencyScans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDependencyScans(schoolId, filters);
  }
}
