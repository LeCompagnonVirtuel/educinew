// Enterprise Platform Service - BlueGreenDeployment
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BlueGreenDeployment, BlueGreenDeploymentCreate } from '@educi/types';
import { EntBlueGreenDeploymentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBlueGreenDeploymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBlueGreenDeployment(schoolId: string, id: string): Promise<BlueGreenDeployment> {
    const item = await this.repo.findBlueGreenDeploymentById(schoolId, id);
    if (!item) throw new EntBlueGreenDeploymentNotFoundError(id);
    return item;
  }
  async listBlueGreenDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<BlueGreenDeployment[]> {
    return this.repo.findAllBlueGreenDeployments(schoolId, filters);
  }
  async createBlueGreenDeployment(schoolId: string, data: BlueGreenDeploymentCreate): Promise<BlueGreenDeployment> {
    return this.repo.createBlueGreenDeployment(schoolId, data);
  }
  async updateBlueGreenDeployment(schoolId: string, id: string, data: Partial<BlueGreenDeploymentCreate>): Promise<BlueGreenDeployment> {
    const existing = await this.repo.findBlueGreenDeploymentById(schoolId, id);
    if (!existing) throw new EntBlueGreenDeploymentNotFoundError(id);
    return this.repo.updateBlueGreenDeployment(schoolId, id, data);
  }
  async deleteBlueGreenDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBlueGreenDeploymentById(schoolId, id);
    if (!existing) throw new EntBlueGreenDeploymentNotFoundError(id);
    return this.repo.deleteBlueGreenDeployment(schoolId, id);
  }
  async countBlueGreenDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBlueGreenDeployments(schoolId, filters);
  }
}
