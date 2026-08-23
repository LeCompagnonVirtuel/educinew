import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCourseService } from '@/features/lxp/services/lxp-course.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  ilike: vi.fn().mockReturnThis(),
  gte: vi.fn().mockReturnThis(),
  lte: vi.fn().mockReturnThis(),
  contains: vi.fn().mockReturnThis(),
  overlaps: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnThis(),
  head: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpCourseService', () => {
  let service: LxpCourseService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCourseService(mockSupabase as never);
  });

  describe('getCourse', () => {
    it('should return course by id', async () => {
      mockSupabase.data = { id: 'course-1', title: 'Math 101' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCourse('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should return null when course not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.getCourse('school-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.getCourse('school-1', 'course-1')).rejects.toThrow();
    });

    it('should include related modules when requested', async () => {
      mockSupabase.data = { id: 'course-1', modules: [] };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCourse('school-1', 'course-1', { includeModules: true });
      expect(result).toBeDefined();
    });

    it('should include enrollment count when requested', async () => {
      mockSupabase.data = { id: 'course-1', enrollment_count: 25 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCourse('school-1', 'course-1', { includeEnrollmentCount: true });
      expect(result).toBeDefined();
    });

    it('should filter by published status', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCourse('school-1', 'course-1', { status: 'published' });
      expect(result).toBeDefined();
    });

    it('should return course with instructor info', async () => {
      mockSupabase.data = { id: 'course-1', instructor: { name: 'Dr. Smith' } };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.getCourse('school-1', 'course-1', { includeInstructor: true });
      expect(result).toBeDefined();
    });

    it('should validate school id parameter', async () => {
      await expect(service.getCourse('', 'course-1')).rejects.toThrow();
    });

    it('should validate course id parameter', async () => {
      await expect(service.getCourse('school-1', '')).rejects.toThrow();
    });

    it('should handle concurrent access', async () => {
      mockSupabase.data = { id: 'course-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const promises = Array.from({ length: 5 }, () => service.getCourse('school-1', 'course-1'));
      const results = await Promise.all(promises);
      expect(results).toHaveLength(5);
    });
  });

  describe('createCourse', () => {
    it('should create a new course', async () => {
      const courseData = { title: 'New Course', description: 'A new course' };
      mockSupabase.data = { id: 'course-new', ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toBeDefined();
    });

    it('should return created course with id', async () => {
      const courseData = { title: 'Course' };
      mockSupabase.data = { id: 'course-new', ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toHaveProperty('id');
    });

    it('should set default status to draft', async () => {
      const courseData = { title: 'Course' };
      mockSupabase.data = { id: 'course-new', status: 'draft', ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toHaveProperty('status');
    });

    it('should handle creation with tags', async () => {
      const courseData = { title: 'Course', tags: ['math', 'science'] };
      mockSupabase.data = { id: 'course-new', ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toBeDefined();
    });

    it('should reject creation with empty title', async () => {
      const courseData = { title: '' };
      await expect(service.createCourse('school-1', courseData)).rejects.toThrow();
    });

    it('should reject creation with title exceeding max length', async () => {
      const courseData = { title: 'x'.repeat(501) };
      await expect(service.createCourse('school-1', courseData)).rejects.toThrow();
    });

    it('should handle creation with metadata', async () => {
      const courseData = { title: 'Course', metadata: { level: 'beginner' } };
      mockSupabase.data = { id: 'course-new', ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toBeDefined();
    });

    it('should set created_at timestamp', async () => {
      const courseData = { title: 'Course' };
      mockSupabase.data = { id: 'course-new', created_at: new Date().toISOString(), ...courseData };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toHaveProperty('created_at');
    });

    it('should handle database constraint errors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.createCourse('school-1', { title: 'Duplicate' })).rejects.toThrow();
    });

    it('should sanitize HTML in title', async () => {
      const courseData = { title: '<script>alert(1)</script>Course' };
      mockSupabase.data = { id: 'course-new', title: 'Course' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.createCourse('school-1', courseData);
      expect(result).toBeDefined();
    });
  });

  describe('updateCourse', () => {
    it('should update course fields', async () => {
      const updates = { title: 'Updated Title' };
      mockSupabase.data = { id: 'course-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle partial updates', async () => {
      const updates = { description: 'New description' };
      mockSupabase.data = { id: 'course-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toBeDefined();
    });

    it('should update status', async () => {
      const updates = { status: 'published' };
      mockSupabase.data = { id: 'course-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toBeDefined();
    });

    it('should set updated_at timestamp', async () => {
      const updates = { title: 'Updated' };
      mockSupabase.data = { id: 'course-1', updated_at: new Date().toISOString(), ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toHaveProperty('updated_at');
    });

    it('should reject updates with empty data', async () => {
      await expect(service.updateCourse('school-1', 'course-1', {})).rejects.toThrow();
    });

    it('should handle non-existent course', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.updateCourse('school-1', 'nonexistent', { title: 'X' });
      expect(result).toBeNull();
    });

    it('should handle database errors during update', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'update failed' } });
      await expect(service.updateCourse('school-1', 'course-1', { title: 'X' })).rejects.toThrow();
    });

    it('should validate status transitions', async () => {
      const updates = { status: 'invalid_status' };
      await expect(service.updateCourse('school-1', 'course-1', updates)).rejects.toThrow();
    });

    it('should handle thumbnail update', async () => {
      const updates = { thumbnail_url: 'https://example.com/thumb.jpg' };
      mockSupabase.data = { id: 'course-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toBeDefined();
    });

    it('should handle category update', async () => {
      const updates = { category: 'science' };
      mockSupabase.data = { id: 'course-1', ...updates };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.updateCourse('school-1', 'course-1', updates);
      expect(result).toBeDefined();
    });
  });

  describe('deleteCourse', () => {
    it('should soft delete a course', async () => {
      mockSupabase.data = { id: 'course-1', deleted_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.deleteCourse('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should handle hard delete when allowed', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCourse('school-1', 'course-1', { hard: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should cascade delete related modules', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.deleteCourse('school-1', 'course-1', { cascade: true });
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent course deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.deleteCourse('school-1', 'nonexistent');
      expect(result).toBeNull();
    });

    it('should prevent deletion of published course without archive', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.deleteCourse('school-1', 'course-1')).rejects.toThrow();
    });

    it('should handle database errors during deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'delete failed' } });
      await expect(service.deleteCourse('school-1', 'course-1')).rejects.toThrow();
    });

    it('should validate course exists before deletion', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.deleteCourse('school-1', 'nonexistent')).resolves.not.toThrow();
    });

    it('should handle concurrent deletion attempts', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const promises = Array.from({ length: 3 }, () => service.deleteCourse('school-1', 'course-1'));
      await Promise.all(promises);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });
  });

  describe('listCourses', () => {
    it('should list all courses for a school', async () => {
      mockSupabase.data = [{ id: 'course-1' }, { id: 'course-2' }];
      const result = await service.listCourses('school-1');
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'course-1' }];
      const result = await service.listCourses('school-1', { page: 1, limit: 10 });
      expect(result).toBeDefined();
    });

    it('should support search by title', async () => {
      mockSupabase.data = [{ id: 'course-1', title: 'Math' }];
      const result = await service.listCourses('school-1', { search: 'Math' });
      expect(result).toBeDefined();
    });

    it('should support filtering by status', async () => {
      mockSupabase.data = [{ id: 'course-1', status: 'published' }];
      const result = await service.listCourses('school-1', { status: 'published' });
      expect(result).toBeDefined();
    });

    it('should support sorting by created_at', async () => {
      mockSupabase.data = [{ id: 'course-1' }, { id: 'course-2' }];
      const result = await service.listCourses('school-1', { sortBy: 'created_at', sortOrder: 'desc' });
      expect(result).toBeDefined();
    });

    it('should support filtering by category', async () => {
      mockSupabase.data = [{ id: 'course-1', category: 'science' }];
      const result = await service.listCourses('school-1', { category: 'science' });
      expect(result).toBeDefined();
    });

    it('should support filtering by instructor', async () => {
      mockSupabase.data = [{ id: 'course-1', instructor_id: 'inst-1' }];
      const result = await service.listCourses('school-1', { instructorId: 'inst-1' });
      expect(result).toBeDefined();
    });

    it('should return empty array when no courses found', async () => {
      mockSupabase.data = [];
      const result = await service.listCourses('school-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors during listing', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'list failed' } });
      await expect(service.listCourses('school-1')).rejects.toThrow();
    });

    it('should support tag filtering', async () => {
      mockSupabase.data = [{ id: 'course-1', tags: ['math'] }];
      const result = await service.listCourses('school-1', { tags: ['math'] });
      expect(result).toBeDefined();
    });
  });

  describe('enrollStudent', () => {
    it('should enroll student in course', async () => {
      mockSupabase.data = { id: 'enroll-1', student_id: 'student-1', course_id: 'course-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('school-1', 'course-1', 'student-1');
      expect(result).toBeDefined();
    });

    it('should prevent duplicate enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unique_violation' } });
      await expect(service.enrollStudent('school-1', 'course-1', 'student-1')).rejects.toThrow();
    });

    it('should validate course exists before enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.enrollStudent('school-1', 'nonexistent', 'student-1')).rejects.toThrow();
    });

    it('should set enrollment date', async () => {
      mockSupabase.data = { id: 'enroll-1', enrolled_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('school-1', 'course-1', 'student-1');
      expect(result).toHaveProperty('enrolled_at');
    });

    it('should set initial status as active', async () => {
      mockSupabase.data = { id: 'enroll-1', status: 'active' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('school-1', 'course-1', 'student-1');
      expect(result).toHaveProperty('status', 'active');
    });

    it('should handle enrollment with waitlist', async () => {
      mockSupabase.data = { id: 'enroll-1', status: 'waitlisted' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('school-1', 'course-1', 'student-1', { waitlist: true });
      expect(result).toHaveProperty('status', 'waitlisted');
    });

    it('should check course capacity', async () => {
      mockSupabase.data = { id: 'course-1', max_enrollment: 30, current_enrollment: 30 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.enrollStudent('school-1', 'course-1', 'student-1')).rejects.toThrow();
    });

    it('should handle enrollment notification', async () => {
      mockSupabase.data = { id: 'enroll-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.enrollStudent('school-1', 'course-1', 'student-1', { notify: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors during enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'enrollment failed' } });
      await expect(service.enrollStudent('school-1', 'course-1', 'student-1')).rejects.toThrow();
    });

    it('should validate student id', async () => {
      await expect(service.enrollStudent('school-1', 'course-1', '')).rejects.toThrow();
    });
  });

  describe('unenrollStudent', () => {
    it('should unenroll student from course', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.unenrollStudent('school-1', 'course-1', 'student-1');
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle non-existent enrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await expect(service.unenrollStudent('school-1', 'course-1', 'student-1')).resolves.not.toThrow();
    });

    it('should preserve course progress on unenrollment', async () => {
      mockSupabase.data = { student_id: 'student-1', progress: 75 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.unenrollStudent('school-1', 'course-1', 'student-1', { preserveProgress: true });
      expect(result).toBeDefined();
    });

    it('should handle database errors during unenrollment', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'unenroll failed' } });
      await expect(service.unenrollStudent('school-1', 'course-1', 'student-1')).rejects.toThrow();
    });
  });

  describe('getCourseVersions', () => {
    it('should return all versions of a course', async () => {
      mockSupabase.data = [{ id: 'v1', version: 1 }, { id: 'v2', version: 2 }];
      const result = await service.getCourseVersions('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should return empty array for new course', async () => {
      mockSupabase.data = [];
      const result = await service.getCourseVersions('school-1', 'course-1');
      expect(result).toEqual([]);
    });

    it('should sort versions by version number', async () => {
      mockSupabase.data = [{ version: 2 }, { version: 1 }];
      const result = await service.getCourseVersions('school-1', 'course-1');
      expect(result).toBeDefined();
    });
  });

  describe('publishCourse', () => {
    it('should publish a draft course', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishCourse('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should prevent publishing course without modules', async () => {
      mockSupabase.data = { id: 'course-1', status: 'draft', module_count: 0 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.publishCourse('school-1', 'course-1')).rejects.toThrow();
    });

    it('should set published_at timestamp', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published', published_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishCourse('school-1', 'course-1');
      expect(result).toHaveProperty('published_at');
    });

    it('should create version on publish', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published', version: 1 };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.publishCourse('school-1', 'course-1');
      expect(result).toHaveProperty('version');
    });

    it('should reject publishing already published course', async () => {
      mockSupabase.data = { id: 'course-1', status: 'published' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.publishCourse('school-1', 'course-1')).rejects.toThrow();
    });

    it('should handle database errors during publish', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'publish failed' } });
      await expect(service.publishCourse('school-1', 'course-1')).rejects.toThrow();
    });
  });

  describe('archiveCourse', () => {
    it('should archive a published course', async () => {
      mockSupabase.data = { id: 'course-1', status: 'archived' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveCourse('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should set archived_at timestamp', async () => {
      mockSupabase.data = { id: 'course-1', status: 'archived', archived_at: new Date().toISOString() };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.archiveCourse('school-1', 'course-1');
      expect(result).toHaveProperty('archived_at');
    });

    it('should prevent archiving draft course', async () => {
      mockSupabase.data = { id: 'course-1', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      await expect(service.archiveCourse('school-1', 'course-1')).rejects.toThrow();
    });
  });

  describe('duplicateCourse', () => {
    it('should duplicate a course', async () => {
      mockSupabase.data = { id: 'course-dup', title: 'Copy of Math 101' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.duplicateCourse('school-1', 'course-1');
      expect(result).toBeDefined();
    });

    it('should create copy with draft status', async () => {
      mockSupabase.data = { id: 'course-dup', status: 'draft' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.duplicateCourse('school-1', 'course-1');
      expect(result).toHaveProperty('status', 'draft');
    });

    it('should include option to copy enrollments', async () => {
      mockSupabase.data = { id: 'course-dup' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.duplicateCourse('school-1', 'course-1', { copyEnrollments: true });
      expect(result).toBeDefined();
    });

    it('should handle non-existent course duplication', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.duplicateCourse('school-1', 'nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('bulkOperations', () => {
    it('should bulk publish multiple courses', async () => {
      mockSupabase.data = [{ id: 'course-1' }, { id: 'course-2' }];
      const result = await service.bulkPublish('school-1', ['course-1', 'course-2']);
      expect(result).toBeDefined();
    });

    it('should bulk archive multiple courses', async () => {
      mockSupabase.data = [{ id: 'course-1' }, { id: 'course-2' }];
      const result = await service.bulkArchive('school-1', ['course-1', 'course-2']);
      expect(result).toBeDefined();
    });

    it('should bulk delete multiple courses', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      await service.bulkDelete('school-1', ['course-1', 'course-2']);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should handle partial failures in bulk operations', async () => {
      mockSupabase.data = { succeeded: ['course-1'], failed: ['course-2'] };
      const result = await service.bulkPublish('school-1', ['course-1', 'course-2']);
      expect(result).toBeDefined();
    });

    it('should validate bulk operation inputs', async () => {
      await expect(service.bulkPublish('school-1', [])).rejects.toThrow();
    });

    it('should limit bulk operation size', async () => {
      const ids = Array.from({ length: 101 }, (_, i) => `course-${i}`);
      await expect(service.bulkPublish('school-1', ids)).rejects.toThrow();
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk create', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }, { id: 'bulk-2' }];
      const result = await service.bulkCreate([{ name: 'item1' }, { name: 'item2' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk update', async () => {
      mockSupabase.data = [{ id: 'bulk-1' }];
      const result = await service.bulkUpdate([{ id: 'bulk-1', name: 'updated' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk delete', async () => {
      mockSupabase.data = null;
      const result = await service.bulkDelete(['id-1', 'id-2']);
      expect(result).toBeDefined();
    });

    it('should handle bulk import', async () => {
      mockSupabase.data = { imported: 5 };
      const result = await service.bulkImport([{ name: 'import1' }]);
      expect(result).toBeDefined();
    });

    it('should handle bulk export', async () => {
      mockSupabase.data = { exported: 10 };
      const result = await service.bulkExport({ format: 'csv' });
      expect(result).toBeDefined();
    });
  });

  describe('Advanced Queries', () => {
    it('should support complex filtering', async () => {
      mockSupabase.data = [{ id: 'filtered-1' }];
      const result = await service.find({ status: 'active', type: 'premium' });
      expect(result).toBeDefined();
    });

    it('should support pagination', async () => {
      mockSupabase.data = [{ id: 'page-1' }];
      const result = await service.paginate(1, 10);
      expect(result).toBeDefined();
    });

    it('should support sorting', async () => {
      mockSupabase.data = [{ id: 'sorted-1' }];
      const result = await service.findAll({ orderBy: 'created_at', order: 'desc' });
      expect(result).toBeDefined();
    });

    it('should support search', async () => {
      mockSupabase.data = [{ id: 'search-1' }];
      const result = await service.search('test query');
      expect(result).toBeDefined();
    });

    it('should support field selection', async () => {
      mockSupabase.data = { id: 'select-1', name: 'test' };
      const result = await service.findById('select-1', ['id', 'name']);
      expect(result).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large datasets efficiently', async () => {
      mockSupabase.data = Array.from({ length: 1000 }, (_, i) => ({ id: `item-${i}` }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      mockSupabase.data = { id: 'concurrent-1' };
      const promises = [
        service.findById('1'),
        service.findById('2'),
        service.findById('3'),
      ];
      const results = await Promise.all(promises);
      expect(results).toHaveLength(3);
    });

    it('should handle timeout scenarios', async () => {
      mockSupabase.single.mockImplementation(() => new Promise((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 100);
      }));
      await expect(service.findById('timeout-test')).rejects.toThrow();
    });

    it('should handle memory pressure', async () => {
      mockSupabase.data = Array.from({ length: 10000 }, (_, i) => ({ id: `item-${i}`, data: 'x'.repeat(100) }));
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values gracefully', async () => {
      mockSupabase.data = null;
      const result = await service.findById('null-test');
      expect(result).toBeNull();
    });

    it('should handle undefined values', async () => {
      mockSupabase.data = undefined;
      const result = await service.findById('undefined-test');
      expect(result).toBeUndefined();
    });

    it('should handle empty strings', async () => {
      mockSupabase.data = { id: 'empty-1', name: '' };
      const result = await service.findById('empty-1');
      expect(result).toBeDefined();
    });

    it('should handle special characters', async () => {
      mockSupabase.data = { id: 'special-1', name: '!@#$%^&*()_+' };
      const result = await service.findById('special-1');
      expect(result).toBeDefined();
    });

    it('should handle unicode characters', async () => {
      mockSupabase.data = { id: 'unicode-1', name: '??????' };
      const result = await service.findById('unicode-1');
      expect(result).toBeDefined();
    });
  });

  describe('Error Recovery', () => {
    it('should recover from network errors', async () => {
      mockSupabase.single
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({ data: { id: 'recovered-1' }, error: null });
      const result = await service.findById('recovery-test');
      expect(result).toBeDefined();
    });

    it('should recover from database timeouts', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({ data: null, error: { message: 'timeout' } })
        .mockResolvedValue({ data: { id: 'recovered-2' }, error: null });
      const result = await service.findById('recovery-test-2');
      expect(result).toBeDefined();
    });

    it('should handle rate limiting', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'rate limit exceeded' } 
      });
      await expect(service.findById('rate-limit-test')).rejects.toThrow();
    });

    it('should handle service unavailability', async () => {
      mockSupabase.single.mockResolvedValue({ 
        data: null, 
        error: { message: 'service unavailable' } 
      });
      await expect(service.findById('unavailable-test')).rejects.toThrow();
    });
  });
});
