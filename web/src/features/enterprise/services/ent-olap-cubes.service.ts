// Enterprise Platform Service - OlapCubes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOlapCubeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOlapCube(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findOlapCubeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listOlapCubes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllOlapCubes(schoolId, filters);
  }
  async createOlapCube(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createOlapCube(schoolId, data);
  }
  async updateOlapCube(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findOlapCubeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateOlapCube(schoolId, id, data);
  }
  async deleteOlapCube(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOlapCubeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteOlapCube(schoolId, id);
  }
  async countOlapCubes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOlapCubes(schoolId, filters);
  }
}
