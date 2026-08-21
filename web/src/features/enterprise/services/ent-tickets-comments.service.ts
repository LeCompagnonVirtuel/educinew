// Enterprise Platform Service - TicketsComments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTicketCommentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTicketsComment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTicketsCommentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTicketsComments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTicketsComments(schoolId, filters);
  }
  async createTicketsComment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTicketsComment(schoolId, data);
  }
  async updateTicketsComment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTicketsCommentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTicketsComment(schoolId, id, data);
  }
  async deleteTicketsComment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTicketsCommentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTicketsComment(schoolId, id);
  }
  async countTicketsComments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTicketsComments(schoolId, filters);
  }
}
