import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipControlCenter,
  GeaesipExecutiveCockpit,
  GeaesipAlert,
  GeaesipDecisionQueue,
} from '@educi/types';
import {
  GeaesipControlCenterRepository,
  GeaesipExecutiveCockpitRepository,
  GeaesipAlertRepository,
  GeaesipDecisionQueueRepository,
} from '../repositories/control-center.repository';

// ============================================================================
// Control Center Service
// ============================================================================

export class GeaesipControlCenterService {
  constructor(
    private readonly centerRepo = new GeaesipControlCenterRepository(),
    private readonly cockpitRepo = new GeaesipExecutiveCockpitRepository(),
    private readonly alertRepo = new GeaesipAlertRepository(),
    private readonly queueRepo = new GeaesipDecisionQueueRepository(),
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

  // ─── Control Center ───────────────────────────────────────────────────────

  async listCenters(schoolId: string): Promise<GeaesipControlCenter[]> {
    this.validateSchoolId(schoolId);
    return this.centerRepo.findAllBySchool(schoolId);
  }

  async getCenter(schoolId: string, id: string): Promise<GeaesipControlCenter> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de contrôle');
    const entity = await this.centerRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Centre de contrôle', id);
    }
    return entity;
  }

  async createCenter(
    schoolId: string,
    data: Omit<GeaesipControlCenter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipControlCenter> {
    this.validateSchoolId(schoolId);
    return this.centerRepo.create({ ...data, school_id: schoolId });
  }

  async updateCenter(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipControlCenter, 'id' | 'createdAt'>>,
  ): Promise<GeaesipControlCenter> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de contrôle');
    await this.getCenter(schoolId, id);
    return this.centerRepo.update(id, data);
  }

  async deleteCenter(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Centre de contrôle');
    await this.getCenter(schoolId, id);
    await this.centerRepo.delete(id);
  }

  // ─── Executive Cockpit ────────────────────────────────────────────────────

  async listCockpits(schoolId: string): Promise<GeaesipExecutiveCockpit[]> {
    this.validateSchoolId(schoolId);
    return this.cockpitRepo.findAllBySchool(schoolId);
  }

  async getCockpit(schoolId: string, id: string): Promise<GeaesipExecutiveCockpit> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cockpit');
    const entity = await this.cockpitRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Cockpit', id);
    }
    return entity;
  }

  async createCockpit(
    schoolId: string,
    data: Omit<GeaesipExecutiveCockpit, 'id' | 'computedAt'>,
  ): Promise<GeaesipExecutiveCockpit> {
    this.validateSchoolId(schoolId);
    return this.cockpitRepo.create({ ...data, school_id: schoolId });
  }

  async updateCockpit(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipExecutiveCockpit, 'id' | 'computedAt'>>,
  ): Promise<GeaesipExecutiveCockpit> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cockpit');
    await this.getCockpit(schoolId, id);
    return this.cockpitRepo.update(id, data);
  }

  async deleteCockpit(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cockpit');
    await this.getCockpit(schoolId, id);
    await this.cockpitRepo.delete(id);
  }

  // ─── Alerts ───────────────────────────────────────────────────────────────

  async listAlerts(schoolId: string): Promise<GeaesipAlert[]> {
    this.validateSchoolId(schoolId);
    return this.alertRepo.findAllBySchool(schoolId);
  }

  async getAlert(schoolId: string, id: string): Promise<GeaesipAlert> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte');
    const entity = await this.alertRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Alerte', id);
    }
    return entity;
  }

  async createAlert(
    schoolId: string,
    data: Omit<GeaesipAlert, 'id' | 'createdAt' | 'acknowledged' | 'acknowledgedBy'>,
  ): Promise<GeaesipAlert> {
    this.validateSchoolId(schoolId);
    return this.alertRepo.create({ ...data, school_id: schoolId });
  }

  async acknowledgeAlert(schoolId: string, id: string, userId: string): Promise<GeaesipAlert> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte');
    await this.getAlert(schoolId, id);
    return this.alertRepo.update(id, { acknowledged: true, acknowledgedBy: userId });
  }

  async deleteAlert(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte');
    await this.getAlert(schoolId, id);
    await this.alertRepo.delete(id);
  }

  async listUnacknowledgedAlerts(schoolId: string): Promise<GeaesipAlert[]> {
    this.validateSchoolId(schoolId);
    const alerts = await this.alertRepo.findAllBySchool(schoolId);
    return alerts.filter((a) => !a.acknowledged);
  }

  // ─── Decision Queue ───────────────────────────────────────────────────────

  async listDecisionQueues(schoolId: string): Promise<GeaesipDecisionQueue[]> {
    this.validateSchoolId(schoolId);
    return this.queueRepo.findAllBySchool(schoolId);
  }

  async getDecisionQueue(schoolId: string, id: string): Promise<GeaesipDecisionQueue> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'File de décision');
    const entity = await this.queueRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('File de décision', id);
    }
    return entity;
  }

  async createDecisionQueue(
    schoolId: string,
    data: Omit<GeaesipDecisionQueue, 'id' | 'createdAt'>,
  ): Promise<GeaesipDecisionQueue> {
    this.validateSchoolId(schoolId);
    return this.queueRepo.create({ ...data, school_id: schoolId });
  }

  async updateDecisionQueue(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipDecisionQueue, 'id' | 'createdAt'>>,
  ): Promise<GeaesipDecisionQueue> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'File de décision');
    await this.getDecisionQueue(schoolId, id);
    return this.queueRepo.update(id, data);
  }

  async deleteDecisionQueue(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'File de décision');
    await this.getDecisionQueue(schoolId, id);
    await this.queueRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getControlCenterStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const centers = await this.centerRepo.findAllBySchool(schoolId);
    const cockpits = await this.cockpitRepo.findAllBySchool(schoolId);
    const alerts = await this.alertRepo.findAllBySchool(schoolId);
    const queues = await this.queueRepo.findAllBySchool(schoolId);
    const unacknowledged = alerts.filter((a) => !a.acknowledged);

    return {
      totalCenters: centers.length,
      totalCockpits: cockpits.length,
      totalAlerts: alerts.length,
      unacknowledgedAlerts: unacknowledged.length,
      totalDecisionQueues: queues.length,
    };
  }
}
