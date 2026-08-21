// Enterprise Platform Service - CompatibilityMatrix
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompatibilityMatrix, CompatibilityMatrixCreate } from '@educi/types';
import { EntCompatibilityMatrixNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCompatibilityMatrixService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCompatibilityMatrix(schoolId: string, id: string): Promise<CompatibilityMatrix> {
    const item = await this.repo.findCompatibilityMatrixById(schoolId, id);
    if (!item) throw new EntCompatibilityMatrixNotFoundError(id);
    return item;
  }
  async listCompatibilityMatrixs(schoolId: string, filters?: Record<string, unknown>): Promise<CompatibilityMatrix[]> {
    return this.repo.findAllCompatibilityMatrixs(schoolId, filters);
  }
  async createCompatibilityMatrix(schoolId: string, data: CompatibilityMatrixCreate): Promise<CompatibilityMatrix> {
    return this.repo.createCompatibilityMatrix(schoolId, data);
  }
  async updateCompatibilityMatrix(schoolId: string, id: string, data: Partial<CompatibilityMatrixCreate>): Promise<CompatibilityMatrix> {
    const existing = await this.repo.findCompatibilityMatrixById(schoolId, id);
    if (!existing) throw new EntCompatibilityMatrixNotFoundError(id);
    return this.repo.updateCompatibilityMatrix(schoolId, id, data);
  }
  async deleteCompatibilityMatrix(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCompatibilityMatrixById(schoolId, id);
    if (!existing) throw new EntCompatibilityMatrixNotFoundError(id);
    return this.repo.deleteCompatibilityMatrix(schoolId, id);
  }
  async countCompatibilityMatrixs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCompatibilityMatrixs(schoolId, filters);
  }
}
