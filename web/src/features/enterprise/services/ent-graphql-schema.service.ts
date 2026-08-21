// Enterprise Platform Service - GraphQLSchema
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GraphQLSchema, GraphQLSchemaCreate } from '@educi/types';
import { EntGraphqlSchemaNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGraphqlSchemaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGraphqlSchema(schoolId: string, id: string): Promise<GraphQLSchema> {
    const item = await this.repo.findGraphqlSchemaById(schoolId, id);
    if (!item) throw new EntGraphqlSchemaNotFoundError(id);
    return item;
  }
  async listGraphqlSchemas(schoolId: string, filters?: Record<string, unknown>): Promise<GraphQLSchema[]> {
    return this.repo.findAllGraphqlSchemas(schoolId, filters);
  }
  async createGraphqlSchema(schoolId: string, data: GraphQLSchemaCreate): Promise<GraphQLSchema> {
    return this.repo.createGraphqlSchema(schoolId, data);
  }
  async updateGraphqlSchema(schoolId: string, id: string, data: Partial<GraphQLSchemaCreate>): Promise<GraphQLSchema> {
    const existing = await this.repo.findGraphqlSchemaById(schoolId, id);
    if (!existing) throw new EntGraphqlSchemaNotFoundError(id);
    return this.repo.updateGraphqlSchema(schoolId, id, data);
  }
  async deleteGraphqlSchema(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGraphqlSchemaById(schoolId, id);
    if (!existing) throw new EntGraphqlSchemaNotFoundError(id);
    return this.repo.deleteGraphqlSchema(schoolId, id);
  }
  async countGraphqlSchemas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGraphqlSchemas(schoolId, filters);
  }
}
