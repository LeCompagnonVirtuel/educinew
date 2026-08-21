import { SupabaseClient } from '@supabase/supabase-js';
import { QualificationService } from './gei2p-skills-qualification.service';

export interface Qualification {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityQualificationService {
  private readonly qualificationService: QualificationService;

  constructor(supabase: SupabaseClient) {
    this.qualificationService = new QualificationService(supabase);
  }

  async listQualifications(schoolId: string, filters?: Record<string, unknown>): Promise<Qualification[]> {
    return this.qualificationService.listEntities(schoolId, filters) as Promise<Qualification[]>;
  }

  async getQualification(schoolId: string, id: string): Promise<Qualification | null> {
    const entity = await this.qualificationService.getEntity(id);
    if (entity && (entity as Qualification).school_id === schoolId) return entity as Qualification;
    return null;
  }

  async createQualification(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Qualification | null> {
    return this.qualificationService.createEntity({ ...data, school_id: schoolId } as Parameters<QualificationService['createEntity']>[0]) as Promise<Qualification | null>;
  }

  async updateQualification(schoolId: string, id: string, data: Record<string, unknown>): Promise<Qualification | null> {
    const entity = await this.qualificationService.getEntity(id);
    if (!entity || (entity as Qualification).school_id !== schoolId) return null;
    return this.qualificationService.updateEntity(id, data as Parameters<QualificationService['updateEntity']>[1]) as Promise<Qualification | null>;
  }

  async deleteQualification(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.qualificationService.getEntity(id);
    if (!entity || (entity as Qualification).school_id !== schoolId) return false;
    return this.qualificationService.deleteEntity(id);
  }
}
