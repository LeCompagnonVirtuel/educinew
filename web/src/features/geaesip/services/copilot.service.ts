import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipCopilotSession,
  GeaesipCopilotAnswer,
  GeaesipCopilotExplanation,
} from '@educi/types';
import {
  GeaesipCopilotSessionRepository,
  GeaesipCopilotAnswerRepository,
  GeaesipCopilotExplanationRepository,
} from '../repositories/copilot.repository';

export class GeaesipCopilotService {
  constructor(
    private readonly sessionRepo = new GeaesipCopilotSessionRepository(),
    private readonly answerRepo = new GeaesipCopilotAnswerRepository(),
    private readonly explanationRepo = new GeaesipCopilotExplanationRepository(),
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

  async listSessions(schoolId: string): Promise<GeaesipCopilotSession[]> {
    this.validateSchoolId(schoolId);
    return this.sessionRepo.findAllBySchool(schoolId);
  }

  async getSession(schoolId: string, id: string): Promise<GeaesipCopilotSession> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Session copilot');
    const entity = await this.sessionRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Session copilot', id);
    return entity;
  }

  async createSession(schoolId: string, data: Omit<GeaesipCopilotSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipCopilotSession> {
    this.validateSchoolId(schoolId);
    return this.sessionRepo.create({ ...data, school_id: schoolId });
  }

  async updateSession(schoolId: string, id: string, data: Partial<Omit<GeaesipCopilotSession, 'id' | 'createdAt'>>): Promise<GeaesipCopilotSession> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Session copilot');
    await this.getSession(schoolId, id);
    return this.sessionRepo.update(id, data);
  }

  async deleteSession(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Session copilot');
    await this.getSession(schoolId, id);
    await this.sessionRepo.delete(id);
  }

  async listAnswers(schoolId: string): Promise<GeaesipCopilotAnswer[]> {
    this.validateSchoolId(schoolId);
    return this.answerRepo.findAllBySchool(schoolId);
  }

  async getAnswer(schoolId: string, id: string): Promise<GeaesipCopilotAnswer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Reponse copilot');
    const entity = await this.answerRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Reponse copilot', id);
    return entity;
  }

  async createAnswer(schoolId: string, data: Omit<GeaesipCopilotAnswer, 'id' | 'createdAt'>): Promise<GeaesipCopilotAnswer> {
    this.validateSchoolId(schoolId);
    return this.answerRepo.create({ ...data, school_id: schoolId });
  }

  async updateAnswer(schoolId: string, id: string, data: Partial<Omit<GeaesipCopilotAnswer, 'id' | 'createdAt'>>): Promise<GeaesipCopilotAnswer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Reponse copilot');
    await this.getAnswer(schoolId, id);
    return this.answerRepo.update(id, data);
  }

  async deleteAnswer(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Reponse copilot');
    await this.getAnswer(schoolId, id);
    await this.answerRepo.delete(id);
  }

  async listExplanations(schoolId: string): Promise<GeaesipCopilotExplanation[]> {
    this.validateSchoolId(schoolId);
    return this.explanationRepo.findAllBySchool(schoolId);
  }

  async getExplanation(schoolId: string, id: string): Promise<GeaesipCopilotExplanation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Explication copilot');
    const entity = await this.explanationRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Explication copilot', id);
    return entity;
  }

  async createExplanation(schoolId: string, data: Omit<GeaesipCopilotExplanation, 'id' | 'createdAt'>): Promise<GeaesipCopilotExplanation> {
    this.validateSchoolId(schoolId);
    return this.explanationRepo.create({ ...data, school_id: schoolId });
  }

  async updateExplanation(schoolId: string, id: string, data: Partial<Omit<GeaesipCopilotExplanation, 'id' | 'createdAt'>>): Promise<GeaesipCopilotExplanation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Explication copilot');
    await this.getExplanation(schoolId, id);
    return this.explanationRepo.update(id, data);
  }

  async deleteExplanation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Explication copilot');
    await this.getExplanation(schoolId, id);
    await this.explanationRepo.delete(id);
  }

  async getCopilotStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const sessions = await this.sessionRepo.findAllBySchool(schoolId);
    const answers = await this.answerRepo.findAllBySchool(schoolId);
    const explanations = await this.explanationRepo.findAllBySchool(schoolId);
    return {
      totalSessions: sessions.length,
      totalAnswers: answers.length,
      totalExplanations: explanations.length,
    };
  }
}
