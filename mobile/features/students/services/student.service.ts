import type { MobileStudentRepository } from '../repositories';
import type { Student, StudentFilters, CreateStudentRequest, UpdateStudentRequest } from '@educi/types';
import { logger } from '@educi/logger';

export class MobileStudentService {
  constructor(private readonly repo: MobileStudentRepository) {}

  async createStudent(data: CreateStudentRequest, schoolId: string): Promise<Student> {
    return this.repo.create(data, schoolId);
  }

  async updateStudent(id: string, data: UpdateStudentRequest): Promise<Student> {
    return this.repo.update(id, data);
  }

  async archiveStudent(id: string): Promise<void> {
    await this.repo.archive(id);
  }

  async restoreStudent(id: string): Promise<void> {
    await this.repo.restore(id);
  }

  async deleteStudent(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async getStudent(id: string): Promise<Student | null> {
    return this.repo.findById(id);
  }

  async getAllStudents(schoolId: string, filters?: StudentFilters) {
    return this.repo.findAll(schoolId, filters || {});
  }

  async searchStudents(schoolId: string, query: string, limit?: number) {
    return this.repo.search(schoolId, query, limit);
  }

  async uploadPhoto(studentId: string, fileUri: string, fileName: string, mimeType: string): Promise<string> {
    return this.repo.uploadPhoto(studentId, fileUri, fileName, mimeType);
  }

  async getStatistics(schoolId: string) {
    return this.repo.getStatistics(schoolId);
  }
}
