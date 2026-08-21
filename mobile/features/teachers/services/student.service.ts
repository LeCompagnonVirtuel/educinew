import type { Teacher, TeacherFilters, TeacherListResult, CreateTeacherRequest, UpdateTeacherRequest } from '@educi/types';
import { TeacherMobileRepository } from '../repositories/teacher.repository';

export class TeacherMobileService {
  constructor(private readonly repo: TeacherMobileRepository) {}

  async getTeachers(filters: TeacherFilters): Promise<TeacherListResult> {
    return this.repo.findAll(filters);
  }

  async getTeacher(id: string): Promise<Teacher | null> {
    return this.repo.findById(id);
  }

  async searchTeachers(query: string): Promise<Teacher[]> {
    return this.repo.search(query);
  }

  async createTeacher(data: CreateTeacherRequest): Promise<Teacher> {
    return this.repo.create(data);
  }

  async updateTeacher(id: string, data: UpdateTeacherRequest): Promise<Teacher> {
    return this.repo.update(id, data);
  }

  async archiveTeacher(id: string): Promise<void> {
    return this.repo.archive(id);
  }

  async restoreTeacher(id: string): Promise<void> {
    return this.repo.restore(id);
  }

  async deleteTeacher(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
