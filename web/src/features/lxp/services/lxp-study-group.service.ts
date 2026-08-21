import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudyGroup, StudyGroupMember, StudyGroupResource } from '@educi/types';
import { LxpStudyGroupNotFoundError, LxpStudyGroupCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpStudyGroupService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getStudyGroup(schoolId: string, id: string): Promise<StudyGroup> {
    const group = await this.repo.findStudyGroupById(schoolId, id);
    if (!group) throw new LxpStudyGroupNotFoundError(id);
    return group;
  }

  async listStudyGroups(schoolId: string, courseId?: string): Promise<readonly StudyGroup[]> {
    return this.repo.findStudyGroups(schoolId, courseId);
  }

  async createStudyGroup(data: Omit<StudyGroup, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'memberIds'>): Promise<StudyGroup> {
    const created = await this.repo.createStudyGroup(data);
    if (!created) throw new LxpStudyGroupCreateError();
    return created;
  }

  async joinStudyGroup(schoolId: string, id: string, userId: string): Promise<StudyGroupMember> {
    const existing = await this.repo.findStudyGroupById(schoolId, id);
    if (!existing) throw new LxpStudyGroupNotFoundError(id);
    const joined = await this.repo.joinStudyGroup(id, userId);
    if (!joined) throw new LxpStudyGroupCreateError();
    return joined;
  }

  async addResource(schoolId: string, id: string, resource: Omit<StudyGroupResource, 'id' | 'sharedAt'>): Promise<StudyGroupResource> {
    const existing = await this.repo.findStudyGroupById(schoolId, id);
    if (!existing) throw new LxpStudyGroupNotFoundError(id);
    const added = await this.repo.addStudyGroupResource(id, resource);
    if (!added) throw new LxpStudyGroupCreateError();
    return added;
  }
}
