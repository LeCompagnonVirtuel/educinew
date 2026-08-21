import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipCrisis,
  GeaesipCrisisTeam,
  GeaesipCrisisPlaybook,
  GeaesipEmergencyCommunication,
} from '@educi/types';
import {
  GeaesipCrisisRepository,
  GeaesipCrisisTeamRepository,
  GeaesipCrisisPlaybookRepository,
  GeaesipEmergencyCommunicationRepository,
} from '../repositories/crisis-command.repository';

export class GeaesipCrisisCommandService {
  constructor(
    private readonly crisisRepo = new GeaesipCrisisRepository(),
    private readonly teamRepo = new GeaesipCrisisTeamRepository(),
    private readonly playbookRepo = new GeaesipCrisisPlaybookRepository(),
    private readonly commRepo = new GeaesipEmergencyCommunicationRepository(),
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

  async listCrises(schoolId: string): Promise<GeaesipCrisis[]> {
    this.validateSchoolId(schoolId);
    return this.crisisRepo.findAllBySchool(schoolId);
  }

  async getCrisis(schoolId: string, id: string): Promise<GeaesipCrisis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Crise');
    const entity = await this.crisisRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Crise', id);
    return entity;
  }

  async createCrisis(schoolId: string, data: Omit<GeaesipCrisis, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>): Promise<GeaesipCrisis> {
    this.validateSchoolId(schoolId);
    return this.crisisRepo.create({ ...data, school_id: schoolId });
  }

  async updateCrisis(schoolId: string, id: string, data: Partial<Omit<GeaesipCrisis, 'id' | 'createdAt'>>): Promise<GeaesipCrisis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Crise');
    await this.getCrisis(schoolId, id);
    return this.crisisRepo.update(id, data);
  }

  async deleteCrisis(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Crise');
    await this.getCrisis(schoolId, id);
    await this.crisisRepo.delete(id);
  }

  async listTeams(schoolId: string): Promise<GeaesipCrisisTeam[]> {
    this.validateSchoolId(schoolId);
    return this.teamRepo.findAllBySchool(schoolId);
  }

  async getTeam(schoolId: string, id: string): Promise<GeaesipCrisisTeam> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Equipe de crise');
    const entity = await this.teamRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Equipe de crise', id);
    return entity;
  }

  async createTeam(schoolId: string, data: Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>): Promise<GeaesipCrisisTeam> {
    this.validateSchoolId(schoolId);
    return this.teamRepo.create({ ...data, school_id: schoolId });
  }

  async updateTeam(schoolId: string, id: string, data: Partial<Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>>): Promise<GeaesipCrisisTeam> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Equipe de crise');
    await this.getTeam(schoolId, id);
    return this.teamRepo.update(id, data);
  }

  async deleteTeam(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Equipe de crise');
    await this.getTeam(schoolId, id);
    await this.teamRepo.delete(id);
  }

  async listPlaybooks(schoolId: string): Promise<GeaesipCrisisPlaybook[]> {
    this.validateSchoolId(schoolId);
    return this.playbookRepo.findAllBySchool(schoolId);
  }

  async getPlaybook(schoolId: string, id: string): Promise<GeaesipCrisisPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Livre de jeu');
    const entity = await this.playbookRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Livre de jeu', id);
    return entity;
  }

  async createPlaybook(schoolId: string, data: Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipCrisisPlaybook> {
    this.validateSchoolId(schoolId);
    return this.playbookRepo.create({ ...data, school_id: schoolId });
  }

  async updatePlaybook(schoolId: string, id: string, data: Partial<Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt'>>): Promise<GeaesipCrisisPlaybook> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Livre de jeu');
    await this.getPlaybook(schoolId, id);
    return this.playbookRepo.update(id, data);
  }

  async deletePlaybook(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Livre de jeu');
    await this.getPlaybook(schoolId, id);
    await this.playbookRepo.delete(id);
  }

  async listCommunications(schoolId: string): Promise<GeaesipEmergencyCommunication[]> {
    this.validateSchoolId(schoolId);
    return this.commRepo.findAllBySchool(schoolId);
  }

  async getCommunication(schoolId: string, id: string): Promise<GeaesipEmergencyCommunication> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Communication');
    const entity = await this.commRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Communication', id);
    return entity;
  }

  async sendCommunication(schoolId: string, data: Omit<GeaesipEmergencyCommunication, 'id' | 'sentAt'>): Promise<GeaesipEmergencyCommunication> {
    this.validateSchoolId(schoolId);
    return this.commRepo.create({ ...data, school_id: schoolId });
  }

  async deleteCommunication(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Communication');
    await this.getCommunication(schoolId, id);
    await this.commRepo.delete(id);
  }

  async getCrisisCommandStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const crises = await this.crisisRepo.findAllBySchool(schoolId);
    const teams = await this.teamRepo.findAllBySchool(schoolId);
    const playbooks = await this.playbookRepo.findAllBySchool(schoolId);
    const comms = await this.commRepo.findAllBySchool(schoolId);
    const activeCrises = crises.filter((c) => c.status === 'active');
    return {
      totalCrises: crises.length,
      activeCrises: activeCrises.length,
      totalTeams: teams.length,
      totalPlaybooks: playbooks.length,
      totalCommunications: comms.length,
    };
  }
}
