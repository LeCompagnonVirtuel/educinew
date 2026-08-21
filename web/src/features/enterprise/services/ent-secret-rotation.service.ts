// Enterprise Platform Service - SecretRotation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecretRotation, SecretRotationCreate } from '@educi/types';
import { EntSecretRotationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecretRotationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecretRotation(schoolId: string, id: string): Promise<SecretRotation> {
    const item = await this.repo.findSecretRotationById(schoolId, id);
    if (!item) throw new EntSecretRotationNotFoundError(id);
    return item;
  }
  async listSecretRotations(schoolId: string, filters?: Record<string, unknown>): Promise<SecretRotation[]> {
    return this.repo.findAllSecretRotations(schoolId, filters);
  }
  async createSecretRotation(schoolId: string, data: SecretRotationCreate): Promise<SecretRotation> {
    return this.repo.createSecretRotation(schoolId, data);
  }
  async updateSecretRotation(schoolId: string, id: string, data: Partial<SecretRotationCreate>): Promise<SecretRotation> {
    const existing = await this.repo.findSecretRotationById(schoolId, id);
    if (!existing) throw new EntSecretRotationNotFoundError(id);
    return this.repo.updateSecretRotation(schoolId, id, data);
  }
  async deleteSecretRotation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecretRotationById(schoolId, id);
    if (!existing) throw new EntSecretRotationNotFoundError(id);
    return this.repo.deleteSecretRotation(schoolId, id);
  }
  async countSecretRotations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecretRotations(schoolId, filters);
  }
}
