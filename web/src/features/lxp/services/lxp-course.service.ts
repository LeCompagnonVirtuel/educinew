import type { SupabaseClient } from '@supabase/supabase-js';
import type { Course, CourseCreate, CourseUpdate, CourseQuery, CourseListResult } from '@educi/types';
import { LxpCourseNotFoundError, LxpCourseCreateError, LxpCourseUpdateError, LxpCourseDeleteError, LxpCoursePublishError, LxpCourseArchiveError, LxpCourseDuplicateError, LxpCourseCompleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCourseService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCourse(schoolId: string, id: string): Promise<Course> {
    const course = await this.repo.findCourseById(schoolId, id);
    if (!course) throw new LxpCourseNotFoundError(id);
    return course;
  }

  async listCourses(schoolId: string, query: CourseQuery): Promise<CourseListResult> {
    return this.repo.findCourses(schoolId, query);
  }

  async createCourse(data: CourseCreate): Promise<Course> {
    const course = await this.repo.createCourse(data);
    if (!course) throw new LxpCourseCreateError();
    return course;
  }

  async updateCourse(schoolId: string, id: string, data: CourseUpdate): Promise<Course> {
    const existing = await this.repo.findCourseById(schoolId, id);
    if (!existing) throw new LxpCourseNotFoundError(id);
    const updated = await this.repo.updateCourse(id, data);
    if (!updated) throw new LxpCourseUpdateError();
    return updated;
  }

  async deleteCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCourseById(schoolId, id);
    if (!existing) throw new LxpCourseNotFoundError(id);
    const deleted = await this.repo.deleteCourse(id);
    if (!deleted) throw new LxpCourseDeleteError();
  }

  async publishCourse(schoolId: string, id: string): Promise<Course> {
    const existing = await this.repo.findCourseById(schoolId, id);
    if (!existing) throw new LxpCourseNotFoundError(id);
    const published = await this.repo.publishCourse(id);
    if (!published) throw new LxpCoursePublishError();
    return published;
  }

  async archiveCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCourseById(schoolId, id);
    if (!existing) throw new LxpCourseNotFoundError(id);
    const archived = await this.repo.archiveCourse(id);
    if (!archived) throw new LxpCourseArchiveError();
  }

  async duplicateCourse(schoolId: string, id: string, newTitle: string): Promise<Course> {
    const existing = await this.repo.findCourseById(schoolId, id);
    if (!existing) throw new LxpCourseNotFoundError(id);
    const duplicated = await this.repo.duplicateCourse(id, newTitle);
    if (!duplicated) throw new LxpCourseDuplicateError();
    return duplicated;
  }
}
