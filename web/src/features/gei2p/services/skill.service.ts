import { SupabaseClient } from '@supabase/supabase-js';
import { SkillValidationService } from './gei2p-skills-skill-validation.service';

export interface Skill {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilitySkillService {
  private readonly skillService: SkillValidationService;

  constructor(supabase: SupabaseClient) {
    this.skillService = new SkillValidationService(supabase);
  }

  async listSkills(schoolId: string, filters?: Record<string, unknown>): Promise<Skill[]> {
    return this.skillService.listEntities(schoolId, filters) as Promise<Skill[]>;
  }

  async getSkill(schoolId: string, id: string): Promise<Skill | null> {
    const entity = await this.skillService.getEntity(id);
    if (entity && (entity as Skill).school_id === schoolId) return entity as Skill;
    return null;
  }

  async createSkill(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Skill | null> {
    return this.skillService.createEntity({ ...data, school_id: schoolId, user_id: userId } as Parameters<SkillValidationService['createEntity']>[0]) as Promise<Skill | null>;
  }

  async updateSkill(schoolId: string, id: string, data: Record<string, unknown>): Promise<Skill | null> {
    const entity = await this.skillService.getEntity(id);
    if (!entity || (entity as Skill).school_id !== schoolId) return null;
    return this.skillService.updateEntity(id, data as Parameters<SkillValidationService['updateEntity']>[1]) as Promise<Skill | null>;
  }

  async deleteSkill(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.skillService.getEntity(id);
    if (!entity || (entity as Skill).school_id !== schoolId) return false;
    return this.skillService.deleteEntity(id);
  }
}
