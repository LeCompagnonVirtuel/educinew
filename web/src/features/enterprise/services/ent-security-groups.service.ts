// Enterprise Platform Service - SecurityGroups
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityGroupService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityGroup(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecurityGroupById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecurityGroups(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecurityGroups(schoolId, filters);
  }
  async createSecurityGroup(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecurityGroup(schoolId, data);
  }
  async updateSecurityGroup(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecurityGroupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecurityGroup(schoolId, id, data);
  }
  async deleteSecurityGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityGroupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecurityGroup(schoolId, id);
  }
  async countSecurityGroups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityGroups(schoolId, filters);
  }
}
