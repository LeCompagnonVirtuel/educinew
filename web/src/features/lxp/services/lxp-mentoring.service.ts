import type { SupabaseClient } from '@supabase/supabase-js';
import type { Mentoring, MentoringSession } from '@educi/types';
import { LxpMentoringNotFoundError, LxpMentoringCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpMentoringService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getMentoring(schoolId: string, id: string): Promise<Mentoring> {
    const mentoring = await this.repo.findMentoringById(schoolId, id);
    if (!mentoring) throw new LxpMentoringNotFoundError(id);
    return mentoring;
  }

  async listMentorings(schoolId: string, userId: string): Promise<readonly Mentoring[]> {
    return this.repo.findMentorings(schoolId, userId);
  }

  async createMentoring(data: Omit<Mentoring, 'id' | 'createdAt' | 'updatedAt' | 'sessionCount' | 'totalSessionMinutes'>): Promise<Mentoring> {
    const created = await this.repo.createMentoring(data);
    if (!created) throw new LxpMentoringCreateError();
    return created;
  }

  async scheduleSession(mentoringId: string, data: Omit<MentoringSession, 'id' | 'createdAt' | 'updatedAt' | 'mentoringId'>): Promise<MentoringSession> {
    const scheduled = await this.repo.scheduleMentoringSession(mentoringId, data);
    if (!scheduled) throw new LxpMentoringNotFoundError();
    return scheduled;
  }

  async completeMentoring(schoolId: string, id: string): Promise<Mentoring> {
    const existing = await this.repo.findMentoringById(schoolId, id);
    if (!existing) throw new LxpMentoringNotFoundError(id);
    const completed = await this.repo.completeMentoring(id);
    if (!completed) throw new LxpMentoringCreateError();
    return completed;
  }
}
