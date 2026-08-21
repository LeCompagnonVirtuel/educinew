import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipAgentRegistry,
  GeaesipAgentMission,
  GeaesipAgentVote,
  GeaesipAgentNegotiation,
} from '@educi/types';
import {
  GeaesipAgentRegistryRepository,
  GeaesipAgentMissionRepository,
  GeaesipAgentVoteRepository,
  GeaesipAgentNegotiationRepository,
} from '../repositories/agent-orchestration.repository';

// ============================================================================
// Agent Orchestration Service
// ============================================================================

export class GeaesipAgentOrchestrationService {
  constructor(
    private readonly registryRepo = new GeaesipAgentRegistryRepository(),
    private readonly missionRepo = new GeaesipAgentMissionRepository(),
    private readonly voteRepo = new GeaesipAgentVoteRepository(),
    private readonly negotiationRepo = new GeaesipAgentNegotiationRepository(),
  ) {}

  private validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new ValidationError('school_id est requis');
    }
  }

  private validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new ValidationError(`${entityName} id est requis`);
    }
  }

  // ─── Agent Registry ───────────────────────────────────────────────────────

  async listAgents(schoolId: string): Promise<GeaesipAgentRegistry[]> {
    this.validateSchoolId(schoolId);
    return this.registryRepo.findAllBySchool(schoolId);
  }

  async getAgent(schoolId: string, id: string): Promise<GeaesipAgentRegistry> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent');
    const entity = await this.registryRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Agent', id);
    }
    return entity;
  }

  async registerAgent(
    schoolId: string,
    data: Omit<GeaesipAgentRegistry, 'id' | 'createdAt' | 'updatedAt' | 'lastActiveAt'>,
  ): Promise<GeaesipAgentRegistry> {
    this.validateSchoolId(schoolId);
    return this.registryRepo.create({ ...data, school_id: schoolId });
  }

  async updateAgent(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipAgentRegistry, 'id' | 'createdAt'>>,
  ): Promise<GeaesipAgentRegistry> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent');
    await this.getAgent(schoolId, id);
    return this.registryRepo.update(id, data);
  }

  async deactivateAgent(schoolId: string, id: string): Promise<GeaesipAgentRegistry> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent');
    await this.getAgent(schoolId, id);
    return this.registryRepo.update(id, { status: 'inactive' });
  }

  async deleteAgent(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Agent');
    await this.getAgent(schoolId, id);
    await this.registryRepo.delete(id);
  }

  // ─── Agent Missions ───────────────────────────────────────────────────────

  async listMissions(schoolId: string): Promise<GeaesipAgentMission[]> {
    this.validateSchoolId(schoolId);
    return this.missionRepo.findAllBySchool(schoolId);
  }

  async getMission(schoolId: string, id: string): Promise<GeaesipAgentMission> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mission');
    const entity = await this.missionRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Mission', id);
    }
    return entity;
  }

  async createMission(
    schoolId: string,
    data: Omit<GeaesipAgentMission, 'id' | 'createdAt' | 'completedAt' | 'result' | 'score'>,
  ): Promise<GeaesipAgentMission> {
    this.validateSchoolId(schoolId);
    return this.missionRepo.create({ ...data, school_id: schoolId });
  }

  async completeMission(
    schoolId: string,
    id: string,
    result: Record<string, unknown>,
    score: number,
  ): Promise<GeaesipAgentMission> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mission');
    await this.getMission(schoolId, id);
    return this.missionRepo.update(id, {
      completedAt: new Date().toISOString(),
      result,
      score,
    });
  }

  async deleteMission(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Mission');
    await this.getMission(schoolId, id);
    await this.missionRepo.delete(id);
  }

  // ─── Agent Votes ──────────────────────────────────────────────────────────

  async listVotes(schoolId: string): Promise<GeaesipAgentVote[]> {
    this.validateSchoolId(schoolId);
    return this.voteRepo.findAllBySchool(schoolId);
  }

  async getVote(schoolId: string, id: string): Promise<GeaesipAgentVote> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Vote');
    const entity = await this.voteRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Vote', id);
    }
    return entity;
  }

  async castVote(
    schoolId: string,
    data: Omit<GeaesipAgentVote, 'id' | 'timestamp'>,
  ): Promise<GeaesipAgentVote> {
    this.validateSchoolId(schoolId);
    return this.voteRepo.create({ ...data, school_id: schoolId });
  }

  async deleteVote(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Vote');
    await this.getVote(schoolId, id);
    await this.voteRepo.delete(id);
  }

  // ─── Agent Negotiations ───────────────────────────────────────────────────

  async listNegotiations(schoolId: string): Promise<GeaesipAgentNegotiation[]> {
    this.validateSchoolId(schoolId);
    return this.negotiationRepo.findAllBySchool(schoolId);
  }

  async getNegotiation(schoolId: string, id: string): Promise<GeaesipAgentNegotiation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Négociation');
    const entity = await this.negotiationRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Négociation', id);
    }
    return entity;
  }

  async createNegotiation(
    schoolId: string,
    data: Omit<GeaesipAgentNegotiation, 'id' | 'timestamp'>,
  ): Promise<GeaesipAgentNegotiation> {
    this.validateSchoolId(schoolId);
    return this.negotiationRepo.create({ ...data, school_id: schoolId });
  }

  async updateNegotiation(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipAgentNegotiation, 'id' | 'timestamp'>>,
  ): Promise<GeaesipAgentNegotiation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Négociation');
    await this.getNegotiation(schoolId, id);
    return this.negotiationRepo.update(id, data);
  }

  async deleteNegotiation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Négociation');
    await this.getNegotiation(schoolId, id);
    await this.negotiationRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getAgentOrchestrationStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const agents = await this.registryRepo.findAllBySchool(schoolId);
    const missions = await this.missionRepo.findAllBySchool(schoolId);
    const votes = await this.voteRepo.findAllBySchool(schoolId);
    const negotiations = await this.negotiationRepo.findAllBySchool(schoolId);
    const activeAgents = agents.filter((a) => a.status === 'active');
    const completedMissions = missions.filter((m) => m.completedAt !== null);

    return {
      totalAgents: agents.length,
      activeAgents: activeAgents.length,
      totalMissions: missions.length,
      completedMissions: completedMissions.length,
      totalVotes: votes.length,
      totalNegotiations: negotiations.length,
    };
  }
}
