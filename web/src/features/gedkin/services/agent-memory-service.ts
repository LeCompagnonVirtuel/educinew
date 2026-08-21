import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createAgentMemorySchema,
  updateAgentMemorySchema,
} from '../validators/gedkin';
import type {
  GedkinAgentMemory,
} from '@educi/types';
import type {
  GedkinAgentMemoryRepository,
} from '../repositories/agent-memory-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Agent Memory Service
// ============================================================================

export class AgentMemoryService extends BaseGedkinService {
  constructor(
    private readonly memoryRepo: GedkinAgentMemoryRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listMemories(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinAgentMemory>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.memoryRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getMemory(schoolId: string, id: string): Promise<GedkinAgentMemory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mémoire agent');
    return this.ensureExists(this.memoryRepo, id, schoolId, 'Mémoire agent');
  }

  async createMemory(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAgentMemory> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['agentId', 'key', 'value', 'ttl'], 'Mémoire agent');

    const validated = this.validateSchema(createAgentMemorySchema, data, 'Mémoire agent');

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + validated.ttl);

    return this.memoryRepo.create(
      {
        agentId: validated.agentId,
        key: validated.key,
        value: validated.value,
        ttl: validated.ttl,
        expiresAt: expiresAt.toISOString(),
      },
      schoolId,
    );
  }

  async updateMemory(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAgentMemory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mémoire agent');

    const existing = await this.ensureExists(this.memoryRepo, id, schoolId, 'Mémoire agent');
    this.validateOwnership(existing, schoolId, 'Mémoire agent');

    const validated = this.validateSchema(updateAgentMemorySchema, data, 'Mémoire agent');
    return this.memoryRepo.update(id, schoolId, validated);
  }

  async deleteMemory(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mémoire agent');

    const existing = await this.ensureExists(this.memoryRepo, id, schoolId, 'Mémoire agent');
    this.validateOwnership(existing, schoolId, 'Mémoire agent');

    await this.memoryRepo.softDelete(id, schoolId);
  }

  async listByAgent(
    schoolId: string,
    agentId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAgentMemory>> {
    this.validateSchoolId(schoolId);
    return this.memoryRepo.findByAgentId(agentId, schoolId, this.validatePagination(params));
  }

  async listByAgentAndKey(
    schoolId: string,
    agentId: string,
    key: string,
  ): Promise<GedkinAgentMemory | null> {
    this.validateSchoolId(schoolId);
    return this.memoryRepo.findByAgentIdAndKey(agentId, key, schoolId);
  }

  async listExpired(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAgentMemory>> {
    this.validateSchoolId(schoolId);
    return this.memoryRepo.findExpired(schoolId, this.validatePagination(params));
  }

  async cleanupExpired(
    schoolId: string,
  ): Promise<number> {
    this.validateSchoolId(schoolId);
    const expired = await this.memoryRepo.findExpired(schoolId, { limit: 1000 });
    for (const memory of expired.data) {
      await this.memoryRepo.softDelete(memory.id, schoolId);
    }
    return expired.data.length;
  }

  async getMemoryStats(
    schoolId: string,
  ): Promise<{
    totalMemories: number;
    expiredMemories: number;
    byAgent: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const memories = await this.memoryRepo.findAll(schoolId, { limit: 1000 });
    const expired = await this.memoryRepo.findExpired(schoolId, { limit: 1000 });

    const byAgent: Record<string, number> = {};
    for (const memory of memories.data) {
      byAgent[memory.agentId] = (byAgent[memory.agentId] ?? 0) + 1;
    }

    return {
      totalMemories: memories.total,
      expiredMemories: expired.total,
      byAgent,
    };
  }
}