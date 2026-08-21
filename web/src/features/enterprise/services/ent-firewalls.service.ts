// Enterprise Platform Service - Firewalls
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFirewallService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFirewall(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFirewallById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFirewalls(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFirewalls(schoolId, filters);
  }
  async createFirewall(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFirewall(schoolId, data);
  }
  async updateFirewall(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFirewallById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFirewall(schoolId, id, data);
  }
  async deleteFirewall(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFirewallById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFirewall(schoolId, id);
  }
  async countFirewalls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFirewalls(schoolId, filters);
  }
}
