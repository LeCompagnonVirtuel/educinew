// Enterprise Platform Service - TicketsAttachments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTicketAttachmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTicketsAttachment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTicketsAttachmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTicketsAttachments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTicketsAttachments(schoolId, filters);
  }
  async createTicketsAttachment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTicketsAttachment(schoolId, data);
  }
  async updateTicketsAttachment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTicketsAttachmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTicketsAttachment(schoolId, id, data);
  }
  async deleteTicketsAttachment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTicketsAttachmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTicketsAttachment(schoolId, id);
  }
  async countTicketsAttachments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTicketsAttachments(schoolId, filters);
  }
}
