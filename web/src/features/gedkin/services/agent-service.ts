import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createAIAgentSchema,
  updateAIAgentSchema,
} from '../validators/gedkin';
import type {
  GedkinAIAgent,
} from '@educi/types';
import type {
  GedkinAIAgentRepository,
} from '../repositories/agent-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Agent Service
// ============================================================================

export class AgentService extends BaseGedkinService {
  constructor(
    private readonly agentRepo: GedkinAIAgentRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listAgents(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinAIAgent>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.agentRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAgent(schoolId: string, id: string): Promise<GedkinAIAgent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent IA');
    return this.ensureExists(this.agentRepo, id, schoolId, 'Agent IA');
  }

  async createAgent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAIAgent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['type', 'name', 'description', 'status', 'capabilities', 'config'], 'Agent IA');

    const validated = this.validateSchema(createAIAgentSchema, data, 'Agent IA');

    return this.agentRepo.create(
      {
        type: validated.type,
        name: validated.name,
        description: validated.description,
        status: validated.status,
        capabilities: validated.capabilities,
        config: validated.config,
        lastActiveAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateAgent(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinAIAgent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent IA');

    const existing = await this.ensureExists(this.agentRepo, id, schoolId, 'Agent IA');
    this.validateOwnership(existing, schoolId, 'Agent IA');

    const validated = this.validateSchema(updateAIAgentSchema, data, 'Agent IA');
    return this.agentRepo.update(id, schoolId, validated);
  }

  async deleteAgent(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent IA');

    const existing = await this.ensureExists(this.agentRepo, id, schoolId, 'Agent IA');
    this.validateOwnership(existing, schoolId, 'Agent IA');

    await this.agentRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAIAgent>> {
    this.validateSchoolId(schoolId);
    return this.agentRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinAIAgent>> {
    this.validateSchoolId(schoolId);
    return this.agentRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async listActiveAgents(
    schoolId: string,
  ): Promise<GedkinAIAgent[]> {
    this.validateSchoolId(schoolId);
    return this.agentRepo.findActive(schoolId);
  }

  async updateLastActive(
    schoolId: string,
    id: string,
  ): Promise<GedkinAIAgent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent IA');
    return this.agentRepo.updateLastActive(id, schoolId);
  }

  async getAgentStats(
    schoolId: string,
  ): Promise<{
    totalAgents: number;
    activeAgents: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);
    const agents = await this.agentRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    for (const agent of agents.data) {
      byType[agent.type] = (byType[agent.type] ?? 0) + 1;
      byStatus[agent.status] = (byStatus[agent.status] ?? 0) + 1;
      if (agent.status === 'ACTIVE') activeCount++;
    }

    return {
      totalAgents: agents.total,
      activeAgents: activeCount,
      byType,
      byStatus,
    };
  }
}