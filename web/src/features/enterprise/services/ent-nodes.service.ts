// Enterprise Platform Service - Nodes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNodeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNode(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNodeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNodes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNodes(schoolId, filters);
  }
  async createNode(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNode(schoolId, data);
  }
  async updateNode(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNodeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNode(schoolId, id, data);
  }
  async deleteNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNodeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNode(schoolId, id);
  }
  async countNodes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNodes(schoolId, filters);
  }
}
