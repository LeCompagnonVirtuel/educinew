import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipAIEvaluation,
  GeaesipModelEvaluation,
  GeaesipAgentEvaluation,
} from '@educi/types';
import {
  GeaesipAIEvaluationRepository,
  GeaesipModelEvaluationRepository,
  GeaesipAgentEvaluationRepository,
} from '../repositories/ai-evaluation.repository';

export class GeaesipAIEvaluationService {
  constructor(
    private readonly evalRepo = new GeaesipAIEvaluationRepository(),
    private readonly modelEvalRepo = new GeaesipModelEvaluationRepository(),
    private readonly agentEvalRepo = new GeaesipAgentEvaluationRepository(),
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

  async listEvaluations(schoolId: string): Promise<GeaesipAIEvaluation[]> {
    this.validateSchoolId(schoolId);
    return this.evalRepo.findAllBySchool(schoolId);
  }

  async getEvaluation(schoolId: string, id: string): Promise<GeaesipAIEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation IA');
    const entity = await this.evalRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Evaluation IA', id);
    return entity;
  }

  async createEvaluation(schoolId: string, data: Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>): Promise<GeaesipAIEvaluation> {
    this.validateSchoolId(schoolId);
    return this.evalRepo.create({ ...data, school_id: schoolId });
  }

  async updateEvaluation(schoolId: string, id: string, data: Partial<Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>>): Promise<GeaesipAIEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation IA');
    await this.getEvaluation(schoolId, id);
    return this.evalRepo.update(id, data);
  }

  async deleteEvaluation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation IA');
    await this.getEvaluation(schoolId, id);
    await this.evalRepo.delete(id);
  }

  async listModelEvaluations(schoolId: string): Promise<GeaesipModelEvaluation[]> {
    this.validateSchoolId(schoolId);
    return this.modelEvalRepo.findAllBySchool(schoolId);
  }

  async getModelEvaluation(schoolId: string, id: string): Promise<GeaesipModelEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation de modele');
    const entity = await this.modelEvalRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Evaluation de modele', id);
    return entity;
  }

  async createModelEvaluation(schoolId: string, data: Omit<GeaesipModelEvaluation, 'id' | 'evaluatedAt'>): Promise<GeaesipModelEvaluation> {
    this.validateSchoolId(schoolId);
    return this.modelEvalRepo.create({ ...data, school_id: schoolId });
  }

  async deleteModelEvaluation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation de modele');
    await this.getModelEvaluation(schoolId, id);
    await this.modelEvalRepo.delete(id);
  }

  async listAgentEvaluations(schoolId: string): Promise<GeaesipAgentEvaluation[]> {
    this.validateSchoolId(schoolId);
    return this.agentEvalRepo.findAllBySchool(schoolId);
  }

  async getAgentEvaluation(schoolId: string, id: string): Promise<GeaesipAgentEvaluation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation d agent');
    const entity = await this.agentEvalRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Evaluation d agent', id);
    return entity;
  }

  async createAgentEvaluation(schoolId: string, data: Omit<GeaesipAgentEvaluation, 'id' | 'evaluatedAt'>): Promise<GeaesipAgentEvaluation> {
    this.validateSchoolId(schoolId);
    return this.agentEvalRepo.create({ ...data, school_id: schoolId });
  }

  async deleteAgentEvaluation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Evaluation d agent');
    await this.getAgentEvaluation(schoolId, id);
    await this.agentEvalRepo.delete(id);
  }

  async getAIEvaluationStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const evaluations = await this.evalRepo.findAllBySchool(schoolId);
    const modelEvals = await this.modelEvalRepo.findAllBySchool(schoolId);
    const agentEvals = await this.agentEvalRepo.findAllBySchool(schoolId);
    return {
      totalEvaluations: evaluations.length,
      totalModelEvaluations: modelEvals.length,
      totalAgentEvaluations: agentEvals.length,
    };
  }
}
