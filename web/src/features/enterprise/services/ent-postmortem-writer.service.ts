// Enterprise Platform Service - PostmortemWriter
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PostmortemWriter, PostmortemWriterCreate } from '@educi/types';
import { EntPostmortemWriterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPostmortemWriterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPostmortemWriter(schoolId: string, id: string): Promise<PostmortemWriter> {
    const item = await this.repo.findPostmortemWriterById(schoolId, id);
    if (!item) throw new EntPostmortemWriterNotFoundError(id);
    return item;
  }
  async listPostmortemWriters(schoolId: string, filters?: Record<string, unknown>): Promise<PostmortemWriter[]> {
    return this.repo.findAllPostmortemWriters(schoolId, filters);
  }
  async createPostmortemWriter(schoolId: string, data: PostmortemWriterCreate): Promise<PostmortemWriter> {
    return this.repo.createPostmortemWriter(schoolId, data);
  }
  async updatePostmortemWriter(schoolId: string, id: string, data: Partial<PostmortemWriterCreate>): Promise<PostmortemWriter> {
    const existing = await this.repo.findPostmortemWriterById(schoolId, id);
    if (!existing) throw new EntPostmortemWriterNotFoundError(id);
    return this.repo.updatePostmortemWriter(schoolId, id, data);
  }
  async deletePostmortemWriter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPostmortemWriterById(schoolId, id);
    if (!existing) throw new EntPostmortemWriterNotFoundError(id);
    return this.repo.deletePostmortemWriter(schoolId, id);
  }
  async countPostmortemWriters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPostmortemWriters(schoolId, filters);
  }
}
