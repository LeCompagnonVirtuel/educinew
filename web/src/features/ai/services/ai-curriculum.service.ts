import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiCurriculum, AiCurriculumQuery, AiCurriculumCreate, AiCurriculumUpdate } from '@educi/types';
import { AiCurriculumNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiCurriculumService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getCurriculum(schoolId: string, id: string): Promise<AiCurriculum> {
    const curriculum = await this.repo.findById(schoolId, id);
    if (!curriculum) throw new AiCurriculumNotFoundError(id);
    return curriculum;
  }

  async listCurricula(schoolId: string, query: AiCurriculumQuery): Promise<AiCurriculum[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createCurriculum(schoolId: string, data: AiCurriculumCreate): Promise<AiCurriculum> {
    return this.repo.create(schoolId, data);
  }

  async updateCurriculum(schoolId: string, id: string, data: AiCurriculumUpdate): Promise<AiCurriculum> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiCurriculumNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteCurriculum(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiCurriculumNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getCurriculumLessons(schoolId: string, id: string): Promise<AiLesson[]> {
    const curriculum = await this.repo.findById(schoolId, id);
    if (!curriculum) throw new AiCurriculumNotFoundError(id);
    return this.repo.findLessonsByCurriculumId(schoolId, id);
  }

  async getCurriculumAssessments(schoolId: string, id: string): Promise<AiAssessment[]> {
    const curriculum = await this.repo.findById(schoolId, id);
    if (!curriculum) throw new AiCurriculumNotFoundError(id);
    return this.repo.findAssessmentsByCurriculumId(schoolId, id);
  }

  async getCurriculumResources(schoolId: string, id: string): Promise<AiResource[]> {
    const curriculum = await this.repo.findById(schoolId, id);
    if (!curriculum) throw new AiCurriculumNotFoundError(id);
    return this.repo.findResourcesByCurriculumId(schoolId, id);
  }
}
